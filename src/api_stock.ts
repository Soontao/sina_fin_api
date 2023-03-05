import { sleep } from "@newdash/newdash";
import client from "./client";
import { INTERVAL_BEFORE_INVOKE, STOCK_URL } from "./constants";
import sem from "./sem";

export interface Stock {
  symbol: string;
  code: string;
  name: string;
  trade: string;
  pricechange: number;
  changepercent: number;
  buy: string;
  sell: string;
  settlement: string;
  open: string;
  high: string;
  low: string;
  volume: number;
  amount: number;
  ticktime: string;
  per: number;
  pb: number;
  mktcap: number;
  nmc: number;
  turnoverratio: number;
}

export type Nodes = "hs_a" | "hs_b";

export function query_stock_by_node(node: Nodes) {
  return {
    [Symbol.asyncIterator]: async function* () {
      let page = 1;
      for (; ;) {
        await sleep(INTERVAL_BEFORE_INVOKE); // reduce sina server consumption

        const response = await sem.use(() => client.get<Array<Stock>>(STOCK_URL, {
          params: { page, node, sort: "symbol", num: 50, asc: 1 }
        }));

        if (response.data?.length > 0) {
          page++;
          for (const stock of response.data) {
            yield stock;
          }
        }
        else {
          break;
        }
      }
    }
  };
}

/**
 * query all stocks names
 * 
 * @returns 
 */
export function query_stock_names() {

  return {
    [Symbol.asyncIterator]: async function* () {
      for (const node of ["hs_a", "hs_b"] as Array<Nodes>) {
        for await (const stock of query_stock_by_node(node)) {
          yield stock;
        }
      }
    }
  };


}
