import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ get token
        const res = await axios.get(`/services/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` // ✅ send token
          }
        });
        setService(res.data);
      } catch (err) {
        console.error("Failed to load service:", err.response?.data || err.message);
      }
    };

    fetchService();
  }, [id]);

  if (!service) return <p>Loading...</p>;

  return (
    <div>
      <h2>{service.title}</h2>
      <p><strong>Category:</strong> {service.category}</p>
      <p><strong>Price:</strong> LKR {service.price}</p>
      <p><strong>Description:</strong> {service.description}</p>
      <p><strong>Seller:</strong> {service.User?.name || 'Unknown'}</p>
    </div>
  );
}

export default ServiceDetail;
