import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useState,
} from "react";
import ReactFlow, {
  useEdgesState,
  useNodesState,
  addEdge,
  Position,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { CustomNode } from "./node";
import { NodeContext } from "../context/node";

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
  customMessageNode: CustomNode,
};
const MessageFlow = forwardRef(({}, ref) => {
  const { dispatch, state: { selectedNode } = {} } =
    React.useContext(NodeContext);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        nodes,
        updateNodeLabel: function (newLabel) {
          setNodes((prevNode) => {
            prevNode.forEach((eachNode) => {
              if (selectedNode.id === eachNode.id) {
                eachNode.data.label = newLabel;
              }
            });
            return prevNode;
          });
        },
        handleSave: function () {
          const availableNodeIds = nodes.map((eachNode) => eachNode.id);
          const uniqueEdges = new Set();
          let isValid = true;
          if (availableNodeIds.length > 0 && edges.length === 0) {
            isValid = false;
          }

          // store unique edges
          edges.forEach((eachEdge) => {
            uniqueEdges.add(eachEdge.source);
            uniqueEdges.add(eachEdge.target);
          });

          // validate each node, each nodeId should be available into uniques edges set
          for (let nodeId of availableNodeIds) {
            if (!uniqueEdges.has(nodeId)) {
              isValid = false;
              break;
            }
          }
          return isValid;
        },
      };
    },
    [nodes, selectedNode, edges]
  );

  const onConnect = useCallback(
    (params) => {
      // fn will call when we are trying to link nodes
      const { source } = params;
      const incomingEdges = edges.filter((el) => el.source === source);

      // if source of incoming edge is already exist then not allowed to make connection
      if (incomingEdges.length === 0) {
        // set fn update the array for edges
        setEdges((eds) =>
          addEdge(
            { ...params, markerEnd: { type: MarkerType.ArrowClosed } },
            eds
          )
        );
      } else {
        alert("This node already has a source!");
      }
    },
    [setEdges, edges]
  );

  const onDrop = useCallback(
    (event) => {
      // this drop fn will rn when we a node will drop on canvas
      // then we can add data accordingly into a node with node configuration
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // some fn provided by ReactFlow itself using onInit fn
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - 65,
        y: event.clientY - 40,
      });

      const id = getId();

      const newNode = {
        id,
        type: "customMessageNode",
        position,
        data: { label: `text message`, id },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodeClick = useCallback((event, node) => {
    // when click on any node the select node will be store in state for side bar reference
    event.preventDefault();
    dispatch({ type: "SELECT_NODE", payload: node });
  }, []);

  const onPaneClick = useCallback(() => {
    // when user click outside of node then selected node would be null
    dispatch({ type: "UNSELECT_NODE" });
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setReactFlowInstance}
      onDrop={onDrop}
      onDragOver={onDragOver}
      className="bg-teal-50"
      nodeTypes={nodeTypes}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
    ></ReactFlow>
  );
});

export { MessageFlow };
