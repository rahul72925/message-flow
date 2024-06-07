import React, { useEffect, useState } from "react";
import { MessageIcon } from "../assets/messageIcon";
import { NodeContext } from "../context/node";
import { BackIcon } from "../assets/backIcon";
import { CheckIcon } from "../assets/checkIcon";

export const SideBar = ({ updateNode }) => {
  const { state: { selectedNode = null } = {}, dispatch } =
    React.useContext(NodeContext);
  const [message, setMessage] = useState(selectedNode?.label || "");

  useEffect(() => {
    if (selectedNode) {
      setMessage(selectedNode.data.label);
    }
  }, [selectedNode]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const onBackClick = () => {
    dispatch({
      type: "UNSELECT_NODE",
    });
  };

  const onCheckClick = () => {
    updateNode(message);
    dispatch({
      type: "UNSELECT_NODE",
    });
  };
  if (selectedNode) {
    return (
      <div>
        <div className="grid grid-cols-4 border-b-2 py-2 mx-2">
          <div className="col-span-1 cursor-pointer " onClick={onBackClick}>
            <BackIcon />
          </div>
          <span className="col-span-2  grid justify-center">Message</span>
          <div
            className="col-span-1 grid justify-center cursor-pointer"
            onClick={onCheckClick}
          >
            <CheckIcon />
          </div>
        </div>
        <div className="mx-2">
          <div className="py-2">
            <label>Text</label>
          </div>
          <textarea
            className="w-full p-2 outline"
            value={message}
            onChange={handleMessageChange}
          />
        </div>
      </div>
    );
  }
  return <MessageDragger />;
};

const MessageDragger = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div>
      <div
        className="flex items-center justify-center flex-col rounded-xl border-2 border-blue-500 h-24 cursor-grab w-48 m-4"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        <MessageIcon />
        <span className="text-blue-500">Message</span>
      </div>
    </div>
  );
};
