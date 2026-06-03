import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Navbar() {
  const logout = useAuthStore(
    (state) => state.logout
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Navbar;