import React, { useState } from 'react'
import styled from 'styled-components'
import { auth,  provider } from './Firebase'

function Login({ setUser }) {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const signIn = (event,email, password) => {
        event.preventDefault()
        console.log(email);
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
            let user = userCredential.user;
            localStorage.setItem('user', JSON.stringify(user))
            setUser(user);
            console.log(user)
        }) .catch((error)=>{
            alert(error.message);
        })
    }

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'email') {
            setEmail(value);
        }
        else if(name === 'password'){
          setPassword(value);
        }
    };

    const signInGoogle = () => {
        auth.signInWithPopup(provider).then((result)=>{
            let user = result.user;
            let newUser = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }
            localStorage.setItem('user', JSON.stringify(newUser))
            setUser(newUser);
        }).catch((error)=>{
            alert(error.message);
        })
    }

    return (
        <Container>
            <Content>
                <AmazonLogo src='https://www.pinclipart.com/picdir/big/57-576184_view-our-amazon-storefront-amazon-logo-white-png.png' />
                <h1>Sign into Amazon</h1>
               <Form>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={Email} onChange={(event) => {onChangeHandler(event)}}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={Password} onChange={(event) => {onChangeHandler(event)}}/>
                    <button type="submit" onClick={event => {
                    signIn(event, Email, Password)}}>Sign In</button>
                </Form>
                <LoginButton onClick={signInGoogle}>
                    Sign in with Google
                </LoginButton>
                <Register>
                    Don't have an account? <a href="/Register">Sign Up</a>
                </Register>
                
            </Content>
        </Container>
    )
}

export default Login

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #f8f8f8;
    display: grid;
    place-items: center;

`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #232f3e;
    padding: 100px;
    border-radius: 5px;
    box-shadow: 0 1px 3px gray;
    h1{
        text-align: center;
    }
`
const AmazonLogo = styled.img`
    height: 100px;
    margin-bottom: 40px;
`
const LoginButton = styled.button`
    margin-top: 5px;
    background-color: #f0c14b;
    height: 40px;
    border: 2px solid #a88734;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    display: block;
`

const Form = styled.form`
    padding-top: 20px;
    input{
        display: block;
        margin-bottom: 10px;
        width: 100%;
        padding:.375rem .75rem;
        font-size:1rem;
        font-weight:400;
        line-height:1.5;
        color:#212529;
        background-color:#fff;
        background-clip:padding-box;
        border:1px solid #ced4da;
        -webkit-appearance:none;
        -moz-appearance:none;
        appearance:none;
        border-radius:.25rem;
        transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out
    }
    button{
        margin-top: 5px;
        margin-bottom: 10px;
        display:inline-block;
        font-weight:400;
        line-height:1.5;
        color:#fff;
        background-color:#0d6efd;
        border-color:#0d6efd
        text-align:center;
        text-decoration:none;
        vertical-align:middle;
        cursor:pointer;
        user-select:none;
        border:1px solid transparent;
        padding:.375rem .75rem;
        font-size:1rem;
        border-radius:.25rem;
        transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out
    }
`

const Register = styled.span`
    margin-top: 10px;
    a{
        color: aqua;
    }
`