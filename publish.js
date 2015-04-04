/* eslint-env node */

import fs from 'fs';
import rm from 'rimraf';

function noop() {}

function prepublish() {
    fs.readdir('lib', (err, files) => {
        if (err) {
            return;
        }

        files.forEach((file) => {
            const name = file.replace('.js', '');
            const filePath = name === 'index' ? file : `${file}/index.js`;
            const contents = [
                `'use strict';`,
                '',
                `module.exports = require('./lib/${filePath}');`
            ].join('\n');

            fs.writeFile(`./${name}.js`, contents);
        });
    });
}

function postpublish() {
    fs.readdir('lib', (err, files) => {
        if (err) {
            return;
        }

        files.forEach((file) => {
            const name = file.replace('.js', '');

            rm(`${name}.js`, noop);
        });
    });

    rm('./lib', noop);
}

function main() {
    const commands = {prepublish, postpublish};

    commands[process.argv[2]]();
}

main();
