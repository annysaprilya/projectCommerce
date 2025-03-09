import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import toast from 'react-hot-toast';

const CartList = () => {
    const storedUser = localStorage.getItem("user");
    const datauser = JSON.parse(storedUser);

    const [cartItems, setCartItems] = useState(null);
    const [detailProducts, setDetailProducts] = useState([]);

    // GET list cart by User ID
    const fetchCartTotalByProductId = async () => {
        try {
            console.log("User id: " + datauser.id)
            const { data } = await axios.get(`http://localhost:3003/cart?userId=${datauser.id}`);
            const productTotals = data.reduce((acc, item) => {
                if (!acc[item.productId]) {
                    acc[item.productId] = { ...item, quantity: 0 };
                }
                acc[item.productId].quantity += item.quantity;
                return acc;
            }, {});
            console.log("Data produk awal: " + JSON.stringify(Object.values(productTotals)))
            setCartItems(Object.values(productTotals));
        } catch (error) {
            console.log('Error fetching cart items:', error);
        }
    };

    useEffect(() => { 
        fetchCartTotalByProductId();
    }, []);

    // GET detail data product, untuk menampilkan nama, price, dll
    useEffect(() => {
        const fetchDetailProducts = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3003/products`);
                setDetailProducts(data);
            } catch (error) {
                console.log('Error fetching product details:', error);
            }
        };
        fetchDetailProducts();
    }, []);

    // PUT quantity di cart list
    const updateQuantity = async (productId, quantity, cartId) => {
        console.log("product id updt: " + productId);
        console.log("quantity updt: " + quantity);
        console.log("cart id:" + cartId)
        try {
            const response = await axios.put(`http://localhost:3003/cart/${cartId}`, {
                userId: datauser.id,
                productId: productId,
                quantity: quantity
            });
            console.log("Update..... : "+JSON.stringify(response.data));
            fetchCartTotalByProductId()
        } catch (error) {
            console.log('Error updating quantity:', error);
        }
    };

    const increaseQuantity = (productId, cartId) => {
        console.log("product id increase:" + productId)
        setCartItems(cartItems.map(item => 
            item.productId === productId && item.quantity < detailProducts.find(product => product.id === productId).stock
                ? { ...item, quantity: Number(item.quantity) + 1 }
                : item
        ));
        const updatedItem = cartItems.find(item => item.productId === productId);
        updateQuantity(productId, Number(updatedItem.quantity) + 1, cartId);
    };

    const decreaseQuantity = (productId, cartId) => {
        console.log("product id decrease:" + productId)
        let qty;
        setCartItems(cartItems.map(item =>  
            item.productId === productId && item.quantity < detailProducts.find(product => product.id === productId).stock
                ? { ...item, quantity: Number(item.quantity) - 1 }
                : item
        ));
        const updatedItem = cartItems.find(item => item.productId === productId);
        updateQuantity(productId, Number(updatedItem.quantity) - 1, cartId);
    };

    // DELETE list di cart by Cart ID
    const handleDelete = async (cartId) => {
        console.log("cart id delete:" + cartId)
        try {
            await axios.delete(`http://localhost:3003/cart/${cartId}`);
            toast.success('Data Berhasil dihapus');
            setCartItems((prevItems) => prevItems.filter(item => item.id !== cartId));
        } catch (error) {
            console.log(error);
            toast.error('Gagal menghapus data');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="cart-list" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Shopping Cart</h2>
                {!cartItems ? (
                    <p style={{ textAlign: 'center', color: 'gray' }}>No items in the cart</p>
                ) : (
                    cartItems.map((cartItem, index) => {
                        const productDetail = detailProducts.find(product => product.id === cartItem.productId);
                        return (
                            <div key={index} className="cart-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
                                <div className="cart-item-details" style={{ flex: '1' }}>
                                    <p><strong>Product Name:</strong> {productDetail ? productDetail.name : 'Loading...'}</p>
                                    <p><strong>Quantity:</strong> {cartItem.quantity}</p>

                                    {productDetail && productDetail.stock > 0 && (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <button onClick={() => decreaseQuantity(cartItem.productId, cartItem.id)} style={{ margin: '0 5px' }}>-</button>
                                            <span>{cartItem.quantity}</span>
                                            <button onClick={() => increaseQuantity(cartItem.productId, cartItem.id)} style={{ margin: '0 5px' }}>+</button>
                                            <button onClick={() => handleDelete(cartItem.id)} style={{ margin: '0 5px'}}>Delete</button>
                                        </div>
                                    )}

                                    <p><strong>Total Price:</strong> {productDetail ? (productDetail.price * cartItem.quantity).toFixed(2) : 'Loading...'}</p>

                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default CartList;