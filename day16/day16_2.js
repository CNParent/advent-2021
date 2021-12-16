scripts.day16_2 = async () => {
    let data = await getFile('day16/input.txt');
    let hex2bin = (hex) => hex.split('').map(h => parseInt(h, 16).toString(2).padStart(4, '0')).reduce((a,b) => `${a}${b}`, '');
    let binary = hex2bin(data);
    const types = {
        sum: 0,
        product: 1,
        min: 2,
        max: 3,
        literal: 4,
        gt: 5,
        lt: 6,
        eq: 7
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

    let getValue = (packet) => {
        if (packet.type == types.sum) {
            return packet.children.reduce((a,b) => a + getValue(b), 0);
        } else if (packet.type == types.product) {
            return packet.children.reduce((a,b) => a * getValue(b), 1);
        } else if (packet.type == types.min) {
            return Math.min(...packet.children.map(x => getValue(x)));
        } else if (packet.type == types.max) {
            return Math.max(...packet.children.map(x => getValue(x)));
        } else if (packet.type == types.literal) {
            return packet.value;
        } else if (packet.type == types.gt) {
            return getValue(packet.children[0]) > getValue(packet.children[1]) ? 1 : 0;
        } else if (packet.type == types.lt) {
            return getValue(packet.children[0]) < getValue(packet.children[1]) ? 1 : 0;
        } else if (packet.type == types.eq) {
            return getValue(packet.children[0]) == getValue(packet.children[1]) ? 1 : 0;
        }

        throw 'How did we get here?';
    };

    let message = parse(binary);
    let value = getValue(message);
    terminal.textContent = `The value of the packet is ${value}`;
}
