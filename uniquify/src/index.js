import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import Home from './Pages/Home';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init()
ReactDOM.render(

  <React.StrictMode>
    <Home />

  </React.StrictMode >,
  document.getElementById('root')
);
