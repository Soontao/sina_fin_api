import { CF_FIELDS } from "./api_types";
import { create_query_api } from "./create_query_api";

/**
 * Query Cash Flow Statement
 */
export const query_cash_flow = create_query_api<CF_FIELDS>("llb")
