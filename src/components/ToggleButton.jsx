import React from "react";

const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <div
      className={`relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in`}
    >
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        checked={isOn}
        onChange={handleToggle}
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        style={{
          left: isOn ? "calc(100% - 1.5rem)" : "0",
        }}
      />
      <label
        htmlFor="toggle"
        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
          isOn ? "bg-primary-dark" : "bg-primary"
        }`}
      ></label>
    </div>
  );
};

export default ToggleSwitch;
