import { sleep } from "@newdash/newdash";
import { AxiosResponse } from "axios";
import { DateTime } from "luxon";
import client from "./client";
import { INTERVAL_BEFORE_INVOKE, REPORT_URL } from "./constants";
import sem from "./sem";
import { Datum, ReportQueryParameter, SinaAPIResponse, SinaQueryParameter, Source } from "./type";

function find_group_title<T = any>(groups: Datum<T>[], item: Datum<T>): string {
  return groups.find(
    group => group.item_group_no === item.item_group_no && group.item_display === "大类"
  )?.item_title ?? "未知";
}

export function create_query_api<T extends string = string>(source: Source) {
  return async function (options: ReportQueryParameter) {

    const params: SinaQueryParameter = {
      ...options,
      source,
      type: 0, // hard coded
    };

    await sleep(INTERVAL_BEFORE_INVOKE); // avoid rate limit

    const response = await sem.use(() => {
      return client.request<any, AxiosResponse<SinaAPIResponse<T>>>({
        url: REPORT_URL,
        method: "get",
        params,
      });
    });


    if (parseInt(response.data?.result?.data?.report_count ?? 0) == 0) {
      return [];
    }

    const { report_list } = response.data.result.data;

    return Object.entries(report_list).map(([report_date, report]) => {
      const { data, ...rest_report } = report;
      const groups = data.filter(item => item.item_display === "大类");
      const structure_report = {
        ...rest_report,
        report_date,
        report_js_date: DateTime.fromISO(report_date),
        publish_js_date: DateTime.fromISO(rest_report.publish_date),
        item_obj: data
          .filter(item => item.item_field?.length > 0 && item.item_display == "小类")
          .map(item => ({
            ...item,
            item_group_title: find_group_title<T>(groups, item)
          })),
        total_obj: data
          .filter(
            item => item.item_field?.length > 0
              && (item.item_display == "中类" || item.item_display === "大类")
          )
          .map(item => ({
            ...item,
            item_group_title: find_group_title(groups, item)
          })),
      };
      return structure_report;
    });

  };
}


export function create_get_all_api(source: Source) {
  const api = create_query_api(source);
  return function (symbol: string) {
    return {
      [Symbol.asyncIterator]: async function* () {
        let page = 1;
        for (; ;) {
          const reports = await api({
            page,
            paperCode: symbol,
            num: 10,
          });

          if (reports?.length > 0) {
            page++;
            for (const report of reports) {
              yield report;
            }
          }
          else {
            break;
          }
        }
      }
    };
  };
} 
