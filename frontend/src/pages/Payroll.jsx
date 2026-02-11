import { useEffect, useState } from "react";
import api from "../api/client";
import AppLayout from "../layout/AppLayout";

export default function Payroll() {

  const [rows,setRows] = useState([]);
  const [month,setMonth] = useState("");
  const [year,setYear] = useState("");
  const [loading,setLoading] = useState(false);

  const load = () => {
    api.get("/reports/payroll-summary")
       .then(r=>setRows(r.data));
  };

  useEffect(load, []);

  const runPayroll = async () => {
    if (!month || !year) {
      return alert("Enter month and year");
    }

    try {
      setLoading(true);
      await api.post("/payroll/run", { month, year });
      alert("Payroll processed");
      load(); // refresh table
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Payroll Processing">

      {/* Run Payroll Card */}
      <div className="card">

        <h3>Run Monthly Payroll</h3>

        <div className="toolbar">

          <div className="form-group">
            <label>Month</label>
            <input
              placeholder="e.g. 2"
              value={month}
              onChange={e=>setMonth(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Year</label>
            <input
              placeholder="2026"
              value={year}
              onChange={e=>setYear(e.target.value)}
            />
          </div>

          <button onClick={runPayroll} disabled={loading}>
            {loading ? "Running..." : "Run Payroll"}
          </button>

        </div>

      </div>

      {/* Summary Table */}
      <div className="card" style={{marginTop:20}}>

        <h3>Payroll Summary</h3>

        {rows.length === 0 && (
          <div className="empty">
            No payroll runs yet
          </div>
        )}

        {rows.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Month</th>
                <th>Total Gross</th>
                <th>Total Net</th>
                <th>Total Tax</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r,i)=>(
                <tr key={i}>
                  <td>{r.year}</td>
                  <td>{r.month}</td>
                  <td>{r.total_gross}</td>
                  <td>{r.total_net}</td>
                  <td>{r.total_tax}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>

    </AppLayout>
  );
}
