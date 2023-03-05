import { create_get_all_api, create_query_api } from "./create_query_api";

/**
 * Query Income Statement
 */
export const query_income_statement = create_query_api("lrb");


/**
 * Query All Income Statement
 */
export const query_all_income_statement = create_get_all_api("lrb");