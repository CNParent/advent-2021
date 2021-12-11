scripts.day11_1 = async () => {
    let data = await getFile('day11/input.txt');
    let w = 10;
    let h = 10;
    let jellies = data.split('\r\n').map(x => x.split('').map(y => {
        return { 
            energy: Number(y),
            flashed: false
        };
    }));

    let flashes = 0;
    let getEnergized = () => {
        let energized = [];
        for(let i = 0; i < h; i++) {
            for(let j = 0; j < w; j++) {
                if(jellies[i][j].energy > 9 && !jellies[i][j].flashed) 
                    energized.push({ i, j });
            }
        }

        return energized;
    }

    let step = () => {
        jellies.reduce((a,b) => a.concat(b), []).forEach(x => x.energy++);

        let energized = [];
        do {
            energized = getEnergized();
            energized.forEach(x => flash(x.i, x.j));
        } while(energized.length > 0)

        let flashed = jellies.reduce((a,b) => a.concat(b), []).filter(x => x.flashed);
        flashes += flashed.length;
        flashed.forEach(x => x.flashed = false);
        flashed.forEach(x => x.energy = 0);
    };

    let flash = (i = 0, j = 0) => {
        jellies[i][j].flashed = true;
        for(let n = i-1; n <= i+1; n++) {
            if (n < 0 || n >= h) continue;
            for(let m = j-1; m <= j+1; m++) {
                if (m < 0 || m >= h) continue;
                if (n == i && m == j) continue;

                jellies[n][m].energy++;
            }
        }
    }
    
    for(let i = 0; i < 100; i++)
        step();

    terminal.textContent = `There were ${flashes} individual flashes after 100 steps`;
}