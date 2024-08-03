import PopupForm from "../../common/PopupForm";

export default function Login() {
  const handleLogin = (username: string, password: string) => {
    console.log("Nome:", username);
    console.log("Senha:", password);
  };

  const onConfirm = () => {
    console.log("...");
  };

  return <PopupForm data={handleLogin} isLogin={true} onConfirm={onConfirm} />;
}
