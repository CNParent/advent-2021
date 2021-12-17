scripts.day17_2 = async () => {
    let data = await getFile('day17/input.txt');
    let parts = data.split(': ');
    let coordinates = parts[1].split(', ');
    let xCoord = coordinates[0].split('=')[1].split('..');
    let yCoord = coordinates[1].split('=')[1].split('..');
    let bounds = { 
        x: { from: Number(xCoord[0]), to: Number(xCoord[1]) }, 
        y: { from: Number(yCoord[0]), to: Number(yCoord[1]) }
    };

    let limits = {
        x: { from: 0, to: bounds.x.to },
        y: { from: bounds.y.from, to: 0 }
    };

    let vxStart = 0;
    while(true) {
        let x = 0;
        let vx = vxStart;
        while(vx > 0) {
            x += vx--;
            if (vx == 0) break;
        }

        if (x >= bounds.x.from && x <= bounds.x.to) {
            limits.x.from = vxStart;
            break;
        }

        vxStart += 1;
    }

    let vyStart = limits.y.from;
    while(true) {
        let y = 0;
        let vy = vyStart;
        while(y > bounds.y.to) {
            y += vy--;
        }

        if (y >= bounds.y.from && y <= bounds.y.to) {
            limits.y.to = vyStart;
        } else if (Math.abs(vy) > (bounds.y.to - bounds.y.from) * 2) break;

        vyStart += 1;
    }

    let hits = (vx = 0, vy = 0) => {
        let x = 0;
        let y = 0;
        while(true) {
            x += vx;
            y += vy--;
            if (vx > 0) vx--;

            if (x >= bounds.x.from && x <= bounds.x.to && y >= bounds.y.from && y <= bounds.y.to) {
                return true;
            } else if (y < bounds.y.from || x > bounds.x.to) {
                return false;
            }
        }
    }

    let velocities = 0;
    for(let vx = limits.x.from; vx <= limits.x.to; vx++) {
        for(let vy = limits.y.from; vy <= limits.y.to; vy++) {
            velocities += hits(vx, vy) ? 1 : 0;
        }
    }

    terminal.textContent = `There are ${velocities} distinct starting velocities that hit the target area.`;
}
