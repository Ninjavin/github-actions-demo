import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <img
        src="search-icon.png"
        alt="search-icon"
        width="20px"
        style={{ marginRight: "5px" }}
      />
      <input className="search-input" placeholder="Find your music" />
    </div>
  );
};

export default SearchBar;
