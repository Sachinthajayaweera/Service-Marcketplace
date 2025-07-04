import { useEffect, useState } from "react";
import axios from "../api/axios";

function AllServices() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchServices();
  }, [search, category]);

  const fetchServices = async () => {
    try {
      const res = await axios.get("/services", {
        params: { search, category }
      });
      setServices(res.data);
    } catch (err) {
      console.error("Failed to load services:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>All Services</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: '1rem' }}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Design">Design</option>
          <option value="Development">Development</option>
          <option value="Marketing">Marketing</option>
          {/* Add more categories based on your data */}
        </select>
      </div>

      {services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <ul>
          {services.map(service => (
            <li key={service.id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
              <h3>{service.title}</h3>
              <p><strong>Category:</strong> {service.category}</p>
              <p><strong>Price:</strong> LKR {service.price}</p>
              <p>{service.description}</p>
              <p><strong>Seller:</strong> {service.User?.name || 'Unknown'}</p>

              {/* <Link to={`/services/${service.id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
                View More
              </Link> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllServices;
