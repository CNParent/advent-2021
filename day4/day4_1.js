scripts.day4_1 = async () => {
    await loadScript('Board.js');
    let data = await getFile('day4/day4_1_input.txt');
    let parts = data.split('\r\n\r\n');
    let draws = parts[0].split(',').map(x => Number(x));
    let boards = parts.slice(1).map(x => new Board(x));
    let draw = 0;
    while(boards.filter(x => x.isWinner()).length == 0 && draws.length != 0) {
        draw = draws.splice(0, 1)[0];
        boards.forEach(x => x.mark(draw));
    }

    let winner = boards.filter(x => x.isWinner())[0];
    terminal.textContent = `The winner's score is ${winner.getScore(draw)}`;
}