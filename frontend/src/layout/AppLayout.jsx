import { Link } from "react-router-dom";

export default function AppLayout({ title, children }) {
  return (
    <div className="app">

      <div className="sidebar">
        <h2>HRMS</h2>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/add-employee">Add Employee</Link>
        <Link to="/payroll">Payroll</Link>
        <Link to="/crm">CRM</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/resume">Resume Parser</Link>
      </div>

      <div className="main">

        <div className="topbar">
          <div className="page-title">{title}</div>
        </div>

        <div style={{marginTop:20}}>
          {children}
        </div>

      </div>
    </div>
  );
}
