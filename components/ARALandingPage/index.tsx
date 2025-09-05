"use client";
import styles from "../../styles/Home.module.css";
import RequisitionList from "./RequisitionList";
import { useState } from "react";
import CandidatesPage from "../candidates/candidates";


export default function ARALandingPage() {
  const [showCandidates, setShowCandidates] = useState(false);
  const [selectedRequisitionId, setSelectedRequisitionId] = useState<number | null>(null);

  const handleShowCandidates = (requisitionId: number) => {
    setSelectedRequisitionId(requisitionId);
    setShowCandidates(true);
  };

  const handleBackToRequisitions = () => {
    setShowCandidates(false);
    setSelectedRequisitionId(null);
  };

  return (
    <div className={styles.bg}>
      <header className={styles.header}>
        <div className={styles.logoRow}>
          <div className={styles.logoBox}>
            <span role="img" aria-label="logo" className={styles.logoIcon}>👤</span>
          </div>
          <div>
            <div className={styles.brand}>ARA</div>
            <div className={styles.subBrand}>Autonomous Recruiting Agent</div>
          </div>
        </div>
        <div>
          <span className={styles.aiActive}>✓ AI Active</span>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.topRow}>
          <div>
            <h1 className={styles.welcome}>Welcome to ARA</h1>
            <div>
              <span className={styles.highlight}>
                Manage your open requisitions or start a new one
              </span>
            </div>
          </div>
        </div>
        
        {/* <RequisitionList /> */}
      <div>
      {!showCandidates ? (
        <div>
          <h2 className={styles.openReqs}>Open Requisitions</h2>
          <RequisitionList onShowCandidates={handleShowCandidates} />
        </div>
      ) : (
        <div>
          <h2 className={styles.openReqs}>Applications</h2>
          <CandidatesPage requisitionId={selectedRequisitionId!} />
          <button onClick={handleBackToRequisitions}>← Back to Requisitions</button>
        </div>
      )}
    </div>
      </main>
    </div>
  );
}