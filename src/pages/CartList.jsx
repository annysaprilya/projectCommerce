import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';

const CartList = () => {
    let { userId, id } = useParams();
    const storedUser = localStorage.getItem("user");
    const datauser = JSON.parse(storedUser);

    const [cartItems, setCartItems] = useState([]);
    const [cartItem, setCartItem] = useState(null);

    useEffect(() => {
        const fetchCartByUserId = async () => {
            try {
                const { data } = await axios.get(`http://10.50.0.13:3003/cart?userId=${datauser.id}`);
                setCartItems(data.data); 
                toast.success("User Cart Data Fetched");
            } catch (error) {
                console.log(error);
                toast.error("Error fetching user cart data");
            }
        };
   
            fetchCartByUserId();
 
    }, []);

    useEffect(() => {
        const fetchCartItemById = async () => {
            try {
                const { data } = await axios.get(`http://10.50.0.13:3003/cart/${id}`);
                setCartItem(data.cartItem); // Assuming the API returns a single cart item
                toast.success("Cart Item Data Fetched");
            } catch (error) {
                console.log(error);
                toast.error("Error fetching cart item data");
            }
        };
        if (id) {
            fetchCartItemById();
        }
    }, [id]);

    return (
        <div className="cart-list">
            <h2>Shopping Cart</h2>
            {!cartItems ? (
                <p>No items in the cart</p>
                
            ) : (
              cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <div className="cart-item-details">
                            <p>User ID: {item.userId}</p>
                            <p>Product ID: {item.productId}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    </div>
                ))
            )}
            {/* {cartItem && (
                <div className="cart-item">
                    <h3>Selected Cart Item</h3>
                    <div className="cart-item-details">
                        <p>User ID: {cartItem.userId}</p>
                        <p>Product ID: {cartItem.productId}</p>
                        <p>Quantity: {cartItem.quantity}</p>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default CartList;