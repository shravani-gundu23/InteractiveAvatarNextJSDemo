import styles from "./Requisition.module.css";
import RequisitionCard from "./RequisitionCard";

const requisitions = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "San Francisco",
    created: "2024-01-15",
    status: "Active",
    candidates: 39,
    newApplications: 39,
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "New York",
    created: "2024-01-10",
    status: "Active",
    candidates: 50,
    newApplications: 50,
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    created: "2024-01-08",
    status: "Active",
    candidates: 33,
    newApplications: 33,
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