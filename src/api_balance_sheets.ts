import { BS_FIELDS } from "./api_types";
import { create_get_all_api, create_query_api } from "./create_query_api";

/**
 * Query Balance Sheet
 */
export const query_balance_sheet = create_query_api<BS_FIELDS>("fzb");

/**
 * Query All Balance Sheets
 */
export const query_all_balance_sheet = create_get_all_api("llb");