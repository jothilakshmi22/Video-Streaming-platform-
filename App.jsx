import React, { useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import { Route, Routes } from "react-router-dom";
import Search from "./Components/Search/Search";
import SearchVideo from "./Pages/SearchVideo/SearchVideo";

function App() {
  const [sidebar, setSidebar] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [theme, setTheme] = useState(true);
  function themeChange() {
    setTheme(!theme);
  }
  return (
    <>
      <NavBar
        setSidebar={setSidebar}
        themeChange={themeChange}
        theme={theme}
        setSearchData={setSearchData}
        searchData={searchData}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              sidebar={sidebar}
              theme={theme}
              searchData={searchData}
              setSearchData={setSearchData}
            />
          }
        />
        <Route
          path="/video/:categoryId/:videoId"
          element={<Video theme={theme} searchData={searchData} />}
        />
        <Route
          path="/video/search/:videoId"
          element={<SearchVideo theme={theme} />}
        />
        <Route
          path="/video/search"
          element={<Search theme={theme} searchData={searchData} />}
        />
      </Routes>
    </>
  );
}

export default App;
