import { useState, useRef, useEffect } from "react";
import DropdownBox from "@/components/atoms/DropdownMenu/DropdownMenu";
import DropdownButton from "@/components/atoms/DropdownButton/DropdownButton";

const Dropdown = ({ type, selectedGenre, genreList }) => {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const dropDownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Close dropdown when click outside dropdown box
    const checkIfClickedOutside = (e) => {
      if (
        isDropdownOpen &&
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target)
      ) {
        setIsDropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    // Prevent user from scrolling (for when mobile list is open)
    document.body.classList.toggle("no-scroll", isDropdownOpen);
  }, [isDropdownOpen]);

  return (
    <div>
      <DropdownButton
        toggleDropdown={toggleDropdown}
        name={selectedGenre.name}
      />
      <DropdownBox
        isDropdownOpen={isDropdownOpen}
        genreList={genreList}
        selectedGenre={selectedGenre}
        type={type}
        dropdownRef={dropDownRef}
        toggleDropdown={toggleDropdown}
      />
    </div>
  );
};

export default Dropdown;
