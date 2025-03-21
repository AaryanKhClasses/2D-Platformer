const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

let parsedCL, collisionBlocks, background, doors
const player = new Player({ })

let level = 1
let levels = {
    1: {
        init: () => {
            parsedCL = collisionsLevel1.parse2DA()
            collisionBlocks = parsedCL.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            background = new Sprite({ position: { x: 0, y: 0 }, src: 'assets/level_1.png' })
            doors = [
                new Sprite({
                    position: { x: 707, y: 273 },
                    src: 'assets/door.png',
                    frameRate: 5,
                    frameBuffer: 12,
                    loop: false,
                    autoplay: false,
                    onComplete: () => {
                        gsap.to(overlay, {
                            opacity: 1,
                            onComplete: () => {
                                level++
                                levels[level].init()
                                gsap.to(overlay, { opacity: 0 })
                            }
                        })
                    }
                })
            ]
        }
    },
    2: {
        init: () => {
            parsedCL = collisionsLevel2.parse2DA()
            collisionBlocks = parsedCL.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.x = 8
            player.y = 95
            background = new Sprite({ position: { x: 0, y: 0 }, src: 'assets/level_2.png' })
            doors = [
                new Sprite({
                    position: { x: 851, y: 82 },
                    src: 'assets/door.png',
                    frameRate: 5,
                    frameBuffer: 12,
                    loop: false,
                    autoplay: false,
                    onComplete: () => {
                        gsap.to(overlay, {
                            opacity: 1,
                            onComplete: () => {
                                level++
                                levels[level].init()
                            }
                        })
                    }
                })
            ]
        }
    }
}

const overlay = { opacity: 0 }

const keys = {
    w: false,
    a: false,
    d: false
}
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    collisionBlocks.forEach(block => block.draw())
    doors.forEach(door => door.draw())

    if(keys.d) player.velocity.x = 5
    else if(keys.a) player.velocity.x = -5
    else player.velocity.x = 0

    player.init()
    player.update()

    context.save()
    context.globalAlpha = overlay.opacity
    context.fillStyle = 'rgb(63, 56, 81)'
    context.fillRect(0, 0, 1024, 576)
    context.restore()
}

levels[level].init()
animate()
