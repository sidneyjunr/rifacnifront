import { Link } from "react-router-dom";
import { ProgressBar } from "../../components/ProgressBar";
import Wendel from "../../assets/1.png";
import Alex from "../../assets/2.png";

export const Home = () => {
  return (
    <div className="m-4 flex flex-col gap-6 items-center lg:flex-row lg:items-center lg:justify-center lg:gap-10 lg:min-h-full">
      <div className="flex gap-4 justify-center">
        <div className="flex flex-col items-center">
          <img
            src={Wendel}
            className="w-36 sm:w-44 md:w-52 rounded-lg object-cover"
            alt="Wendel"
          />
          <span className="text-dourado-400 text-sm mt-2 font-semibold">Wendel</span>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={Alex}
            className="w-36 sm:w-44 md:w-52 rounded-lg object-cover"
            alt="Alex"
          />
          <span className="text-dourado-400 text-sm mt-2 font-semibold">Alex</span>
        </div>
      </div>

      <div className="flex flex-col gap-5 w-full max-w-md">
        <article className="rounded-lg px-4 py-3 text-sm text-white outline outline-1 outline-white text-center text-balance">
          <p>
            <strong>Ajude o Wendel e o Alex a representar o Ceará! 🏀</strong>
          </p>
          <p className="mt-2">
            Eles vão jogar a{" "}
            <strong>Copa Nordeste Interclubes (CNI)</strong> de basquete em{" "}
            <strong>Natal</strong> e precisam da sua ajuda para bancar a viagem.
          </p>
          <p className="mt-2">
            São <strong>300 pontos</strong> a <strong>R$10,00</strong> cada.
            O ganhador leva <strong>R$500,00</strong>!
          </p>
        </article>

        <ProgressBar />

        <Link
          to="/comprar"
          className="mx-auto px-10 py-3 bg-roxo-200/60 text-white font-bold rounded-lg hover:bg-roxo-200 transition-colors"
        >
          Comprar Ponto
        </Link>
      </div>
    </div>
  );
};
