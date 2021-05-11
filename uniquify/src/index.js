import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import Home from './Pages/Home';
import LandingPage from './Pages/LandingPage';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Text, Image } from 'grommet'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { StyleSheetManager } from 'styled-components';

const styles = {
  link: {
    textDecoration: 'none',
    color: 'white',
  },

}
AOS.init()
ReactDOM.render(

  <React.StrictMode>
    <Router>
      <Box direction="row" justify='between' margin={{ right: 'auto' }}>
        <Box direction='column'>
          <Link to="/" style={styles.link}>
            <Box data-aos="fade-down" direction='row-responsive' className="typewriter">
              <h1>Uniquify</h1>
            </Box>
          </Link>
        </Box>
        <Box direction='column' >
          <Link to="/compare" style={styles.link}>
            <Box
              height="xsmall"
              round='medium'
              elevation='xlarge'
              width="xsmall"
              overflow='hidden'>
              <Image src="https://cdn.shopify.com/app-store/listing_images/47509b0ae6effab2437add3d7c7dcfa9/icon/CNr7nL30lu8CEAE=.png"></Image>
            </Box>
          </Link>
        </Box>
      </Box>
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
