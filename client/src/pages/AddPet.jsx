import { useState } from "react";
import api from "../api/axios";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddPet = () => {
  const [form, setForm] = useState({
    name: "",
    type: "dog",
    breed: "",
    age: "",
    location: "",
    description: "",
    reason: "",
    useAI: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const generateWithAI = async () => {
    try {
      const res = await api.post("/ai/generate-description", {
        name: form.name,
        type: form.type,
        breed: form.breed,
        age: form.age,
        reason: form.reason
      });

      setForm({ ...form, description: res.data.description });
      alert("AI description generated!");
    } catch (error) {
      alert("AI generation failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/pets", form);
      alert("Pet added successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add pet");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Pet for Adoption 🐾</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Pet Name"
          onChange={handleChange}
          required
        /><br /><br />

        <select name="type" onChange={handleChange}>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select><br /><br />

        <input
          name="breed"
          placeholder="Breed"
          onChange={handleChange}
        /><br /><br />

        <input
          name="age"
          placeholder="Age"
          onChange={handleChange}
        /><br /><br />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
        /><br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
        /><br /><br />

        <input
          name="reason"
          placeholder="Reason for adoption (for AI)"
          onChange={handleChange}
        /><br /><br />

        <button type="button" onClick={generateWithAI}>
          <Sparkles size={16} /> Generate with AI
        </button>

        <br /><br />

        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
};

export default AddPet;
