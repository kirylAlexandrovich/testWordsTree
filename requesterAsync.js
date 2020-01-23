let resultStr = '';
let requestStackAsync = [];
let trigger = false;

const asyncRequester = async (root) => {
    const request = await fetch(`https://fe.it-academy.by/Examples/words_tree/${root}`);
    const fileText = await request.text();

    if(fileText) {
        try {
            const fileData = JSON.parse(fileText);
            const nextFile = fileData.shift();

            requestStackAsync = requestStackAsync.concat(fileData.reverse());

            await asyncRequester(nextFile);
        }

        catch(e) {
            if(e.name === 'SyntaxError') {
                resultStr += fileText + ' ';
            }
        }
    }

    if(requestStackAsync.length) {
        await asyncRequester(requestStackAsync.pop());
        if (!trigger) {
            trigger = true;
            console.log(resultStr);
        }
    }
};
