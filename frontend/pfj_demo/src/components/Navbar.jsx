import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="pfj-navbar">
      <div className="pfj-brand">PFJ</div>

      <div className="pfj-links">
        <Link to="/">Journal</Link>
        <Link to="/analysis">Analysis</Link>
      </div>
    </div>
  );
}

export default Navbar;
