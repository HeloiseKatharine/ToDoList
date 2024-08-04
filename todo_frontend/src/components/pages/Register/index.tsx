import { useNavigate } from "react-router-dom";
import PopupForm from "../../common/PopupForm";

export default function Register() {
  const navegate = useNavigate();

  const handleRegister = (username: string, password: string) => {
    console.log("Nome:", username);
  };

  const onConfirm = () => {
    navegate("/home");
  };

  return (
    <PopupForm data={handleRegister} isLogin={false} onConfirm={onConfirm} />
  );
}
