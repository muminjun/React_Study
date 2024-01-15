import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import EventPractice from './components/chapter04/event';
import Counter from './components/chapter08/Count';
import Info from './components/chapter08/Info';
import HideInfo from './components/chapter08/Test';
import Average from './components/chapter08/Average';
import Average_2 from './components/chapter08/Callback';
import Average_3 from './components/chapter08/Ref';
import Component from './components/chapter08/Ref_2';
import SassTest from './components/chapter09/SassTest';
import Home from './components/chapter10/pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <EventPractice /> */}
    {/* <Counter /> */}
    {/* <Info /> */}
    {/* <HideInfo /> */}
    {/* <Average /> */}
    {/* <Average_2 /> */}
    {/* <Average_3 /> */}
    {/* <Component /> */}
    {/* <SassTest /> */}
    <Home />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
