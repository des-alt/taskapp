import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <header>
      <h1>Task Manager</h1>
      <section>
        <button>All Tasks</button>
        <button>Search by Title</button>
      </section>
    </header>
  );
};

export default Header;
