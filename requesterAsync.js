let resultStr = '';

const asyncRequester = async (root) => {
    const res = await fetch(`https://fe.it-academy.by/Examples/words_tree/${root}`);

    const resText = await res.text();

    let resObj;
    try {
        resObj = JSON.parse(resText);
    } catch (e) {
        resultStr += resText + ' ';
        console.log(resultStr);
    }

    if (resObj) {
        resObj.forEach((file) => {
            if (file === 'file25.txt') return;
            asyncRequester(file);
        })
    }
};

asyncRequester('root.txt');
