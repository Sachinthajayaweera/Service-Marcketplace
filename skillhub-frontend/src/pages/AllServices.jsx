import { useEffect, useState } from "react";
import axios from "../api/axios";

function AllServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("/services");
        setServices(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load services");
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <h2>All Services</h2>
      {services.length === 0 ? (
        <p>No services available yet.</p>
      ) : (
        <ul>
          {services.map((service) => (
            <li
              key={service.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem"
              }}
            >
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p><strong>Category:</strong> {service.category}</p>
              <p><strong>Price:</strong> LKR {service.price}</p>
              <p><strong>Seller:</strong> {service.User?.name || "Unknown"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllServices;
