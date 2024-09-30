import { DEVELOPMENT_API, PRODUCTION_API } from "./layout/types";
// import { PRODUCTION_API } from "./layout/types";

// const isProduction = process.env.ENVIRONMENT === "PRODUCTION";

const API = import.meta.env.PROD ? PRODUCTION_API : DEVELOPMENT_API;

export default API;
