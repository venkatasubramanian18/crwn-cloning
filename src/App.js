import React from 'react';
import './App.css';

import {Switch, Route} from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './page/homepage/homepage.component'
import ShopPage from './page/shop/shop.component';
import SignInAndSignUpPage from './page/signin-and-signup/signin-and-signup.component';
import { auth, createUserProfileDocument } from './components/firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }
  
  unsubscribeFromAuth =null 

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShop => {
          this.setState({
            currentUser: {
              id: snapShop.id,
              ...snapShop.data()
            }
          })
        });
      }
      
      this.setState({currentUser: userAuth})
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/signin' component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
