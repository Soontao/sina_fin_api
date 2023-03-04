/**
 * pagination parameter
 */
export interface Pagination {
  /**
   * page number
   */
  page: number;
  /**
   * records num of per page
   */
  num: number;
}

export interface ReportQueryParameter extends Pagination {
  paperCode: string;
}

export interface SinaQueryParameter extends ReportQueryParameter {
  source: Source;
  type: number;
}

export interface Status {
  code: number;
}

export type Source = "fzb" | 'llb';

export interface SinaAPIResponse<T = any> {
  result: Result<T>;
}

export interface Result<T> {
  status: Status;
  data: Data<T>;
}

export interface Data<T = any> {
  /**
   * total report count
   */
  report_count: `${number}`;
  report_date: ReportDate[];
  report_list: ReportList<T>;
}

export interface ReportDate {
  /**
   * date string: yyyymmdd
   */
  date_value: `${number}`;
  date_description: string;
  /**
   * 2 => 半年报
   * 4 => 年报
   */
  date_type: 2 | 4;
}

export interface ReportList<T> {
  [key: string]: T;
}

export interface Datum<FK> {
  item_field: FK;
  /**
   * 会计科目
   */
  item_title: string;
  /**
   * if available, the decimal value
   */
  item_value: null | string;
  /**
   * 1 大类
   * 2 小类
   * 3 小类但无值 - 缩进
   * 6 中类
   */
  item_display_type: 1 | 2 | 3 | 6;
  item_display: '中类' | '大类' | '小类' | '缩进';
  item_precision: ItemPrecision;
  item_group_no: number;
  item_source: Source;
  item_tongbi: number | string;
}


export type ItemPrecision = "f2"


