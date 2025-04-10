import React from "react";
import { useDroppable } from "@dnd-kit/core";

// Droppable area component for drag and drop functionality
function DroppableArea({ children }) {
  const { setNodeRef, isOver } = useDroppable({
    id: "droppable",
  });

  return (
    <div 
      ref={setNodeRef} 
      className={`flex-1 h-full overflow-auto p-4 ${isOver ? 'bg-blue-50' : ''}`}
    >
      {children}
    </div>
  );
}

// Main MidArea component that displays dropped items
export default function MidArea({ items,type }) {
  return (
    <DroppableArea>
      {items.filter(x=>x.target==type).map((item) => (
        <div
          key={item.id}
          className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm"
        >
          {item.content}
        </div>
      ))}
    </DroppableArea>
  );
}
