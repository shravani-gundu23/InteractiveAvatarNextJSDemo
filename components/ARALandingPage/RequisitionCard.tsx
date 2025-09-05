"use client";
import CandidatesPage from "../candidates/candidates";
import { useState } from "react";
import styles from "./Requisition.module.css";

interface Requisition {
  id: number;
  title: string;
  department: string;
  location: string;
  created: string;
  status: string;
  candidates: number;
  newApplications: number;
}

export default function RequisitionCard({
  requisition,
  onShowCandidates,
}: {
  requisition: Requisition;
  onShowCandidates: (id: number) => void;
}) {
  const handleNewApplicationsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onShowCandidates(requisition.id);
  };


  return (
    <div className={styles.card}>
      <div>
        <div className={styles.titleRow}>
          {requisition.title}
          <span className={styles.status}>{requisition.status}</span>
          <span className={styles.candidates}>{requisition.candidates} candidates</span>
        </div>
        <div className={styles.department}>
          {requisition.department} • {requisition.location}
        </div>
        <div className={styles.created}>
          Created: {requisition.created}
        </div>
        <div>
          <a
            href="#"
            className={styles.newApplications}
            onClick={handleNewApplicationsClick}
          >
            {requisition.newApplications} new applications
          </a>
        </div>
      </div>
      <button className={styles.pipelineBtn}>
        View Pipeline
      </button>
    </div>
  );
}