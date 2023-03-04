import { AxiosResponse } from "axios";
import { DateTime } from "luxon";
import { BalanceSheet, BSDatum } from "./api_types";
import client from "./client";
import { ReportQueryParameter, SinaAPIResponse, SinaQueryParameter, Source } from "./type";

function find_group_title(groups: BSDatum[], item: BSDatum): string {
  return groups.find(
    group => group.item_group_no === item.item_group_no && group.item_display === '大类'
  )?.item_title ?? "未知";
}

export function create_query_api(source: Source) {
  return async function (options: ReportQueryParameter) {

    const params: SinaQueryParameter = {
      ...options,
      source,
      type: 0, // hard coded
    }

    const response = await client.request<any, AxiosResponse<SinaAPIResponse<BalanceSheet>>>({
      method: "get",
      params,
    })

    if (parseInt(response.data?.result?.data?.report_count ?? 0) == 0) {
      return []
    }

    const { report_list } = response.data.result.data

    return Object.entries(report_list).map(([report_date, report]) => {
      const { data, ...rest_report } = report
      const groups = data.filter(item => item.item_display === '大类')
      const structure_report = {
        ...rest_report,
        report_date,
        report_js_date: DateTime.fromISO(report_date),
        publish_js_date: DateTime.fromISO(rest_report.publish_date),
        item_obj: data
          .filter(item => item.item_field?.length > 0 && item.item_display == '小类')
          .map(item => ({
            ...item,
            item_group_title: find_group_title(groups, item)
          })),
        total_obj: data
          .filter(item => item.item_field?.length > 0 && item.item_display == '中类')
          .map(item => ({
            ...item,
            item_group_title: find_group_title(groups, item)
          })),
      }
      return structure_report
    })

  }
}


