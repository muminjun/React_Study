import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SelectFruit from './chapter11/Select';
import SignUp from './chapter11/SignUp';
import Calculator from './chapter12/Calculator';
import SignUpPage from './SignUp/SignUp';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <SelectFruit /> */}
    {/* <Calculator /> */}
    {/* <SignUp /> */}
    <SignUpPage />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
