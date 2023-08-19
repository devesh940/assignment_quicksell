import React from "react";
import "./header.css";
import BasicMenu from "./Dropdown";

const Header = (props) => {
  const handleGroupFromChild = (value) => {
    props.onGroupingChange(value);
  };

  const handleOrderFromChild = (value) => {
    props.onOrderingChange(value);
  };

  return (
    <>
      <div className="main_div">
        <BasicMenu
          onGroupingChange={handleGroupFromChild}
          onOrderingChange={handleOrderFromChild}
        />
      </div>
    </>
  );
};

export default Header;
