import "./style.scss";
import TaskItem from "../../common/TaskItem";
import Popup from "../../common/Popup";
import TaskForm from "../../common/TaskForm";
import React, { useEffect, useState } from "react";
import { Task } from "../../../interfaces/interfaces";
import { useAuth } from "../../../context/AuthContext";
import axios from "../../../axiosConfig";

export default function TaskList() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get("/task", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
            },
          });
          setTasks(response.data.tasks);
        } catch (err: any) {
          setError(err.response?.data?.message || "Erro ao buscar as tasks.");
        } finally {
          setLoading(false);
        }
      };

      fetchTasks();
    }
  }, [isTaskFormOpen, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="MainContainerTaskList">
      <div className="TaskList">
        {tasks.length === 0 ? (
          <div className="Message">
            <p>Nenhuma tarefa disponível :/</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              taskName={task.name}
              onToggleComplete={() => handleToggleComplete(task.id)}
              onEdit={() => handleEdit(task.id, task.name)}
              onDelete={() => handleDelete(task.id)}
              isCompleted={task.isCompleted}
            />
          ))
        )}

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
            onConfirm={(newName) => confirmEdit(newName)}
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
