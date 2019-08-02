import React from 'react';
import './App.css';
import { MealSub, SharedItems, Tax, Tip, GrandTotal, Details } from './Components/Details'



function App() {
  return (
      <div className="App">
        <header>Split Bill Calculator</header>
        <Details/>
      </div>
  );
}

export default App;
