import type { MetaFunction } from "@remix-run/node";
import NavBar from "~/components/NavBar/NavBar";

export const meta: MetaFunction = () => {
  return [
    { title: "New Cocibolca App!" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return <NavBar />;
}
