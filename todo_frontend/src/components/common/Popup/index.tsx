import { useEffect, useState } from "react";
import "./style.scss";
import axios from "../../../axiosConfig";
import { Task, User } from "../../../interfaces/interfaces";

interface PopupProps {
  message: string;
  ButtonText: string;
  initialInputValue: string;
  onCancel: () => void;
  onConfirm: (inputValue?: string) => void;
  isInput: boolean;
}

export default function Popup({
  message,
  ButtonText,
  initialInputValue,
  onCancel,
  onConfirm,
  isInput,
}: PopupProps) {
  const [inputValue, setInputValue] = useState(initialInputValue);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleConfirm = () => {
    if (inputValue.trim()) {
      const onConfirmCreateTask = async (inputValue?: string) => {
        try {
          const response = await axios.post(
            "/task",
            { name: inputValue, description: "" },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
              },
            }
          );
          setTasks([...tasks, response.data.task]);
        } catch (err: any) {
          setError(err.response?.data?.message || "Erro ao criar a tarefa.");
        }
      };
      onConfirmCreateTask(inputValue);
      onCancel();
    }
  };

  useEffect(() => {
    setInputValue(initialInputValue);
  }, [initialInputValue]);

  return (
    <div className="PopUpBackground">
      <div className="PopUpContent">
        <p>{message}</p>

        {isInput && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="PopUpInput"
          />
        )}

        <div className="PopUpButtons">
          <button onClick={onCancel} className="CancelButton">
            Cancelar
          </button>
          <button onClick={handleConfirm} className="ConfirmButton">
            {ButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
