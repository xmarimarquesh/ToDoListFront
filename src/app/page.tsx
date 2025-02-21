"use client";
import { useState } from "react";
import Card from "@/components/card";
import Image from "next/image";

interface Tarefa {
  title: string;
  description: string;
  date: Date;
  status: string;
}

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    {
      title: "Comprar mantimentos",
      description: "Ir ao mercado comprar alimentos para a semana.",
      date: new Date("2025-02-22T10:00:00"),
      status: "em andamento",
    },
    {
      title: "Estudar para a prova",
      description: "Revisar o material de estudo para a prova de matemática.",
      date: new Date("2025-02-23T14:00:00"),
      status: "pendente",
    },
    {
      title: "Finalizar projeto",
      description: "Terminar o projeto de desenvolvimento de software.",
      date: new Date("2025-02-24T17:00:00"),
      status: "finalizado",
    },
    {
      title: "Limpar a casa",
      description: "Fazer uma faxina na casa inteira.",
      date: new Date("2025-02-21T09:00:00"),
      status: "em andamento",
    },
    {
      title: "Pagar contas",
      description: "Pagar as contas de luz, internet e telefone.",
      date: new Date("2025-02-20T18:00:00"),
      status: "finalizado",
    },
  ]);

  const [modal, setModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/task/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTask.title,
          description: newTask.description,
          date: new Date(),
          status: "pendente", 
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setTarefas((prevTasks) => [...prevTasks, data]); 
        closeModal();
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error while adding task:", error);
    }
  };

  return (
    <div className="">
      <nav className="w-[100%] bg-black p-4 flex items-center justify-center">
        <h1 className="text-white font-semibold text-[1.5em]">TO DO LIST</h1>
      </nav>
      <main className="flex p-10 flex-col gap-8 row-start-2 items-center sm:items-start w-[100%]">
        <div className="w-[100%] flex flex-row justify-between">
          <h2 className="text-black font-semibold text-[1.5em]">Hello, welcome!</h2>
          <a
            className="cursor-pointer text-white bg-pink-700 font-semibold p-2 rounded-md shadow-md"
            onClick={openModal}
          >
            New task
          </a>
        </div>
        <div className="bg-zinc-100 w-[100%] h-screen rounded-md p-10 flex flex-col gap-4">
          {tarefas.map((tarefa, index) => (
            <Card
              key={index}
              title={tarefa.title}
              data={tarefa.date}
              status={tarefa.status}
              description={tarefa.description}
            />
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      <div
        className={
          modal
            ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            : "disabled z-0 opacity-0"
        }
      >
        <div className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center flex-col">
          <div className="p-2 flex flex-col w-96 bg-opacity-50 z-50">
            <h2 className="text-[1.6em] font-semibold text-pink-900">New task</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label htmlFor="title" className="mt-4">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                placeholder="Task title"
                className="border-b-2 p-1 text-[13px] focus:border-b-pink-800 outline-none hover:border-b-pink-800"
              />
              <label htmlFor="description" className="mt-3">
                Description
              </label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                placeholder="Task description"
                className="border-2 max-h-[200px] min-h-[100px] p-1 text-[13px] focus:border-pink-800 outline-none hover:border-pink-800"
              ></textarea>
              <div className="flex justify-between mt-10">
                <button
                  onClick={closeModal}
                  className="flex justify-center items-center h-8 text-[15px] bg-gray-700 text-white p-5 rounded-md hover:bg-gray-900"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex justify-center items-center h-8 text-[15px] bg-pink-700 text-white p-5 rounded-md hover:bg-pink-800"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
