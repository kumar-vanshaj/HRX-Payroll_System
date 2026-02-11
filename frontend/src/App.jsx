import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Payroll from "./pages/Payroll";
import CRM from "./pages/CRM";
import Reports from "./pages/Reports";
import ResumeUpload from "./pages/ResumeUpload";
import AddEmployee from "./pages/AddEmployee";
import RunPayroll from "./pages/RunPayroll";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/payroll" element={<Payroll />} />
      <Route path="/crm" element={<CRM />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/resume" element={<ResumeUpload />} />
      <Route path="/add-employee" element={<AddEmployee />} />
      <Route path="run-payroll" element={<RunPayroll/>}/>
    </Routes>
  );
}
