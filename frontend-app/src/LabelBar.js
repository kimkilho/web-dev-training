function LabelBar(props) {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="#">Dogs</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Cats</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default LabelBar;
