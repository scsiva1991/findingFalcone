import React, {Component} from 'react';
import ReactDOM from 'react-dom'; 
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Result from './Result';
import MainPage from './MainPage';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class App extends Component {
  render() {
    return(
      <div>
        <Header />
          {/* Route to load app main page */}
          <Route exact path={`/`} component={MainPage} />
          {/* Route to load result page */}
          <Route path={`/result/:time`} component={Result} /> 
        <Footer />
      </div>
    )
  }
}