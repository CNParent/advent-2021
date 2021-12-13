scripts.day13_2 = async () => {
    let data = await getFile('day13/input.txt');
    let parts = data.split('\r\n\r\n');

    let dots = parts[0].split('\r\n').map(x => {
        let parts = x.split(',');
        return {
            x: Number(parts[0]),
            y: Number(parts[1])
        }
    });

    let folds = parts[1].split('\r\n').map(x => {
        let parts = x.substring(11).split('=');
        return {
            axis: parts[0],
            offset: Number(parts[1])
        }
    });

    let foldX = (xOffset = 0) => {
        let temp = [];
        dots.forEach(dot => {
            if(dot.x < xOffset) {
                temp.push(dot);
                return;
            }

            let x = xOffset + (xOffset - dot.x);
            let other = dots.find(d => d.x == x && d.y == dot.y);
            dot.x = x;
            if (!other) temp.push(dot);
        });

        dots = temp;
    }

    let foldY = (yOffset = 0) => {
        let temp = [];
        dots.forEach(dot => {
            if(dot.y < yOffset) {
                temp.push(dot);
                return;
            };

            let y = yOffset + (yOffset - dot.y)
            let other = dots.find(d => d.y == y && d.x == dot.x);
            dot.y = y;
            if (!other) temp.push(dot);
        });

        dots = temp;
    }

    terminal.textContent = `There are ${dots.length} dots to begin.\r\n`;
    for(let i = 0; i < folds.length; i++) {
        let fold = folds[i];
        if (fold.axis == 'x') foldX(fold.offset);
        else foldY(fold.offset);
    }

    terminal.textContent += `There are ${dots.length} dots visible after the last fold.\r\n\r\n`;

    let w = Math.max(...dots.map(x => x.x));
    let h = Math.max(...dots.map(x => x.y));
    
    let set = new Set(dots.map(d => `${d.x},${d.y}`));
    for(let j = 0; j <= h; j++) {
        for(let i = 0; i <= w; i++) {
            terminal.textContent += set.has(`${i},${j}`) ? '▒' : '.';
        }

        terminal.textContent += '\r\n';
    }
}
