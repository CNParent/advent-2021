scripts.day18_1 = async () => {
    let data = await getFile('day18/input.txt');

    let getDepth = (a, d = 0) => {
        if (typeof a == 'number') return d;

        d++;
        return Math.max(getDepth(a[0], d), getDepth(a[1], d));
    };

    let getMax = (a) => {
        if (typeof a == 'number') return a;

        return Math.max(getMax(a[0]), getMax(a[1]));
    }

    let add = (aStr, bStr) => {
        let a = JSON.parse(aStr);
        let b = JSON.parse(bStr);
        if(!a || a.length == 0) return bStr;

        let outer = [a,b];
        let json = JSON.stringify(outer);

        return reduce(json);
    };

    let reduce = (json) => {
        let obj = JSON.parse(json);
        while (getDepth(obj) > 4 || getMax(obj) > 9) {
            if (getDepth(obj) > 4) {
                json = explode(json);
                obj = JSON.parse(json);
            } else {
                split(obj);
                json = JSON.stringify(obj);
            }
        }

        return json;
    }

    let explode = (json) => {
        let d = 0;
        let i = 0;
        while(true) {
            if (json[i] == '[') d++;
            else if (json[i] == ']') d--;

            if (d == 5) {
                let end = json.indexOf(']', i) + 1;
                let aStr = json.substring(i, end);
                let a = JSON.parse(aStr);
                let token = '$'.repeat(aStr.length);
                json = json.substring(0, i) + token + json.substring(end);
                json = addLeft(json, i, a[0]);
                json = addRight(json, i, a[1]);
                return json.replace(token, '0');
            }
            i++;
        }
    };

    let addLeft = (json, i, n) => {
        while(i >= 0) {
            i--;
            if (json[i] <= '9' && json[i] >= '0') {
                let end = i + 1;
                let start = json[i-1] <= '9' && json[i-1] >= '0' ? i - 1 : i;
                let left = Number(json.substring(start, end)) + n;
                return json.substring(0, start) + left + json.substring(end);
            }
        }

        return json;
    }

    let addRight = (json, i, n) => {
        while(i < json.length) {
            if (json[i] <= '9' && json[i] >= '0') {
                let start = i;
                let end = json[i+1] <= '9' && json[i+1] >= '0' ? i + 2 : i + 1;
                let right = Number(json.substring(start, end)) + n;
                return json.substring(0, start) + right + json.substring(end);
            }

            i++;
        }

        return json;
    }

    let split = (a) => {
        for(let i = 0; i < a.length; i++) {
            if (typeof a[i] == 'number') {
                if (a[i] > 9) {
                    a[i] = [Math.floor(a[i] / 2), Math.ceil(a[i] / 2)];
                    return true;
                }
            } else {
                if(split(a[i])) return true;
            }
        }

        return false;
    };

    let magnitude = (a) => {
        if (typeof a == 'number') return a;

        return magnitude(a[0]) * 3 + magnitude(a[1]) * 2;
    };

    let numbers = data.split('\r\n').map(x => reduce(x));
    let result = numbers.reduce((a,b) => add(a,b), '[]');

    let sum = magnitude(JSON.parse(result));
    terminal.textContent = `The magnitude of ${result}\r\nis ${sum}`;
}
