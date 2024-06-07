"use client";
import { MessageFlow } from "@components/messageFlow";
import { SideBar } from "@components/sidebar";
import React from "react";
import { NodeProvider } from "../context/node";

export default function Home() {
  const messageFlowRef = React.createRef();

  const updateNode = (message) => {
    messageFlowRef.current.updateNodeLabel(message);
  };

  const handleSave = () => {
    const isSaved = messageFlowRef.current.handleSave();
    alert(isSaved ? "Saved" : "Some nodes are not linked");
  };

  return (
    <NodeProvider>
      <main className="w-full h-screen">
        <header className="h-16 bg-slate-100 flex justify-end items-center">
          <button
            onClick={handleSave}
            className="bg-sky-500 hover:bg-sky-400 px-8 py-2 rounded-md h-12 mr-4 text-white"
          >
            Save
          </button>
        </header>
        <div className="grid grid-cols-4 h-[calc(100%-6rem)]">
          <div className="col-span-3">
            <MessageFlow ref={messageFlowRef} />
          </div>
          <div className="col-span-1">
            <SideBar updateNode={updateNode} />
          </div>
        </div>
        <footer className="h-8 bg-slate-100 flex justify-center items-center">
          Made by&nbsp;
          <a
            href="https://github.com/rahul72925"
            className="underline"
            target="_blank"
          >
            Rahul Khatri
          </a>
        </footer>
      </main>
    </NodeProvider>
  );
}
