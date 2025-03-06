import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import baju from "/baju.jpg";
import Navbar from "../components/Navbar";

const DetailProduk = () => {
    let { id } = useParams();
    const [detailProduk, setDetailProduk] = useState(null);
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const isAuthenticated = !!localStorage.getItem("accessToken")
    const storedUser = localStorage.getItem("user");
    const datauser = JSON.parse(storedUser);

    const [datapost, setDataPost] = useState({
        userId: 0,
        productId: 0,
        quantity: 0,
      });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://10.50.0.13:3003/products/` + id);
                setDetailProduk(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);
    useEffect(() => {
        if (datapost.userId !== 0 && datapost.productId !== 0 && datapost.quantity !== 0) {
            postDataCart();
        }
    }, [datapost]);

    const postDataCart = async () => {
        try {
          const response = await axios.post('http://10.50.0.13:3003/cart', datapost);
          console.log('Data berhasil dikirim:', response.data);
        } catch (error) {
          console.log('Error mengirim data:', error);
        }
      };
    const addToCart = () => {
        if (detailProduk) {
            const newItem = {
                id: detailProduk.id,
                name: detailProduk.name,
                price: detailProduk.price,
                quantity: quantity
            };

            const existingItem = cart.find(item => item.id === newItem.id);
            if (existingItem) {
                setCart(cart.map(item =>
                    item.id === newItem.id ? { ...item, quantity: item.quantity + quantity } : item
                ));
            } else {
                setCart([...cart, newItem]);
            }
            const newPost={
                userId: datauser.id,
                productId: detailProduk.id,
                quantity: quantity,
            }
            setDataPost(newPost);
            // postDataCart();
            setQuantity(1);
        }
    };

    const increaseQuantity = () => {
        if (detailProduk && quantity < detailProduk.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        
        <div style={styles.container}>
            <div>
                <Navbar />

            <div>
                {detailProduk && (
                    <>
                        <div style={styles.imageBox}>
                            <img 
                                src={baju} 
                                alt={detailProduk.name} 
                                style={styles.productImage} 
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400'; }}
                            />
                        </div>
                        <div style={styles.detailBox}>
                            <h2 style={styles.title}>Detail Produk</h2>
                            <p><strong>Nama Produk:</strong> {detailProduk.name}</p>
                            <p><strong>Harga:</strong> Rp {detailProduk.price}</p>
                            <p><strong>Kategori:</strong> {detailProduk.categoryId}</p>
                            <p><strong>Deskripsi:</strong> {detailProduk.description}</p>
                            <p><strong>Stok:</strong> 
                                <span style={{ color: detailProduk.stock > 0 ? '#28a745' : '#dc3545' }}>
                                    {detailProduk.stock > 0 ? ` Tersedia (${detailProduk.stock})` : ' Stok Habis'}
                                </span>
                            </p>

                            <div>
                                {detailProduk.stock > 0 && isAuthenticated &&(
                                    <div style={styles.quantityControl}>
                                        <button onClick={decreaseQuantity} style={styles.quantityButton}>-</button>
                                        <span style={styles.quantityText}>{quantity}</span>
                                        <button onClick={increaseQuantity} style={styles.quantityButton}>+</button>
                                    </div>
                                )}
                                {detailProduk.stock > 0 && isAuthenticated &&(
                                    <button style={styles.button} onClick={addToCart}>
                                        🛒 Tambah ke Keranjang
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                )}

            </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        gap: '20px',
        padding: '20px',
    },
    imageBox: {
        flex: '1',
        maxWidth: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    productImage: {
        width: '100%',
        height: '100%',
        borderRadius: '10px'
    },
    detailBox: {
        flex: '2',
        maxWidth: '400px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
};

export default DetailProduk;