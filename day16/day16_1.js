scripts.day16_1 = async () => {
    let data = await getFile('day16/input.txt');
    let hex2bin = (hex) => hex.split('').map(h => parseInt(h, 16).toString(2).padStart(4, '0')).reduce((a,b) => `${a}${b}`, '');
    let binary = hex2bin(data);
    const types = {
        op0: 0,
        op1: 1,
        op2: 2,
        op3: 3,
        literal: 4
    };

    let parse = (raw = '') => {
        let i = 0;
        let packet = {};
        packet.version = parseInt(raw.substring(0, 3), 2);
        packet.type = parseInt(raw.substring(3, 6), 2);
        packet.children = [];
        if (packet.type == types.literal) {
            i = 1;
            let value2 = '';
            do {
                i += 5;
                value2 += raw.substring(i+1, i+5);
            } while(raw[i] == 1)

            packet.value = parseInt(value2, 2);
            i += 5;
        } else {
            let lengthType = parseInt(raw[6], 2);
            let length = lengthType == 1 ? 11 : 15;
            i = 7 + length;
            let l = parseInt(raw.substring(7, i), 2);
            let n = 0;
            while(n < l) {
                let child = parse(raw.substring(i));
                i += child.end;
                packet.children.push(child);
                n += lengthType == 0 ? child.end : 1;
            }
        }

        packet.end = i;
        return packet;
    };

    let calculateVersion = (packet) => packet.version + packet.children.reduce((a,b) => a + calculateVersion(b), 0);

    let message = parse(binary);
    let verisonTotal = calculateVersion(message);
    terminal.textContent = `Total version count is ${verisonTotal}`;
}
