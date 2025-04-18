import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/posts/Posts.tsx"),
  layout("routes/auth/Layout.tsx", [
    route("signin", "routes/auth/signin.tsx"),
    route("signup", "routes/auth/signup.tsx"),
  ]),
] satisfies RouteConfig;
