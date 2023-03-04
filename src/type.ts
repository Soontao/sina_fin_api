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

export type Source = "fzb";

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
