import React from 'react';
import './App.css';

import {Switch, Route} from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './page/homepage/homepage.component'
import ShopPage from './page/shop/shop.component';
import SignInAndSignUpPage from './page/signin-and-signup/signin-and-signup.component';
import { auth, createUserProfileDocument } from './components/firebase/firebase.utils';

import {connect} from 'react-redux';
import { setCurrentUser} from '../src/redux/user/user.action';

class App extends React.Component {
  // constructor(){
  //   super();
  //   this.state = {
  //     currentUser: null
  //   }
  // }
  
  unsubscribeFromAuth =null 

  componentDidMount() {

    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShop => {
          setCurrentUser({
            currentUser: {
              id: snapShop.id,
              ...snapShop.data()
            }
          });
        });
      }
      
      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/signin' component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null,mapStateToProps)(App);
