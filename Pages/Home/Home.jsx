import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Feed from "../../Components/Feed/Feed";
import Search from "../../Components/Search/Search";
function Home({ sidebar, theme, searchData, setSearchData }) {
  const [category, setCategory] = useState(0);
  return (
    <>
      <Sidebar
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
        theme={theme}
      />
      <div
        className={`container ${theme ? "dark" : "white"} ${
          sidebar ? "large-container" : ""
        }`}
      >
        {searchData && <Search theme={theme} searchData={searchData} />}
        {category >= 0 && (
          <Feed
            category={category}
            theme={theme}
            setSearchData={setSearchData}
          />
        )}
      </div>
    </>
  );
}

export default Home;
