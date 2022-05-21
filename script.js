const grid = document.querySelector('#grid')
// const sprites = document.querySelector('#sprites')
//16*16 -> 32*32
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
const backups = document.querySelector('.part12')

const gaWidth = 480
const gaHeight = 540
const sWidth = 32

const ctx = grid.getContext('2d')

const invaders = []

class Invader {
    constructor(x,y,type,ctx) {
        this.x = x
        this.y = y
        this.type = type
        this.ctx = ctx
    }

    update() {

    }

    draw() {

        ctx.drawImage(this.type, this.x, this.y, sWidth, sWidth)
        // console.log(this.type, this.x, this.y, sWidth, sWidth)
    }
}

class Jet {

}

function setting() {
    // img 14px * 14p   
    // adding invaders
    for(let i=0; i<10; i++) {
        invaders.push(new Invader(10 + i*(sWidth+5),10,e1,ctx))
        invaders.push(new Invader(10 + i*(sWidth+5),10+sWidth+5,e2,ctx))
        invaders.push(new Invader(10 + i*(sWidth+5),10+(sWidth+5)*2,e3,ctx))
        invaders.push(new Invader(10 + i*(sWidth+5),10+(sWidth+5)*3,e4,ctx))
        
    }
    
    ctx.drawImage(jet, gaWidth/2 -sWidth/2 ,500,sWidth,sWidth)

    invaders.forEach(v=>{
        v.draw()
    })
    // ctx.drawImage(e1, 100,140,sWidth,sWidth)
    // ctx.drawImage(e2, 100,180,sWidth,sWidth)
    // ctx.drawImage(e3, 100,220,sWidth,sWidth)

}

function start() {

    setting()
    drawBackups(2)
}



function drawBackups(count) {
    
    backups.innerHTML=''
    for(let i=0; i<count; i++){
        let img = document.createElement('img')
        img.src = jet.src
        img.width = 26
        img.height = 26
        setTimeout(()=>backups.appendChild(img),300*(i+1))
        
    }
}