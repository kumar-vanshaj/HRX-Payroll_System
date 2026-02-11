import { useEffect, useState } from "react";
import api from "../api/client";
import AppLayout from "../layout/AppLayout";

export default function AddEmployee() {

  const [users,setUsers] = useState([]);
  const [depts,setDepts] = useState([]);

  const [form,setForm] = useState({
    user_id:"",
    department_id:"",
    designation:"",
    join_date:"",
    base_salary:""
  });

  // load dropdown data
  useEffect(()=>{
    api.get("/hr/users").then(r=>setUsers(r.data));
    api.get("/hr/departments").then(r=>setDepts(r.data));
  },[]);

  const submit = async () => {
    await api.post("/hr/employees", form);
    alert("Employee created");
  };

  return (
    <AppLayout title="Add Employee">

      <div className="form-card">
        <div className="form-grid">

          {/* USER DROPDOWN */}
          <div className="form-group">
            <label>User</label>
            <select
              value={form.user_id}
              onChange={e=>setForm({...form,user_id:e.target.value})}
            >
              <option value="">Select user</option>
              {users.map(u=>(
                <option key={u.id} value={u.id}>
                  {u.email} (id:{u.id})
                </option>
              ))}
            </select>
          </div>

          {/* DEPARTMENT DROPDOWN */}
          <div className="form-group">
            <label>Department</label>
            <select
              value={form.department_id}
              onChange={e=>setForm({...form,department_id:e.target.value})}
            >
              <option value="">Select department</option>
              {depts.map(d=>(
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group full">
            <label>Designation</label>
            <input
              onChange={e=>setForm({...form,designation:e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Join Date</label>
            <input
              type="date"
              onChange={e=>setForm({...form,join_date:e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Base Salary</label>
            <input
              onChange={e=>setForm({...form,base_salary:e.target.value})}
            />
          </div>

        </div>

        <div className="form-actions">
          <button onClick={submit}>Save Employee</button>
        </div>

      </div>

    </AppLayout>
  );
}
