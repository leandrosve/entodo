import { useEffect, useState } from 'react'
const colors=[
    "#8994fa",
    "#44d382",
    "#5fa7fa",
    "#e7b51b",
    "#fb6abd",
    "#30c8e2",
    "#f39e30",
]
const useColorFromId = (id=0) => {
    const [color, setColor] = useState("#44d382")
    useEffect(()=>setColor(colors[id % colors.length]), [setColor, id])
    return color;
}

export default useColorFromId
