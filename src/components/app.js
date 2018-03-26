import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Home from './home/index';
import Contact from './contact/index';
import Cnode from './cnode/index';
// const Topic = import('');

// resolve => require(['./cnode/topic'], resolve);
const Topic = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./cnode/topic'))
    });
}

ReactDom.render((
    <Router history={hashHistory}>
        <Route path='/' component={Home}></Route>
        <Route path='/contact' component={Contact}></Route>
        <Route path='/cnode' component={Cnode}></Route>
        <Route path='/cnode/topics' component={Cnode}></Route>
        <Route path='/cnode/topic/:id' getComponent={Topic}></Route>
    </Router>
), document.getElementById('app'));