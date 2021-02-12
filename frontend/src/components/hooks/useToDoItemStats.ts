import React, { useEffect, useState } from "react";
import ToDoItem from "../../types/ToDoItem";

const useToDoItemStats = (items: ToDoItem[]) => {

  const completed = items.reduce(
    (com, item) => (item.state == "COM" ? com + 1 : com),
    0
  );
  return { completed, active: items.length - completed };
};

export default useToDoItemStats;
