scripts.day5_1 = async () => {
    await loadScript('Line.js');
    let data = await getFile('day5/day5_1_input.txt');
    let lines = data.split('\r\n').map(x => new Line(x)).filter(x => x.type != 'diagonal');
    let allPoints = lines.reduce((a,b) => a.concat(b.points), []);
    let done = new Set();
    let overlapping = new Set();
    allPoints.forEach(point => {
        let key = `${point.x},${point.y}`;
        if (done.has(key)) 
            overlapping.add(key);

        done.add(key);
    });

    terminal.textContent = `There are ${overlapping.size} points where at least two lines overlap`;
}