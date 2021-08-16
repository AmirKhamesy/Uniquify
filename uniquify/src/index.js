import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import Home from './Pages/Home';
import LandingPage from './Pages/LandingPage';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { StyleSheetManager } from 'styled-components';
import Header from '../../uniquify/src/Components/header'

AOS.init()
ReactDOM.render(

  <React.StrictMode>
    <Header />
    <Router>
      <Route path='/' exact component={LandingPage}></Route>
      <Route path='/compare' exact component={Home}></Route>
    </Router>
  </React.StrictMode >,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
