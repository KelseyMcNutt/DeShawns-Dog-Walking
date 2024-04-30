import { useEffect, useState } from "react"
import { getDogs } from "../apiManager"
import { DogDetails } from "./DogDetails"
import { Link } from "react-router-dom"
import AddDogForm from "./AddDog"


export const Dogs = ({selectedDog}) => {
    const [dogs, setDogs] = useState([]);
    const [selectedDogId, setSelectedDogId] = useState(null); 
    const [showAddForm, setShowAddForm] = useState(false); 
  
    useEffect(() => {
      getDogs().then((dogsArray) => {
        setDogs(dogsArray);
      });
    }, []);

    useEffect(() => {
        if (selectedDog) {
          setSelectedDogId(selectedDog.id);
        }
      }, [selectedDog]);
      
  
    const handleDogClick = (dog) => {
      setSelectedDog(dog); 
    };
  
    const handleAddDog = () => {
        setShowAddForm(true); 
    };

    const handleDogAdded = (newDog) => {
        setDogs([...dogs, newDog]); 
        setShowAddForm(false); 
    };



    return (
        <div>
            {showAddForm ? (
                <AddDogForm onDogAdded={handleDogAdded} />
            ) : (
                <>
                    
                    {dogs.map((dog) => (
                        <div key={dog.id} onClick={() => handleDogClick(dog)}>
                            <Link to={`/dog/${dog.id}`}>{dog.name}</Link>
                        </div>
                    ))}
                    <button onClick={handleAddDog}>Add Dog</button>
                </>
            )}
             {selectedDog && <DogDetails dogId={selectedDogId}/>} 
        </div>
    );
};


