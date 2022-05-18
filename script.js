const grid = document.querySelector('#grid')
// const sprites = document.querySelector('#sprites')
//16*16
const e1 = document.querySelector('#e1')
const e2 = document.querySelector('#e2')
const e3 = document.querySelector('#e3')
const e4 = document.querySelector('#e4')
const e5 = document.querySelector('#e5')
const e6 = document.querySelector('#e6')
const ex1 = document.querySelector('#ex1')
const ex2 = document.querySelector('#ex2')
const ex3 = document.querySelector('#ex3')
const ex4 = document.querySelector('#ex4')
const ex5 = document.querySelector('#ex5')
const jet = document.querySelector('#jet')

let ctx = grid.getContext('2d')

const invaders = []



function pickImg() {
    // img 14px * 14px
    // 28 *20x, 42 *20x
    
    ctx.drawImage(jet, 100,100,32,32)
    ctx.drawImage(e1, 100,140,32,32)
    ctx.drawImage(e2, 100,180,32,32)
    ctx.drawImage(e3, 100,220,32,32)



}

class Invader {
    constructor(x,y,type=e1) {
        this.x = x
        this.y = y
        this.type = type
    }

    update() {

    }

    draw(ctx) {
        ctx.draw(this.type, this.x, this.y, 32, 32)
    }
}

class Jet {

}

function start() {
    pickImg()
}



