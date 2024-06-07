import { Handle, Position } from "reactflow";
import { WhatsappIcon } from "../assets/whatsappIcon";
import { MessageIcon } from "../assets/messageIcon";
import React from "react";
import { NodeContext } from "../context/node";

export const CustomNode = React.memo(({ data }) => {
  const { state: { selectedNode = null } = {} } = React.useContext(NodeContext);
  return (
    <div
      className="block shadow-lg bg-white rounded-lg w-60 min-h-24 overflow-hidden	"
      style={{
        border: selectedNode?.id === data.id ? "1px solid #4CAF50" : "",
      }}
    >
      <div className="grid grid-cols-6 col-center h-8 bg-emerald-200">
        <div className="col-span-1 grid content-center items-center justify-items-center">
          <MessageIcon size={16} fill={"grey"} />
        </div>
        <span className="col-span-4 text-xs	grid content-center">
          Send Message
        </span>
        <div className="col-span-1 grid content-center items-center justify-items-center">
          <WhatsappIcon size={16} />
        </div>
      </div>
      <div className="text-sm p-2">{data.label}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
});
