const rooms = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
};

const costs = {
    A: 1,
    B: 10,
    C: 100,
    D: 1000
}

class Amphipod {
    type = '';
    room = '';
    pos = 0;
    roomSize = 2;

    constructor(room = '', pos = 0, type = '', roomSize = 2) {
        this.room = room;
        this.pos = pos;
        this.type = type;
        this.roomSize = roomSize;
    }

    availableMoves(pods = [new Amphipod]) {
        let possiblePaths = [];
        let others = pods.filter(p => p != this);
        if (this.room == this.type) {
            let podsWaitingBehindMe = others.filter(o => o.pos > this.pos && o.type != o.room && o.room == this.type);
            if (podsWaitingBehindMe.length == 0) return [];
        } else {
            let spaceInMyRoom = this.roomSize - others.filter(o => o.room == o.type && o.room == this.type).length;
            let path = this.pathTo(this.type, spaceInMyRoom - 1, others);
            if (path) return [{ pod: this, to: path }];
        }

        if (this.room != 'H') { // can't move from hallway to hallway
            possiblePaths = possiblePaths.concat([
                this.pathTo('H', 0, others),
                this.pathTo('H', 1, others),
                this.pathTo('H', 3, others),
                this.pathTo('H', 5, others),
                this.pathTo('H', 7, others),
                this.pathTo('H', 9, others),
                this.pathTo('H', 10, others)
            ]);
        }

        let availablePaths = possiblePaths.filter(x => x != null);
        return availablePaths.map(x => {
            return {
                pod: this,
                to: x
            };
        });
    }

    pathTo(room = 'H', pos = 0, others = [new Amphipod]) {
        let currentRoom = this.room;
        let currentPos = this.pos;
        let cost = 0;
        while(currentRoom != room || currentPos != pos) {
            if (currentRoom == room && currentPos > pos) {
                currentPos--;
            } else if (currentRoom == room && currentPos < pos) {
                currentPos++;
            } else if (currentRoom != 'H' && currentPos > 0) {
                currentPos--;
            } else if (currentRoom != 'H' && currentPos == 0) {
                currentPos = rooms[currentRoom];
                currentRoom = 'H';
            } else if (currentRoom == 'H' && currentPos > rooms[room]) {
                currentPos--;
            } else if (currentRoom == 'H' && currentPos < rooms[room]) {
                currentPos++;
            } else if (currentRoom == 'H' && currentPos == rooms[room]) {
                currentPos = 0;
                currentRoom = room;
            }

            cost += costs[this.type];
            let obstructed = others.some(o => o.room == currentRoom && o.pos == currentPos);
            if (obstructed) return null;
        }

        return { room, pos, cost };
    }

    minimum(pods = [new Amphipod]) {
        let min = 0;
        if (this.room == this.type) {
            let others = pods.filter(p => p != this);
            let podsWaitingBehindMe = others.filter(o => o.pos > this.pos && o.type != o.room && o.room == this.type);
            if (podsWaitingBehindMe.length == 0) return 0;
            return costs[this.type] * (2 + this.pos * 2);
        } else if (this.room != 'H') {
            min += costs[this.type] * (1 + this.pos);
            min += costs[this.type] * Math.abs(rooms[this.type] - rooms[this.room]);
        } else {
            min += costs[this.type] * Math.abs(this.pos - rooms[this.type]);
        }

        min += costs[this.type];
        return min;
    }
}