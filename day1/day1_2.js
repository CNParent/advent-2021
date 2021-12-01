scripts.day1_2 = async () => {
    let data = await getFile('day1/day1_1_input.txt');
    let depths = data.split('\n').map(x => Number(x));
    let increases = 0;
    for(var i = 3; i < depths.length; i++) {
        var previous = depths[i-3] + depths[i-2] + depths[i-1];
        var current = depths[i-2] + depths[i-1] + depths[i];
        if (current > previous) increases++;
    }

    terminal.textContent = `The depth increased ${increases} times`;
}