"use client"
import { useEffect, useState } from "react";
import styles from "./candidates.module.css";
import { sendEmails } from "../../utils/sendEmails";

// Simulate async fetch
const fetchCandidates = async (requisitionId: number) => {
  const { mockCandidates } = await import("./mockCandidates");
  // Filter by requisitionId if your data supports it
  return mockCandidates.filter(
    (c: any) => String(c.requisitionId) === String(requisitionId)
  );
};

export default function CandidatesPage({ requisitionId }: { requisitionId: number }) {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reqTitle, setReqTitle] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [editedEmails, setEditedEmails] = useState<{ [id: number]: string }>({});


  useEffect(() => {
    if (!requisitionId) return;
    setLoading(true);
    fetchCandidates(requisitionId).then((data) => {
      setCandidates(data);
      setLoading(false);
      setReqTitle(data[0]?.reqTitle || "");
      setEditedEmails(
        Object.fromEntries(data.map((c: any) => [c.id, c.email || ""]))
      );
    });
  }, [requisitionId]);

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

   const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(candidates.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleEmailChange = (id: number, value: string) => {
    setEditedEmails((prev) => ({ ...prev, [id]: value }));
  };

const handleAdvance = async () => {
  const selectedCandidates = candidates.filter((c) => selectedIds.includes(c.id));
  await sendEmails(selectedCandidates, editedEmails);
  alert(
    "Advance to phone screening emails sent to: " +
    selectedCandidates.map(c => c.firstName).join(", ") +
    "."
  );
};

const allSelected = candidates.length > 0 && selectedIds.length === candidates.length;

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        Requisition : {reqTitle ? `${reqTitle}` : ""}
      </h3>
      <button
        className={styles.advanceBtn}
        onClick={handleAdvance}
        disabled={selectedIds.length === 0}
        style={{ marginTop: "1rem" }}
      >
        Advance to Phone Screening
      </button>
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                  />
                </th>
              <th className={styles.th}>First Name</th>
              <th className={styles.th}>Last Name</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Email</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c) => (
              <tr key={c.id} className={styles.tr}>
                <td className={styles.td}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(c.id)}
                    onChange={() => handleSelect(c.id)}
                  />
                </td>
                <td className={styles.td}>{c.firstName}</td>
                <td className={styles.td}>{c.lastName}</td>
                <td className={styles.td}>{c.status}</td>
                <td className={styles.td}>
                  <input
                    type="email"
                    className={styles.emailInput}
                    value={editedEmails[c.id] || ""}
                    onChange={(e) => handleEmailChange(c.id, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}