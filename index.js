const fs = require('fs');

async function main() {
    const dataSource = []
    for (let i = 1; i <= 96; i++) {
        fs.readFile(`./content/article-${i}.md`, 'utf8', (err, data) => {
            if (err) throw err;
            const dataSplit = data.split('\n')
            console.log('data', dataSplit);
            console.log('data split length =-=-=-=-=-=-=-=->>', dataSplit.length);
            const lawData = {}
            lawData.title = dataSplit[1]
            lawData.title = lawData.title.substring(7, lawData.title.length - 1)
            const content = []
            for (let j = 6; j < dataSplit.length; j++) {
                const datasp = dataSplit[j]
                if (datasp.length < 2 && (/\r/g).test(datasp)) {
                    continue
                } else {
                    content.push(datasp)
                }
            }
            let newData = content.join(' ').trim()
            if (newData.includes('\r') && newData.indexOf('\r') === newData.length - 2) {
                newData = newData.substring(0, newData.length - 2)
            }
            newData = newData.replaceAll(/\r/g, '\n')
            newData = newData.replaceAll(/&emsp;/g, '\t')

            lawData.content = newData
            dataSource.push(lawData)
            console.log('dataSource', dataSource);
            fs.writeFile('pdpa.json', JSON.stringify(dataSource), (err) => {
                console.log('err', err);
            });
        });
    }
}

main()