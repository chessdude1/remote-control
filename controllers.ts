import { drawCircle } from './drawUtils';
import robot from 'robotjs';

class Controllers {

  get getCurrentCursorPosition() : {x : number, y: number} {
    const {x, y} = robot.getMousePos();
    return {x, y};
  }

  changePosition (x: number =0, y:number =0, isDrawingFigure:boolean = true ) {
    robot.moveMouseSmooth(this.getCurrentCursorPosition.x + x, this.getCurrentCursorPosition.y + y)
    return {x :this.getCurrentCursorPosition.x + x, y : this.getCurrentCursorPosition.y + y} 
  }

  mouse_up(externalData : Array<string>) {
    const offset = -Number(externalData[0])
    return this.changePosition(undefined, Number(offset))
  }

  mouse_down(externalData : Array<string>) {
    const offset = Number(externalData[0])
    return this.changePosition(undefined, Number(offset))
  }

  mouse_left(externalData : Array<string>) {
    const offset = -Number(externalData[0])
    return this.changePosition(Number(offset))
  }

  mouse_right(externalData: Array<string>) {
    const offset = Number(externalData[0])
    return this.changePosition(Number(offset))
  }

  mouse_position() {
    return this.getCurrentCursorPosition
  }

  draw_circle(externalData: Array<string>) {
    const radius = Number(externalData[0])
    drawCircle(radius)
    return {x :this.getCurrentCursorPosition.x, y : this.getCurrentCursorPosition.y} 
  }

  draw_rectangle(externalData: Array<string>) {
    const width = [externalData[0]];
    const length = [externalData[1]];
    robot.mouseToggle("down");
    this.mouse_left(length)
    this.mouse_down(width)
    this.mouse_right(length)
    this.mouse_up(width)
    robot.mouseToggle("up");
    return {x :this.getCurrentCursorPosition.x, y : this.getCurrentCursorPosition.y} 
  }

  draw_square(externalData: Array<string>) {
    const width = [externalData[0]];
    robot.mouseToggle("down");
    this.mouse_right(width)
    this.mouse_down(width)
    this.mouse_left(width)
    this.mouse_up(width)
    robot.mouseToggle("up");
    return {x :this.getCurrentCursorPosition.x, y : this.getCurrentCursorPosition.y} 
  }

}

export const controllers = new Controllers();