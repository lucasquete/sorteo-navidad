"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ref, deleteObject} from "firebase/storage"
import {storage} from "../../firebaseConfig.js"
import { toast } from "react-hot-toast";

const FotosPage = () => {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    const local = window.localStorage.getItem("admin");
    setAdmin(local ? local : "")
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      await fetch("/api/imagenes")
        .then((res) => res.json())
        .then((data) => {
          setImages(data);
          setIsLoading(false);
        });
    }

    fetchImages();
  }, []);

  const removeImage = async (nombre, id) => {
    try {
      const imgRef = ref(storage, `images/${nombre}`);
      const res = await deleteObject(imgRef);
      await fetch("/api/imagenes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      setImages(images.filter(i => i.nombre !== nombre))
      toast.success("Foto borrada", {
        duration: 4000,
      });
    } catch (error) {
      toast.error("No se ha podido borrar archivo", {
        duration: 4000,
      });
      console.log(error)
    }
  }

  return (
    <main className="flex flex-col gap-5 p-3 sm:p-6 text-center">
      <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-fuchsia-500 to-indigo-600 bg-clip-text text-transparent">
        La Cesta de Los García en imágenes
      </h1>
      <p>
        En este apartado se irán actualizando los productos que contendrá la
        Cesta de Navidad de Los García. Un listado de los productos que también
        podréis ir viendo en imágenes.
      </p>
      {isLoading ? (
        <div className="min-h-[300px] flex items-center justify-center text-red-500">
          <p className="text-2xl uppercase font-bold">Cargando imágenes...</p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 items-center justify-center">
          {images.map((image) => (
            <div key={image?.id} className="relative flex">
              <Image
                src={image?.url}
                alt={image?.titulo}
                width={300}
                height={200}
                className="rounded-lg object-cover relative sm:w-[400px] sm:h-[450px] w-[300px] h-[350px]"
                priority
              />
              {admin && (
                <Image
                  src={"/remove.png"}
                  alt="borrar imagen"
                  width={30}
                  height={300}
                  className="rounded-lg absolute right-2 top-2 bg-white cursor-pointer"
                  onClick={() => removeImage(image?.nombre, image?.id)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default FotosPage;
