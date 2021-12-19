scripts.day19_1 = async () => {
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

    let beacons = new Set();
    scanners.forEach(s => {
        s.beacons.forEach(b => {
            beacons.add(`${b.x},${b.y},${b.z}`);
        });
    });

    terminal.textContent = `There are ${beacons.size} beacons in total.`;
}
