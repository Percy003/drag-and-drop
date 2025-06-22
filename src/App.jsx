import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { initialItems } from './data/items';
import DraggableItem from './components/DraggableItem';
import Instructions from './components/Instructions';
import ResetButton from './components/ResetButton';
import styles from './App.module.css';

function App() {
  
  const [items, setItems] = useState(() => {
  const savedItems = localStorage.getItem('sortableItems');
  return savedItems ? JSON.parse(savedItems) : initialItems;
  });

  const [darkMode, setDarkMode] = useState(() => {
  const saved = localStorage.getItem('darkMode');
  return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over?.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      localStorage.setItem('sortableItems', JSON.stringify(newItems));
    }
  };

  const handleReset = () => {
    setItems(initialItems);
    localStorage.removeItem('sortableItems');
  };

  return (
    <div className={styles.pageWrapper}>
    <svg className={styles.fish} viewBox="0 0 64 64" fill="none">
     <path d="M2 32 C10 20, 30 20, 40 32 C30 44, 10 44, 2 32 Z" fill="#FF6F61"/>
     <circle cx="15" cy="30" r="3" fill="#fff"/>
    </svg>
    <svg className={`${styles.fish} ${styles.fishReverse}`} viewBox="0 0 64 64" fill="none">
     <path d="M2 32 C10 20, 30 20, 40 32 C30 44, 10 44, 2 32 Z" fill="#6FC3DF"/>
     <circle cx="15" cy="30" r="3" fill="#fff"/>
    </svg>
    <svg className={styles.fish} style={{ top: '70%' }} viewBox="0 0 64 64" fill="none">
     <path d="M2 32 C10 20, 30 20, 40 32 C30 44, 10 44, 2 32 Z" fill="#00D2A8"/>
     <circle cx="15" cy="30" r="3" fill="#fff"/>
    </svg>
    <svg className={`${styles.fish} ${styles.fishReverse}`} style={{ top: '40%' }} viewBox="0 0 64 64" fill="none">
     <path d="M2 32 C10 20, 30 20, 40 32 C30 44, 10 44, 2 32 Z" fill="#FFD166"/>
     <circle cx="15" cy="30" r="3" fill="#fff"/>
    </svg>
    <svg className={styles.fish} style={{ top: '80%' }} viewBox="0 0 64 64" fill="none">
     <path d="M2 32 C10 20, 30 20, 40 32 C30 44, 10 44, 2 32 Z" fill="#00D2A8"/>
     <circle cx="15" cy="30" r="3" fill="#fff"/>
    </svg>

    <svg className={`${styles.fish} ${styles.fishReverse}`} style={{ top: '20%' }} viewBox="0 0 64 64" fill="none">
     <path d="M2 32 C10 20, 30 20, 40 32 C30 44, 10 44, 2 32 Z" fill="#FFD166"/>
     <circle cx="15" cy="30" r="3" fill="#fff"/>
    </svg>

    <div className={styles.bubbles}>
     { Array.from({ length: 15 }).map((_, i) => (
     <span key={i} style={{ left: `${Math.random() * 100}%`, animationDelay: `${i * 1.5}s` }}></span>
     ))}
    </div>


    <div className={`${styles.container} ${darkMode ? styles.dark : ''}`}>

       <button className={styles.themeToggle} onClick={() => setDarkMode(!darkMode)}>

      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
       </button>

      <h1 className={styles.title}>Drag & Drop List</h1>
      <Instructions />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className={styles.list}>
            {items.map(item => (
              <DraggableItem
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <ResetButton onClick={handleReset} />
    </div>
    </div>
  );
}

export default App;
