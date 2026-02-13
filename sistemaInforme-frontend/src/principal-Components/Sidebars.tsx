const Sidebar: React.FC = () => {
  return (
    <div className="sidebar p-3">
      <h4 className="text-white mb-4">
        <i className="bi bi-box"></i> Dashboard
      </h4>

      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link text-light" href="#">Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">Inventarios</a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
