scripts.day3_2 = async () => {
    let data = await getFile('day3/day3_1_input.txt');
    let numbers = data.split('\r\n');

    let rateAt = (filteredNumbers = numbers, index = 0) => {
        return {
            one: filteredNumbers.map(x => x[index] == '1' ? 1 : 0).reduce((a,b) => a + b, 0),
            zero: filteredNumbers.map(x => x[index] == '0' ? 1 : 0).reduce((a,b) => a + b, 0)
        }
    }

    let filterNumbers = (compare, filteredNumbers = numbers, bit = 0) => {
        let rate = rateAt(filteredNumbers, bit);
        let bitValue = compare(rate.one, rate.zero) ? 1 : 0;
        let results = filteredNumbers.filter(x => x[bit] == bitValue);
        if (results.length == 1) return results[0];

        return filterNumbers(compare, results, bit + 1);
    };

    let oxygen2 = filterNumbers((a,b) => a >= b);
    let co22 = filterNumbers((a,b) => a < b);

    let oxygen = parseInt(oxygen2, 2);
    let co2 = parseInt(co22, 2);

    terminal.textContent = `Oxygen (${oxygen}) x CO2 (${co2}) = ${oxygen * co2}`;
}