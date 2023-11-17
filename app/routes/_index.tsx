import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Cocibolca App!" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="h-screen md:pl-[272px] md:pt-[72px] md:pr-4">
      Esto es el Index
    </div>
  );
}
