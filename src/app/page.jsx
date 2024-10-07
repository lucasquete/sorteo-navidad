"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import FirstSkeleton from "../components/FirstSkeleton"
import SecondSkeleton from "../components/SecondSkeleton"

export default function Home() {
  const [numbers, setNumbers] = useState([]);
  const [nombres, setNombres] = useState([]);
  const [selectNumber, setSelectNumber] = useState("");
  const [nombre, setNombre] = useState("");
  const [selected, setSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/numbers")
      .then((res) => res.json())
      .then((data) => {
        setNumbers(data.filter(d => !d?.nombre));
        setNombres(data.filter(d => d?.nombre));
        setIsLoading(false)
      });
  }, []);

  const handleSubmit = async () => {
    if (!selected || nombre === "") {
      toast.error("Debes selecionar y escribir el nombre", {
        duration: 4000,
      });
    } else {
      const res = numbers.filter((n) => n.numero === selectNumber);
      const response = await fetch("/api/numbers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: res[0].id,
          numero: "4",
          nombre: nombre,
          selecionado: true,
        }),
      });

      const json = await response.json();

      if (json) {
        fetch("/api/numbers")
          .then((res) => res.json())
          .then((data) => {
            setNumbers(data.filter(d => !d?.nombre));
            setNombres(data.filter(d => d?.nombre));
          });
        setNombre("");
        setSelectNumber("");
        setSelected(false)
        toast.success("Numero selecionado correctamente", {
          duration: 4000,
        });
      }
    }
  };

  return (
    <main className="p-3 sm:p-7 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-fuchsia-500 to-indigo-600 bg-clip-text text-transparent">
        Sorteo Cesta de Navidad Los García
      </h1>
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col gap-5 items-center justify-center shadow-sm bg-[#3b3b3b] p-3 sm:p-5 rounded-md">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Lista de Números
          </h2>
          <p className="font-semibold text-gray-300">
            Para participar en el sorteo de la cesta de Navidad de Los García, en primer lugar
            , selecciona la casilla del número que quieres elegir. A continuación, escribe tu nombre.
            Finalmente, una vez completada tu elección, presiona el botón &quot;Enviar&quot;.

            Solo es posible seleccionar un número, si quieres comprar más números deberás llevar a cabo
            el mismo processo de nuevo.

            El precio de cada número es de 2 euros. El importe deberás abonárselo a la Eli a través de bizum.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 items-center justify-center">
            {isLoading ? (
              <FirstSkeleton/>
            ) : (
              <>
                {numbers.length ? (
                  <>
                    {numbers
                      .map((n) => (
                        <div
                          key={n?.id}
                          className="flex gap-3 items-center justify-center bg-[#202020] shadow-sm p-3 rounded-2xl"
                        >
                          <input
                            type="checkbox"
                            onClick={() => {
                              if(nombre && !selected) setNombre("");
                              setSelectNumber(n?.numero);
                              setSelected(!selected);
                            }}
                            disabled={selectNumber !== n?.numero && selected}
                            className="size-5"
                            title={`selecionar numero ${n?.numero}`}
                          />
                          <span>{n?.numero}</span>
                          <input
                            type="text"
                            placeholder="Escribe tu nombre"
                            className="py-1 px-2 outline-none text-black rounded-2xl sm:w-[150px]"
                            onChange={(e) => setNombre(e.target.value)}
                            disabled={selectNumber !== n?.numero && selected}
                            title="nombre"
                          />
                        </div>
                      ))}
                  </>
                ) : (
                  <div className="flex flex-col gap-8 min-h-[200px] items-center justify-center text-white">
                    <h3 className="font-bold text-2xl text-red-400">No hay números para seleccionar!</h3>
                    <span>Todos los numeros ya selccionados los encontraras en la siguiente lista</span>
                  </div>
                )}
              </>
            )}
          </div>
          {numbers.length ? (
            <button
              className="p-3 bg-green-600 rounded-2xl"
              onClick={handleSubmit}
            >
              Enviar
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-5 items-center justify-center shadow-sm bg-[#473844] p-3 sm:p-5 rounded-md">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Lista de los Numeros Seleccionados
          </h2>
          <p className="font-semibold text-gray-300">
            Aquí puedes ver la lista de los números que ya están seleccionados, con su correspondiente
            nombre/propietario. El plzo límite para poder adquirir números es el 21 de Diciembre de 2024.
            Pasada esta fecha ya no podrás seleccionar ningún número. Para cualquier consulta sobre el sorteo,
            ponerse en contacto con Eli o Sandra. ¡Estaremos ecantadas de atenderos!
            PS: Donde pone el nombre de Eli, también os podéis dirigir con el nombre de pamplinas 😂😂
          </p>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            {isLoading ? (
              <SecondSkeleton/>
            ) : (
              <>
                {nombres.length ? (
                  <>
                    {nombres
                      .map((n) => (
                        <div
                          key={n?.id}
                          className="flex gap-2 items-center justify-center bg-[#202020] shadow-sm p-3 rounded-2xl min-w-[8rem]"
                        >
                          <span className="text-black bg-[#fff] px-3 py-1 rounded-full font-bold">
                            {n?.numero}
                          </span>
                          <span>{n?.nombre}</span>
                        </div>
                      ))}
                  </>
                ) : (
                  <div className="flex flex-col gap-8 min-h-[200px] items-center justify-center text-white">
                    <h3 className="font-bold text-2xl text-red-400">No hay numeros selecionados aun!</h3>
                    <span>Selecciona tu número en la lista de los números para seleccionar</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
