import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import axios from "axios";

export const loader = async ({}: LoaderFunctionArgs) => {
  const apiUrl = "http://localhost:8000/";
  try {
    const res = await axios.get(`${apiUrl}supplier`);
    return res.data;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export default function Suppliers() {
  const supplierData = useLoaderData<typeof loader>() as SupplierForm[];

  return (
    <div className="h-screen md:pl-[272px] md:pt-[72px] md:pr-4">
      <div className="flex justify-end items-center mb-6">
        <Link to={"add"}>
          <button className="border-slate-400 border- shadow-md p-2 rounded">
            Agregar Proveedor
          </button>
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre del Proveedor
              </th>
              <th scope="col" className="px-6 py-3">
                Tipo de Producto
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Logo
              </th>
              <th scope="col" className="px-6 py-3">
                Herramienta
              </th>
            </tr>
          </thead>
          <tbody>
            {supplierData.map((supplier) => (
              <tr
                key={supplier.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {supplier.id}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {supplier.nombreProveedor}
                </th>
                <td className="px-6 py-4">{supplier.tipoDeProducto}</td>
                <td className="px-6 py-4">
                  {supplier.estado ? "Activo" : "inactivo"}
                </td>
                <td className="px-6 py-4 h-[85px] w-[172px]">
                  <img
                    src={supplier.logo}
                    alt="Logo Proveedor"
                    width={50}
                    height={50}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
