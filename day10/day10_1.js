scripts.day10_1 = async () => {
    const closeTokens = ')]}>'.split('');
    const openTokens = '([{<'.split(''); 

    const points = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137
    };

    let data = await getFile('day10/day10_input.txt');
    let lines = data.split('\r\n');
    let scores = lines.map(line => {
        let group = '';
        while(line.length > 0) {
            let next = line[0];
            if (openTokens.includes(next)) {
                group += next;
            } else if (closeTokens.includes(next)) {
                let previousOpen = group[group.length - 1];
                if (openTokens.indexOf(previousOpen) != closeTokens.indexOf(next)) {
                    return points[next];
                } else {
                    group = group.substring(0, group.length - 1);
                }
            }

            line = line.substring(1);
        }

        return 0;
    });
    
    let total = scores.reduce((a,b) => a + b, 0);
    terminal.textContent = `Total error score is ${total}`;
}