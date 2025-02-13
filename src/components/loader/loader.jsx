import React from "react";
import "./loader.css";
function Loader() {
  return (
    <div>
      {" "}
      <div className="main_loader_container">
        {/* <div className="loader"></div> */}
        <svg className="loader_svg" viewBox="25 25 50 50">
  <circle className="cercle_loader" r="20" cy="50" cx="50"></circle>
</svg>
        
      </div>
    </div>
  );
}

export default Loader;
