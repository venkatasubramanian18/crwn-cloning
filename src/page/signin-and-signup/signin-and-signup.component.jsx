import React from 'react';

import '../signin-and-signup/signin-and-signup.styles.scss';

import SignIn from '../../components/signin/signin.component';
import SignUp from '../../components/signup/signup.component';

const SignInAndSignUpPage = () => (
    <div className='sign-in-and-sign-up'>
        <SignIn/>
        <SignUp/>
    </div>
);

export default SignInAndSignUpPage;