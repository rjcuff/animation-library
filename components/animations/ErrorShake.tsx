"use client";

import { useState } from "react";
import styles from "./ErrorShake.module.css";

export default function ErrorShake() {
  const [value, setValue] = useState("");
  const [shaking, setShaking] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = () => {
    if (value.trim()) {
      setHasError(false);
      return;
    }
    setHasError(true);
    setShaking(true);
  };

  return (
    <div className={styles.container}>
      {/* Input group floats in the center */}
      <div className={styles.center}>
        <div className={styles.inputGroup}>
          <input
            className={`${styles.input} ${hasError ? styles.inputError : ""} ${shaking ? styles.shaking : ""}`}
            type="text"
            placeholder="Enter your email"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (hasError && e.target.value.trim()) setHasError(false);
            }}
            onAnimationEnd={() => setShaking(false)}
          />
          {/* Slot always reserves height — no layout jump when message appears */}
          <div className={styles.errorSlot}>
            <p className={`${styles.errorMessage} ${hasError ? styles.errorMessageVisible : ""}`}>
              This field is required
            </p>
          </div>
        </div>
      </div>

      {/* Button pinned to bottom of the demo area */}
      <div className={styles.footer}>
        <button className={styles.button} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
