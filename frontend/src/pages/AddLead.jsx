import { useState } from "react";
import api from "../api/client";

export default function AddLead() {

  const [form,setForm] = useState({
    company_name:"",
    contact_person:"",
    status:"NEW",
    source:"",
    assigned_to:""
  });

  const submit = async () => {
    await api.post("/crm/leads",form);
    alert("Lead created");
  };

  return (
    <div>
      <h2>Add Lead</h2>

      <input placeholder="Company"
        onChange={e=>setForm({...form,company_name:e.target.value})} />

      <input placeholder="Contact"
        onChange={e=>setForm({...form,contact_person:e.target.value})} />

      <input placeholder="Source"
        onChange={e=>setForm({...form,source:e.target.value})} />

      <input placeholder="Assigned User ID"
        onChange={e=>setForm({...form,assigned_to:e.target.value})} />

      <button onClick={submit}>Save</button>
    </div>
  );
}
