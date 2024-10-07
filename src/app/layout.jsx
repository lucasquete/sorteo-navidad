import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Sorteo Navidad",
  description: "Sorteo de cesta de Navidad de los García",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="lg:w-[60%] mx-auto">
        <Toaster position="bottom-center"/>
        {children}
      </body>
    </html>
  );
}
