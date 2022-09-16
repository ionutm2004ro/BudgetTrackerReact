const API_BASE_URL_DEVELOPMENT = "https://localhost:7137"

const ENDPOINTS = {
    GET_ALL_TRANSACTIONS: "get-all-transactions",
    GET_TRANSACTION_BY_ID: "get-transaction-by-id",
    CREATE_TRANSACTION: "create-transaction",
    UPDATE_TRANSACTION: "update-transaction",
    DELETE_TRANSACTION_BY_ID: "delete-transaction-by-id"
};

const development = {
    GET_ALL_TRANSACTIONS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_ALL_TRANSACTIONS}`,
    GET_TRANSACTION_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_TRANSACTION_BY_ID}`,
    CREATE_TRANSACTION: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.CREATE_TRANSACTION}`,
    UPDATE_TRANSACTION: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.UPDATE_TRANSACTION}`,
    DELETE_TRANSACTION_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.DELETE_TRANSACTION_BY_ID}`,
}

const Constants = process.env.NODE_ENV === 'development' ? development : null;

export default Constants
