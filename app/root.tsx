import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import NavBar from "./components/NavBar/NavBar";
import SideNav from "./components/SideNav/SideNav";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NavBar />
        <SideNav />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script src="node_modules\flowbite\dist\flowbite.min.js"></script>
      </body>
    </html>
  );
}
