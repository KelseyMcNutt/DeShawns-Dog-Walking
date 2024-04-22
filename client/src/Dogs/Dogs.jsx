import { useEffect, useState } from "react"
import { getDogs } from "../apiManager"


export const Dogs =  () => {

const [ dogs, setDogs] = useState([])

useEffect(() => {
    getDogs().then((dogsArray) => {
        setDogs(dogsArray)
    })
}, [])

console.log({dogs})

return (
    <div>
        {dogs.map((dog) => (
        <div key={dog.id}>
            <ul>{dog.name}</ul>
        </div>
        ))}
    </div>
    )
}


