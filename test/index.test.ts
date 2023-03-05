import { query_balance_sheet, query_cash_flow, query_income_statement, query_stock_by_node, query_stock_names } from "../src";
import { query_all_balance_sheet } from "../src/api_balance_sheets";

describe("Index Test Suite", () => {

  it('should support query balance sheets', async () => {
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


  it('should support query cash flow statement', async () => {
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

  it('should support query income statement', async () => {
    const papers = await query_income_statement({
      paperCode: 'sz001225',
      page: 1,
      num: 100
    })
    expect(papers.length).toBeGreaterThanOrEqual(7)
    const report_2022_end = papers.find(report => report.report_date === '20221231')
    expect(report_2022_end).not.toBeUndefined()
    expect(report_2022_end?.item_obj).toMatchSnapshot("income statement items")
    expect(report_2022_end?.total_obj).toMatchSnapshot("income statement total")
  });

  it('should support query stock names by node', async () => {
    let i = 0
    for await (const stock of query_stock_by_node("hs_b")) {
      expect(stock.symbol).not.toBeUndefined()
      expect(stock.name).not.toBeUndefined()
      i++
    }
    expect(i).toBeGreaterThanOrEqual(86)
  });

  it('should support query all stocks', async () => {
    for await (const stock of query_stock_names()) {
      expect(stock.symbol).not.toBeUndefined()
      expect(stock.name).not.toBeUndefined()
      for await (const bs of query_all_balance_sheet(stock.symbol)) {
        expect(bs.item_obj?.length).toBeGreaterThan(0)
        expect(bs.total_obj?.length).toBeGreaterThan(0)
        break
      }
      break
    }
  });

});
