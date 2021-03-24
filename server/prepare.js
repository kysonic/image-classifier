const faker = require('faker');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const CATEGORIES = [{
    method: 'name.firstName',
    intent: 'name'
}, {
    method: 'random.word',
    intent: 'none'
}];

const FILE_PATH = './server/dataset/train.json';

const AMOUNT_PER_CATEGORY = 10000;
const CHUNK = 1000;

const prepareChunk = ({method, intent}) => {
    const chunk = [];

    for (let i = 0; i < CHUNK; i++) {
        chunk.push({
            text: _.get(faker, method)(),
            intent
        });
    }

    return chunk;
}

const run = () => {
    fs.writeFileSync(path.resolve(FILE_PATH), '', 'UTF-8');
    const writeStream = fs.createWriteStream(path.resolve(FILE_PATH));

    writeStream.write('[');

    CATEGORIES.forEach((category) => {
        let count = 0;

        while (count <= AMOUNT_PER_CATEGORY) {
            const chunk = prepareChunk(category);
            count += CHUNK;

            const string = JSON.stringify(chunk).replace('[', '').replace(']', '');

            writeStream.write(string);
            console.log(count, 'Added');
        }
    });

    writeStream.write(']');
}

run();


