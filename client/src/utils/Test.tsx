import React, { useState } from 'react';

const DraggableEditableDiv = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [contentTop, setContentTop] = useState(0);
  const [contentLeft, setContentLeft] = useState(0);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.clientX - contentLeft);
    setStartY(e.clientY - contentTop);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrag = (e) => {
    if (!isDragging) return;
    setContentLeft(e.clientX - startX);
    setContentTop(e.clientY - startY);
  };

  return (
    <div
      className='draggable-editable-div'
      style={{ top: contentTop, left: contentLeft }}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDrag}
      contentEditable
    >
      Editable and Draggable Content
    </div>
  );
};

export default DraggableEditableDiv;
