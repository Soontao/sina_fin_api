import { BS_FIELDS } from "./api_types";
import { create_query_api } from "./create_query_api";

/**
 * Query Balance Sheet Data
 */
export const query_balance_sheet = create_query_api<BS_FIELDS>("fzb");
