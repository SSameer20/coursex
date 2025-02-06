export type Theme = "light" | "dark";
export type Navigator = "/" & String;
export type User = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
};

export enum Routes {
  HOME = "/",
  AUTH = "/auth",
  APP = "/app",
  DASHBOARD = "",
  COURSE = "course",
  PROFILE = "profile",
  ERROR = "/error",
  ADMIN = "/admin",
  ADMIN_AUTH = "/admin/auth",
  ADMIN_DASHBOARD = "",
  ADMIN_COURSE = "course",
  ADMIN_PROFILE = "profile",
}

export enum PRODUCTION_API {
  USER_LOGIN = "https://coursex-api.vercel.app/api/v1/user/login",
  USER_REGISTER = "https://coursex-api.vercel.app/api/v1/user/register",
  USER_COURSE_ALL = "https://coursex-api.vercel.app/api/v1/user/course/view",
  USER_PURCHASE_COURSE = "https://coursex-api.vercel.app/api/v1/user/course/buy",
  USER_MY_COURSE = "https://coursex-api.vercel.app/api/v1/user/course/mycourse",
  USER_DETAILS = "https://coursex-api.vercel.app/api/v1/user/details",
}

export enum DEVELOPMENT_API {
  USER_LOGIN = "http://localhost:8080/api/v1/user/login",
  USER_REGISTER = "http://localhost:8080/api/v1/user/register",
  USER_COURSE_ALL = "http://localhost:8080/api/v1/user/course/view",
  USER_PURCHASE_COURSE = "http://localhost:8080/api/v1/user/course/buy",
  USER_MY_COURSE = "http://localhost:8080/api/v1/user/course/mycourse",
  USER_DETAILS = "http://localhost:8080/api/v1/user/details",
  ADMIN_LOGIN = "http://localhost:8080/api/v1/admin/login",
  ADMIN_REGISTER = "http://localhost:8080/api/v1/admin/register",
  ADMIN_COURSE_CREATE = "http://localhost:8080/api/v1/admin/course/create",
  ADMIN_COURSE_VIEW = "http://localhost:8080/api/v1/admin/course/view",
  ADMIN_DETAILS = "http://localhost:8080/api/v1/admin/",
}

export type Course = {
  id?: string;
  title: string;
  description?: string;
  price: number;
  imageUrl?: string;
  creatorId?: string;
};
