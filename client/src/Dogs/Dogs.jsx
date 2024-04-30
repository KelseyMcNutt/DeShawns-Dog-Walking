import { useEffect, useState } from "react"
import { getDogs } from "../apiManager"
import { DogDetails } from "./DogDetails"
import { Link } from "react-router-dom"


export const Dogs = () => {
    const [dogs, setDogs] = useState([]);
    const [selectedDogId, setSelectedDogId] = useState(null); 
  
    useEffect(() => {
      getDogs().then((dogsArray) => {
        setDogs(dogsArray);
      });
    }, []);
  
    const handleDogClick = (id) => {
      setSelectedDogId(id); 
    };
  
    return (
      <div>
        {dogs.map((dog) => (
          <div key={dog.id} onClick={() => handleDogClick(dog.id)}> 
             <Link to={`/dog/${dog.id}`}>{dog.name}</Link>
          </div>
        ))}
      </div>
    );
  };


