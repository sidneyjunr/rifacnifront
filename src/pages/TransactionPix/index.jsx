import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentImg from "../../assets/qrcode-pix.png";
import CellphoneIcon from "../../assets/cellphone-icon.svg";
import WhatsAppIcon from "../../assets/whatsapp-icon.svg";
import CopyIcon from "../../assets/copy-icon.svg";

const BASE_URL = import.meta.env.VITE_API_URL;
const PIX_COPIA_COLA = "00020126360014BR.GOV.BCB.PIX0114+55859961095895204000053039865802BR5901N6001C62070503***630478D9";
const WHATSAPP_NUMBER = "5585996109589";

export const TransactionPix = () => {
  const [pontos, setPontos] = useState("");
  const [valor, setValor] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nomeErro, setNomeErro] = useState("");
  const [telefoneErro, setTelefoneErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("pontos") && params.has("valor")) {
      setPontos(params.get("pontos"));
      setValor(params.get("valor"));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_COPIA_COLA).then(() => {
      alert("Código copiado com sucesso!");
    });
  };

  const handleConfirmarPagamento = async (e) => {
    e.preventDefault();

    let hasError = false;
    if (!nome) {
      setNomeErro("Preencha o nome");
      hasError = true;
    } else {
      setNomeErro("");
    }

    if (!telefone || telefone.length < 16) {
      setTelefoneErro("Preencha o telefone corretamente");
      hasError = true;
    } else {
      setTelefoneErro("");
    }

    if (hasError) return;

    setIsLoading(true);

    const formatDate = (date) => {
      let day = date.getDate().toString().padStart(2, "0");
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const formatTime = (date) => {
      let hours = date.getHours().toString().padStart(2, "0");
      let minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    let currentDate = new Date();

    try {
      const response = await fetch(`${BASE_URL}/order/new_order/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: 1,
          points: pontos.split(",").map(Number),
          order_date: formatDate(currentDate),
          order_hour: formatTime(currentDate),
          status: "pendente",
          phone: telefone.replace(/\D/g, ""),
          owner: nome,
        }),
      });
      setIsLoading(false);
      if (response.ok) {
        alert("Pedido realizado com sucesso!");
        window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá%2C%20gostaria%20de%20confirmar%20o%20recebimento%20do%20pix%20para%20os%20números%20de%20rifa%3A%20${pontos.replace(
          ",",
          "%2C%20"
        )}%20com%20o%20nome%20do%20comprador%3A%20${nome}`;
      } else {
        const data = await response.json().catch(() => null);
        setErro(data?.detail || "Erro ao criar pedido. Atualize a página e tente novamente.");
      }
    } catch {
      setIsLoading(false);
      setErro("Erro de conexão. Verifique sua internet e tente novamente.");
    }
  };

  function formatarTelefone(value) {
    const apenasNumeros = value.replace(/\D/g, "");

    if (apenasNumeros.length === 0) {
      return "";
    }

    if (apenasNumeros.length <= 2) {
      return `(${apenasNumeros}`;
    } else if (apenasNumeros.length <= 3) {
      return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`;
    } else if (apenasNumeros.length <= 7) {
      return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(
        2,
        3
      )} ${apenasNumeros.slice(3)}`;
    } else {
      return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(
        2,
        3
      )} ${apenasNumeros.slice(3, 7)}-${apenasNumeros.slice(7, 11)}`;
    }
  }

  function handleChange(event) {
    const { value } = event.target;
    setTelefone(formatarTelefone(value));
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 my-4 ">
      <div className="outline outline-4 outline-roxo-200  max-w-md flex flex-col justify-items-center items-center w-full bg-white py-4 rounded-lg">
        <div className="flex items-center justify-center ">
          <img
            src={CellphoneIcon}
            alt="Cellphone Icon"
            className="w-6 h-6 mr-2"
            draggable="false"
          />
          <span className="text-center max-sm:text-sm">
            Aponte a câmera do celular
          </span>
        </div>

        <div className="flex justify-center items-center ">
          <img src={PaymentImg} alt="QR CODE" className=" w-52 rounded" />
        </div>
        <p className="text-center mx-4 max-sm:text-sm">
          Abra seu aplicativo de pagamento que utiliza Pix e selecione a opção{" "}
          <b>"Ler QR Code"</b>
        </p>

        <div className=" max-w-full bg-roxo-200/50 p-4  rounded-lg text-black mx-4 shadow-md mt-2   text-center">
          <div className="text-wrap">
            <span className="max-sm:text-sm">Pontos escolhidos: </span>
            <strong>{pontos}</strong>
          </div>
          <div className="mt-2 text-xl  max-sm:text-lg ">
            <span>Valor do Pix: </span>
            <strong className="text-nowrap">R${valor},00</strong>
          </div>
        </div>
        <div className=" p-4 text-center">
          <span className="max-sm:text-sm">
            Você também pode realizar o pagamento selecionando a opção{" "}
            <b>"Pix Copia e Cola"</b> e inserindo o código abaixo:
          </span>
          <div className="flex items-center justify-center p-2 mt-4  shadow-md  bg-roxo-200/50 rounded w-full max-w-full ">
            <img
              src={CopyIcon}
              alt="Copiar"
              className="w-6 h-6 cursor-pointer"
              onClick={handleCopy}
            />
            <p className=" ml-2 text-xs break-all">{PIX_COPIA_COLA}</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="px-4  font-semibold max-sm:text-sm">
            Preencha as informações de contato para que possamos entrar em
            contato caso seja contemplado no sorteio.
          </p>
          <form className="mx-8 my-4 flex flex-col gap-2  justify-start">
            <label className="text-left" htmlFor="nome">
              Nome
              <input
                type="text"
                name="nome"
                value={nome}
                id="nome"
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome no comprovante"
                required
                className="w-full p-2 border rounded"
              />
            </label>
            {nomeErro && <p className="text-red-500 text-sm">{nomeErro}</p>}
            <label className="text-left" htmlFor="telefone">
              Telefone
              <input
                type="text"
                id="telefone"
                name="telefone"
                value={telefone}
                onChange={handleChange}
                placeholder="85912345678"
                required
                className="w-full p-2 border rounded"
              />
              {telefoneErro && (
                <p className="text-red-500 text-sm">{telefoneErro}</p>
              )}
            </label>
          </form>
          <h3 className=" font-semibold mt-6 mx-4 max-sm:text-sm">
            Ao finalizar o Pix, clique no botão abaixo e confirme o pagamento!
          </h3>
        </div>
        {erro && (
          <p className="text-red-500 font-semibold text-sm text-center mt-2 mx-4">{erro}</p>
        )}
        <div className="w-1/2 mt-4">
          <button
            onClick={handleConfirmarPagamento}
            className="flex items-center justify-center bg-roxo-200 hover:bg-rosa-dark text-white py-2 px-4 rounded w-full"
            disabled={isLoading} // Desabilita o botão enquanto carrega
          >
            {isLoading ? (
              <span>Carregando...</span> // Mostra "Carregando..." enquanto estiver processando
            ) : (
              <>
                <img
                  src={WhatsAppIcon}
                  alt="WhatsApp"
                  className="w-6 h-6 mr-2"
                />
                <span>Confirmar pagamento</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
