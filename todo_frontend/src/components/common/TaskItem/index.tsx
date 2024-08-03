import { FaPencilAlt, FaTrash } from "react-icons/fa";
import "./style.scss";

interface TaskItemProps {
  taskName: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleComplete?: () => void;
  isCompleted: boolean;
}

export default function TaskItem({
  taskName,
  onEdit,
  onDelete,
  onToggleComplete,
  isCompleted,
}: TaskItemProps) {
  return (
    <div className="DivTaskItem">
      <div className="TaskItemCheckboxText">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={onToggleComplete}
          className="TaskItemCheckbox"
        />
        <span className={`TaskItemText ${isCompleted ? "completed" : ""}`}>
          {taskName}
        </span>
      </div>
      <div className="TaskItemActions">
        <FaPencilAlt onClick={onEdit} className="TaskItemIcon" />
        <FaTrash onClick={onDelete} className="TaskItemIcon" />
      </div>
    </div>
  );
}
