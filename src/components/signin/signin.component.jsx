import React from 'react';

import './singin.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle} from '../../components/firebase/firebase.utils';

class SignIn extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({email: '', password: ''})
    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({[name]: value});
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' 
                        type='email' 
                        value={this.state.email}
                        label='email'
                        handleChange={this.onChange}
                        />
                    <FormInput name='password'
                        type='password' 
                        value={this.state.password}
                        label='password'
                        handleChange={this.onChange}
                        />
                    <div className='button'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            {' '}
                            Sign in with Google {' '}
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;