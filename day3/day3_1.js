scripts.day3_1 = async () => {
    let data = await getFile('day3/day3_1_input.txt');
    let numbers = data.split('\r\n');
    let digits = numbers[0].length;
    let rates = [];
    while(rates.length < digits)
        rates.push({ one: 0, zero: 0 });

    numbers.forEach((x) => {
        for(let i = 0; i < x.length; i++) {
            let bit = x.substr(i, 1);
            if (bit == '1') rates[i].one++;
            if (bit == '0') rates[i].zero++;
        }
    });

    let gamma2 = '';
    let epsilon2 = '';
    for(let i = 0; i < rates.length; i++) {
        if (rates[i].one > rates[i].zero) {
            gamma2 += '1';
            epsilon2 += '0';
        } else {
            gamma2 += '0';
            epsilon2 += '1';
        }
    }

    let gamma = parseInt(gamma2, 2);
    let epsilon = parseInt(epsilon2, 2);

    terminal.textContent = `Gamma (${gamma}) x Epsilon (${epsilon}) = ${gamma * epsilon}`;
}