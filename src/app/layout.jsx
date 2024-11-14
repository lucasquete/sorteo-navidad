import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import AdminProvider from "./providers"

export const metadata = {
  title: "Sorteo Navidad",
  description: "Sorteo de cesta de Navidad de los García",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="lg:w-[80%] mx-auto">
        <AdminProvider>
          <Toaster position="bottom-center"/>
          <Navbar/>
          {children}
          <Footer/>
        </AdminProvider>
      </body>
    </html>
  );
}
