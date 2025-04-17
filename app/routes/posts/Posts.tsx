import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Posts() {
  return (
    <div>
      <h1>Hello world!</h1>
    </div>
  );
}
