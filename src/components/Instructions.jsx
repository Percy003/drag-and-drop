// src/components/Instructions.jsx
import React from 'react';
import styles from './Instructions.module.css';

const Instructions = () => (
  <div className={styles.instructions}>
    <p><strong>Instructions:</strong> Drag and drop items to reorder them. Use keyboard arrows while focusing an item to move it. Click “Reset” to restore original order.</p>
  </div>
);

export default Instructions;
