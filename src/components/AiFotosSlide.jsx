import Image from "next/image";
import "./aiFotos.css"

const AiFotosSlide = () => {

  const aiFotos = [
    {
      id: "1",
      src: "/1.jpg",
      alt: "Yanira flotando en el aire, con alas de Ada, en bosque de noche, con la luna de fondo."
    },
    {
      id: "2",
      src: "/2.jpg",
      alt: "Irene de perfil, mirando a la cámara, en un bosque y pintando un cuadro."
    },
    {
      id: "7",
      src: "/7.png",
      alt: "Lucas en una habitación tocando una batería."
    },
    {
      id: "3",
      src: "/3.png",
      alt: "Eli con vestido rojo en el pasillo de un avión."
    },
    {
      id: "6",
      src: "/6.png",
      alt: "Javi, sentado en una silla con pelo largo y unos cuernos de demonio y tatuajes en pecho, en escena con fuego…"
    },
    {
      id: "4",
      src: "/4.png",
      alt: "Calleja, sentado en una taberna con birra en mano y con falda y chaleco de santa."
    },
  ]

  return (
    <div>
      <div className="main">
        {aiFotos.map((foto) => (
          <li key={foto.id} className="slide">
            <Image
              src={foto.src}
              alt={foto.alt}
              width={400}
              height={400}
              className="image"
              priority
            />
          </li>
        ))}
      </div>
    </div>
  )
}

export default AiFotosSlide