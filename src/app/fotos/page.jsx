import Fotos from "../../components/Fotos"

const FotosPage = () => {

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
      <Fotos/>
    </main>
  );
};

export default FotosPage;
