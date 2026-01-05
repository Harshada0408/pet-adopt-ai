import { useEffect, useState } from "react";
import api from "../api/axios";
import { PawPrint } from "lucide-react";

const Home = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await api.get("/pets");
        setPets(res.data);
      } catch (error) {
        console.error("Error fetching pets", error);
      }
    };

    fetchPets();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        <PawPrint size={28} /> Available Pets
      </h1>

      {pets.length === 0 ? (
        <p>No pets available right now.</p>
      ) : (
        pets.map((pet) => (
          <div
            key={pet.id}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px"
            }}
          >
            <h3>{pet.name}</h3>
            <p>
              {pet.type} • {pet.breed}
            </p>
            <p>{pet.description}</p>
            <p>
              <b>Location:</b> {pet.location}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
