import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({}: LoaderFunctionArgs) => {
  return "loading";
};

export default function Users() {
  const {} = useLoaderData<typeof loader>();
  return <h1 className="md:pl-[260px] md:pt-4">This is a page of users</h1>;
}
