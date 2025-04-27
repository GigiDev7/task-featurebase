import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/posts/Page.tsx", [
    route("", "routes/posts/Posts.tsx", [
      route(":id", "routes/posts/Post.tsx"),
    ]),
  ]),
  layout("routes/auth/Layout.tsx", [
    route("signin", "routes/auth/Signin.tsx"),
    route("signup", "routes/auth/Signup.tsx"),
  ]),
] satisfies RouteConfig;
