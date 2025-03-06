import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddCategory = () => {

    const [category, setCategory] = useState({
        //auto increment categoryId
        name: '',
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
            axios.post('http://10.50.0.13:3003/categories', {
                name: category.name
            })
            navigate("/");
            toast.success("Category added successfully!");
        } catch (error) {
            console.log(error)
            toast.error("Error adding Category!");
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
            <div style={{ flex: '1', marginLeft: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Category</h2>
                <form style={formStyle} onSubmit={handleSubmit}>
                    <div style={inputStyle}>
                        <label>Category Name:</label>
                        <input
                            type="text"
                            name="categoryName"
                            value={category.name}
                            onChange={(event) => setCategory({ 
                                ...category, 
                                name: event.target.value 
                            })}
                            required
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Add Category</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory