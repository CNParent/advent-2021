scripts.day25_1 = async () => {
    let data = (await getFile('day25/input.txt')).split('\r\n').map(x => x.split(''));
    let h = data.length;
    let w = data[0].length;
    let occupied = new Set();
    let cucumbers = [];
    for(let i = 0; i < h; i++) {
        for(let j = 0; j < w; j++) {
            if (data[i][j] == '.') continue;

            cucumbers.push({
                dir: data[i][j],
                pos: { x: j, y: i }
            });
        }
    }

    let look = (c) => {
        c.looking = c.dir == '>' ? { x: (c.pos.x + 1) % w, y: c.pos.y } : { x: c.pos.x, y: (c.pos.y + 1) % h };
        return !occupied.has(`${c.looking.x},${c.looking.y}`);
    }

    let move = (c) => {
        occupied.delete(`${c.pos.x},${c.pos.y}`);
        c.pos = c.looking;
        occupied.add(`${c.pos.x},${c.pos.y}`);
    }

    let step = () => {
        let moved = 0;
        let eastHerd = cucumbers.filter(c => c.dir == '>' && look(c));
        eastHerd.forEach(c => move(c));
        let southHerd = cucumbers.filter(c => c.dir == 'v' && look(c));
        southHerd.forEach(c => move(c));

        moved += southHerd.length + eastHerd.length;
        return moved > 0;
    }

    cucumbers.forEach(c => occupied.add(`${c.pos.x},${c.pos.y}`));
    let start = Date.now();
    let steps = 0;
    while(step()) {
        steps++;
    }

    terminal.textContent = `The cucumbers stop moving on step ${steps + 1}\r\nTook ${Date.now() - start}ms`;
}