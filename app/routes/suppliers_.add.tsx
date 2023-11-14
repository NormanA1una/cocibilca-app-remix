import { Form } from "@remix-run/react";
import { FormControl, Switch, Progress } from "@chakra-ui/react";
import { useState } from "react";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { message } from "antd";
import { storage } from "firebaseConfig";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";

export const action = async ({ request }: ActionFunctionArgs) => {
  const apiUrl = "http://localhost:8000/";
  const form = await request.formData();

  const body = {
    nombreProveedor: form.get("nombreProveedor"),
    tipoDeProducto: form.get("tipoDeProducto"),
    estado: form.get("estado") === "activo",
    logo: form.get("logo"),
    nombreImage: form.get("nombreImage"),
  };

  console.log(body);

  try {
    const res = await axios.post(`${apiUrl}supplier`, body);
    /* const res = await fetch(`${apiUrl}supplier`, {
      method: "POST",
      body: JSON.stringify(body),
    }); */

    return redirect("/suppliers");
  } catch (error) {
    console.log("Error creating supplier:", error);
    throw error;
  }
};

export default function AddSupplier() {
  const [isChecked, setIsCheked] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [buttonHidden, setButtonHiden] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [nombreImage, setNombreImage] = useState("");

  const onChangeSwitch = (e: any) => {
    setIsCheked(e);
    console.log(e);
  };

  const handleSelectedFile = (files: any) => {
    if (files.target.files && files.target.files[0].size < 10000000) {
      setImageFile(files.target.files[0]);
      setButtonHiden(false);

      console.log(files.target.files[0]);
    } else {
      message.error("El tamaño de la imagen es muy grande");
    }
  };

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;

      const storageRef = ref(storage, `images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgressUpload(progress);

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          message.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((fileUrl) => {
            setDownloadUrl(fileUrl);

            //Esto es lo que guarda en el input el valor de logo y nombre de la imagen
            setFileUrl(fileUrl);
            setNombreImage(imageFile?.name);
          });
        }
      );
    } else {
      message.error("File not found");
    }

    setIsUploading(true);
  };

  const handleRemoveFile = () => {
    if (imageFile) {
      const name = imageFile.name;

      const storageRef = ref(storage, `images/${name}`);

      deleteObject(storageRef)
        .then(() => {
          message.success("Imagen Removida!");
        })
        .catch((error) => {
          message.error(error);
        });
    } else {
      message.error("File not found");
    }

    setProgressUpload(0);
    setDownloadUrl("");
    setIsUploading(false);
    setButtonHiden(true);
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

          {downloadUrl ? (
            <>
              <div className="h-[150px] flex items-center">
                <img
                  className="h-auto max-h-[150px] w-auto max-w-[150px]"
                  src={downloadUrl}
                  alt="Logo del Proveedor"
                />
              </div>
            </>
          ) : (
            <img
              src="/images/noImageFix.jpg"
              alt="No image png"
              className="h-auto max-h-[150px] w-auto max-w-[150px]"
            />
          )}

          <Progress className="my-4" value={progressUpload} hasStripe />

          <div>
            <div>
              <input type="hidden" name="nombreImage" value={nombreImage} />
            </div>
            <div>
              <input type="hidden" name="logo" value={fileUrl} />
            </div>

            <input
              type="file"
              onChange={(files) => handleSelectedFile(files)}
            />
            {imageFile ? (
              <div className={isUploading ? "flex" : "flex justify-center"}>
                <div className="md:mt-4">
                  <button
                    hidden={!isUploading}
                    type="button"
                    className={
                      !isUploading
                        ? "p-2 bg-red-600 rounded-lg shadow text-white"
                        : "p-2 mb-[60px] md:mb-0 bg-red-600 rounded-lg shadow text-white"
                    }
                    onClick={handleRemoveFile}
                  >
                    Remover Imagen
                  </button>
                </div>

                <div>
                  <button
                    hidden={isUploading || buttonHidden}
                    type="button"
                    className="p-2 bg-accentPurple rounded-lg shadow text-neutralWhite mr-3 md:mr-0 md:mt-4"
                    onClick={handleUploadFile}
                  >
                    Cargar Imagen
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
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
