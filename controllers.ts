import { drawCircle } from './drawUtils';
import robot from 'robotjs';
import Jimp from 'jimp';

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

   prnt_scrn() {
    const {x,y} = robot.getMousePos();
    const size = 100;
    const img  = robot.screen.capture(x - size, y-size, size * 2, size * 2);
    let data = [];
    let bitmap = img.image;
    let i = 0,l = bitmap.length;

    for(i = 0; i < l; i += 4){
        data.push(bitmap[i + 2], bitmap[i + 1], bitmap[i], bitmap[i + 3]);
    };

    const convertedImg =new Jimp({
        "data":new Uint8Array(data),
        "width":img.width,
        "height":img.height
    });

    let bufferedImg = ''

    convertedImg.getBase64("image/png", (error, chunk) => {
      if (error) throw error
      bufferedImg += chunk;
    });

    const imgBase64 = bufferedImg.split(',')[1]

    return {x :this.getCurrentCursorPosition.x, y : this.getCurrentCursorPosition.y, payload : imgBase64} 
  }

}

export const controllers = new Controllers();