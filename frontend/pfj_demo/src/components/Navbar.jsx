import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="pfj-navbar">
      <div className="pfj-brand">PFJ</div>

      <div className="pfj-links">
  <Link to="/journal">Journal</Link>
  <Link to="/analysis">Analysis</Link>
  <Link to="/review">Review</Link>
  <Link to="/profile">Profile</Link>
</div>

    </div>
  );
}

export default Navbar;
