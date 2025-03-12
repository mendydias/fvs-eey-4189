import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/login/login.tsx"),
  route("/dashboard", "pages/dashboard/dashboard.tsx"),
  route("/elections", "pages/dashboard/election.tsx"),
] satisfies RouteConfig;
