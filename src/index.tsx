import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CategoryType from './models/CategoryType';

ReactDOM.render(
  <React.StrictMode>
    <App primary_list={[CategoryType.Academic, CategoryType.Entertainment]} secondary_list={[CategoryType.News, CategoryType.Tech, CategoryType.Business]} avoid_list={[CategoryType.Politics]}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
