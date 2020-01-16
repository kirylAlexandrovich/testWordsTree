let result = '';

function requester(root) {
    fetch(`https://fe.it-academy.by/Examples/words_tree/${root}`)
        .then(function (response) {
            response.text()
                .then(function (text) {
                let resObj;
                try {
                    resObj = JSON.parse(text);
                } catch (e) {
                    result += text + ' ';
                    console.log(result);
                }

                if (resObj) {
                    resObj.forEach((file) => {
                        requester(file);
                    })
                }
            });
        }).catch(function (err) {
        console.log(err);
    })
}

requester('root.txt');
