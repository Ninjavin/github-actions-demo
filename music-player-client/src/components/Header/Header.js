import "./Header.css";

const Header = () => {
  return (
    <header style={{ marginBottom: "15px" }}>
      <div className="logo">
        <img src="https://webscript.info/webscript-logo.png" alt="W" />
        <img src="search-icon.png" alt="Search" width="32px" />
      </div>
    </header>
  );
};

export default Header;
