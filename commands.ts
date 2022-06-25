export const commands : ICommands  =  {
  mouse_up : 'up',
  mouse_down: 'down',
  mouse_left : 'left',
  mouse_right : 'right',
  mouse_position : 'position',
  draw_circle : 'circle',
  draw_square : 'square',
  draw_rectangle : 'rectangle'
}

interface ICommands {
  [key: string] : string
}



export type TCommands = 'mouse_up' | 'mouse_down' | 'mouse_left' | 'mouse_right' |
                        'mouse_position' | 'draw_circle' | 'draw_square' | 'draw_rectangle' 