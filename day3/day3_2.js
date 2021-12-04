scripts.day3_2 = async () => {
    let data = await getFile('day3/day3_1_input.txt');
    let numbers = data.split('\r\n');

    let rateAt = (filteredNumbers = numbers, index = 0) => {
        return {
            one: filteredNumbers.map(x => x[index] == '1' ? 1 : 0).reduce((a,b) => a + b, 0),
            zero: filteredNumbers.map(x => x[index] == '0' ? 1 : 0).reduce((a,b) => a + b, 0)
        }
    }

    let filterNumbers = (filteredNumbers = numbers, bit = 0, mode = 'common') => {
        let rate = rateAt(filteredNumbers, bit);
        let bitValue = rate.one >= rate.zero ? 1 : 0;
        if (mode != 'common') bitValue = Math.abs(bitValue - 1);

        let results = filteredNumbers.filter(x => x[bit] == bitValue);
        if (results.length == 1) return results[0];

        return filterNumbers(results, bit + 1, mode);
    };

    let oxygen2 = filterNumbers(numbers, 0, 'common');
    let co22 = filterNumbers(numbers, 0, 'uncommon');

    let oxygen = parseInt(oxygen2, 2);
    let co2 = parseInt(co22, 2);

    terminal.textContent = `Oxygen (${oxygen}) x CO2 (${co2}) = ${oxygen * co2}`;
}