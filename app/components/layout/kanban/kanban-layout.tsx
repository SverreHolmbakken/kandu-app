import React from "react";
import KanbanColumn from "./kanban-column";

export default function KanbanLayout() {
  return (
    <div className=" w-screen h-screen px-5">
      <KanbanColumn />
    </div>
  );
}
