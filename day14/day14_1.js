scripts.day14_1 = async () => {
    let data = await getFile('day14/input.txt');
    let parts = data.split('\r\n\r\n');
    let polymer = parts[0];
    let instructions = parts[1].split('\r\n').map(x => {
        let parts = x.split(' -> ');
        return {
            match: parts[0],
            insert: `${parts[0][0]}${parts[1]}`
        };
    });

    let step = () => {
        let segments = [];
        for(let i = 1; i < polymer.length; i++) {
            let pair = polymer.substring(i-1, i+1);
            let instruction = instructions.find(x => x.match == pair);
            if (!instruction) continue;

            segments.push(instruction.insert);
        }

        segments.push(polymer[polymer.length - 1]);
        polymer = segments.reduce((a,b) => `${a}${b}`, '');
    };

    let groupPolymer = () => {
        let groups = [];
        for(let i = 0; i < polymer.length; i++) {
            let key = polymer[i];
            let group = groups.find(x => x.key == key);
            if(!group) {
                group = { key, count: 0 };
                groups.push(group);
            }

            group.count++;
        }

        return groups;
    }

    let steps = 10;
    let n = 0;
    while(n++ < steps) {
        step();
    }

    let groups = groupPolymer();
    groups.sort((a,b) => a.count > b.count);
    let mostFrequent = groups[groups.length - 1];
    let leastFrequent = groups[0];
    terminal.textContent = `The sum of the most frequent group (${mostFrequent.key}) less the least frequent (${leastFrequent.key}) is ${mostFrequent.count - leastFrequent.count}.`;
}
