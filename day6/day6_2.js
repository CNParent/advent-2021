scripts.day6_2 = async () => {
    let data = await getFile('day6/day6_1_input.txt');
    let fish = data.split(',').map(x => Number(x));
    let pond = [...new Array(10)].map(x => 0);
    for(let i = 0; i < 10; i++)
        pond[i] = fish.filter(x => x == i).length;

    let simulate = () => {
        pond[7] += pond[0];
        pond[9] = pond[0];
        for(let i = 1; i < 10; i++) {
            pond[i - 1] = pond[i];
        }

        pond[9] = 0;
    }

    const iterations = 256;
    for(let i = 0; i < iterations; i++)
        simulate();

    let total = pond.reduce((a,b) => a + b, 0);
    terminal.textContent = `There are ${total} fish in the pond after ${iterations + 1} days`;
}