import Popup from "../Popup";
interface TaskFormProps {
  onCancel: () => void;
  handleConfirm: () => void;
}

export default function TaskForm({ onCancel, handleConfirm }: TaskFormProps) {
  const handleConfirmf = () => {};

  return (
    <Popup
      message="Adicione uma tarefa"
      initialInputValue={""}
      ButtonText="Adicionar"
      onCancel={onCancel}
      onConfirm={handleConfirmf}
      isInput={true}
    />
  );
}
