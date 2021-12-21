scripts.day21_1 = async () => {
    let data = await getFile('day21/input.txt');
    let parts = data.split('\r\n');

    const boardSize = 10;
    const dieSize = 100;
    const targetScore = 1000;

    let nRolls = 0;
    let p1 = Number(parts[0].split(': ')[1]) - 1;
    let p2 = Number(parts[1].split(': ')[1]) - 1;
    let p1Score = 0;
    let p2Score = 0;
    let currentRoll = 0;

    while(true) {
        p1 += currentRoll + 1 + currentRoll +2 + currentRoll +3;
        p1 = p1 % boardSize;
        p1Score += p1 + 1;

        nRolls += 3;
        currentRoll += 3;
        currentRoll = currentRoll % dieSize;
        if (p1Score >= targetScore) break;

        p2 += currentRoll + 1 + currentRoll +2 + currentRoll +3;
        p2 = p2 % boardSize;
        p2Score += p2 + 1;

        nRolls += 3;
        currentRoll += 3;
        currentRoll = currentRoll % dieSize;
        if (p2Score >= targetScore) break;
    }

    let losingScore = Math.min(p1Score, p2Score)
    let total = nRolls * losingScore;
    terminal.textContent = `The losing score ${losingScore} x the number of rolls ${nRolls} = ${total}`;
}
