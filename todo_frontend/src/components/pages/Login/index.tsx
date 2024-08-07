import PopupForm from "../../common/PopupForm";

export default function Login() {
  const handleLogin = (username: string, password: string) => {};

  const onConfirm = async (e: React.FormEvent) => {};

  return <PopupForm data={handleLogin} isLogin={true} onConfirm={onConfirm} />;
}
