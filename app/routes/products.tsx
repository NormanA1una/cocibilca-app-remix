import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({}: LoaderFunctionArgs) => {
  return "loading";
};

export default function Products() {
  const {} = useLoaderData<typeof loader>();
  return (
    <div className="h-screen md:pl-[272px] md:pt-[72px] md:pr-4">
      <h1 className="">This is a page of products</h1>
    </div>
  );
}
