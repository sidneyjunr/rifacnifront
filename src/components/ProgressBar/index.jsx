import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;
const TOTAL = 300;

export const ProgressBar = ({ vendidos: vendidosProp }) => {
  const [vendidos, setVendidos] = useState(null);

  useEffect(() => {
    if (vendidosProp !== undefined) {
      setVendidos(vendidosProp);
      return;
    }
    fetch(`${BASE_URL}/cartelas/`)
      .then((r) => r.json())
      .then((data) => setVendidos(data.cartelas.length))
      .catch(() => setVendidos(0));
  }, [vendidosProp]);

  if (vendidos === null) return null;

  const pct = Math.min(Math.round((vendidos / TOTAL) * 100), 100);

  return (
    <div className="w-full">
      <div className="flex justify-between text-white text-xs sm:text-sm mb-1">
        <span>
          <strong className="text-dourado-400">{vendidos}</strong>/{TOTAL} pontos vendidos
        </span>
        <span>
          R$<strong className="text-dourado-400">{vendidos * 10}</strong> / R$3.000
        </span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
        <div
          className="bg-dourado-600 h-4 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-center text-dourado-400 text-xs sm:text-sm mt-1 font-semibold">
        {pct}% arrecadado
      </p>
    </div>
  );
};
