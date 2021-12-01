scripts.day1_1 = async () => {
    let data = await getFile('day1/day1_1_input.txt');
    let depths = data.split('\n').map(x => Number(x));
    let increases = 0;
    for(var i = 1; i < depths.length; i++){
        if (depths[i] > depths[i-1]) increases++;
    }

    terminal.textContent = `The depth increased ${increases} times`;

}