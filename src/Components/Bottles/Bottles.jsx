import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoredCart, removeFormLS } from "../../Utilities/storage";
import Cart from "../Cart/Cart";

const Bottles = () => {

    const [bottles, setBottles]= useState([])
    const [cart, setCart] = useState([])
    useEffect(()=>{
         
        fetch('Bottle.json')
        .then(res=> res.json())
        .then(data=>setBottles(data))

    },[])

     // load cart form LS
     useEffect(()=>{
        console.log(bottles.length)
       if(bottles.length>0){
        const storedCart = getStoredCart();
         console.log(storedCart,bottles)


         const saveCart = [];
for(const id of storedCart){
     console.log(id)
     const bottle = bottles.find(bottle => bottle.id === id);
     if(bottle){
         saveCart.push(bottle)
     }
}
   console.log(saveCart);
   setCart(saveCart)

       }
     },[bottles])

    const handleAddToCard = bottle =>{
        const newCart = [...cart,bottle];
        setCart(newCart);
        addToLS(bottle.id)
    }


    const handleRemoveFromCart = id =>{
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart);
        removeFormLS(id);
    }

    return (
        <div>
            <h4>Bottles Available {bottles.length} </h4>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart} ></Cart>
          
           <div className="bottle-container">
           {
                bottles.map(bottle => <Bottle key={bottle.id} bottle={bottle} handleAddToCard={handleAddToCard}  ></Bottle> )
            }
           </div>
        </div>
    );
};

export default Bottles;