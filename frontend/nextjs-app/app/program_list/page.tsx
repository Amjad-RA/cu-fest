"use client";

import { useEffect, useState } from "react";
import { fetchLocations } from "../programs/actions";

export default function ProgramList() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/programs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch programs");
        }

        const data = await res.json();
        setPrograms(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchLocationData = async () => {
      try {
        const res = await fetchLocations();

        if (res.data) {
          setLocations(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocationData();

    fetchPrograms();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete program");
      }

      setPrograms((prev) => prev.filter((program) => program._id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting program.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="text-4xl font-bold text-white mb-6">Program List</h1>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Description</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Start Date</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>End Date</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Location</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => (
            <tr key={program._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{program.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{program.description}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {`${new Date(program.startDate).toLocaleDateString() } ${new Date(program.startDate).toLocaleTimeString()}`}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {`${new Date(program.endDate).toLocaleDateString() } ${new Date(program.endDate).toLocaleTimeString()}`}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {locations.find((location) => location._id === program.location)?.name}
                </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button
                  onClick={() => handleDelete(program._id)}
                  style={{ backgroundColor: "#f44336", color: "#fff", border: "none", padding: "6px 12px", cursor: "pointer", borderRadius: "4px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
