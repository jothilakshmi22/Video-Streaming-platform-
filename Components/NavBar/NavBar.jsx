import React, { useState } from "react";
import "./NavBar.css";
import menu_icon from "../../assets/menu.png";
import search_icon from "../../assets/search.png";
import darktheme from "../../assets/darktheme.png";
import yout_logo from "../../assets/3.png";
// import yout_logo from "../../assets/2.png";

import { Link, useNavigate } from "react-router-dom";
import { API_KEY } from "../../data";

function NavBar({ setSidebar, themeChange, theme, setSearchData, searchData }) {
  const [searchValue, setSearchValue] = useState("");
  const navigation = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    //fetching video data
    const searchValue_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchValue}&key=${API_KEY}`;
    await fetch(searchValue_url)
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data.items);
        navigation(`video/search`);
      });
    setSearchValue("");
  }

  function handleInput(e) {
    setSearchValue(e.target.value);
  }

  return (
    <nav className={`flex-div ${theme ? "dark" : "white"}`}>
      <div className="nav-left flex-div">
        <img
          className="menu-icon"
          onClick={() => setSidebar((prev) => !prev)}
          src={menu_icon}
          alt=""
        />
        <Link to="/">
          <img className="logo" src={yout_logo} alt="" />
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <form className="search-box flex-div" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="search"
            value={searchValue}
            onChange={handleInput}
          />
          <img src={search_icon} alt="" />
        </form>
        <img className="theme" src={darktheme} alt="" onClick={themeChange} />
      </div>
    </nav>
  );
}

export default NavBar;
