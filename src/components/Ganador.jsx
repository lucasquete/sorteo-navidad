import Image from "next/image";
import React from "react";

const Ganador = ({ganador}) => {
  return (
    <div className="relative">
      <Image
        src={"/celebracion.jpg"}
        alt="foto de celebración con globos"
        width={400}
        height={300}
        className="object-cover w-full h-full"
      />
      <div className="absolute left-[50%] top-[50%] font-bold flex flex-col gap-5 translate-y-[-50%] translate-x-[-50%]">
        <span className="text-xl sm:text-4xl text-red-600">
          Número Premiado: <span className="text-white">{ganador[0]?.numero}</span>
        </span>
        <span className=" text-xl sm:text-4xl text-red-600">
          Ganador: <span className="text-white uppercase">{ganador[0]?.nombre}</span>
        </span>
      </div>
    </div>
  );
};

export default Ganador;
