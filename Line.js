class Line {

    start = {x:0, y:0};
    end = {x:1, y:1};
    points = [this.start, this.end];
    type = 'diagonal'

    constructor(rawInput = '0,0 -> 1,1') {
        let parts = rawInput.split(' -> ');
        let start = parts[0].split(',').map(x => Number(x));
        let end = parts[1].split(',').map(x => Number(x));
        this.start = { x: start[0], y: start[1] };
        this.end = { x: end[0], y: end[1] };

        this.points = [];
        if (this.start.x == this.end.x) this.type = 'vertical'
        if (this.start.y == this.end.y) this.type = 'horizontal'

        this.drawPoints();
    }

    drawPoints() {
        let dx = 0;
        if (this.start.x > this.end.x) dx = -1;
        if (this.start.x < this.end.x) dx = 1;

        let dy = 0;
        if (this.start.y > this.end.y) dy = -1;
        if (this.start.y < this.end.y) dy = 1;

        let i = this.start.x;
        let j = this.start.y;
        while(i != this.end.x || j != this.end.y) {
            this.points.push({ x: i, y: j });
            i += dx;
            j += dy;
        }

        this.points.push(this.end);
    }
}