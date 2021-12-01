let getFile = (url) => {
    return new Promise(resolve => {
        let req = new XMLHttpRequest();
        req.open('get', url);
        req.setRequestHeader('accept', 'text/plain');
        req.onloadend = () => {
            resolve(req.response);
        };
        req.send();
    });
}

let loadScript = (url) => {
    return new Promise(resolve => {
        if(document.querySelectorAll(`script[src="${url}"]`).length != 0) {
            resolve();
            return;
        }

        let element = document.createElement('script');
        element.src = url;
        element.onload = () => {
            resolve();
        };
    
        document.querySelector('body').appendChild(element);
    });
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}