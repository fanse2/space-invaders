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
let moveDirection = 1

const ctx = grid.getContext('2d')

let gameInt

class Invader {
    constructor(x,y,type,ctx) {
        this.x = x
        this.y = y
        this.type = type
        this.ctx = ctx
    }

    update(dx,dy) {
        this.x += dx
        this.y += dy
    }

    draw() {

        ctx.drawImage(this.type, this.x, this.y, sWidth, sWidth)
        // console.log(this.type, this.x, this.y, sWidth, sWidth)
    }
}

class Jet {
    constructor(x,y,ctx) {
        this.x = x
        this.y = y
        this.ctx = ctx     
    }

    update(dx) {
        this.x += dx
    }

    draw() {
        ctx.drawImage(jet, this.x ,this.y ,sWidth,sWidth)
    }

}

class Bullet {
    constructor(x,y,ctx) {
        this.x = x
        this.y = y
        this.ctx = ctx
    }

    update(dy) {
        this.y += dy
    }

    draw() {
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 2

        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x, this.y+10)
        ctx.stroke()
    }
}
const invaders = []
let shooter = new Jet(gaWidth/2 -sWidth/2 ,500, ctx)
const bullets = []

function setting() {
    // img 14px * 14p   
    // adding invaders
    for(let i=0; i<10; i++) {
        invaders.push(new Invader(10 + i*(sWidth+5),10,e1,ctx))
        invaders.push(new Invader(10 + i*(sWidth+5),10+sWidth+5,e2,ctx))
        invaders.push(new Invader(10 + i*(sWidth+5),10+(sWidth+5)*2,e3,ctx))
        invaders.push(new Invader(10 + i*(sWidth+5),10+(sWidth+5)*3,e4,ctx))
        
    }

    invaders.forEach(v=>{
        v.draw()
    })

    shooter.draw()

}

function draw() {
    let dy = 0

    if(invaders.some(v=>v.x < 10 || v.x > gaWidth - sWidth - 10)) {
        dy = 10
        moveDirection *= -1
    }

    bullets.forEach(v=>v.update(-20))
    

    invaders.forEach(v=>{
        v.update(2 * moveDirection, dy)
    })
    ctx.clearRect(0, 0, gaWidth, gaHeight)

    invaders.forEach(v=>{
        v.draw()
    })

    shooter.draw()

    bullets.forEach(v=>v.draw())
}

function start() {

    setting()
    drawBackups(2)
    gameInt = setInterval(draw, 50)

}

function moveShooter(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if(shooter.x > 10) shooter.update(-10)
            break
        case 'ArrowRight':
            if(shooter.x < gaWidth - sWidth - 10) shooter.update(10)
            break
        case ' ':
            bullets.push(new Bullet(shooter.x + sWidth / 2 + 1  , 500, ctx))
            break
        
    }
}

document.addEventListener('keydown', moveShooter)


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