import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Home from './home/index';
import Contact from './contact/index';
 
ReactDom.render((
    <Router history={hashHistory}>
        <Route path='/' component={Home}></Route>
        <Route path='/contact' component={Contact}></Route>
    </Router>
), document.getElementById('app'));