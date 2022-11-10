import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-img position-relative wrapper">
        <div className="position-absolute showcase">
          <h1 className="text-center text-white">Create a new form</h1>
          <div className="text-center mt-5">
            <Link
              className="btn color-custom-blue bg-dark d-inline btn-lg"
              to="/create-form"
            >
              Begin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
