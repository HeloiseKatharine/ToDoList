import "./style.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useRegister } from "../../../context/RegisterContext";
interface FormProps {
  data: (username: string, password: string) => void;
  isLogin: boolean;
  onConfirm: (e: React.FormEvent) => Promise<void>;
}

export default function PopupForm({ isLogin, onConfirm }: FormProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();
  const { register, errorRegister } = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login(username, password);
      navigate("/home");
    } else {
      handleRegisterClick(e);
    }
  };

  const handleRegisterClick = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(username, password, "");
    navigate("/login");
  };

  return (
    <div className="MainContainer">
      <form onSubmit={handleSubmit} className="Form">
        <h2>{isLogin ? "Login" : "Cadastro"}</h2>
        <div className="FormGroup">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="FormGroup">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="FormButton">
          {loading ? "Loading..." : isLogin ? "Entrar" : "Cadastrar"}
        </button>
        {error && <p>{error}</p>}
        {errorRegister && <p>{errorRegister}</p>}
        {isLogin && (
          <div>
            <button onClick={handleRegisterClick} className="RegisterButton">
              Não tem uma conta? Cadastre-se
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
