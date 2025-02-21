"use client";
import Image from "next/image";
import { useState } from "react";
import Modal from "./modal";

type CardData = {
  title: string;
  data: Date;
  status: string;
  description: string;
};

const Card = ({ title, description, data, status }: CardData) => {
  const [modal, setModal] = useState(false);
  const [editTarefa, setEditTarefa] = useState<CardData>({
    title: title,
    description: description,
    data: data,
    status: status,
  });

  const openModal = (tarefa: CardData) => {
    setEditTarefa(tarefa);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const [modalDel, setModalDel] = useState(false);

  const openModalDel = () => {
    setModalDel(true);
  };

  const closeModalDel = () => {
    setModalDel(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditTarefa((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <div className={styles.container}>
        <div className="flex flex-row justify-between w-[100%] mr-10 ml-10">
          <div className="flex flex-row">
            <div className="bg-pink-800 w-8 mr-4"></div>
            <div>
              <h1 className={styles.title}>{title}</h1>
              <p className="max-w-[90%] text-zinc-500">{description}</p>
            </div>
          </div>
          <div className="flex flex-col items-end - gap-3">
            <p>
                {(data instanceof Date && !isNaN(data.getTime())) ? (
                  // data é uma data válida, podemos formatá-la
                  new Intl.DateTimeFormat("en-US", {
                    month: "short", 
                    day: "2-digit", 
                    hour: "2-digit",
                    minute: "2-digit", 
                    hour12: false,
                  }).format(data)
                ) : (
                  "Invalid Date"
              )}
            </p>

            <div
              className={
                status == "finalizado"
                  ? "bg-green-400 w-6 h-6 rounded-full"
                  : status == "em andamento"
                  ? "bg-yellow-400 w-6 h-6 rounded-full"
                  : "bg-red-400 w-6 h-6 rounded-full"
              }
            ></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 ml-2">
        <Image
          src={require("@/assets/trash.png")}
          alt=""
          className="w-6 h-6 cursor-pointer hover:opacity-50"
          onClick={openModalDel}
        />
        <Image
          src={require("@/assets/edit.png")}
          alt=""
          className="w-6 h-6 cursor-pointer hover:opacity-50"
          onClick={() => openModal({ title, description, data, status })}
        />
      </div>

      {/* Modal para Editar */}
      <Modal isOpen={modal} onClose={closeModal}>
        <div className="p-2 flex flex-col w-96 bg-opacity-50 z-50">
          <h2 className="text-[1.6em] font-semibold text-pink-900">Editar Tarefa</h2>
          <form className="flex flex-col">
            <label htmlFor="title" className="mt-4">
              Título
            </label>
            <input
              id="title"
              name="title"
              value={editTarefa.title}
              type="text"
              placeholder="Título da Tarefa"
              className="border-b-2 p-1 text-[13px] focus:border-b-pink-800 outline-none hover:border-b-pink-800"
              onChange={handleInputChange}
            />
            <label htmlFor="description" className="mt-3">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={editTarefa.description}
              placeholder="Descrição da Tarefa"
              className="border-2 max-h-[200px] min-h-[100px] p-1 text-[13px] focus:border-pink-800 outline-none hover:border-pink-800"
              onChange={handleInputChange}
            />
          </form>
          <div className="flex justify-between mt-10">
            <button
              onClick={closeModal}
              className="flex justify-center items-center h-8 text-[15px] bg-gray-700 text-white p-5 rounded-md hover:bg-gray-900"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                setModal(false);
                console.log(editTarefa);
              }}
              className="flex justify-center items-center h-8 text-[15px] bg-pink-700 text-white p-5 rounded-md hover:bg-pink-800"
            >
              Confirmar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal para Deletar */}
      <Modal isOpen={modalDel} onClose={closeModalDel}>
        <div className="p-2 flex flex-col w-96 bg-opacity-50 z-50">
          <h2 className="text-[1.6em] font-semibold text-pink-900">Excluir Tarefa</h2>
          <h4 className="text-[1.2em] text-black">Tem certeza?</h4>
          <div className="flex justify-between mt-10">
            <button
              onClick={closeModalDel}
              className="flex justify-center items-center h-8 text-[15px] bg-gray-700 text-white p-5 rounded-md hover:bg-gray-900"
            >
              Cancelar
            </button>
            <button
              onClick={() => setModalDel(false)}
              className="flex justify-center items-center h-8 text-[15px] bg-pink-700 text-white p-5 rounded-md hover:bg-pink-800"
            >
              Confirmar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const styles = {
  container:
    "flex w-[90%] bg-white flex-row justify-center items-center dark:bg-neutral-700 hover:dark:bg-zinc-900 p-4 border-b-2 ease-in-out duration-300 hover:bg-zinc-200 hover:border-zinc-300 cursor-pointer",
  img: "rounded h-32 w-32 object-cover mr-5",
  title: "text-blue1 dark:text-blue5 text-[1.2em] font-semibold",
  question:
    "w-full dark:text-blue4 text-sm text-gray-700 overflow-hidden overflow-ellipsis whitespace-nowrap",
};

export default Card;
