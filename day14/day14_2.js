scripts.day14_2 = async () => {
    let data = await getFile('day14/input.txt');
    let parts = data.split('\r\n\r\n');
    let polymer = parts[0];
    let instructions = {};
    parts[1].split('\r\n').forEach(x => {
        let parts = x.split(' -> ');
        instructions[parts[0]] = {
            middle: parts[1],
            left: `${parts[0][0]}${parts[1]}`,
            right: `${parts[1]}${parts[0][1]}`
        };
    });

    let groupings = {};
    let addGrouping = (key) => {
        if (!groupings[key]) groupings[key] = 0;

        groupings[key]++;
    };

    for(let i = 0; i < polymer.length; i++) {
        addGrouping(polymer[i]);
        if (i > 0) 
            addGrouping(polymer.substring(i-1, i+1));
    }

    let step = () => {
        let temp = {};
        for(let key in groupings) {
            if (key.length == 1) {
                if (!temp[key]) temp[key] = 0;
                temp[key] += groupings[key];
            } else {
                let instruction = instructions[key];
                if (!temp[instruction.left]) temp[instruction.left] = 0;
                if (!temp[instruction.right]) temp[instruction.right] = 0;
                if (!temp[instruction.middle]) temp[instruction.middle] = 0;
                temp[instruction.left] += groupings[key];
                temp[instruction.right] += groupings[key];
                temp[instruction.middle] += groupings[key];
            }
        }

        groupings = temp;
    };

    let groupCharacters = () => {
        let characterGroups = [];
        for(let key in groupings) {
            if (key.length > 1) continue;

            characterGroups.push({ key, count: groupings[key] });
        }

        return characterGroups.sort((a,b) => a.count > b.count);
    }

    let steps = 40;
    let n = 0;
    while(n++ < steps) {
        step();
    }

    let characters = groupCharacters();
    let mostFrequent = characters[characters.length - 1];
    let leastFrequent = characters[0];
    terminal.textContent = `The sum of the most frequent group (${mostFrequent.key}) less the least frequent (${leastFrequent.key}) is ${mostFrequent.count - leastFrequent.count}.`;
}
