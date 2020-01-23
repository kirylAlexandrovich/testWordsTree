let result = '';
let requestStack = [];

function requester(root) {
    return fetch(`https://fe.it-academy.by/Examples/words_tree/${root}`)
        .then(function (response) {
            return response.text();
        })
        .then(function(text) {
            try {
                const fileData = JSON.parse(text);
                const nextFile = fileData.shift();

                requestStack = requestStack.concat(fileData.reverse());
                return requester(nextFile);
            }
            catch(e) {
                if(e.name === 'SyntaxError') {
                    result += text + ' ';
                }
            }
        })
        .then(() => {
            if(requestStack.length) {
                return requester(requestStack.pop());
            }

            return result;
        })
        .catch((e) => {
            console.log(e);
        })

}

function startRequester () {
    requester('root.txt').then(() => {
    console.log(result);
});
}