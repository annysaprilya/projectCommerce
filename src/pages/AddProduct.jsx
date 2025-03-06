import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddProduct = () => {
    const [product, setProduct] = useState({
        //auto increment productId
        name: '',
        price: '',
        categoryId: '',
        image: null,
        description: '',
        stock: '',
    });

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    };

    const inputStyle = {
        marginBottom: '10px',
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            axios.post('http://10.50.0.13:3003/products', {
                name: product.name,
                price: product.price,
                categoryId: product.categoryId,
                image: product.image,
                description: product.description,
                stock: product.stock
            })
            navigate("/");
            toast.success("Product added successfully!");
        } catch (error) {
            console.log(error)
            toast.error("Error adding Product!");
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
            <div style={{ flex: '1', marginRight: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', textAlign: 'left' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Product</h2>
                <form style={formStyle} onSubmit={handleSubmit}>
                    <div style={inputStyle}>
                        <label>Product Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={(event) => setProduct({ 
                                ...product, 
                                name: event.target.value
                            })}
                            required
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={inputStyle}>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(event) => setProduct({ 
                                ...product, 
                                price: event.target.value
                            })}
                            required
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={inputStyle}>
                        <label>Category:</label>
                        <input
                            type="number"
                            name="categoryId"
                            value={product.categoryId}
                            onChange={(event) => setProduct({ 
                                ...product, 
                                categoryId: event.target.value
                            })}
                            required
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={inputStyle}>
                        <label>Image:</label>
                        <input
                            type="file"
                            name="image"
                            onChange={(event) => setProduct({ 
                                ...product, 
                                image: event.target.value
                            })}
                            required
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={inputStyle}>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={(event) => setProduct({ 
                                ...product, 
                                description: event.target.value
                            })}
                            required
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={inputStyle}>
                        <label>Stock:</label>
                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={(event) => setProduct({ 
                                ...product, 
                                stock: event.target.value
                            })}
                            required
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: '#fff', cursor: 'pointer' }}>Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
