import React, { useState } from 'react';
import Breed from './components/Breed';
import './App.css';

function App() {

	const [breeds] = useState([
		{
			id: 1,
			text: 'Abbysian',
			description: 'Cute, soft'
		},
		{
			id: 2,
			text: 'Wild Cat',
			description: 'Wild, big'
		},
		{
			id: 3,
			text: 'Syberia',
			description: 'Fluffy, soft'
		},
	]);

  return (
    <div className="App">
      <h1>Cat Browser</h1>
      <Breed breeds={breeds} />
    </div>
  );
}

export default App;
