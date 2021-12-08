scripts.day8_2 = async () => {
    let data = await getFile('day8/day8_1_input.txt');
    let signals = data.split('\r\n').map(x => {
        return {
            inputs: x.split(' | ')[0].split(' '),
            outputs: x.split(' | ')[1].split(' '),
            value: 0
        };
    });

    let textHasAll = (a = '', b = '') => !b.split('').some(c => !a.includes(c));
    
    signals.forEach(x => {
        let digits = [];
        digits[1] = x.inputs.find(i => i.length == 2);
        digits[4] = x.inputs.find(i => i.length == 4);
        digits[7] = x.inputs.find(i => i.length == 3);
        digits[8] = x.inputs.find(i => i.length == 7);
        digits[9] = x.inputs.find(i => textHasAll(i, digits[4]) && i.length == 6);
        digits[6] = x.inputs.find(i => !textHasAll(i, digits[7]) && i.length == 6);
        digits[0] = x.inputs.find(i => i.length == 6 && i != digits[6] && i != digits[9]);
        digits[5] = x.inputs.find(i => textHasAll(digits[6], i) && i.length == 5);
        digits[3] = x.inputs.find(i => textHasAll(i, digits[1]) && i.length == 5);
        digits[2] = x.inputs.find(i => i.length == 5 && i != digits[5] && i != digits[3]);
        
        let value = '';
        for(let i = 0; i < 4; i++) {
            let output = x.outputs[i];
            let digit = digits.find(d => textHasAll(d, output) && d.length == output.length);
            value += digits.indexOf(digit);
        }

        x.value = Number(value);
    });

    let sum = signals.reduce((a,b) => a + b.value, 0);
    terminal.textContent = `The sum of all outputs is ${sum}.`;
}