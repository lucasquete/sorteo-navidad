"use client"

import { useEffect, useState } from "react";
import { useAdminContext } from "../app/providers";
import { ref, deleteObject} from "firebase/storage"
import { toast } from "react-hot-toast";
import Image from "next/image";
import {storage} from "../firebaseConfig.js"

const Fotos = () => {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {admin } = useAdminContext();

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
    <div>
      {isLoading ? (
        <div className="min-h-[300px] flex items-center justify-center text-red-500">
          <p className="text-2xl uppercase font-bold">Cargando imágenes...</p>
        </div>
      ) : (
        <>
          {!images.length ? (
            <div className="text-white h-[300px] flex items-center justify-center">
              <p className="text-2xl text-red-500">¡No hay imágenes aún!</p>
            </div>
          ) : ( 
          <div className="flex flex-col sm:flex-row sm:flex-wrap mt-3 gap-3 items-center justify-center">
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
        </>
      )}
  </div>
  )
}

export default Fotos