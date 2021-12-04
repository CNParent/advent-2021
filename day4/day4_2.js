scripts.day4_2 = async () => {
    await loadScript('Board.js');
    let data = await getFile('day4/day4_1_input.txt');
    let parts = data.split('\r\n\r\n');
    let draws = parts[0].split(',').map(x => Number(x));
    let boards = parts.slice(1).map(x => new Board(x));
    let winners = [];
    let draw = 0;
    while (boards.length > 0 && draws.length != 0) {
        draw = draws.splice(0, 1)[0];
        boards.forEach(x => x.mark(draw));
        boards.filter(x => x.isWinner()).forEach(x => winners.push(x));
        boards = boards.filter(x => !x.isWinner());
    }

    let winner = winners[winners.length - 1];
    terminal.textContent = `The biggest loser's score is ${winner.getScore(draw)}`;
}