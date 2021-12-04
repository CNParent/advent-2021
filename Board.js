class Board {
    
    size = 1;
    tiles = [{
        marked: false,
        row: 0,
        col: 0,
        val: 0
    }];

    constructor(rawInput = '') {
        this.tiles = [];
        rawInput.split('\r\n').filter(x => x).forEach((x,i) =>
            x.split(' ').filter(x => x).forEach((y,j) => 
                this.tiles.push({
                    marked: false,
                    row: i,
                    col: j,
                    val: Number(y)
                })));
        
        this.size = this.tiles.filter(x => x.row == 0).length;
    }

    mark(n = 0) {
        this.tiles.filter(x => x.val == n).forEach(x => x.marked = true);
    }

    isWinner() {
        let marked = this.tiles.filter(x => x.marked);
        for(let i = 0; i < this.size; i++) {
            if (marked.filter(x => x.row == i).length == this.size) return true;
            if (marked.filter(x => x.col == i).length == this.size) return true;
        }

        return false;
    }

    getScore(n) {
        let sum = this.tiles.filter(x => !x.marked).reduce((a,b) => a + b.val, 0);
        return n * sum;
    }
}