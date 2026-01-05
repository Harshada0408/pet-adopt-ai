// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <nav
//       style={{
//         padding: "10px 20px",
//         borderBottom: "1px solid #ddd",
//         display: "flex",
//         justifyContent: "space-between"
//       }}
//     >
//       <Link to="/">🐾 PetAdoptAI</Link>

//       <div>
//         {token ? (
//           <>
//             <Link to="/add-pet" style={{ marginRight: "12px" }}>
//               Add Pet
//             </Link>
//             <button onClick={logout}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" style={{ marginRight: "12px" }}>
//               Login
//             </Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  // This "listens" for page changes. 
  // When you redirect from Login -> Home, this triggers and updates the buttons.
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        {/* Left Side: Logo */}
        <Link to="/" style={logoStyle}>🐾 PetAdoptAI</Link>

        {/* Right Side: Navigation Buttons */}
        <div style={navGroupStyle}>
          
          {/* 1. Add Pet Button (Always visible, but ProtectedRoute will handle security) */}
          <Link to="/add-pet" style={addPetBtn}>+ Add Pet</Link>

          {/* 2. Toggle between Login and Logout */}
          {!token ? (
            <Link to="/login" style={loginBtn}>Login</Link>
          ) : (
            <button onClick={handleLogout} style={logoutBtn}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- STYLING (Internal to keep it simple) ---
const navStyle = { width: '100%', borderBottom: '1px solid #eee', padding: '15px 0', backgroundColor: '#fff' };
const containerStyle = { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' };
const logoStyle = { fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: '#2563eb' };
const navGroupStyle = { display: 'flex', gap: '15px', alignItems: 'center' };
const addPetBtn = { textDecoration: 'none', color: '#2563eb', fontWeight: '600', border: '1px solid #2563eb', padding: '8px 16px', borderRadius: '6px' };
const loginBtn = { textDecoration: 'none', backgroundColor: '#2563eb', color: '#fff', padding: '8px 20px', borderRadius: '6px', fontWeight: '600' };
const logoutBtn = { backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' };

export default Navbar;