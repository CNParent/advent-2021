scripts.day22_2 = async () => {
    await loadScript('Cube.js');
    let data = await getFile('day22/input.txt');
    let cubes = data.split('\r\n').map(x => {
        let cube = new Cube();
        cube.parse(x);
        return cube;
    });
    
    let size = () => cubes.reduce((a,b) => a + (b.enable ? b.size() : 0), 0);

    terminal.textContent = '';
    for(let i = 1; i < cubes.length; i++) {
        let next = cubes[i];
        for(let j = 0; j < i; j++) {
            let cube = cubes[j];
            cube.merge(next);
        }
    }

    terminal.textContent += `After executing instructions, ${size()} cubes are on.`;
}