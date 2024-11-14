import Image from "next/image";

const AiFotos = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 items-center justify-center">
        <Image
          src={"/1.jpg"}
          alt="Yanira flotando en el aire con alas de Ada, en bosque de noche, con la luna de fondo."
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg object-cover sm:w-[49%] w-[100%] h-auto"
          priority
        />
        <Image
          src={"/2.jpg"}
          alt="Irene de perfil, mirando a la cámara, en un bosque y pintando un cuadro."
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg object-cover sm:w-[49%] w-[100%] h-auto"
          priority
        />
      </div>
    </div>
  );
};

export default AiFotos;
