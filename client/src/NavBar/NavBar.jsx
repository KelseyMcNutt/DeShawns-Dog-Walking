
import React from "react";
import { Link } from "react-router-dom"; 
import "./NavBar.css";

export const NavBar = () => {
  return (
   
     <div className="nav">
        <ul className="logo">🐕‍🦺 🐩 DeShawn's Dog Walking</ul>
        <Link to ="/walkers"><ul className="nav-walkers">Walkers</ul></Link>
        <Link to="/"><ul className="nav-dogs"> Dogs</ul></Link>
    </div>
  )
}


