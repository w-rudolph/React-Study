import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Home from './home/index';
import Contact from './contact/index';
import Cnode from './cnode/index';
import Topic from './cnode/topic';

ReactDom.render((
    <Router history={hashHistory}>
        <Route path='/' component={Home}></Route>
        <Route path='/contact' component={Contact}></Route>
        <Route path='/cnode' component={Cnode}></Route>
        <Route path='/cnode/topics' component={Cnode}></Route>
        <Route path='/cnode/topic/:id' component={Topic}></Route>
    </Router>
), document.getElementById('app'));