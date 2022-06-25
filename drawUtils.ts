import robot from 'robotjs';

export const drawCircle = (radius : number) => {
  const mousePos = robot.getMousePos();

  for (let i = 0; i <= Math.PI * 2; i += 0.015) {
      if (i !==0) {
        robot.mouseToggle("down");
      }
      const x = mousePos.x + (radius * Math.cos(i));
      const y = mousePos.y + (radius * Math.sin(i));
      
      robot.dragMouse(x, y);
  }
  robot.mouseToggle("up");
  return 
}