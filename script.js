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
const scoreBD = document.querySelector('.part4')
const countBD = document.querySelector('.part11')
const stageBD = document.querySelector('.part6')
const startBTN = document.querySelector('.startButton')


const gaWidth = 480
const gaHeight = 540
const sWidth = 32
let score = 0
let moveDirection = 1
let jetSpeed = 10
let stage = 1
let shooterCnt = 3

const ctx = grid.getContext('2d')

let gameInt
let bulletInt

class Invader {
    constructor(x,y,type,ctx) {
        this.x = x
        this.y = y
        this.type = type
        this.ctx = ctx
        this.condition = true
    }

    update(dx,dy) {
        this.x += dx
        this.y += dy
    }

    draw() {

        ctx.drawImage(this.type, this.x, this.y, sWidth, sWidth)
        // console.log(this.type, this.x, this.y, sWidth, sWidth)
    }

    chkCollision(x,y) {
        if(x>this.x && x<this.x+sWidth && y>this.y && y<this.y+sWidth && this.condition) return true
        return false
    }
}
// Jet = Shooter
class Jet {
    constructor(x,y,ctx) {
        this.x = x
        this.y = y
        this.ctx = ctx     
        this.speed = 0
        this.type = jet
    }

    update() {
        this.x += this.speed
    }

    draw() {
        ctx.drawImage(this.type, this.x ,this.y ,sWidth, sWidth)
    }

    chkCollision(x,y) {
        if(x>this.x && x<this.x+sWidth && y>this.y && y<this.y+sWidth) return true
        return false
    }

    initPosition() {
        this.x = gaWidth/2 -sWidth/2 
        this.y = 500
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
        ctx.strokeStyle = 'blue'
        ctx.lineWidth = 2

        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x, this.y+10)
        ctx.stroke()
    }
}

class EnemyBullet extends Bullet {
    draw() {
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 2

        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x, this.y-10)
        ctx.stroke()
    }
}

let invaders = []
let shooter = new Jet(gaWidth/2 -sWidth/2 ,500, ctx)
let bullets = []
let eBullets = []

function setupStage(stage=1) {
    // img 14px * 14p   
    // adding invaders 8*4=32 invaders
    for(let i=0; i<8; i++) {
        invaders.push(new Invader(10 + i*(sWidth+15),20,e1,ctx))
        invaders.push(new Invader(10 + i*(sWidth+15),20+sWidth+5,e2,ctx))
        invaders.push(new Invader(10 + i*(sWidth+15),20+(sWidth+5)*2,e3,ctx))
        invaders.push(new Invader(10 + i*(sWidth+15),20+(sWidth+5)*3,e4,ctx))
    }

    invaders.forEach(v=>{
        v.draw()
    })

    shooter.initPosition()
    shooter.draw()
    stageBD.innerHTML = stage
    drawBackups(shooterCnt-1)
    gameInt = setInterval(gameLoop, 50)
    bulletInt = setInterval(bulletLoop,1000)
}

function finishStage() {
    clearInterval(gameInt)
    clearInterval(bulletInt)
    bullets = []
    invaders = []
    eBullets = []
    //alert('You bit them all!! and Scored ' + score)
    
    // setupStage(++stage)
    stage++
    setTimeout(betweenStage,200)
    setTimeout(()=>setupStage(stage),2000)


}

function failStage() {
    clearInterval(gameInt)
    clearInterval(bulletInt)
    bullets = []
    invaders = []
    eBullets = []
    shooter.type = ex1
    setTimeout(()=>shooter.type = ex2,30)
    setTimeout(()=>shooter.type = ex3,60)
    setTimeout(()=>shooter.type = ex4,90)
    setTimeout(()=>shooter.type = ex5,120)
    shooterCnt--
    //alert('you failed!')
    if(shooterCnt>0) {
        setTimeout(()=>shooter.type = jet,200)
        setTimeout(()=>setupStage(stage),2000)
        
    } else {
        countBD.innerHTML = 0
        alert('game over!!')
        startBTN.textContent = 'Start'
    }
}

