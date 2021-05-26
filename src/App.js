import { useState, useEffect } from 'react'
import './App.css';
import Header from './Header'
import Cart from './Cart'
import Home from './Home'
import styled from 'styled-components'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { db, auth } from './Firebase'
import Login from './Login'
import Register from './Register';
import Checkout from './Checkout'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IllR0G9dr2kJ8HgWJGnGYJHOuEV0hU9eHOLpPzR4E0UlEaMfU7fFZAiPelOXstgsKN0hkspEz81J2XeSnermZSK00dSbHLTzk'
);

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = () => {
    db.collection('cartItems').onSnapshot((snapshot) => {
      const tempItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        product: doc.data()
      }))

      setCartItems(tempItems);
    })
  }

  const signOut = () => {
    auth.signOut().then(()=>{
        localStorage.removeItem('user')
        setUser(null)
    })
    .catch((error) => {
      console.log(error.message)
    })
  }

  // const user = auth.currentUser;

  useEffect(() => {
    getCartItems();
  }, [])

  return (
    <Router>
      
      {
        !user ? (
          <Container>
            <Switch>
              <Route path="/Register">
                <Register setUser={setUser}/>
              </Route>
              <Route path='/'>
                <Login setUser={setUser}/>
              </Route>
            </Switch>
            
          </Container>
          
        ) : (
          <Container>
            
          

            <Switch>
              <Route path="/checkout">
                    <Elements stripe={stripePromise}>
                      <Checkout cartItems={cartItems} user={user}/>
                    </Elements>
              </Route>
              
              <Route path="/cart">
                <Header signOut={signOut} user={user} cartItems={cartItems} />
                <Cart cartItems={cartItems} />
              </Route>

              <Route path="/">
                <Header signOut={signOut} user={user} cartItems={cartItems} />
                <Home />
              </Route>

            </Switch>
          </Container>
        )
      } 
    </Router>
  );
}

export default App;

const Container = styled.div`
  background-color: #EAEDED;
`