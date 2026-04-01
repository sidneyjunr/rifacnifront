import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const BASE_URL = import.meta.env.VITE_API_URL;

export const Admin = () => {

  const { token } = useAuth();
  
  const [compradores, setCompradores] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [mostrarCompradores, setMostrarCompradores] = useState(false);
  const [mostrarPedidos, setMostrarPedidos] = useState(false);

  useEffect(() => {
    buscaCompradores();
    buscaPedidos();
  }, []);

  const buscaCompradores = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cartelas/all?token=${token}`);
      if (!response.ok) throw new Error("Erro na requisição");
      const data = await response.json();
      setCompradores(data.cartelas);
    } catch (error) {
      console.error(error);
    }
  };

  const buscaPedidos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders?token=${token}`);
      if (!response.ok) throw new Error("Erro na requisição");
      const data = await response.json();
      setPedidos(data.pedidos);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePedido = async (id, action) => {
    try {
      const url = `${BASE_URL}/order/${action}_order/${id}?token=${token}`;
      const response = await fetch(url, { method: "POST" });

      if (!response.ok) throw new Error(`Erro ao ${action} pedido`);
      alert(`Pedido ${action === "confirm" ? "aceito" : "recusado"} com sucesso`);
      buscaPedidos();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 ">
      

      <div className="bg-white p-6 rounded shadow-md mt-6 text-center ">
        <h2 className="text-xl font-bold">O que você quer fazer?</h2>
        <div className="mt-4 flex justify-center space-x-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded" onClick={() => setMostrarPedidos(!mostrarPedidos)}>
            Pedidos
          </button>
          <button className="bg-roxo-200 text-white px-6 py-2 rounded" onClick={() => setMostrarCompradores(!mostrarCompradores)}>
            Ver Compradores
          </button>
        </div>
      </div>

      {mostrarCompradores && (
        <div className="mt-6 bg-white   rounded shadow-md max-w-full">
          <h2 className=" text-lg font-bold p-2 text-center ">Compradores</h2>
          <div className="overflow-x-auto sm:flex sm:justify-center sm:items-center p-2">
            <table className="  border-collapse border border-gray-300 text-xs ">
              <thead>
                <tr className="bg-gray-200 ">
                  <th></th>
                  <th className="border p-1">Nome</th>
                  <th className="border p-1">Número</th>
                  <th className="border p-1">Horário</th>
                  <th className="border p-1">Data da Compra</th>
                  <th className="border p-1">Telefone</th>
                </tr>
              </thead>
              <tbody>
                {compradores.map((cartela, index) => (
                  <tr key={index} className="border text-center">
                    <td className="border p-1">{index+1}</td>
                    <td className="border p-1">{cartela.owner}</td>
                    <td className="border p-1">{cartela.number}</td>
                    <td className="border p-1">{cartela.draw_hour}</td>
                    <td className="border p-1">{cartela.draw_date}</td>
                    <td className="border p-1">{cartela.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {mostrarPedidos && (
        <div className="mt-6 bg-white p-6 rounded shadow-md">
          <h2 className="text-lg font-bold">Pedidos</h2>
          {pedidos.map((pedido) => (
            <div key={pedido.order_id} className="border p-4 rounded mb-4">
              <h3 className="font-bold text-lg">Pedido #{pedido.order_id}</h3>
              <p>Data: {pedido.order_date} | {pedido.order_hour}</p>
              <p>Nome: {pedido.owner}</p>
              <p>Telefone: {pedido.phone}</p>
              <p>Quantidade de pontos: {pedido.points.length}</p>
              <p>Total: R$ {pedido.points.length * 10}</p>
              <p>Pontos: {pedido.points.join(" | ")}</p>
              <div className="mt-2 flex space-x-2">
                <button className="bg-roxo-200 text-white px-4 py-1 rounded" onClick={() => handlePedido(pedido.order_id, "confirm")}>
                  Aceitar
                </button>
                <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={() => handlePedido(pedido.order_id, "reject")}>
                  Recusar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


