import { useState } from "react";
import "./style.scss";

interface FormProps {
  data: (username: string, password: string) => void;
  isLogin: boolean;
  onConfirm: () => void;
}

export default function PopupForm({ data, isLogin, onConfirm }: FormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    data(username, password);
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
      </form>
    </div>
  );
}
