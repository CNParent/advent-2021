class Scanner {

    position = { x: 0, y: 0, z: 0 };
    rotation = { x: 0, y: 0, z: 0 };
    beacons = [{ x: 0, y: 0, z: 0 }];
    aligned = false;
    name = '';

    constructor(raw = '', overlapCount = 12) {
        this.name = raw.split('\r\n')[0].replace(/-/g, '');
        this.overlap = overlapCount;
        this.beacons = raw.split('\r\n').slice(1).map(x => {
            let coords = x.split(',');
            return { x: Number(coords[0]), y: Number(coords[1]), z: Number(coords[2]) };
        });
    }

    align(other = new Scanner()) {
        if(!this.aligned) return;
        if(other.aligned) return;
        for(let i = 0; i < 4; i++) {
            other.rotate('x');
            for(let j = 0; j < 4; j++) {
                other.rotate('y');
                for(let k = 0; k < 4; k++) {
                    other.rotate('z');
                    if (this.checkBeacons(other)) 
                        return;
                }
            }
        }
    }

    checkBeacons(other = new Scanner()) {
        for(let i = 0; i < this.beacons.length; i++) {
            for(let j = 0; j < other.beacons.length; j++) {
                let a = this.beacons[i];
                let b = other.beacons[j];
                let t = {
                    x: a.x - b.x,
                    y: a.y - b.y,
                    z: a.z - b.z
                };

                let overlapping = other.beacons.filter(b => this.beacons.some(a => 
                    b.x + t.x == a.x && 
                    b.y + t.y == a.y && 
                    b.z + t.z == a.z));
                    
                if (overlapping.length >= this.overlap) {
                    other.position.x = t.x;
                    other.position.y = t.y;
                    other.position.z = t.z;
                    other.beacons.forEach(b => {
                        b.x += t.x;
                        b.y += t.y;
                        b.z += t.z;
                    });

                    other.aligned = true;
                    return true;
                }
            }
        }

        return false;
    }

    rotate(axis = 'x') {
        this.rotation[axis] = (this.rotation[axis] + 90) % 360;
        let plane = ['y','z'];
        if (axis == 'y') plane = ['x','z'];
        else if (axis == 'z') plane = ['x','y'];
        this.beacons.forEach(b => {
            let temp = { x: b.x, y: b.y, z: b.z };

            b[plane[0]] = temp[plane[1]];
            b[plane[1]] = -temp[plane[0]];
        });
    }
}