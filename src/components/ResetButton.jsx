// src/components/ResetButton.jsx
import React from 'react';
import styles from './ResetButton.module.css';

const ResetButton = ({ onClick }) => (
  <button className={styles.button} onClick={onClick}>
    Reset List
  </button>
);

export default ResetButton;
