scripts.day15_1 = async () => {
    let data = await getFile('day15/input.txt');
    let grid = data.split('\r\n').map(x => x.split('').map(y => Number(y)));
    let h = grid.length;
    let w = grid[0].length;
    let options = [];
    let minimumRisk = (h + w) * 9;
    let traversed = new Set();

    let branch = () => {
        let x = options[0].x;
        let y = options[0].y;
        branchFrom(x - 1, y);
        branchFrom(x + 1, y);
        branchFrom(x, y - 1);
        branchFrom(x, y + 1);

        options.splice(0, 1);
    }

    let branchFrom = (x, y) => {
        if (traversed.has(`${x},${y}`)) return;
        if (x < 0 || x >= h) return;
        if (y < 0 || y >= w) return;

        let option = { 
            x, y, 
            risk: grid[x][y] + options[0].risk,
            potential: grid[x][y] + options[0].risk + ((h - x) + (w - y) - 2) * 0.001
        };

        if (option.risk > minimumRisk) return;
        if (option.potential == option.risk) {
            if (minimumRisk > option.risk) 
                minimumRisk = option.risk;

            return;
        }

        traversed.add(`${x},${y}`);
        options.push(option);
    }

    let start = Date.now();
    options.push({ x: 0, y: 0, risk: 0, potential: h + w - 2 });
    while(options.length > 0) {
        options.sort((a,b) => a.potential > b.potential);
        branch();
    }

    terminal.textContent = `The risk level of the shortest path is ${minimumRisk}\r\n`;
    terminal.textContent += `Found in ${Date.now() - start} ticks`;
}
