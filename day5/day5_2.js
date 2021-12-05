scripts.day5_2 = async () => {
    await loadScript('Line.js');
    let data = await getFile('day5/day5_1_input.txt');
    let lines = data.split('\r\n').map(x => new Line(x));
    let allPoints = lines.reduce((a,b) => a.concat(b.points), []);
    let done = new Set();
    let overlapping = new Set();
    for(let i = 0; i < allPoints.length; i++) {
        let point = allPoints[i];
        let key = `${point.x},${point.y}`;
        if (done.has(key)) 
            overlapping.add(key);

        done.add(key);
    }

    terminal.textContent = `There are ${overlapping.size} points where at least two lines overlap`;
}