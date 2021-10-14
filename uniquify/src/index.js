import React from 'react';
import ReactDOM from 'react-dom';

import { Compare } from "./Components/Compare";

import AOS from 'aos';
import 'aos/dist/aos.css';
//remove this
import './CSS/index.css';


AOS.init()
ReactDOM.render(

  <React.StrictMode>
    <Compare />

  </React.StrictMode >,
  document.getElementById('root')
);
