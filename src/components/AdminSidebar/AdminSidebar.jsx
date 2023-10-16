import { React, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import './AdminSidebar.css';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  const AuthCtx = useContext(AuthContext);
  function handleLogout() {
    AuthCtx.onLogout();
  }

  const name = AuthCtx.data.name;
  return (<div>
    <div className="sidebar" style={{ position: "absolute" ,height:"100%",display: "block" }}>
    <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/sidebars/" />
      <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: ".bd-placeholder-img {font-size: 1.125rem;text-anchor: middle;-webkit-user-select: none;-moz-user-select: none;user-select: none;}@media (min-width: 768px) {.bd-placeholder-img-lg {  font-size: 3.5rem;}}.b-example-divider {width: 100%;height: 3rem;background-color: rgba(0, 0, 0, .1);border: solid rgba(0, 0, 0, .15);border-width: 1px 0;box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);}.b-example-vr {flex-shrink: 0;width: 1.5rem;height: 93vh;}.bi {vertical-align: -.125em;fill: currentColor;}.nav-scroller {position: relative;z-index: 2;height: 2.75rem;overflow-y: hidden;}.nav-scroller .nav {display: flex;flex-wrap: nowrap;padding-bottom: 1rem;margin-top: -1px;overflow-x: auto;text-align: center;white-space: nowrap;-webkit-overflow-scrolling: touch;}.btn-bd-primary {--bd-violet-bg: #712cf9;--bd-violet-rgb: 112.520718, 44.062154, 249.437846;--bs-btn-font-weight: 600;--bs-btn-color: var(--bs-white);--bs-btn-bg: var(--bd-violet-bg);--bs-btn-border-color: var(--bd-violet-bg);--bs-btn-hover-color: var(--bs-white);--bs-btn-hover-bg: #6528e0;--bs-btn-hover-border-color: #6528e0;--bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);--bs-btn-active-color: var(--bs-btn-hover-color);--bs-btn-active-bg: #5a23c8;--bs-btn-active-border-color: #5a23c8;}.bd-mode-toggle {z-index: 1500;}" }} />
      {/* Custom styles for this template */}
      <link href="sidebars.css" rel="stylesheet" />
      <main className="d-flex flex-nowrap">
        <h1 className="visually-hidden">Sidebars examples</h1>
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '280px' }}>
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-4" style={{ paddingLeft: "15px" }}>Attendance+</span>
          </a>
          <hr/>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link text-white" aria-current="page" >
              <svg className="bi pe-none me-2" width={16} height={16}>
                  <use xlinkHref="#home" />
                </svg>
                Add User
                </NavLink>
            </li>
            <li>
            <NavLink to="/admin/addsubject" className="nav-link text-white" aria-current="page" >
                <svg className="bi pe-none me-2" width={16} height={16}>
                  <use xlinkHref="#grid" />
                </svg>
                Add Course
              </NavLink>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/twel12.png" alt="" width={32} height={32} className="rounded-circle me-2" />
              <strong>{name}</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li><a className="dropdown-item" onClick={handleLogout}>Sign out</a></li>
            </ul>
          </div>
        </div>
        <div className=" b-example-vr" />
      </main>
    </div>
    {/* <div className="component" style={{ paddingLeft:"300px", width:"84%", paddingTop:"20px",paddingRight:"200px"}}><SignUpForm></SignUpForm></div> */}
    </div>
  );
}
export default AdminSidebar;