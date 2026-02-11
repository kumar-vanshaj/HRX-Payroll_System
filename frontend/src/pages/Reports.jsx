import { useEffect, useState } from "react";
import api from "../api/client";
import AppLayout from "../layout/AppLayout";

export default function Reports() {

  const [payroll,setPayroll] = useState([]);

  useEffect(()=>{
    api.get("/reports/payroll-summary")
       .then(r=>setPayroll(r.data));
  },[]);

  const downloadEmployees = async () => {
    const res = await api.get("/reports/employees-csv", {
      responseType: "blob"
    });

    const url = window.URL.createObjectURL(res.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employees.csv";
    a.click();
  };

  const totalRuns = payroll.length;

  const totalNet = payroll.reduce(
    (s,r)=>s + Number(r.total_net || 0), 0
  );

  return (
    <AppLayout title="Reports & Analytics">

      {/* Summary Cards */}
      <div className="report-grid">

        <div className="report-card">
          <div className="report-title">Payroll Runs</div>
          <div className="report-value">{totalRuns}</div>
        </div>

        <div className="report-card">
          <div className="report-title">Total Net Paid</div>
          <div className="report-value">
            ₹ {totalNet.toLocaleString()}
          </div>
        </div>

        <div className="report-card">
          <div className="report-title">Exports</div>

          <div className="report-actions">
            <button onClick={downloadEmployees}>
              Download Employees CSV
            </button>
          </div>
        </div>

      </div>

      {/* Payroll Summary Table */}
      <div className="card" style={{marginTop:20}}>

        <h3>Payroll Summary</h3>

        {payroll.length === 0 && (
          <div className="empty">
            No payroll runs yet
          </div>
        )}

        {payroll.length > 0 && (
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
              {payroll.map((r,i)=>(
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
