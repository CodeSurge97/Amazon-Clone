import React, {useState, useEffect} from 'react' 
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import axios from 'axios'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format';
import LockIcon from '@material-ui/icons/Lock';

      
function Checkout ({cartItems, user}) {
    
        const stripe = useStripe();
        const elements = useElements();
        const [total, setTotal] = useState(0);
        const [clientSecret, setClientSecret] = useState('');
        const [isPaymentLoading, setPaymentLoading] = useState(false);
        const [disabled, setDisabled] = useState('');
        const [address, setAddress] = useState({});
        const countries = [
        { key: 'AU', country: 'Australia'},
        { key: 'AT', country:' Austria'},
        { key: 'BE', country: 'Belgium'},
        { key: 'BR', country: 'Brazil'},
        { key: 'CA', country: 'Canada'},
        { key: 'CN', country: 'China'},
        { key: 'DK', country: 'Denmark'},
        { key: 'FI', country: 'Finland'},
        { key: 'FR', country: 'France'},
        { key: 'DE', country: 'Germany'},
        { key: 'HK', country: 'Hong Kong'},
        { key: 'IE', country: 'Ireland'},
        { key: 'IT', country: 'Italy'},
        { key: 'JP', country: 'Japan'},
        { key: 'LU', country: 'Luxembourg'},
        { key: 'MY', country: 'Malaysia'},
        { key: 'MX', country: 'Mexico'},
        { key: 'NL', country: 'Netherlands'},
        { key: 'NZ', country: 'New Zealand'},
        { key: 'NO', country: 'Norway'},
        { key: 'PL', country: 'Poland'},
        { key: 'PT', country: 'Portugal'},
        { key: 'SG', country: 'Singapore'},
        { key: 'ES', country: 'Spain'},
        { key: 'SE', country: 'Sweden'},
        { key: 'CH', country: 'Switzerland'},
        { key: 'GB', country: 'United Kingdom'},
        { key: 'US', country: 'United States'},]
        const history = useHistory();

        useEffect(() => {
      
          axios.post("http://localhost:4242/create-payment-intent", cartItems)
            
              .then(res => {
        
                setClientSecret(res.data.clientSecret);
                setTotal(res.data.amount);
        
              });
      
        }, []);

        const handleChange = async (event) => {
          const address = {};
          const {name, value} = event.currentTarget;
          if(name === 'address') {
            address.line1 = value
            }
          else if(name === 'address2'){
            address.line2 = value
            }
          else if(name === 'city'){
            address.city = value
          } 
          else if(name === 'state'){
            address.state = value
          } 
          else if(name === 'zip'){
            address.zip_code = value
          }
          else if(name === 'country'){
            address.country = value
          }
          setAddress(address)
        };
      
        const handleClick = async (event) => {
          event.preventDefault();
          const card = elements.getElement(CardElement);
          setPaymentLoading(true)
          const paymentResult = await stripe.confirmCardPayment(clientSecret,{
                    payment_method: {
                        card: card,
                        billing_details: {
                            name: user.displayName? user.displayName : user.name,
                            email: user.email,
                            address: {
                              city: address.city,
                              country: address.city,
                              line1: address.line1,
                              line2: null,
                              postal_code: address.zip_code,
                              state: address.state
                            } 
                        },
                    },
                });
                setPaymentLoading(false)
                if (paymentResult.error) {

                  alert(`Payment failed ${paymentResult.error.message}`);
            
                 
            
                } else {
            
                  if (paymentResult.paymentIntent.status ==="succeeded"){
                                 alert("Success!")
                             }
                  history.push('/');
            
                }
        };
      
        return (
      
          <Container>
            <Header>
              <HeaderLogo>
                  <Link to="/">
                      <img src={"https://i.imgur.com/7I9Was5.png"} />
                  </Link>
              </HeaderLogo>
              <CheckoutText>
                Checkout
              </CheckoutText>
              <StyledLockIcon/>
            </Header>
            
            <BillingContainer>
              <ShippingBilling>
                Shipping & Billing Information
              </ShippingBilling>
              <Form onSubmit={handleClick}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={user.email}/>  {/* ={Email} onChange={(event) => {onChangeHandler(event)}} */}
                <label htmlFor="name">Name</label>
                <input type="name" name="name" id="name" value={user.displayName? user.displayName : user.name}/> {/* ={Email} onChange={(event) => {onChangeHandler(event)}} */}
                <label htmlFor="address">Address</label>
                <input type="text" name="address" id="address" value={address.line1} onChange={(event) => {handleChange(event)}}/> 
                <label htmlFor="address2">Line 2</label>
                <input type="text" name="address2" id="address2" value={address.line2} onChange={(event) => {handleChange(event)}}/> 
                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" value={address.city}  onChange={(event) => {handleChange(event)}} />
                <StateZipContainer>
                  <label htmlFor="state">State</label>
                  <input type="text" name="state" id="state" value={address.state}  onChange={(event) => {handleChange(event)}}/> 
                  <label htmlFor="zip">Zip</label>
                  <input type="text" name="zip" id="zip" value={address.zip_code} onChange={(event) => {handleChange(event)}} />
                </StateZipContainer>
                <label htmlFor="country">Country</label>
                <select name="country" id="country" value={address.country} onChange={(event) => {handleChange(event)}}>
                  {countries.map((country) => (
                    <option value={country.key}>{country.country}</option>
                  )

                  )}
                </select>
                <PaymentInformation>
                  Payment Information
                </PaymentInformation>
                <CardContainer>
                      <NewCardElement handleChange={handleChange}/>
                      <PayButton disabled={isPaymentLoading}>
                          {isPaymentLoading ? "Loading..." : "Pay"}
                      </PayButton>
                </CardContainer>
              </Form >
            </BillingContainer>
            <ItemsContainer>
              {cartItems.map((item) => (
              <ItemContainer>
                <ImageContainer>
                    <img src={item.product.image} />
                </ImageContainer>
                <CartItemInfoTop>
                  <h2>{item.product.name.slice(0,93)}</h2>
                </CartItemInfoTop>
                <CartItemPrice>
                    ${item.product.price} x {item.product.quantity}
                    <EditedNumberFormat value={item.product.price*item.product.quantity} displayType={'text'} thousandSeparator={true} prefix={'$'} />  
                </CartItemPrice>
              </ItemContainer>))}
              <OrderSummary>
                <Subtotal>
                  Subtotal: <EditedNumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </Subtotal>
                <Shipping>Shipping: <EditedNumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Shipping>
                <Tax> Tax: <EditedNumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Tax>
                <Total>Total: <EditedNumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </Total>
              </OrderSummary>
            </ItemsContainer>
            
          </Container>
      
        )
      
}

