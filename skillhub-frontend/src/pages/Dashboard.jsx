import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try{
                const res =await axios.post('/profile');
                setProfile(res.data);
            }catch(err){
                alert('Unauthorized. Redirecting to login');
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    if (!profile) return <p>Loading...</p>;

    return(
        <div>
            <h2>Dashboard</h2>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>

            <button onClick={handleLogout} style={{ marginTop: '20px' }}>
                Logout
            </button>
        </div>
    );
    

    

}

export default Dashboard;