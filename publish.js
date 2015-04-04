import fs from 'fs';
import rm from 'rimraf';


function prepublish() {
    fs.readdir('build', (err, files) => {
        files.forEach((file) => {
            const name = file.replace('.js', '');
            const filePath = name === 'index' ? file : `${file}/index.js`;
            const contents = [
                `'use strict';`,
                '',
                `module.exports = require('./build/${filePath}');`
            ].join('\n');

            fs.writeFile(`./${name}.js`, contents);
        });
    });
}

function postpublish() {
    fs.readdir('build', (err, files) => {
        files.forEach((file) => {
            const name = file.replace('.js', '');

            rm(`${name}.js`, _ => _);
        });
    });

    rm('./build', _ => _);
}

function main() {
    const commands = {prepublish, postpublish};

    commands[process.argv[2]]();
}

main();
