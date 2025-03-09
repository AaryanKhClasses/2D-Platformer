window.addEventListener('keydown', e => {
    switch(e.key) {
        case 'w':
            if(player.velocity.y == 0) player.velocity.y = -10
        break
        case ' ':
            if(player.velocity.y == 0) player.velocity.y = -12
        break
        case 'a':
            keys.a = true
        break
        case 'd':
            keys.d = true
        break
    }
})

window.addEventListener('keyup', e => {
    switch(e.key) {
        case 'a':
            keys.a = false
        break
        case 'd':
            keys.d = false
        break
    }
})
