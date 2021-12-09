scripts.day9_1 = async () => {
    let data = await getFile('day9/day9_1_input.txt');
    let grid = data.split('\r\n').map(x => x.split('').map(y => {
        return { 
            height: Number(y),
            risk: 0
        };
    }));

    let h = grid.length;
    let w = grid[0].length;
    for(let i = 0; i < h; i++) {
        for(let j = 0; j < w; j++) {
            let node = grid[i][j];
            if (i - 1 >= 0 && grid[i-1][j].height <= node.height) continue;
            if (j - 1 >= 0 && grid[i][j-1].height <= node.height) continue;
            if (i + 1 < h && grid[i+1][j].height <= node.height) continue;
            if (j + 1 < w && grid[i][j+1].height <= node.height) continue;

            node.risk = node.height + 1;
        }
    }

    let total = grid.reduce((a,b) => a.concat(b), []).reduce((a,b) => a + b.risk, 0);
    terminal.textContent = `Total risk is ${total}`;
}