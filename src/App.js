import React from 'react';
import './App.css';

import {Switch, Route} from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './page/homepage/homepage.component'
import ShopPage from './page/shop/shop.component';


function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop' component={ShopPage}/>
      </Switch>
    </div>
  );
}

export default App;
