import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getCartApi, getCartByIdApi } from '../../apis/cart'
import { useState } from 'react'
import { getProductByIdApi } from '../../apis/shop'
import { CartItem } from '../../../models/cart'

function Cart() {
  const { isLoading, data } = useQuery('getCart', async () => {
    return getCartByIdApi(1)
  })


    const [number, setNumber] = useState(1);
  
    const handleIncrease = () => {
      setNumber(number + 1);
    };
  
    const handleDecrease = () => {
      if (number > 1) {
      setNumber(number - 1);
      }
    }

const products : CartItem[] = data

  return (
    <>
      { products &&
        products.map((item) => (
          <div key = {item.name}>
            <div>
              <img src={item.imgSrc} style = {{maxWidth : '200px'}}alt="" />
            </div>
            <div>
              <h2>{item.name}</h2>
              <p>{item.weight * item.quantity}g</p>
            </div>
            <div>
              <p>$ {item.price * item.quantity}</p>
            </div>
            <div>
                <div>
                <button onClick={handleDecrease}>-</button>
                <p>{item.quantity}</p>
                <button onClick={handleIncrease}>+</button>
                </div>
                <div>
                  remove
                </div>
            </div>
            {item.name}
            
            </div>
        ))
      }
      <p>On Cart page</p>
    </>
  )
}

export default Cart

//Run getCart to get all of the cart.
//For each item in the cart, run through and put the id into getProductById, and then store each banana into a seperate array in a state.
//Loop through the cart items, displaying all the details from the matching item in the detailed array.
//For the price, take the price of the item and multiply it by the quantity.
//Create a combined array? Store it in state.

//Store state of total cost of cart, by going through cart items and adding up the total cost.
//When user clicks on increase/decrease quantity, run updateQuantity function.
//When user clicks on remove button for an item, run removeFromCartById
//A button that, when the user clicks will run clearCart.
//When user clicks on Checkout, clearCart() and redirect to a thank you page.
