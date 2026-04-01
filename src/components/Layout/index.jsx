// import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import BackgroundImage from "../../assets/background1.png";

export const Layout = () => {
  const location = useLocation();
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight); // Estado para a altura da janela

  const updateViewportHeight = () => {
    setViewportHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateViewportHeight);
    return () => {
      window.removeEventListener("resize", updateViewportHeight);
    };
  }, []);

  return (
    <div className="flex flex-col">
      {" "}
      <header className="bg-black h-[80px] border-b-roxo-200 border-b-2 flex items-center  ">
        <nav className=" flex justify-between items-center mx-4 w-full sm:mx-8 md:mx-14 ">
          <Link to={"/"} className="text-dourado-500 font-bold text-lg sm:text-2xl tracking-wide">
            Rifa CNI
          </Link>
          <ul className="flex items-center gap-4 text-sm sm:text-lg sm:gap-8 md:gap-12">
            <li className="hover:underline underline-offset-8 text-center text-dourado-500 ">
              <Link to={"/comprar"}>Comprar Ponto</Link>
            </li>
            {location.pathname === "/comprar" && (
              <li className="hover:underline underline-offset-8 text-center text-dourado-500 ">
                <Link to={"/consultar"}>Consultar Ponto</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main
        className="bg-cover bg-center bg-black overflow-auto"
        style={{
          height: `calc(${viewportHeight}px - 80px - 64px)`,
          backgroundImage: `url(${BackgroundImage})`,
        }}
      >
        <Outlet />
      </main>
      <footer className="bg-black w-full text-center flex items-center justify-center text-sm  text-dourado-500 h-16 py-4 border-t-2 border-t-roxo-200 sm:text-base">
        <p>© 2025 Rifa CNI - Copa Nordeste Interclubes</p>
      </footer>
    </div>
  );
};


