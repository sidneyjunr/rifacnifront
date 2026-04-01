import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "../../components/ProgressBar";

const BASE_URL = import.meta.env.VITE_API_URL;

export const Comprar = () => {
  const [cartelasVendidas, setCartelasVendidas] = useState([]);
  const [pontosEscolhidos, setPontosEscolhidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight); // Estado para a altura da janela
  const navigate = useNavigate();

  useEffect(() => {
    const buscaDados = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cartelas/`);
        if (!response.ok) throw new Error("Erro na requisição");

        const data = await response.json();
        const vendidos = data["cartelas"].map(cartela => cartela["number"]);
        setCartelasVendidas(vendidos);
      } catch {
        // erro silencioso
      } finally {
        setLoading(false);
      }
    };

    buscaDados();

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleNumberSelection = (number) => {
    setPontosEscolhidos((prev) => {
      if (prev.includes(number)) {
        return prev.filter(n => n !== number)
      } else {
        return [...prev, number]; 
      }
    });
  };

  const handleBuy = () => {
    if (pontosEscolhidos.length === 0) {
      alert("Escolha pelo menos um ponto");
      return;
    }
    navigate(`/transaction_pix?pontos=${pontosEscolhidos.join(",")}&valor=${pontosEscolhidos.length * 10}`);
  };

  return (
    <div
      style={{ height: `calc(${viewportHeight}px - 80px - 64px)` }} 
      className="mx-auto flex flex-col items-center w-full p-4"
    >
      <div className="w-full text-xs px-4 mb-4">
        <ul className="text-white flex-wrap flex gap-x-8 justify-center">
          <li className="flex items-center relative sm:text-lg">
            <span className="before:content-[''] before:block before:w-4 before:h-4 before:rounded-full before:absolute before:-left-3 before:top-[2px] before:bg-red-600 mr-2 sm:before:top-[7px]"></span>
            Vendidos
          </li>
          <li className="flex items-center relative sm:text-lg">
            <span className="before:content-[''] before:block before:w-4 before:h-4 before:rounded-full before:absolute before:-left-3 before:top-[2px] before:bg-rosa/75 mr-2 sm:before:top-[7px] "></span>
            Disponiveis
          </li>
          <li className="flex items-center relative sm:text-lg">
            <span className="before:content-[''] before:block before:w-4 before:h-4 before:rounded-full before:absolute before:-left-3 before:top-[2px] before:bg-rosa-dark mr-2 sm:before:top-[7px]"></span>
            Selecionados
          </li>
        </ul>
      </div>

      <div className="w-full max-w-2xl px-2 mb-3">
        <ProgressBar vendidos={cartelasVendidas.length} />
      </div>

      {loading ? (
        <div className="w-8 h-8 border-4 border-gray-300 border-t-roxo-200 rounded-full animate-spin"></div>
      ) : (
        <div className="grid grid-cols-10 max-sm:grid-cols-5 max-sm:p-2 p-4 overflow-auto gap-2 w-full">
          {Array.from({ length: 300 }, (_, i) => (
            <RaffleNumber
              key={i + 1}
              number={i + 1}
              isSold={cartelasVendidas.includes(i + 1)}
              isSelected={pontosEscolhidos.includes(i + 1)}
              toggleSelection={toggleNumberSelection}
            />
          ))}
        </div>
      )}

      <button
        onClick={handleBuy}
        className="mt-4 px-6 py-2 max-sm:px-8 max-sm:py-4 bg-roxo-200/60 text-white font-bold rounded-lg hover:bg-roxo-200"
      >
        Comprar
      </button>
    </div>
  );
};

const RaffleNumber = ({ number, isSold, isSelected, toggleSelection }) => {
  return (
    <div
      className={`px-6 py-2 flex items-center justify-center rounded-md text-white font-bold cursor-pointer 
      ${isSold ? "bg-red-600 cursor-default " : isSelected ? "bg-rosa-dark ring-2 ring-white/60" : "bg-rosa/75  "}`}
      onClick={() => !isSold && toggleSelection(number)}
    >
      {number}
    </div>
  );
};
