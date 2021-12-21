class Game {

    boardSize = 10;
    targetScore = 21;
    nRolls = 0;
    players = [{ position: 0, score: 0 }];
    isDone = false;

    constructor(raw = '', other) {
        if(other) {
            this.nRolls = other.nRolls;
            this.players = other.players.map(x => {
                return { position: x.position, score: x.score };
            });
        } else {
            let parts = raw.split('\r\n');
            let p1 = Number(parts[0].split(': ')[1]) - 1;
            let p2 = Number(parts[1].split(': ')[1]) - 1;
            this.players = [
                { position: p1, score: 0 },
                { position: p2, score: 0 }
            ];
        }
    }

    turn() {
        if (this.isDone) return [this];
        
        let universes = [];
        let playerIndex = (this.nRolls % 6) == 0 ? 0 : 1;
        this.nRolls += 3;
        for(let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    let game = new Game(null, this);
                    let p = game.players[playerIndex];
                    p.position += i + j + k + 3;
                    p.position = p.position % 10;
                    p.score += p.position + 1;
                    if (p.score >= game.targetScore)
                        game.isDone = true;
                    
                    universes.push(game);
                }
            }
        }

        return universes;
    }

    getKey() {
        return JSON.stringify({
            players: this.players,
            nRolls: this.nRolls
        });
    }
}