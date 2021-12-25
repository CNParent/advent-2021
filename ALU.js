const Procedure = () => {
    let steps = [];
    let instance = () => steps.forEach(x => x());
    instance.then = fn => steps.push(fn);
    return instance;
}

class ALU {

    instructions = [''];
    input = '99999999999999';

    w = 0;
    x = 0;
    y = 0;
    z = 0;

    execute = Procedure();

    run() {
        let index = 0;
        this.execute.then(() => {
            this.w = 0;
            this.x = 0;
            this.y = 0;
            this.z = 0;
        });

        this.instructions.forEach(x => {
            let parts = x.split(' ');
            let val;
            if (parts[0] == 'inp') {
                val = index;
                index++;
            } else {
                if (isNaN(Number(parts[2]))) val = (a => () => this[a])(parts[2]);
                else val = (n => () => n)(Number(parts[2]));
            }

            this.execute.then(this[parts[0]](parts[1], val));
        });
    }

    inp(a = 'w', index = 0) {
        return () => this[a] = Number(this.input[index]);
    }

    add(a = 'w', val = () => 0) {
        return () => this[a] = this[a] + val();
    }

    mul(a = 'w', val = () => 0) {
        return () => this[a] = this[a] * val();
    }

    div(a = 'w', val = () => 0) {
        return () => this[a] = val() == 0 ? this[a] : Math.floor(this[a] / val());
    }

    mod(a = 'w', val = () => 0) {
        return () => this[a] = val() == 0 ? this[a] : this[a] % val();
    }

    eql(a = 'w', val = () => 0) {
        return () => this[a] = this[a] == val() ? 1 : 0;
    }
}