loadScript('ALU.js');

scripts.day24_1 = async () => {
    let data = (await getFile('day24/input.txt')).split('\r\n');
    alu = new ALU();
    alu.instructions = data;
    alu.run();

    let input = '9'.repeat(14).split('');
    let zMin = Infinity;
    let iterations = 20;
    let lowerBound = 65984919997939;
    while(iterations > 0) {
        for(let i = 0; i < input.length; i++) {
            for(let j = 0; j < input.length; j++) {
                if (j == i) continue;
                let nMin = Infinity;
                let keyMin = '11';
                for(let n = 11; n <= 99; n++) {
                    if (n.toString().includes('0')) continue;
                    let key = n.toString();
                    input[i] = key[0];
                    input[j] = key[1];
                    alu.input = input.reduce((a,b) => `${a}${b}`);
                    if (Number(alu.input) <= lowerBound) continue;

                    alu.execute();
                    if (alu.z < zMin) zMin = alu.z;
                    if (alu.z == 0 && Number(alu.input) > lowerBound) lowerBound = Number(alu.input);;
                    if (alu.z < nMin) {
                        nMin = alu.z;
                        keyMin = key;
                    }
                }

                input[i] = keyMin[0];
                input[j] = keyMin[1];
            }
        }

        iterations--;
    }

    terminal.textContent = `Maximum model number accepted was ${lowerBound}`;
}