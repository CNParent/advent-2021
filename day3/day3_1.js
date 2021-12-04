scripts.day3_1 = async () => {
    let data = await getFile('day3/day3_1_input.txt');
    let numbers = data.split('\r\n');
    let digits = numbers[0].length;
    let rates = [];
    for(let i = 0; i < digits; i++) {
        rates.push({
            one: numbers.map(x => x[i] == '1' ? 1 : 0).reduce((a,b) => a + b, 0),
            zero: numbers.map(x => x[i] == '0' ? 1 : 0).reduce((a,b) => a + b, 0)
        });
    }
    
    let gamma2 = '';
    let epsilon2 = '';
    for(let i = 0; i < rates.length; i++) {
        gamma2 += rates[i].one >= rates[i].zero ? '1' : '0';
        epsilon2 += rates[i].one >= rates[i].zero ? '0' : '1';
    }

    let gamma = parseInt(gamma2, 2);
    let epsilon = parseInt(epsilon2, 2);

    terminal.textContent = `Gamma (${gamma}) x Epsilon (${epsilon}) = ${gamma * epsilon}`;
}