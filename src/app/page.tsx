"use client";
import { useState } from "react";
import Card from "@/components/card";
import Image from "next/image";
import { Modal } from "@/components/modal";

export default function Home() {

  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="">
      <nav className="w-[100%] bg-black p-4 flex items-center justify-center">
        <h1 className="text-white font-semibold text-[1.5em]">TO DO LIST</h1>
      </nav>
      <main className="flex p-10 flex-col gap-8 row-start-2 items-center sm:items-start w-[100%]">
        <div className="w-[100%] flex flex-row justify-between">
          <h2 className="text-black font-semibold text-[1.5em]">Hello, welcome!</h2>
          <a className="cursor-pointer text-white bg-pink-700 font-semibold p-2 rounded-md shadow-md" onClick={openModal}>New task</a>
        </div>
        <div className="bg-zinc-100 w-[100%] h-screen rounded-md p-10 flex flex-col gap-4">
          <Card title="Atividade Inglês" data="FEB, 22" status="em andamento" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown." />
          <Card title="Profile hackatoon" data="FEB, 14" status="finalizado" description="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the." />
          <Card title="Lavar a louça" data="FEB, 09" status="para fazer" description="Release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
      <div className={modal ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" : "disabled z-0 opacity-0"}>
        <div className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center flex-col" >
          <div className="p-2 flex flex-col w-96 bg-opacity-50 z-50">
            <h2 className="text-[1.6em] font-semibold text-pink-900">New task</h2>
            <form className="flex flex-col">
              <label htmlFor="" className="mt-4">Title</label>
              <input type="text" placeholder="Task title" className="border-b-2 p-1 text-[13px] focus:border-b-pink-800 outline-none hover:border-b-pink-800"></input>
              <label htmlFor="" className="mt-3">Description</label>
              <textarea placeholder="Task description" className="border-2 max-h-[200px] min-h-[100px] p-1 text-[13px] focus:border-pink-800 outline-none hover:border-pink-800"></textarea>
            </form>
            <div className="flex justify-between mt-10">
              <button onClick={() => closeModal()} className="flex justify-center items-center h-8 text-[15px] bg-gray-700 text-white p-5 rounded-md hover:bg-gray-900">Cancelar</button>
              <button onClick={() => setModal(false)} className="flex justify-center items-center h-8 text-[15px] bg-pink-700 text-white p-5 rounded-md hover:bg-pink-800">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
