import styles from "./Requisition.module.css";
import RequisitionCard from "./RequisitionCard";
import { mockCandidates } from "../candidates/mockCandidates";

const requisitions = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "San Francisco",
    created: "2025-09-05",
    status: "Active",
    candidates: mockCandidates.filter(c => c.requisitionId === 1).length,
    newApplications: mockCandidates.filter(
      c => c.requisitionId === 1 && c.status === "New Application"
    ).length,
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "New York",
    created: "2025-09-05",
    status: "Active",
    candidates: mockCandidates.filter(c => c.requisitionId === 2).length,
    newApplications: mockCandidates.filter(
      c => c.requisitionId === 2 && c.status === "New Application"
    ).length,
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    created: "2025-09-05",
    status: "Active",
    candidates: mockCandidates.filter(c => c.requisitionId === 3).length,
    newApplications: mockCandidates.filter(
      c => c.requisitionId === 3 && c.status === "New Application"
    ).length,
  },
];

export default function RequisitionList({ onShowCandidates}: any) {
    return (
    <div className={styles.list}>
      {requisitions.map((req) => (
        <RequisitionCard
          key={req.id}
          requisition={req}
          onShowCandidates={onShowCandidates}
        />
      ))}
    </div>
  );
}