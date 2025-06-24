import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Web",
    price: ""
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`/services/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error(err);
        alert("Could not load service.");
        navigate("/my-services");
      }
    };

    fetchService();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/services/${id}`, form);
      alert("Service updated successfully!");
      navigate("/my-services");
    } catch (err) {
      console.error(err);
      alert("Failed to update service.");
    }
  };

  return (
    <div>
      <h2>Edit Service</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="Web">Web</option>
          <option value="Design">Design</option>
          <option value="Writing">Writing</option>
        </select>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <button type="submit">Update Service</button>
      </form>
    </div>
  );
}

export default EditService;
