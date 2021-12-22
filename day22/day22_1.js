scripts.day22_1 = async () => {
    let data = await getFile('day22/input.txt');
    let instructions = data.split('\r\n').map(x => {
        let parts = x.split(' ');
        let enable = parts[0] == 'on';
        let coords = parts[1].split(',').map(c => c.split('=')[1].split('..'));
        return {
            enable,
            x: { from: Number(coords[0][0]), to: Number(coords[0][1]) },
            y: { from: Number(coords[1][0]), to: Number(coords[1][1]) },
            z: { from: Number(coords[2][0]), to: Number(coords[2][1]) }
        }
    });

    instructions = instructions.filter(x => 
        x.x.from >= -50 && x.x.to <= 50 &&
        x.y.from >= -50 && x.y.to <= 50 &&
        x.z.from >= -50 && x.z.to <= 50);

    let region = new Set();
    instructions.forEach(instruction => {
        for(let i = instruction.x.from; i <= instruction.x.to; i++) {
            for(let j = instruction.y.from; j <= instruction.y.to; j++) {
                for(let k = instruction.z.from; k <= instruction.z.to; k++) {
                    let key = `${i},${j},${k}`;
                    if (instruction.enable) region.add(key);
                    else region.delete(key);
                }
            }
        }
    });
    
    terminal.textContent = `After executing instructions, ${region.size} cubes are on.`;
}