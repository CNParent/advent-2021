scripts.day3_2 = async () => {
    let data = await getFile('day3/day3_1_input.txt');
    let numbers = data.split('\r\n');
    let digits = numbers[0].length;
    
    let getRates = (filteredNumbers = numbers) => {
        let rates = [];
        while(rates.length < digits)
            rates.push({ one: 0, zero: 0 });


        filteredNumbers.forEach((x) => {
            for(let i = 0; i < x.length; i++) {
                let bit = x.substr(i, 1);
                if (bit == '1') rates[i].one++;
                if (bit == '0') rates[i].zero++;
            }
        });

        return rates;
    };

    let filterOxygen = (filteredNumbers = numbers, bit = 0) => {
        let rates = getRates(filteredNumbers);
        let bitValue = rates[bit].one >= rates[bit].zero ? '1' : '0';
        let results = filteredNumbers.filter(x => x[bit] == bitValue);
        if (results.length == 1) return results[0];

        return filterOxygen(results, bit + 1);
    };

    let filterCO2 = (filteredNumbers = numbers, bit = 0) => {
        let rates = getRates(filteredNumbers);
        let bitValue = rates[bit].one >= rates[bit].zero ? '0' : '1';
        let results = filteredNumbers.filter(x => x[bit] == bitValue);
        if (results.length == 1) return results[0];

        return filterCO2(results, bit + 1);
    };

    let oxygen2 = filterOxygen();
    let co22 = filterCO2();

    let oxygen = parseInt(oxygen2, 2);
    let co2 = parseInt(co22, 2);

    terminal.textContent = `Oxygen (${oxygen}) x CO2 (${co2}) = ${oxygen * co2}`;
}