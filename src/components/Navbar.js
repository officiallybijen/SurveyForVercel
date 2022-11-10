import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container">
        <Link className="navbar-brand color-custom-blue" to="/">
          Home
        </Link>
        <Link className="navbar-brand text-white" to="/analysis">
          Analysis
        </Link>
        <Link className="navbar-brand text-white" to="/survey">
          Surveys
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
