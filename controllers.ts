import robot from 'robotjs';

class Controllers {

  get getCurrentCursorPosition() : {x : number, y: number} {
    const {x, y} = robot.getMousePos();
    return {x, y};
  }

  changePosition (x: number =0, y:number =0 ) {
    robot.moveMouse(this.getCurrentCursorPosition.x + x, this.getCurrentCursorPosition.y + y)
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

}

export const controllers = new Controllers();