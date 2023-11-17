import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import axios from "axios";
import invariant from "tiny-invariant";

export const action = async ({ params }: ActionFunctionArgs) => {
  const apiUrl = "http://localhost:8000/";
  invariant(params.supplierId, "Missing supplierId param");

  console.log("PARAMS SUPPLIERD ID", params.supplierId);

  try {
    const res = await axios.delete(`${apiUrl}supplier/${params.supplierId}`);

    return redirect("/suppliers");
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};
