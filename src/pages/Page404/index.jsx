import PaymentImg from "../../assets/qrcode-pix.png";
import CopyIcon from "../../assets/copy-icon.svg";

const PIX_COPIA_COLA = "00020126360014BR.GOV.BCB.PIX0114+55859961095895204000053039865802BR5901N6001C62070503***630478D9";

const handleCopy = () => {
  navigator.clipboard.writeText(PIX_COPIA_COLA).then(() => {
    alert("Código copiado com sucesso!");
  });
};

export const Error404 = () => {
  return (
    <section className="h-full flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Página não encontrada</h1>
        <p className="text-gray-700 mb-4">
          Parece que esta página não existe. Mas que tal aproveitar e nos apoiar?
        </p>
        <img src={PaymentImg} alt="QR CODE" className="w-52 rounded mx-auto mb-4" />
        <div className="flex items-center justify-center p-2 mt-4 shadow-md bg-roxo-200/50 rounded w-full max-w-full">
          <img
            src={CopyIcon}
            alt="Copiar"
            className="w-6 h-6 cursor-pointer"
            onClick={handleCopy}
          />
          <p className="ml-2 text-xs break-all">{PIX_COPIA_COLA}</p>
        </div>
        <p className="text-gray-700 mt-4">
          Você pode contribuir comprando um número na nossa rifa. Qualquer ajuda é muito bem-vinda! 😁
        </p>
      </div>
    </section>
  );
};
