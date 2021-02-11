import React, { useEffect, useState } from 'react'
import ToDoItem from '../../types/ToDoItem'

const useToDoItemStats = (items:ToDoItem[]) => {
    const [stats, setStats] = useState({completed:0, active:0})
   
    useEffect(()=>{
        const completed = items.reduce((com, item) => item.state =='COM' ? com + 1 : com, 0 );
        setStats({completed, active:items.length - completed})
    },items)

    return stats;
}

export default useToDoItemStats;
