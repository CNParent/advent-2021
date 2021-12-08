scripts.day8_1 = async () => {
    let data = await getFile('day8/day8_1_input.txt');
    let outputs = data.split('\r\n').map(x => x.split(' | ')[1].split(' '));
    let allDigits = outputs.reduce((a,b) => a.concat(b), []);
    let count = allDigits.filter(x => [2,4,3,7].includes(x.length)).length;
    terminal.textContent = `Found ${count} output digits that are a 1, 4, 7, or 8`;
}