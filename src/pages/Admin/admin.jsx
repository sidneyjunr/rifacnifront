import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const BASE_URL = import.meta.env.VITE_API_URL;

export const Admin = () => {
  const { token, userLogout } = useAuth();

  const [compradores, setCompradores] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [mostrarCompradores, setMostrarCompradores] = useState(false);
  const [mostrarPedidos, setMostrarPedidos] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    Promise.all([buscaCompradores(), buscaPedidos()]).finally(() => setLoading(false));
  }, []);

  const buscaCompradores = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cartelas/all?token=${token}`);
      if (!response.ok) throw new Error("Erro na requisição");
      const data = await response.json();
      setCompradores(data.cartelas);
    } catch {
      setCompradores([]);
    }
  };

  const buscaPedidos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders?token=${token}`);
      if (!response.ok) throw new Error("Erro na requisição");
      const data = await response.json();
      setPedidos(data.pedidos);
    } catch {
      setPedidos([]);
    }
  };

  const handlePedido = async (id, action) => {
    try {
      const url = `${BASE_URL}/order/${action}_order/${id}?token=${token}`;
      const response = await fetch(url, { method: "POST" });
      if (!response.ok) throw new Error(`Erro ao ${action} pedido`);
      const data = await response.json();
      if (data.detail) {
        setFeedback({ type: "error", msg: data.detail });
      } else {
        setFeedback({ type: "success", msg: `Pedido ${action === "confirm" ? "aceito" : "recusado"} com sucesso!` });
      }
      buscaPedidos();
    } catch (error) {
      setFeedback({ type: "error", msg: error.message });
    } finally {
      setTimeout(() => setFeedback(null), 6000);
    }
  };

  return (
    <div className="min-h-screen bg-roxo-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Painel Admin</h1>
        <button
          onClick={userLogout}
          className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded hover:bg-red-700 transition-colors"
        >
          Sair
        </button>
      </div>

      {feedback && (
        <div className={`mb-4 p-3 rounded text-center font-semibold text-white ${feedback.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {feedback.msg}
        </div>
      )}

      <div className="bg-roxo-600 p-6 rounded-lg shadow-md text-center border border-roxo-300/30">
        <h2 className="text-xl font-bold text-white">O que você quer fazer?</h2>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            className="bg-roxo-200 text-white px-6 py-2 rounded font-bold hover:bg-rosa-dark transition-colors"
            onClick={() => setMostrarPedidos(!mostrarPedidos)}
          >
            Pedidos
          </button>
          <button
            className="bg-roxo-200 text-white px-6 py-2 rounded font-bold hover:bg-rosa-dark transition-colors"
            onClick={() => setMostrarCompradores(!mostrarCompradores)}
          >
            Ver Compradores
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center mt-8">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-roxo-200 rounded-full animate-spin"></div>
        </div>
      )}

      {mostrarCompradores && (
        <div className="mt-6 bg-roxo-600 rounded-lg shadow-md max-w-full border border-roxo-300/30">
          <h2 className="text-lg font-bold p-4 text-center text-white">Compradores</h2>
          {compradores.length === 0 ? (
            <p className="text-center text-gray-300 pb-4">Nenhum comprador encontrado.</p>
          ) : (
            <div className="overflow-x-auto sm:flex sm:justify-center sm:items-center p-2">
              <table className="border-collapse border border-roxo-300/30 text-xs text-white">
                <thead>
                  <tr className="bg-roxo-500">
                    <th className="border border-roxo-300/30 p-2">#</th>
                    <th className="border border-roxo-300/30 p-2">Nome</th>
                    <th className="border border-roxo-300/30 p-2">Número</th>
                    <th className="border border-roxo-300/30 p-2">Horário</th>
                    <th className="border border-roxo-300/30 p-2">Data da Compra</th>
                    <th className="border border-roxo-300/30 p-2">Telefone</th>
                  </tr>
                </thead>
                <tbody>
                  {compradores.map((cartela, index) => (
                    <tr key={index} className="border border-roxo-300/30 text-center hover:bg-roxo-500/50">
                      <td className="border border-roxo-300/30 p-1">{index + 1}</td>
                      <td className="border border-roxo-300/30 p-1">{cartela.owner}</td>
                      <td className="border border-roxo-300/30 p-1">{cartela.number}</td>
                      <td className="border border-roxo-300/30 p-1">{cartela.draw_hour}</td>
                      <td className="border border-roxo-300/30 p-1">{cartela.draw_date}</td>
                      <td className="border border-roxo-300/30 p-1">{cartela.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {mostrarPedidos && (
        <div className="mt-6 bg-roxo-600 p-6 rounded-lg shadow-md border border-roxo-300/30">
          <h2 className="text-lg font-bold text-white mb-4">Pedidos</h2>
          {pedidos.length === 0 ? (
            <p className="text-center text-gray-300">Nenhum pedido pendente.</p>
          ) : (
            pedidos.map((pedido) => (
              <div key={pedido.order_id} className="border border-roxo-300/30 p-4 rounded-lg mb-4 bg-roxo-500/50 text-white">
                <h3 className="font-bold text-lg text-dourado-400">Pedido #{pedido.order_id}</h3>
                <p>Data: {pedido.order_date} | {pedido.order_hour}</p>
                <p>Nome: {pedido.owner}</p>
                <p>Telefone: {pedido.phone}</p>
                <p>Quantidade de pontos: {pedido.points.length}</p>
                <p>Total: R$ {pedido.points.length * 10}</p>
                <p>Pontos: {pedido.points.join(" | ")}</p>
                <div className="mt-3 flex space-x-2">
                  <button
                    className="bg-roxo-200 text-white px-4 py-1 rounded font-bold hover:bg-rosa-dark transition-colors"
                    onClick={() => handlePedido(pedido.order_id, "confirm")}
                  >
                    Aceitar
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded font-bold hover:bg-red-700 transition-colors"
                    onClick={() => handlePedido(pedido.order_id, "reject")}
                  >
                    Recusar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
