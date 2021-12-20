scripts.day20_1 = async () => {
    let data = await getFile('day20/input.txt');
    let parts = data.split('\r\n\r\n');
    let mask = parts[0];
    let image = parts[1].split('\r\n').map(x => x.split(''));

    let pad = () => {
        let c = '.';
        if(n % 2 == 1 && mask[0] == '#') c = '#';

        let w = image[0].length;
        image.splice(0,0, c.repeat(w).split(''));
        image.splice(0,0, c.repeat(w).split(''));
        image.push(c.repeat(w).split(''));
        image.push(c.repeat(w).split(''));
        image.forEach((r) => {
            r.splice(0,0,c);
            r.splice(0,0,c);
            r.push(c);
            r.push(c);
        });
    };

    let enhance = () => {
        let enhanced = [];
        pad(image);
        let h = image.length;
        let w = image[0].length;
        for(let i = 1; i < h - 1; i++) {
            let row = [];
            enhanced.push(row);
            for(let j = 1; j < w - 1; j++) {
                row.push(enhanceAt(i, j));
            }
        }

        image = enhanced;
    };

    let enhanceAt = (i,j) => {
        let index2 = `${image[i-1][j-1]}${image[i-1][j]}${image[i-1][j+1]}`;
        index2 += `${image[i][j-1]}${image[i][j]}${image[i][j+1]}`;
        index2 += `${image[i+1][j-1]}${image[i+1][j]}${image[i+1][j+1]}`;
        index2 = index2.replace(/\./g, '0').replace(/\#/g, '1');

        let index = parseInt(index2, 2);
        return mask[index];
    };

    let n = 2;
    while(n > 0) {
        enhance();
        n--;
    }

    let lit = image.map(x => x.filter(y => y == '#').length).reduce((a,b) => a + b, 0);
    terminal.textContent = `There are ${lit} lit pixels in the resulting image`;
}
