import { useState, useEffect } from "react"
import { getDogDetails } from "../apiManager"
import { useParams } from "react-router-dom";

export const DogDetails = () => {
    const { dogId } = useParams();
    const [dogDetails, setDogDetails] = useState(null);
  

    useEffect(() => {
        const fetchDogDetails = async () => {
          const details = await getDogDetails(dogId);
          setDogDetails(details);
        };
    
        fetchDogDetails();
    } , [dogId])
        


    return (
        <div>
            <h2>Dog Details</h2>
            <p>Name: {dogDetails?.name}</p>
            <p>Walker Name: {dogDetails?.walker.name}</p>
        </div>
    );
    

}