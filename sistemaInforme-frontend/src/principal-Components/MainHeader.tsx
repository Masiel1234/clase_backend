const MainHeader = () => (
  <header className="bg-white border-bottom p-3 d-flex justify-content-end align-items-center sticky-top">
    <div className="d-flex align-items-center gap-2">
      <div className="text-end">
        <div className="fw-bold small">Admin Usuario</div>
        <div className="text-muted" style={{ fontSize: '10px' }}>Super Admin</div>
      </div>
      <img src="https://ui-avatars.com/api/?name=Admin" className="rounded-circle border" width="40" alt="user" />
    </div>
  </header>
);

export default MainHeader;
