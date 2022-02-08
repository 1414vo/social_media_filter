import React from 'react';
import logo from './logo.svg';
import './App.css';
import CategoryBox from './components/CategoryBox';
import CategoryType from './models/CategoryType';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CategoryBox category={CategoryType.Politics}/>
        <CategoryBox category={CategoryType.News}/>
        <CategoryBox category={CategoryType.Art}/>
      </header>
    </div>
  );
}

export default App;
