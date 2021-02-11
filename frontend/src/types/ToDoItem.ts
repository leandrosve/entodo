interface ToDoItem{
    id:number,
    title:string,
    folderId?:number,
    state:"ACT" | "COM"
}

export default ToDoItem;

