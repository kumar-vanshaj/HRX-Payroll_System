import { useEffect, useState } from "react";
import api from "../api/client";
import AppLayout from "../layout/AppLayout";

const stages = ["NEW","CONTACTED","PROPOSAL","WON","LOST"];

export default function CRM() {

  const [leads,setLeads] = useState([]);

  useEffect(()=>{
    api.get("/crm/leads")
       .then(r=>setLeads(r.data));
  },[]);

  const grouped = stage =>
    leads.filter(l => l.status === stage);

  return (
    <AppLayout title="CRM Pipeline">

      <div className="board">

        {stages.map(stage => (
          <div key={stage} className="column">

            <div className="column-title">
              {stage}
            </div>

            {grouped(stage).map(lead => (
              <div key={lead.id} className="lead-card">

                <div className="lead-company">
                  {lead.company_name}
                </div>

                <div className="lead-meta">
                  {lead.contact_person}
                </div>

                <div className="lead-meta">
                  Source: {lead.source}
                </div>

              </div>
            ))}

          </div>
        ))}

      </div>

    </AppLayout>
  );
}
