/* eslint-disable */
export default {
  API_URL:
    process.env.NODE_ENV === "production" ? "/KBankAPI" : "/KBankAPI/UAT",
  API_TIMEOUT: 60000,
  KEY: "1234567890"
};
