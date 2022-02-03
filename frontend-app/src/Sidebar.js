function Sidebar(props) {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            Dashboard
          </li>
          <li className="nav-item">
            Orders
          </li>
          <li className="nav-item">
            Products
          </li>
          <li className="nav-item">
            Customers
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
