import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Home } from "./pages/Home";
import { Error404 } from "./pages/Page404";
import { Layout } from "./components/Layout";
import { Comprar } from "./pages/Comprar";
import { TransactionPix } from "./pages/TransactionPix";
import { Login } from "./pages/Admin";
import { AuthProvider } from "./contexts/AuthContext";
import { Admin } from "./pages/Admin/admin";
import { ProtectedRoute } from "./pages/Admin/ProtectedRoute";
import { Consultar } from "./pages/Consultar/Consultar";

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/comprar" element={<Comprar />} />
            <Route path="/consultar" element={<Consultar/>} />
            <Route path="/transaction_pix" element={<TransactionPix />} />
            <Route path="*" element={<Error404 />} />
          </Route>
            <Route path="/login" element = {<Login/>} />
            <Route path="/admin" element = {<ProtectedRoute><Admin/> </ProtectedRoute>} />
        </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
