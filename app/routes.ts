import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/posts/Page.tsx"),
  layout("routes/auth/Layout.tsx", [
    route("signin", "routes/auth/Signin.tsx"),
    route("signup", "routes/auth/Signup.tsx"),
  ]),
] satisfies RouteConfig;
