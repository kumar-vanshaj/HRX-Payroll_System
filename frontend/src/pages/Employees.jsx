import { useEffect, useState } from "react";
import api from "../api/client";
import AppLayout from "../layout/AppLayout";
import { Link } from "react-router-dom";

export default function Employees() {

  const [rows,setRows] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    api.get("/hr/employees")
       .then(r=>setRows(r.data))
       .finally(()=>setLoading(false));
  },[]);

  return (
    <AppLayout title="Employees">

      <div className="card">

        {/* Header */}
        <div className="table-header">
          <div className="table-title">
            Employee Directory
          </div>

          <Link to="/add-employee" className="table-action">
            + Add Employee
          </Link>
        </div>

        {/* Loading */}
        {loading && <div className="empty">Loading...</div>}

        {/* Empty */}
        {!loading && rows.length === 0 && (
          <div className="empty">
            No employees found
          </div>
        )}

        {/* Table */}
        {!loading && rows.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Salary</th>
              </tr>
            </thead>

            <tbody>
              {rows.map(e => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.department}</td>
                  <td>{e.designation}</td>
                  <td>{e.base_salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>

    </AppLayout>
  );
}
