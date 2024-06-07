import React, { useReducer } from "react";

export const NodeContext = React.createContext();

const initialState = {
  selectedNode: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_NODE":
      return { ...state, selectedNode: action.payload };

    case "UNSELECT_NODE":
      return { ...state, selectedNode: null };
  }
};
export function NodeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NodeContext.Provider value={{ state, dispatch }}>
      {children}
    </NodeContext.Provider>
  );
}
