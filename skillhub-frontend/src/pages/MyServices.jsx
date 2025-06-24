import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function MyServices(){
    const [services, setServices] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchMyServices = async () => {
            try{
                const res = await axios.get('/services/my');
                setServices(res.data);
            }catch(err){
                console.error(err.response?.data || err.message);
                alert('Could not load services. Please login again');
                localStorage.removeItem('token');
                Navigate('/login');
            }
        };

        fetchMyServices();
    },[Navigate]);

    const handleEdit = (id) =>{
        Navigate(`/edit-service/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this service?");
        if(!confirmDelete) return;

        try{
            await axios.delete(`/services/${id}`);
            services(services.filter(service => service. id !== id));
            alert("Service deleted successfully");
        }catch (err){
            console.error(err.response?.data || err.message);
            alert("Failed to delete service");
        }
    };
        
    return(
        <div>
            <h2>My Service</h2>
            {services.length === 0 ? (
                <p>You haven't added any services yet.</p>

            ) : (
                <ul>
                    {services.map((service => (
                        <li key= {service.id} style={{marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem'}}>
                            <h3>{service.title}</h3>
                            <p><strong>Category:</strong>{service.category}</p>
                            <p><strong>Price:</strong> LKR {service.price}</p>
                            <p>{service.description}</p>

                            <button onClick={() => handleEdit(service.id)} style={{marginRight: '10px'}}>Edit</button>
                            <button onClick={() => handleDelete(service.id)}>Delete</button>
                        </li>
                    )))}
                </ul>
            )}
        </div>
        
    );
}

export default MyServices;