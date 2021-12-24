loadScript('Amphipod.js');

scripts.day23_1 = async () => {
    let data = await getFile('day23/input.txt');
    let parts = data.split('\r\n');
    let pods = [
        new Amphipod('A', 0, parts[2][3]),
        new Amphipod('A', 1, parts[3][3]),
        new Amphipod('B', 0, parts[2][5]),
        new Amphipod('B', 1, parts[3][5]),
        new Amphipod('C', 0, parts[2][7]),
        new Amphipod('C', 1, parts[3][7]),
        new Amphipod('D', 0, parts[2][9]),
        new Amphipod('D', 1, parts[3][9])
    ];

    let serialize = (sim) => sim.pods.map(x => `${x.type}:${x.room}${x.pos}`).reduce((a,b) => `${a},${b}`, '');
    let getMoves = (sim) => sim.pods.map(x => x.availableMoves(sim.pods.filter(p => p != x))).reduce((a,b) => a.concat(b), []);
    let getProjectedMinimum = (sim) => sim.pods.map(x => x.minimum(sim.pods)).reduce((a,b) => a + b, 0);

    let minCost = 14500;
    let attempted = new Set();
    let simulations = [{ pods, cost: 0}];
    let start = Date.now();

    while(simulations.length > 0) {
        let sim = simulations.splice(0, 1)[0];
        let json = JSON.stringify(sim);
        attempted.add(serialize(sim));

        let moves = getMoves(sim);
        if (moves.length == 0) {
            let correctPods = sim.pods.filter(p => p.room == p.type).length;
            if (correctPods == 8 && sim.cost < minCost)
                minCost = sim.cost;

            continue;
        }

        moves.forEach(move => {
            let copy = JSON.parse(json);
            copy.pods = copy.pods.map(p => Object.assign(new Amphipod(), p));
            let pod = copy.pods.filter(p => p.room == move.pod.room && p.pos == move.pod.pos)[0];
            pod.room = move.to.room;
            pod.pos = move.to.pos;
            copy.cost += move.to.cost;
            let projected = copy.cost + getProjectedMinimum(copy);
            if (projected < minCost && !attempted.has(serialize(copy))) 
                simulations.push(copy);
        });

        simulations.sort((a,b) => b.cost - a.cost);
    }

    terminal.textContent = `The minimum cost to move all amphipods to the correct rooms is ${minCost}\r\n(${Date.now() - start} ms)`;
}