import { Form } from "@remix-run/react";
import { FormControl, Switch, Progress } from "@chakra-ui/react";
import { useState } from "react";
import { ActionFunctionArgs, redirect } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();

  const body = {
    nombreProvedor: form.get("nombreProveedor"),
    tipoDeProducto: form.get("tipoDeProducto"),
    estado: form.get("estado") === "activo",
    logo: form.get("logo"),
    nombreImage: form.get("nombreImage"),
  };
  console.log(body);

  return redirect("/suppliers");
};

export default function AddSupplier() {
  const [isChecked, setIsCheked] = useState(false);

  const onChangeSwitch = (e: any) => {
    setIsCheked(e);
    console.log(e);
  };
  return (
    <div className="h-screen md:pl-[272px] md:pt-[72px] md:pr-4 flex flex-col items-center justify-center">
      <h1 className="mb-8 text-3xl font-bold">Agregar nuevo Proveedor</h1>
      <Form method="post" className="w-[800px] border p-2 rounded-md shadow">
        <section className="flex flex-col mb-5">
          <span className="font-bold mb-2">Nombre del Proveedor</span>
          <input
            required
            type="text"
            name="nombreProveedor"
            placeholder="Distribuidora..."
            className="rounded-md border-slate-400 shadow-md"
          />
        </section>

        <section className="flex justify-between items-center mb-5">
          <div>
            <span className="font-bold mr-2">Tipo de Producto</span>
            <input
              required
              type="text"
              name="tipoDeProducto"
              placeholder="Productos varios..."
              className="rounded-md border-slate-400 shadow-md w-[450px]"
            />
          </div>
          <div className="w-[184px] flex">
            <div>
              <span className="mr-2 font-bold">Estado:</span>
              <span className="mr-4">{isChecked ? "Activo" : "Inactivo"}</span>
            </div>
            <FormControl>
              <Switch
                value={isChecked ? "activo" : "inactivo"}
                name="estado"
                size="lg"
                isChecked={isChecked}
                onChange={(e) => {
                  onChangeSwitch(e.target.checked);
                }}
              />
            </FormControl>
          </div>
        </section>

        <section className="mb-8">
          <span className="font-bold">Logo del proveedor</span>
          <div className="h-[150px] flex justify-center">
            <img
              src="/images/no-image-icon-23485.png"
              alt="No Image"
              className="h-auto max-h-[150px] w-auto max-w-[150px]"
            />
          </div>

          <Progress className="mb-4" value={80} hasStripe />

          <div>
            <div>
              <input type="hidden" name="nombreImage" value={""} />
            </div>
            <div>
              <input type="hidden" name="logo" />
            </div>

            <input type="file" disabled />
          </div>
        </section>

        <section className="flex justify-center">
          <button
            type="submit"
            className="border bg-green-600 p-2 rounded-md shadow text-white font-bold"
          >
            Agregar Proveedor
          </button>
        </section>
      </Form>
    </div>
  );
}
