import React, { useState } from 'react'
import styled from 'styled-components'
import { auth} from './Firebase'

function Register({setUser}) {
    const [displayName, setDisplayName] = useState("");
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    

    const signUpEmail = (event, displayName, email, password) => {
        event.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
            let user = userCredential.user;
            user.updateProfile({
                displayName: displayName,
              }).then(() => {
                localStorage.setItem('user', JSON.stringify(user))
                setUser(user);
              }).catch((error) => {
                alert(error.message)
              });   
            
            }).catch((error)=>{
            alert(error.message);
        })
    }

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name === "displayName"){
            setDisplayName(value);
        }

        else if(name === 'email') {
            setEmail(value);
        }
        else if(name === 'password'){
          setPassword(value);
        }
    };
    return (
        <Container>
            <Content>
                <AmazonLogo src='https://www.pinclipart.com/picdir/big/57-576184_view-our-amazon-storefront-amazon-logo-white-png.png' />
                <h1>Sign Up for Amazon</h1>
                <Form>
                    <label htmlFor="displayName">Username</label>
                    <input type="text" name="displayName" id="displayName" value={displayName} onChange={(event) => {onChangeHandler(event)}}/>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={Email} onChange={(event) => {onChangeHandler(event)}}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={Password} onChange={(event) => {onChangeHandler(event)}}/>
                    <button type="submit" onClick={event => {signUpEmail(event, displayName, Email, Password)}}>Sign Up</button>
                </Form>
            </Content>
        </Container>
    )
}

export default Register;

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
    padding: 100px;
    background-color: #232f3e;
    color: white;
    border-radius: 5px;
    box-shadow: 0 1px 3px gray;
`
const AmazonLogo = styled.img`
    height: 100px;
    margin-bottom: 40px;
`
const Form = styled.form`
padding-top: 20px;

input{
    display: block;
    margin-top: 5px;
    margin-bottom: 15px;
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
