"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import FirstSkeleton from "../components/FirstSkeleton";
import SecondSkeleton from "../components/SecondSkeleton";
import AiFotos from "../components/AiFotos";
import Ganador from "../components/Ganador";
import Navidad from "../components/Navidad";
import Link from "next/link";

export default function Home() {
  const [numbers, setNumbers] = useState([]);
  const [nombres, setNombres] = useState([]);
  const [ganador, setGanador] = useState([]);
  const [selectNumber, setSelectNumber] = useState("");
  const [nombre, setNombre] = useState("");
  const [selected, setSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/numbers")
      .then((res) => res.json())
      .then((data) => {
        setNumbers(data.filter((d) => !d?.nombre));
        setNombres(data.filter((d) => d?.nombre));
        setGanador(data.filter((d) => d?.ganador));
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = async () => {
    if (!selected || nombre === "") {
      toast.error("Debes seleccionar y escribir el nombre", {
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
            setNumbers(data.filter((d) => !d?.nombre));
            setNombres(data.filter((d) => d?.nombre));
          });
        setNombre("");
        setSelectNumber("");
        setSelected(false);
        toast.success("Número seleccionado correctamente", {
          duration: 4000,
        });
      }
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

  return (
    <main className="p-3 sm:p-6 text-center">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-fuchsia-500 to-indigo-600 bg-clip-text text-transparent">
          Sorteo Cesta de Navidad Los García
        </h1>
        <div className="flex mt-4 items-center justify-center text-3xl md:text-5xl">
          🎄 ⛄ 🎅
        </div>
      </div>
      <div className="flex flex-col w-full gap-6">
        {ganador.length ? <Ganador ganador={ganador} /> : null}
        {ganador.length ? null : <AiFotos />}
        {ganador.length ? null : <div className="flex gap-2 flex-col bg-red-600 font-semibold text-gray-300 rounded-md p-3">
          <p>
            <b className="text-black">¡Importante!</b> ⚠️
          </p>
          <p>
            📍 Del{" "}
            <b className="text-black">18 de noviembre al 8 de diciembre🗓</b>,
            solo se podrá comprar 1 número por persona.
          </p>
          <p>
            📍{" "}
            <b className="text-black">Del 9 de diciembre al 21 de diciembre🗓</b>
            , todos aquellos que lo deseen podrán repetir y adquirir más
            números.
          </p>
        </div>}
        {ganador.length ? null : <div className="flex flex-col gap-5 items-center justify-center shadow-sm bg-[#3b3b3b] p-3 sm:p-5 rounded-md">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Lista de Números
          </h2>
          <p className="font-semibold text-gray-300">
            Para participar en el sorteo de la cesta de Navidad de Los García,
            en primer lugar, selecciona la casilla del número que quieres
            elegir. A continuación, escribe tu nombre. Finalmente, una vez
            completada tu elección, presiona el botón &quot;Enviar&quot;. Solo es posible
            seleccionar un número, si quieres comprar más números deberás llevar
            a cabo el mismo proceso de nuevo. El precio de cada número es de 2 €
            💶. El importe deberás abonárselo a Eli a través de bizum, indicando
            tu nombre + la cantidad de números comprados.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 items-center justify-center">
            {isLoading ? (
              <FirstSkeleton />
            ) : (
              <>
                {numbers.length ? (
                  <>
                    {numbers.map((n) => (
                      <div
                        key={n?.id}
                        className="flex gap-3 items-center justify-center bg-[#202020] shadow-sm p-3 rounded-2xl"
                      >
                        <input
                          type="checkbox"
                          onClick={() => {
                            if (nombre && !selected) setNombre("");
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
                          disabled={selectNumber !== n?.numero}
                          title="nombre"
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex flex-col gap-8 min-h-[200px] items-center justify-center text-white">
                    <h3 className="font-bold text-2xl text-red-400">
                      No hay números para seleccionar!
                    </h3>
                    <span>
                      Todos los números ya seleccionados los encontrarás en la
                      siguiente lista
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
          {numbers.length ? (
            <button
              className="p-3 bg-green-600 rounded-2xl hover:bg-green-700"
              onClick={handleSubmit}
            >
              Enviar
            </button>
          ) : (
            ""
          )}
        </div>}
        <div className="flex flex-col gap-5 items-center justify-center shadow-sm bg-[#473844] p-3 sm:p-5 rounded-md">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Lista de los números comprados
          </h2>
          <p className="font-semibold text-gray-300">
            En este apartado podrás ver la lista de los números que ya han sido
            comprados, con su correspondiente nombre/propietario. El plazo
            límite para adquirir números termina el 21 de diciembre de 2024.⏳
            Para cualquier duda o consulta escríbenos al grupo de Wasap creado
            para este fin. ¡Estaremos encantad@s de atenderte!❤
          </p>
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
        </div>
        <Link href={"/fotos"} className="mt-4">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-fuchsia-500 to-indigo-600 bg-clip-text text-transparent">
            La Cesta de Los García en imágenes
          </h2>
          <button className="mt-5 p-3 bg-green-600 rounded-2xl hover:bg-green-700">
            Ver Imágenes
          </button>
        </Link>
        {ganador.length ? <Navidad /> : null}
      </div>
    </main>
  );
}
