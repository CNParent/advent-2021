scripts.day19_2 = async () => {
    await loadScript('Scanner.js');
    let data = await getFile('day19/input.txt');
    let scanners = data.split('\r\n\r\n').map(x => new Scanner(x));
    scanners[0].aligned = true;

    while(scanners.filter(x => !x.aligned).length > 0) {
        for(let i = 0; i < scanners.length; i++) {
            for(let j = 0; j < scanners.length; j++) {
                let a = scanners[i];
                let b = scanners[j];
                if (a == b) continue;
                a.align(b);
            }
        }
    }

    let distances = [];
    scanners.forEach(a => {
        scanners.forEach(b => {
            distances.push(
                Math.abs(b.position.x - a.position.x) + 
                Math.abs(b.position.y - a.position.y) +
                Math.abs(b.position.z - a.position.z));
        });
    });

    terminal.textContent = `The maximum distance between any two scanners is ${Math.max(...distances)}`;
}
