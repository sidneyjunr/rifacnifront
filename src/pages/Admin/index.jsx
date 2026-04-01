import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { userLogin, login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (login) navigate("/admin");
  }, [login, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin(email, password);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-roxo-900">
      <div className="bg-roxo-600 p-8 rounded-lg shadow-lg w-96 border border-roxo-300/30">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Painel Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-dourado-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-roxo-300/30 rounded-md bg-roxo-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-roxo-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-dourado-400">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border border-roxo-300/30 rounded-md bg-roxo-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-roxo-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="mb-4 text-red-400 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full p-3 bg-roxo-200 text-white font-bold rounded-md hover:bg-rosa-dark transition-colors focus:outline-none focus:ring-2 focus:ring-roxo-200"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};
