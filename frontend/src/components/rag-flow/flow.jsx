

import ReactFlow from "reactflow";
import { nodeTypes } from "./nodes";

const nodes = [
  {
    id: "1",
    type: "upload",
    position: { x: 0, y: 100 },
    data: { label: "Upload Docs" },
  },
  {
    id: "2",
    type: "process",
    position: { x: 250, y: 100 },
    data: { label: "Chunking" },
  },
  {
    id: "3",
    type: "database",
    position: { x: 500, y: 100 },
    data: { label: "Vector DB" },
  },
  {
    id: "4",
    type: "llm",
    position: { x: 750, y: 100 },
    data: { label: "LLM Response" },
  },
];

const edges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
];

export default function Flow() {
  return (
    <div className="w-full h-full flex flex-wrap flex-col">

      {/* <div className="p-2">
        <div>Rag </div>
      </div> */}

      <ReactFlow 
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}

        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        fitView
      />
    </div>
  );
}