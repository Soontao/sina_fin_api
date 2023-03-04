import { query_balance_sheet, query_cash_flow } from "../src";

describe("Index Test Suite", () => {

  it('should support query bs', async () => {
    const papers = await query_balance_sheet({
      paperCode: 'sz001225',
      page: 1,
      num: 100
    })
    expect(papers.length).toBeGreaterThanOrEqual(7)
    const report_2022_end = papers.find(report => report.report_date === '20221231')
    expect(report_2022_end).not.toBeUndefined()
    expect(report_2022_end?.item_obj).toMatchSnapshot()
    expect(report_2022_end?.total_obj).toMatchSnapshot()
  });


  it('should support query CF', async () => {
    const papers = await query_cash_flow({
      paperCode: 'sz001225',
      page: 1,
      num: 100
    })
    expect(papers.length).toBeGreaterThanOrEqual(7)
    const report_2022_end = papers.find(report => report.report_date === '20221231')
    expect(report_2022_end).not.toBeUndefined()
    expect(report_2022_end?.item_obj).toMatchSnapshot()
    expect(report_2022_end?.total_obj).toMatchSnapshot()
  });

});
