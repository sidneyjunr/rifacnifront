import React, { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

export const Consultar = () => {
  // const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [numeros, setNumeros] = useState("");
  const [telefoneErro, setTelefoneErro] = useState('')
  const [erroConsulta, setErroConsulta] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    let hasError = false
    
    if (!tel || tel.length < 16) {
      setNumeros('')
      setTelefoneErro("Preencha o telefone corretamente");
      hasError = true;
    } else {
      setTelefoneErro("");
    }
    if (hasError) return;

    buscaDados();
  }

  const buscaDados = async () => {
    setIsLoading(true);
    setErroConsulta('')
    try {
      const response = await fetch(
        `${BASE_URL}/cartela/search/${tel.replace(/\D/g, "")}`
      );
      if (!response.ok) throw new Error("Erro na requisição");

      const data = await response.json();
      const vendidos = data["cartelas"].map((cartela) => cartela["number"]);
      if (vendidos.length === 0) {
        setErroConsulta("Nenhum ponto encontrado com este número")
        setNumeros('')
      } else {
        setNumeros(vendidos);
      };
    } catch (error) {
      console.error(error);
      setErroConsulta("Erro na consulta. Tente novamente mais tarde.")
    } finally {
      setIsLoading(false);
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
    
    setTel(formatarTelefone(value));
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-4 text-white flex flex-col gap-4 max-w-sm mx-auto"
      >
        {/* <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}
          className="px-4 py-2 rounded-lg text-black"
          placeholder="Nome completo cadastrado no ponto"
          required
        /> */}

        <label htmlFor="tel">Telefone</label>
        <input
          type="tel"
          id="tel"
          value={tel}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg  text-black"
          placeholder="Telefone usado para registro no ponto"
          required
        />
        {telefoneErro && (
                <p className="text-white text-sm">{telefoneErro}</p>
              )}

        <button className="mt-4 px-6 py-2 max-sm:px-8 max-sm:py-4 bg-roxo-200/60 text-white font-bold rounded-lg hover:bg-roxo-200">
          {isLoading ? "Carregando..." : "Consultar"}
        </button>
      </form>

      {erroConsulta && (
        <div className="mt-8 text-white text-lg font-semibold text-center">
          {erroConsulta}
        </div>
      )}


      {numeros.length > 0 && (
        <div className="mt-8 text-white p-4 max-w-sm mx-auto">
          <table className="table-auto w-full mt-2">
            <thead>
              <tr>
                <th className="text-left flex justify-between  px-4 py-2 border-b">Números Comprados <span className="mr-12  text-xl">{numeros.length}</span></th>
              </tr>
            </thead>
            <tbody>
              {numeros.map((numero, index) => (
                <tr key={index} className="">
                  <td className="px-4 py-2 border-b text-center text-dourado-400 ">{numero}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
