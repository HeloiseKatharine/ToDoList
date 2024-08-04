import "./style.scss";
import TaskItem from "../../common/TaskItem";
import Popup from "../../common/Popup";
import TaskForm from "../../common/TaskForm";
import React, { useState } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Estudar para a prova de arquitetura 2",
      isCompleted: false,
    },
    { id: 2, name: "Estudar React", isCompleted: false },
  ]);

  const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);
  const [isTaskFormOpen, setTaskFormOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const [taskToEdit, setTaskToEdit] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleToggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    setIsPopupDeleteOpen(true);
    setTaskToDelete(id);
  };

  const confirmDelete = () => {
    if (taskToDelete !== null) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
      setTaskToDelete(null);
      setIsPopupDeleteOpen(false);
    }
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
    setIsPopupDeleteOpen(false);
  };

  const handleEdit = (id: number, name: string) => {
    setIsPopupEditOpen(true);
    setTaskToEdit({ id, name });
  };

  const confirmEdit = (newName?: string) => {
    if (taskToEdit) {
      setTasks(
        tasks.map((task) =>
          task.id === taskToEdit.id
            ? { ...task, name: newName ?? task.name }
            : task
        )
      );
      setTaskToEdit(null);
      setIsPopupEditOpen(false);
    }
  };

  const cancelEdit = () => {
    setTaskToEdit(null);
    setIsPopupEditOpen(false);
  };

  const cancelCreate = () => {
    setTaskFormOpen(false);
  };

  const confirmCreate = () => {
    setTaskFormOpen(false);
  };

  return (
    <div className="MainContainerTaskList">
      <div className="TaskList">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            taskName={task.name}
            onToggleComplete={() => handleToggleComplete(task.id)}
            onEdit={() => handleEdit(task.id, task.name)}
            onDelete={() => handleDelete(task.id)}
            isCompleted={task.isCompleted}
          />
        ))}

        {isPopupDeleteOpen && (
          <Popup
            message="Tem certeza de que deseja excluir esta tarefa?"
            initialInputValue={""}
            ButtonText="Excluir"
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
            isInput={false}
          />
        )}

        {taskToEdit && (
          <Popup
            message="Edite o texto da tarefa"
            initialInputValue={taskToEdit.name}
            ButtonText="Salvar"
            onCancel={cancelEdit}
            onConfirm={confirmEdit}
            isInput={true}
          />
        )}
      </div>

      <div>
        <button onClick={() => setTaskFormOpen(true)} className="AddButton">
          Adicionar tarefa
        </button>
        {isTaskFormOpen && (
          <TaskForm onCancel={cancelCreate} handleConfirm={confirmCreate} />
        )}
      </div>
    </div>
  );
}