const Container = styled.div`
`

const Header = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #555454;
`
const BillingContainer = styled.div`
  max-width: 600px;
  position: relative;
  top: 100px;
  left: 250px;
  border-radius: 4px;
  border: 1px solid #fff;
  padding: 20px 30px 30px;
  
`
const ShippingBilling = styled.p`
  margin-bottom: 10px;
`
const HeaderLogo = styled.div`
    img {
        width: 100px;
        margin-left: 11px;
    }
`
const CheckoutText = styled.span`
    color: white;
    font-size: 20px;
`
const StyledLockIcon = styled(LockIcon)`
    color: white;
    margin-right: 10px;
`
const Form = styled.form`
  padding: 30px 30px 10px;
  max-width: 570px;
  background: #fff;
    box-shadow: 0 1px 3px 0 rgba(50, 50, 93, 0.15),
      0 4px 6px 0 rgba(112, 157, 199, 0.15);
    border-radius: 4px;
  label{
    display: inline-block;
    width: 15%
  }
  input{
      margin-bottom: 10px;
      width: 84%;
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
      height: 30px;
  }
  select{
    margin-bottom: 30px;    
  }       
`
const StateZipContainer = styled.div`
  display:flex
  label:first-of-type{
    display: inline-block;
    width: 15%;
  }
  input:first-of-type{
    width: 40%;
    margin-right: 20px;
  }
  label:last-of-type{
    display: inline-block;
    width: 6.5%;
  }
  input:last-of-type{
    width: 32%;
  }
   
`
const PaymentInformation = styled.p`
  margin-bottom: 10px;
`
const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const NewCardElement = styled(CardElement)`
    background-color: white;
    padding: 10px 20px 11px;
    border-radius: 5px;
    // width: 100%;
    border: 1px solid #afafaf;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
`
const PayButton = styled.button`
    padding: 0.7rem 2rem;
    width: 100%;
    margin: 1rem 0;
    color: white;
    font-weight: bold;
    font-size: medium;
    background-color: #556cd6;
    border: 0;
    border-radius: 5px;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    transition: box-shadow 500ms;
    cursor: pointer;

`
const ItemsContainer = styled.div`
  position: fixed;
  max-width: 400px;
  height: 100%;
  top: 60px;
  right: 0;
  padding-left: 20px;
  padding-right: 20px;
  background: #fff;
  // overflow: auto;
  box-shadow: 0 2px 19px 4px rgba(0, 0, 0, 0.04);
`
const ItemContainer = styled.div`
  // max-width: 300px;
  // width: 50%;
  // float: left;
  height: 160px;
  position: relative;
  margin-top: 10px
`
const ImageContainer = styled.div`
    width: 150px;
    height: 150px;
    float: left;
    // flex-shrink: 0;
    // flex-grow: 0;
    padding-right: 6px;
    img{
        object-fit: contain;
        height: 100%;
        width: 100%;
    }
`
const CartItemInfo = styled.div`
    flex-grow: 1;
`

const CartItemInfoTop = styled.div`
    width: 40%;
    float: left;
    color: #007185;
    h2 {
        font-size: 12px;
    }
`
const CartItemPrice = styled.div`
    float: right;
    font-size: 12px;
    margin-left: 16px;
`
const OrderSummary = styled.div`
  margin-top: 40px;
  width: 100%;
  float: left;

`
const Subtotal = styled.h5`
`
const EditedNumberFormat = styled(NumberFormat)`
    float: right;
    margin-left: 10px;
`
const Shipping = styled.h5`
`
const Tax = styled.h5`
`
const Total = styled.h4`
`
export default Checkout
