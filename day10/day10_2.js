scripts.day10_2 = async () => {
    const closeTokens = ')]}>'.split('');
    const openTokens = '([{<'.split(''); 

    const points = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4
    };

    let data = await getFile('day10/input.txt');
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
                    return 0;
                } else {
                    group = group.substring(0, group.length - 1);
                }
            }

            line = line.substring(1);
        }

        let score = 0;
        while(group.length > 0) {
            let i = openTokens.indexOf(group[group.length - 1]);
            score *= 5;
            score += points[closeTokens[i]];
            group = group.substring(0, group.length - 1);
        }

        return score;
    });
    
    scores = scores.filter(x => x).sort((a,b) => a > b);
    let middle = Math.round((scores.length - 1) / 2);
    terminal.textContent = `Total error score is ${scores[middle]}`;
}