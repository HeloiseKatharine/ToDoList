import { useNavigate } from "react-router-dom";
import "./style.scss";

export default function Header() {
  const navigate = useNavigate();

  const handleExitClick = () => {
    navigate("/");
  };

  return (
    <div className="HeaderContainer">
      <div className="Title">
        <h1>To-Do List</h1>
      </div>
      <div className="ExitButton">
        <button onClick={handleExitClick}>Sair</button>
      </div>
    </div>
  );
}
