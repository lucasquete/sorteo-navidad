"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig.js";
import { toast } from "react-hot-toast";
import { useAdminContext } from "../providers/index.jsx";

const EditarPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [titulo, setTitulo] = useState("");
  const [pass, setPass] = useState("");

  const {admin, setAdmin} = useAdminContext()

  const inputRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    imageChange(e);
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUploading = async () => {
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await fetch("/api/imagenes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: titulo,
          nombre: file.name,
          url: url,
        }),
      });

      toast.success("Foto subida correctamente", {
        duration: 4000,
      });
      setSelectedImage("");
      setTitulo("");
      inputRef.current.value = "";
    } catch (error) {
      toast.error("No se ha podido subir el archivo", {
        duration: 4000,
      });
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const handleClick = (e) => {
    if (pass === process.env.ADMIN_NEXT) {
      setAdmin(pass)
      localStorage.setItem("admin", pass);
      setPass("")
    } else {
      toast.error("contraseña incorrecta", {
        duration: 4000,
      });
    }
  };

  if (!admin) {
    return (
      <main className="flex items-center justify-center h-[100vh] mx-3 text-black">
        <div className="flex flex-col gap-5 items-center justify-center shadow-sm bg-white p-3 sm:p-5 rounded-md">
          <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
          <div className="flex gap-3 items-center justify-center flex-wrap">
            <input
              type="text"
              placeholder="Contraseña"
              className="p-2 rounded-xl ring-2"
              onChange={(e) => setPass(e.target.value)}
            />
            <button
              className="bg-green-500 rounded-xl p-2 hover:bg-green-600"
              onClick={handleClick}
            >
              Enviar
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center flex-col justify-center min-h-[100vh] mx-3 gap-5">
      <h3 className="text-2xl font-bold text-purple-600">Subir Imagen</h3>
      <label htmlFor="file">
        <Image
          alt="imagen subir archivo"
          src={"/img.png"}
          width={60}
          height={60}
          className="object-cover cursor-pointer"
        />
      </label>
      <input
        type="file"
        onChange={handleFileChange}
        id="file"
        className="hidden"
      />
      {selectedImage && (
        <div className="relative flex">
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt=""
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
       )}
      <input
        type="text"
        placeholder="Titulo"
        className="p-2 rounded-lg text-black outline-none"
        onChange={(e) => setTitulo(e.target.value)}
        ref={inputRef}
      />
      <button
        onClick={handleUploading}
        disabled={uploading}
        className="bg-red-500 p-3 rounded-md"
      >
        {uploading ? "cargando.." : "Enviar"}
      </button>
    </main>
  );
};

export default EditarPage;
