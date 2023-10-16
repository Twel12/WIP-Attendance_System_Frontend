import { useContext, React } from "react";
import AuthContext from "../../store/auth-context";
import { Box } from "@mui/material";

const Header = () => {
  const AuthCtx = useContext(AuthContext);
  function handleLogout() {
    AuthCtx.onLogout();
  }
  return (
    <Box>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        id="Header"
        style={{
          paddingLeft: "18px",
          paddingRight: "10px",
          backgroundColor: "RGBA(33,37,41,var(--bs-bg-opacity,1))!important",
          color: "white",
          fontSize: "28px",
        }}
      >
        <a
          className="navbar-brand"
          href="#"
          style={{ color: "white", fontSize: "28px" }}
        >
          Attendance+
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Box className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"></ul>
          <form className="form-inline my-2 my-lg-0">
            {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input> */}
          </form>
        </Box>
        <button
          className="btn btn-outline-danger my-2 my-sm-0"
          type="submit"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </nav>
    </Box>
  );
};

export default Header;
