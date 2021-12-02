scripts.day2_2 = async () => {
    let data = await getFile('day2/day2_1_input.txt');
    let commands = data.split('\n').map(x => {
        let parts = x.split(' ');
        return { direction: parts[0], value: Number(parts[1]) };
    });

    let position = {h:0, v:0, a:0};
    for(let i = 0; i < commands.length; i++) {
        let command = commands[i];
        if (command.direction == 'forward') {
            position.h += command.value;
            position.v += command.value * position.a;
        }
        if (command.direction == 'up') position.a -= command.value;
        if (command.direction == 'down') position.a += command.value;
    }

    terminal.textContent = `Horizontal position (${position.h}) x vertical position (${position.v}) = ${position.v * position.h}`;
}