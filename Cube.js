class Cube {
    x = { from: 0, to: 0 };
    y = { from: 0, to: 0 };
    z = { from: 0, to: 0 };
    enable = true;
    children = [];

    parse(raw = '') {
        let parts = raw.split(' ');
        let enable = parts[0] == 'on';
        let coords = parts[1].split(',').map(c => c.split('=')[1].split('..'));
        this.enable = enable;
        this.x = { from: Number(coords[0][0]), to: Number(coords[0][1]) };
        this.y = { from: Number(coords[1][0]), to: Number(coords[1][1]) };
        this.z = { from: Number(coords[2][0]), to: Number(coords[2][1]) };
    }

    hitTest(other = new Cube()) {
        return !(
            other.x.from > this.x.to ||
            other.x.to < this.x.from ||
            other.y.from > this.y.to ||
            other.y.to < this.y.from ||
            other.z.from > this.z.to ||
            other.z.to < this.z.from
        );
    }

    merge(other = new Cube()) {
        if (!this.hitTest(other)) return;

        let overlap = new Cube();
        overlap.x = {
            from: Math.max(other.x.from, this.x.from),
            to: Math.min(other.x.to, this.x.to)
        };
        overlap.y = {
            from: Math.max(other.y.from, this.y.from),
            to: Math.min(other.y.to, this.y.to)
        };
        overlap.z = {
            from: Math.max(other.z.from, this.z.from),
            to: Math.min(other.z.to, this.z.to)
        };

        overlap.enable = !this.enable && other.enable;

        this.children.forEach(x => x.merge(overlap));
        this.children.push(overlap);
    }

    size() {
        let sz = (this.x.to - this.x.from + 1) * (this.y.to - this.y.from + 1) * (this.z.to - this.z.from + 1);
        this.children.forEach(x => {
            sz += x.size();
        });

        return this.enable ? sz : -sz;
    }
}