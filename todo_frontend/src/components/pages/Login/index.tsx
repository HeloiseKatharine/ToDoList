import { useNavigate } from "react-router-dom";
import PopupForm from "../../common/PopupForm";

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = (username: string, password: string) => {
    console.log("Nome:", username);
  };

  const onConfirm = () => {
    navigate("/home");
  };

  return <PopupForm data={handleLogin} isLogin={true} onConfirm={onConfirm} />;
}
