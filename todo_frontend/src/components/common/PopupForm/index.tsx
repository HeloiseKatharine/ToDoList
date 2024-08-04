import "./style.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormProps {
  data: (username: string, password: string) => void;
  isLogin: boolean;
  onConfirm: () => void;
}

export default function PopupForm({ data, isLogin, onConfirm }: FormProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    data(username, password);
  };

  const handleRegisterClick = () => {
    navigate("/register");
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
        <button onClick={onConfirm} type="submit" className="FormButton">
          {isLogin ? "Entrar" : "Cadastrar"}
        </button>
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
