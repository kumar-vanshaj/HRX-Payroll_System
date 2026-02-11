import AppLayout from "../layout/AppLayout";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard">

      {/* Stat Cards */}
      <div className="grid-4">

        <div className="stat-card">
          <div className="stat-title">Total Employees</div>
          <div className="stat-value">42</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Active Leads</div>
          <div className="stat-value">18</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Payroll Runs</div>
          <div className="stat-value">6</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Attrition Risk Alerts</div>
          <div className="stat-value">3</div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3>Quick Actions</h3>

        <div className="quick-actions">
          <Link to="/add-employee" className="quick-btn">
            Add Employee
          </Link>

          <Link to="/run-payroll" className="quick-btn">
            Run Payroll
          </Link>

          <Link to="/add-lead" className="quick-btn">
            Add Lead
          </Link>

          <Link to="/resume" className="quick-btn">
            Parse Resume
          </Link>
        </div>
      </div>

    </AppLayout>
  );
}
