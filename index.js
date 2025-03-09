const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const parsedCL1 = collisionsLevel1.parse2DA()
const collisionBlocks = parsedCL1.createObjectsFrom2D()

const backgroundLevel1 = new Sprite({ position: { x: 0, y: 0 }, src: 'assets/level_1.png' })

const player = new Player({ collisionBlocks })

const doors = [
    new Sprite({
        position: { x: 707, y: 273 },
        src: 'assets/door.png',
        frameRate: 5,
        frameBuffer: 12,
        loop: false,
        autoplay: false
    })
]

const keys = {
    w: false,
    a: false,
    d: false
}
function animate() {
    window.requestAnimationFrame(animate)
    backgroundLevel1.draw()
    collisionBlocks.forEach(block => block.draw())
    doors.forEach(door => door.draw())

    if(keys.d) player.velocity.x = 5
    else if(keys.a) player.velocity.x = -5
    else player.velocity.x = 0

    player.init()
    player.update()
}

animate()
