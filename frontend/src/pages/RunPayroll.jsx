import { useState } from "react";
import api from "../api/client";

export default function RunPayroll() {
  const [month,setMonth] = useState("");
  const [year,setYear] = useState("");

  const run = async () => {
    await api.post("/payroll/run",{month,year});
    alert("Payroll processed");
  };

  return (
    <div>
      <h2>Run Payroll</h2>

      <input placeholder="Month" onChange={e=>setMonth(e.target.value)} />
      <input placeholder="Year" onChange={e=>setYear(e.target.value)} />

      <button onClick={run}>Run</button>
    </div>
  );
}
