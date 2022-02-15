import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CategoryType from './models/CategoryType';

ReactDOM.render(
  <React.StrictMode>
    <App categories={[CategoryType.Politics, CategoryType.Academic, CategoryType.Comedy, CategoryType.Art, CategoryType.Inspirational, CategoryType.Music]}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
