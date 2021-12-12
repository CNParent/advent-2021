scripts.day12_1 = async () => {
    let data = await getFile('day12/input.txt');
    let rules = data.split('\r\n').map(x => {
        let parts = x.split('-');
        return {
            a: parts[0],
            b: parts[1]
        };
    });

    let system = {};
    let add = (id = '') => {
        if (system[id]) return;

        system[id] = {
            id,
            big: id.toUpperCase() === id,
            paths: []
        };
    }

    rules.forEach(rule => {
        add(rule.a);
        add(rule.b);

        let a = system[rule.a];
        let b = system[rule.b];
        a.paths.push(b);
        b.paths.push(a);
    });

    let findPaths = (path = [], cave = {}) => {
        path = [...path, cave];
        if (cave.id == 'end') return [path];

        return cave.paths.map(x => {
            if(!x.big && path.includes(x)) return [];
            return findPaths(path, x);

        }).reduce((a,b) => a.concat(b), []);
    };

    let allPaths = findPaths([], system['start']);

    terminal.textContent = `There are ${allPaths.length} unique paths within the cave system`;
}