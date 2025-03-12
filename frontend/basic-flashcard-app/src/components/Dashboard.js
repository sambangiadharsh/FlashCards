import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/flashcards')
      .then(response => setFlashcards(response.data))
      .catch(error => console.error(error));
  }, []);

  const addFlashcard = () => {
    axios.post('http://localhost:5000/api/flashcards', { question, answer })
      .then(() => {
        setFlashcards([...flashcards, { question, answer }]);
        setQuestion('');
        setAnswer('');
      })
      .catch(error => console.error(error));
  };

  const deleteFlashcard = (id) => {
    axios.delete(`http://localhost:5000/api/flashcards/${id}`)
      .then(() => setFlashcards(flashcards.filter(fc => fc.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Question" className="border p-2 mr-2" />
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Answer" className="border p-2 mr-2" />
        <button onClick={addFlashcard} className="bg-green-500 text-white px-4 py-2 rounded">Add Flashcard</button>
      </div>
      <ul>
        {flashcards.map(fc => (
          <li key={fc.id} className="mb-2">
            {fc.question} - {fc.answer}
            <button onClick={() => deleteFlashcard(fc.id)} className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
