"use client";

import { useEffect, useState } from "react";
import SecondSkeleton from "../../components/SecondSkeleton";
import { toast } from "react-hot-toast";
import { useAdminContext } from "../providers";

const GanadorPage = () => {
  const [nombres, setNombres] = useState([]);
  const [selectNumber, setSelectNumber] = useState("");
  const [selected, setSelected] = useState(false);
  const [nombre, setNombre] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pass, setPass] = useState("");

  const {admin, setAdmin} = useAdminContext()
  
  useEffect(() => {
    fetch("/api/numbers")
      .then((res) => res.json())
      .then((data) => {
        setNombres(data.filter((d) => d?.nombre));
        setNombre(data.filter((d) => d?.ganador));
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = async () => {
    if (!selected) {
      toast.error("Debes seleccionar una casilla", {
        duration: 4000,
      });
    } else {
      const response = await fetch("/api/ganador", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: nombre?.id,
          ganador: true,
        }),
      });

      const json = await response.json();

      if (json) {
        fetch("/api/numbers")
          .then((res) => res.json())
          .then((data) => {
            setNombre(data.filter((d) => d?.ganador));
          });
        setSelectNumber("");
        setSelected(false);
        toast.success("Número seleccionado correctamente", {
          duration: 4000,
        });
      }
    }
  };

  const handleClick = (e) => {
    if (pass === process.env.ADMIN_NEXT) {
      setAdmin(pass)
      localStorage.setItem("admin", pass);
      setPass("")
    } else {
      toast.error("Contraseña incorrecta", {
        duration: 4000,
      });
    }
  };

  if(isLoading) {
    return (
      <main className="flex items-center justify-center h-[100vh] mx-3">
        <div className="flex items-center justify-center text-3xl font-bold uppercase">
          cargando...
        </div>
      </main>
    )
  }

  if (!admin) {
    return (
      <main className="flex items-center justify-center h-[100vh] mx-3 text-black">
        <div className="flex flex-col gap-5 items-center justify-center shadow-sm bg-white p-3 sm:p-5 rounded-md">
          <h1 className="text-3xl font-bold">Iniciar Session</h1>
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
    <main className="flex items-center justify-center h-[100vh] mx-3">
      {nombre.length ? (
        <div className="flex flex-col gap-5 items-center justify-center shadow-sm bg-[#473844] p-3 sm:p-5 rounded-md">
          <span className="sm:text-4xl text-red-600">
            Número Premiado:{" "}
            <span className="text-white">{nombre[0]?.numero}</span>
          </span>
          <span className="sm:text-4xl text-red-600">
            Ganador:{" "}
            <span className="text-white uppercase">{nombre[0]?.nombre}</span>
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-5 items-center justify-center shadow-sm bg-[#473844] p-3 sm:p-5 rounded-md">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Seleccionar Ganador
          </h2>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            {isLoading ? (
              <SecondSkeleton />
            ) : (
              <>
                {nombres.length ? (
                  <>
                    {nombres.map((n) => (
                      <div
                        key={n?.id}
                        className="flex gap-2 items-center justify-center bg-[#202020] shadow-sm p-3 rounded-2xl min-w-[8rem]"
                      >
                        <input
                          type="checkbox"
                          onClick={() => {
                            if (nombre && !selected) {
                              setNombre(n);
                            } else {
                              setNombre([]);
                            }
                            setSelectNumber(n?.numero);
                            setSelected(!selected);
                          }}
                          disabled={selectNumber !== n?.numero && selected}
                          className="size-5"
                          title={`selecionar numero ${n?.numero}`}
                        />
                        <span className="text-black bg-[#fff] px-3 py-1 rounded-full font-bold">
                          {n?.numero}
                        </span>
                        <span>{n?.nombre}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex flex-col gap-8 min-h-[200px] items-center justify-center text-white">
                    <h3 className="font-bold text-2xl text-red-400">
                    ¡No hay números seleccionados aún!
                    </h3>
                    <span>
                      Selecciona tu número en la lista de los números para
                      seleccionar
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
          <button
            className="p-3 bg-green-600 rounded-2xl"
            onClick={handleSubmit}
          >
            Enviar
          </button>
        </div>
      )}
    </main>
  );
};

export default GanadorPage;
