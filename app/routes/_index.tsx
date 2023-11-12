import type { MetaFunction } from "@remix-run/node";
import NavBar from "~/components/NavBar/NavBar";
import SideNav from "~/components/SideNav/SideNav";

export const meta: MetaFunction = () => {
  return [
    { title: "New Cocibolca App!" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return <div className="pl-[260px] pt-4">Esto es el Index</div>;
}
