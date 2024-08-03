import { useEffect, useState } from "react";
import "./style.scss";

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

  const handleConfirm = () => {
    if (inputValue.trim()) {
      onConfirm(inputValue);
    } else {
      onConfirm();
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
