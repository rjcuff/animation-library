"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./CodeModal.module.css";

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  reactCode: string;
  cssCode: string;
}

type Tab = "react" | "css";

export default function CodeModal({
  isOpen,
  onClose,
  title,
  reactCode,
  cssCode,
}: CodeModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("react");
  const [copied, setCopied] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 140);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  const handleCopy = async () => {
    const code = activeTab === "react" ? reactCode : cssCode;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  if (!isOpen && !isClosing) return null;

  const code = activeTab === "react" ? reactCode : cssCode;

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ""}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.modalClosing : ""}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="code-modal-title"
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title} id="code-modal-title">
            {title}
          </h2>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M1 1l10 10M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Tab bar — tabs left, copy button right */}
        <div className={styles.tabs}>
          <div className={styles.tabGroup}>
            <button
              className={`${styles.tab} ${activeTab === "react" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("react")}
            >
              React
            </button>
            <button
              className={`${styles.tab} ${activeTab === "css" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("css")}
            >
              CSS
            </button>
          </div>

          <button
            className={`${styles.copyButton} ${copied ? styles.copyButtonCopied : ""}`}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path
                    d="M1.5 5l2.5 2.5 4.5-4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Copied
              </>
            ) : (
              "Copy"
            )}
          </button>
        </div>

        {/* Code */}
        <div className={styles.codeWrap}>
          <pre className={styles.pre}>
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
