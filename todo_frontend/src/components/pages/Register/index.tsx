import PopupForm from "../../common/PopupForm";

export default function Register() {
  const handleRegister = () => {};

  const onConfirm = async (e: React.FormEvent) => {};

  return (
    <PopupForm data={handleRegister} isLogin={false} onConfirm={onConfirm} />
  );
}
