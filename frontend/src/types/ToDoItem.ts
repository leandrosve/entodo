interface ToDoItem{
    id:number,
    title:string,
    folderId?:number,
    status:"ACT" | "COM"
}

export default ToDoItem;

