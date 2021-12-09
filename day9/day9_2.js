scripts.day9_2 = async () => {
    let data = await getFile('day9/day9_1_input.txt');

    let formBasin = (i = 0, j = 0, n = 0) => {
        let node = grid[i][j];
        if (node.height == 9 || node.basin != 0) return;
        
        node.basin = n;
        if (i-1 >= 0 && grid[i-1][j].height >= node.height) formBasin(i-1, j, n);
        if (j-1 >= 0 && grid[i][j-1].height >= node.height) formBasin(i, j-1, n);
        if (i+1 < h && grid[i+1][j].height >= node.height) formBasin(i+1, j, n);
        if (j+1 < w && grid[i][j+1].height >= node.height) formBasin(i, j+1, n);
    };

    let grid = data.split('\r\n').map(x => x.split('').map(y => {
        return { 
            height: Number(y),
            risk: 0,
            basin: 0
        };
    }));

    let h = grid.length;
    let w = grid[0].length;
    let lowPoints = [];
    for(let i = 0; i < h; i++) {
        for(let j = 0; j < w; j++) {
            let node = grid[i][j];
            if (i - 1 >= 0 && grid[i-1][j].height <= node.height) continue;
            if (j - 1 >= 0 && grid[i][j-1].height <= node.height) continue;
            if (i + 1 < h && grid[i+1][j].height <= node.height) continue;
            if (j + 1 < w && grid[i][j+1].height <= node.height) continue;

            node.risk = node.height + 1;
            lowPoints.push({ i, j });
        }
    }

    lowPoints.forEach((x,i) => formBasin(x.i, x.j, i+1));

    let basinScores = [];
    for(let i = 0; i < lowPoints.length; i++) {
        let basinNodes = grid.reduce((a,b) => a.concat(b), []).filter(x => x.basin == i + 1);
        basinScores.push(basinNodes.length);
    }

    basinScores.sort((a,b) => a < b);
    let product = basinScores.slice(0,3).reduce((a,b) => a * b, 1);
    terminal.textContent = `The product of the area of the three largest basins is ${product}`;
}