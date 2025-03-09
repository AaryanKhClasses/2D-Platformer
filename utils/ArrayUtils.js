Array.prototype.parse2DA = function() {
    const rows = []
    for(let i = 0; i < this.length; i += 16) {
        rows.push(this.slice(i, i + 16))
    }
    return rows
}

Array.prototype.createObjectsFrom2D = function() {
    const objects = []
    this.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell === 292) objects.push(new CollisionBlock({ position: { x: x * 64, y: y * 64 } }))
        })
    })
    return objects
}
