import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function AddService() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post('/services',{
                title,
                description,
                category,
                price,
            });
            alert('Service added successfully!');
            Navigate('/dashboard');
        }catch(err){
            alert('Failed to add service.');
            console.log(err.response?.data || err.message);
        }
    };

    return(
        <div>
            <h2>Add New Service</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} reqyired />

                <textarea
                placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required/>

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="web">Web</option>
                    <option value="Design">Design</option>
                    <option value="writing">Writing</option>
                </select>

                <input type="number" placeholder="Price (LKR)" value={price} onChange={(e) => setPrice(e.target.value)} required/>

                <button type="submit">Add Service</button>
            </form>
        </div>
    );
}

export default AddService;