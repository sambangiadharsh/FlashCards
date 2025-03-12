import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Flashcard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/flashcards')
      .then(response => setFlashcards(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleFlip = () => setFlipped(!flipped);
  const nextCard = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  const prevCard = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);

  if (flashcards.length === 0) return <p>Loading...</p>;

  const { question, answer } = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className={`w-80 h-48 bg-white shadow-md rounded-lg flex items-center justify-center ${flipped ? 'bg-blue-100' : 'bg-yellow-100'} transition-transform duration-500`} onClick={handleFlip}>
        <p className="text-xl font-semibold">{flipped ? answer : question}</p>
      </div>
      <div className="mt-4">
        <button onClick={prevCard} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Previous</button>
        <button onClick={nextCard} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
};

export default Flashcard;
