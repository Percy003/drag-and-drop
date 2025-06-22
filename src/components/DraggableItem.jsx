// src/components/DraggableItem.jsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './DraggableItem.module.css';

const DraggableItem = ({ id, title, description }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 1
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.item} {...attributes} {...listeners}>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default DraggableItem;
