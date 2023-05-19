export  const handleMouseDown = (event: any, position:any ,setIsDragging:any , setDragOffset:any) => {
    const { clientX, clientY } = event;
    const offsetX = clientX - position.x;
    const offsetY = clientY - position.y;
    setIsDragging(true);
    setDragOffset({ x: offsetX, y: offsetY });
  };

  export  const handleMouseMove = (event: any , isDragging:any , dragOffset:any , setPosition:any) => {
    if (isDragging) {
      const { clientX, clientY } = event;
      const newX = clientX - dragOffset.x;
      const newY = clientY - dragOffset.y;
      setPosition({ x: newX, y: newY });
    }
  };

  export const handleMouseUp = (setIsDragging:any) => {
    setIsDragging(false);
  };