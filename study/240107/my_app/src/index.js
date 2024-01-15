import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SignUpDialog from './chapter13/Dialog';
import ProfileCard from './chapter13/ProfileCard';
import DarkOrLight from './chapter14/DarkOrLight';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <SignUpDialog /> */}
    {/* <ProfileCard /> */}
    {/* <DarkOrLight /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