function betweenStage() {
    
    ctx.font = '30px monospace'
    ctx.fillStyle = 'yellow'
    ctx.textAlign = 'center'
    ctx.fillText(`STAGE ${stage}`, gaWidth/2,gaHeight/2)
    //alert(ctx.font)
}

function bulletLoop() {
    let cnt = invaders.length
    let shootingInvader = invaders[Math.floor(Math.random()*cnt)]
    eBullets.push(new EnemyBullet(shootingInvader.x + sWidth / 2 + 1  , shootingInvader.y, ctx))
    //console.log('ebullets: ',eBullets.length)
}

function gameLoop() {
    let dy = 0

    // if destroyed them all finish stage
    if(invaders.length==0) {
        finishStage()
    }
    // invaders turn over
    if(invaders.some(v=>v.x < 10 || v.x > gaWidth - sWidth - 10)) {
        dy = 10
        moveDirection *= -1
    }
    // shooter move range limit
    if((shooter.x > 10 && shooter.speed < 0) || (shooter.x < gaWidth - sWidth - 10 && shooter.speed > 0) ) {
        shooter.update()
    } 

    // bullets move
    bullets.forEach(v=>v.update(-20))
    bullets.forEach((v,i,a)=>{
        if(v.y < 0) {
            a.splice(i,1)
        }
        invaders.forEach((vv,ii,aa)=>{
            if(vv.chkCollision(v.x,v.y)){
                a.splice(i,1)       //bullet removal

                //explode & invader removal animation
                vv.type=ex1
                setTimeout(()=>vv.type=ex2,10)
                setTimeout(()=>vv.type=ex3,15)
                setTimeout(()=>vv.type=ex4,18)
                setTimeout(()=>vv.type=ex5,20)
                setTimeout(()=>{
                    aa.splice(ii,1)
                    score+=10
                },25)
                console.log('fire!!') 
            }
            
        })
        
    })
    // enemy bullets move
    eBullets.forEach(v=>v.update(10+stage/2))
    eBullets.forEach((v,i,a)=>{
        if(v.y > 500 + sWidth) {
            a.splice(i,1)       //bullet removal
        }
        if(shooter.chkCollision(v.x,v.y)) {
            //alert('got shot!')
            failStage()
        }
    })
    // invaders move, speed up .2px every stage 
    invaders.forEach(v=>{
        v.update((2 + stage*.2) * moveDirection, dy)
    })

    ctx.clearRect(0, 0, gaWidth, gaHeight)

    invaders.forEach(v=>{
        v.draw()
    })

    shooter.draw()

    bullets.forEach(v=>v.draw())
    eBullets.forEach(v=>v.draw())

    scoreBD.innerHTML = score
    countBD.innerHTML = shooterCnt

    // invaders reached end
    if(invaders.some(v=>v.y > 500 - sWidth)) {
        failStage()
    }

    // console.log('count :',eBullets.length)
}

function start() {
    if(startBTN.textContent=='Start'){
        startBTN.textContent = 'Started'
        score = 0
        moveDirection = 1
        jetSpeed = 0
        stage = 1
        shooterCnt = 3
        shooter.type=jet
        betweenStage()
        setTimeout(setupStage,2000)
    } 
  
}

function moveShooter(e) {
    // console.log(e.key+" / "+e.code)
    switch(e.code) {
        case 'ArrowLeft':
            shooter.speed = -10
            break
        case 'ArrowRight':
            shooter.speed = 10
            break
    }
}
function stopShooter(e) {
    if(startBTN.textContent=='Start') {
        start()
    }
    if(e.code=='ArrowLeft' || e.code=='ArrowRight') {
        shooter.speed = 0
    }
}
function fire(e) {
    if(e.code=='Space')  bullets.push(new Bullet(shooter.x + sWidth / 2 + 1  , 500, ctx))
}

document.addEventListener('keydown', moveShooter)
document.addEventListener('keypress', fire)
document.addEventListener('keyup', stopShooter)

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

    
ctx.font = '30px monospace'
ctx.fillStyle = 'yellow'
ctx.textAlign = 'center'
ctx.fillText(`HIT ANY KEY TO PLAY`, gaWidth/2,gaHeight/2 - 40)
