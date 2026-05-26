"use client";

import AnimationCard from "@/components/AnimationCard";
import ErrorShake from "./ErrorShake";

const reactCode = `"use client";

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
    <div className={styles.wrapper}>
      <input
        className={\`\${styles.input} \${hasError ? styles.inputError : ""} \${shaking ? styles.shaking : ""}\`}
        type="text"
        placeholder="Enter your email"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (hasError && e.target.value.trim()) setHasError(false);
        }}
        onAnimationEnd={() => setShaking(false)}
      />
      <div className={styles.errorSlot}>
        <p className={\`\${styles.errorMessage} \${hasError ? styles.errorMessageVisible : ""}\`}>
          This field is required
        </p>
      </div>
      <button className={styles.button} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}`;

const cssCode = `@keyframes shake {
  0%   { transform: translateX(0); }
  15%  { transform: translateX(-7px); }
  30%  { transform: translateX(6px); }
  45%  { transform: translateX(-5px); }
  60%  { transform: translateX(4px); }
  75%  { transform: translateX(-2px); }
  90%  { transform: translateX(2px); }
  100% { transform: translateX(0); }
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 200px;
}

.input {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1.5px solid rgba(0, 0, 0, 0.12);
  background: white;
  font-size: 13.5px;
  font-family: inherit;
  color: #111;
  outline: none;
  will-change: transform;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

:global(.dark) .input {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.inputError {
  border-color: #e11d48;
  box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.1);
}

.inputError:focus {
  border-color: #e11d48;
  box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.15);
}

.shaking {
  animation: shake 400ms cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
}

.errorSlot {
  height: 16px;
  overflow: hidden;
}

.errorMessage {
  margin: 0;
  font-size: 12px;
  color: #e11d48;
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 150ms ease-out, transform 150ms ease-out;
}

.errorMessageVisible {
  opacity: 1;
  transform: translateY(0);
}

.button {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: #171717;
  color: #fff;
  font-size: 13.5px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 150ms ease, transform 100ms ease-out;
}

:global(.dark) .button {
  background: #fff;
  color: #171717;
}

@media (hover: hover) and (pointer: fine) {
  .button:hover { background: #2e2e2e; }
  :global(.dark) .button:hover { background: #e5e5e5; }
}

.button:active {
  transform: scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .shaking { animation: none; }
  .input, .button { transition: none; }
}`;

export default function ErrorShakeCard() {
  return (
    <AnimationCard
      title="Error shake"
      description="Input shakes and goes red on invalid submit"
      reactCode={reactCode}
      cssCode={cssCode}
    >
      <ErrorShake />
    </AnimationCard>
  );
}
