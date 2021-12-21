scripts.day21_2 = async () => {
    await loadScript('Game.js');
    let data = await getFile('day21/input.txt');
    let p1Wins = 0;
    let p2Wins = 0;
    let universes = {};
    universes[new Game(data, null).getKey()] = 1;
    let nKeys = 0;
    do {
        nKeys = 0;
        let temp = {};
        for(let key in universes) {
            let occurrences = universes[key];
            let game = JSON.parse(key);
            let games = new Game('', game).turn();
            let winners = games.filter(x => x.isDone);
            p1Wins += winners.filter(x => x.players[0].score > x.players[1].score).length * occurrences;
            p2Wins += winners.filter(x => x.players[1].score > x.players[0].score).length * occurrences;

            games.filter(g => !g.isDone).forEach(g => {
                let k = g.getKey();
                if (temp[k]) temp[k] += occurrences;
                else temp[k] = occurrences;
            });

            nKeys++;
        }

        universes = temp;
    } while(nKeys > 0);

    terminal.textContent = `The player who wins in the most universes wins ${Math.max(p1Wins, p2Wins)} times`;
}
