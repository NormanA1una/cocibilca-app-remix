import { Link, NavLink } from "@remix-run/react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Navbar, Flowbite } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
  navbar: {
    root: {
      base: "bg-black px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
      rounded: {
        on: "",
        off: "",
      },
      bordered: {
        on: "border",
        off: "",
      },
      inner: {
        base: "mx-auto flex flex-wrap items-center justify-between",
        fluid: {
          on: "",
          off: "container",
        },
      },
    },
    brand: {
      base: "flex items-center",
    },
    collapse: {
      base: "w-full md:block md:w-auto md:hidden",
      list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
      hidden: {
        on: "hidden",
        off: "",
      },
    },
    link: {
      base: "block py-2 pr-4 pl-3 md:p-0",
      active: {
        on: "bg-cyan-700 font-bold dark:text-white md:bg-transparent md:text-cyan-500",
        off: "border-b border-gray-100  text-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
      },
      disabled: {
        on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        off: "",
      },
    },
    toggle: {
      base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
      icon: "h-6 w-6 shrink-0",
    },
  },
};

export default function NavBar() {
  return (
    <div className="md:pl-[256px]">
      <Flowbite theme={{ theme: customTheme }}>
        <Navbar fluid rounded>
          <Navbar.Brand as={Link} href="https://flowbite-react.com">
            <img
              src="images\volcano.png"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-white text-xl font-semibold dark:text-white">
              Licorería Cocibolca
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <NavLink
              to={"suppliers"}
              className={({ isActive }) =>
                isActive
                  ? "bg-cyan-700 font-bold dark:text-white md:bg-transparent md:text-cyan-500"
                  : "border-b border-gray-100  text-white hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
              }
            >
              <Link to={"suppliers"}>Suppliers</Link>
            </NavLink>

            <NavLink
              to={"products"}
              className={({ isActive }) =>
                isActive
                  ? "bg-cyan-700 font-bold dark:text-white md:bg-transparent md:text-cyan-500"
                  : "border-b border-gray-100  text-white hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
              }
            >
              <Link to={"products"}>Products</Link>
            </NavLink>

            <NavLink
              to={"users"}
              className={({ isActive }) =>
                isActive
                  ? "bg-cyan-700 font-bold dark:text-white md:bg-transparent md:text-cyan-500"
                  : "border-b border-gray-100  text-white hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
              }
            >
              <Link to={"users"}>Users</Link>
            </NavLink>
          </Navbar.Collapse>
        </Navbar>
      </Flowbite>
    </div>
  );
}
