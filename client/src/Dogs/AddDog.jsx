
import { useState } from 'react';

const AddDogForm = ({ onDogAdded }) => {
  const [dogName, setDogName] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/addDog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: dogName }),
      });

      const newDog = await response.json();
      onDogAdded(newDog);
   
  
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Dog Name"
        value={dogName}
        onChange={(e) => setDogName(e.target.value)}
      />
      {/* Add input fields for other dog details */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddDogForm;
