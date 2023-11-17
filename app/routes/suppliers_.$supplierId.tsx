import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import axios from "axios";
import invariant from "tiny-invariant";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="h-screen md:pl-[272px] md:pt-[72px] md:pr-4">
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="h-screen md:pl-[272px] md:pt-[72px] md:pr-4">
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.supplierId, "Se ha perdido el Parámetro SupplierId");
  const apiUrl = "http://localhost:8000/";

  try {
    const res = await axios.get(`${apiUrl}supplier/${params.supplierId}`);

    return res.data;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.supplierId, "Se ha perdido el Parámetro SupplierId");

  return redirect("/suppliers");
};

export default function SupplierDetail() {
  const data = useLoaderData<typeof loader>() as SupplierForm;

  return (
    <div className="h-screen md:pl-[272px] md:pt-[72px] md:pr-4">
      Formulario de actuliación del proveedor: {data.nombreProveedor}
    </div>
  );
}
