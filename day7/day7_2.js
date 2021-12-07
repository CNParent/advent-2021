scripts.day7_2 = async () => {
    let data = await getFile('day7/day7_1_input.txt');
    let positions = data.split(',').map(x => Number(x));
    let max = Math.max(...positions);
    let minFuel;
    let minPosition;
    for(let i = 0; i <= max; i++) {
        let fuel = positions.reduce((a,b) => {
            let distance = Math.abs(i - b);
            return a + ((distance + 1)/2) * distance;
        }, 0);
        
        if (!minFuel) minFuel = fuel;
        if (fuel <= minFuel) {
            minPosition = i;
            minFuel = fuel;
        }
    }

    terminal.textContent = `Minimum fuel consumption at position: ${minPosition} with ${minFuel} units of fuel consumed`;
}