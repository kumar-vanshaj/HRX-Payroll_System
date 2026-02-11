import { useState } from "react";
import api from "../api/client";
import AppLayout from "../layout/AppLayout";

export default function ResumeUpload() {

  const [file,setFile] = useState(null);
  const [result,setResult] = useState(null);
  const [loading,setLoading] = useState(false);

  const send = async () => {
    if (!file) return alert("Select file first");

    const form = new FormData();
    form.append("resume", file);
    form.append("name","Demo Candidate");
    form.append("email","demo@test.com");

    try {
      setLoading(true);
      const res = await api.post("/intel/resume", form);
      setResult(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Resume Parser & Scoring">

      {/* Upload Card */}
      <div className="card">

        <div className="upload-box">
          <h3>Upload Resume </h3>

          <input
            type="file"
            onChange={e=>setFile(e.target.files[0])}
          />

          <div style={{marginTop:12}}>
            <button onClick={send} disabled={loading}>
              {loading ? "Processing..." : "Parse Resume"}
            </button>
          </div>
        </div>

      </div>

      {/* Result */}
      {result && (
        <div className="card">

          <h3>Candidate Analysis</h3>

          <div>
            Skills Detected
            <div className="badges">
              {result.skills.map(s=>(
                <div key={s} className="badge">
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className="score-box">
            Score: {result.score}
          </div>

        </div>
      )}

    </AppLayout>
  );
}
