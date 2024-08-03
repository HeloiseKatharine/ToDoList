import PopupForm from "../../common/PopupForm";

export default function Register() {
  const handleRegister = (username: string, password: string) => {
    console.log("Nome:", username);
    console.log("Senha:", password);
  };

  const onConfirm = () => {
    console.log("...");
  };

  return (
    <PopupForm data={handleRegister} isLogin={false} onConfirm={onConfirm} />
  );
}
