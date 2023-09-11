const getStoredCart = ()=>{
    const storedCartString = localStorage.getItem('cart')
    if(storedCartString){
        return JSON.parse(storedCartString)
    }
    return [];
}


const saveCartToLS = cart =>{
    const cartStringified = JSON.stringify(cart);
    localStorage.setItem('cart', cartStringified);

}

const addToLS = id => {
    const cart = getStoredCart();
    cart.push(id) 
     // save to LS  
     saveCartToLS(cart) 

}

const removeFormLS = id => {
    const cart = getStoredCart()
     // removing every id
    const remaining = cart.filter(idx => idx !== id);
    saveCartToLS(remaining)
}

export{addToLS, getStoredCart, removeFormLS}