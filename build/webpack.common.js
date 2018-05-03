const path = require('path');

module.exports = {
    entry: [
        'babel-polyfill', path.join(__dirname, '../src/main.ts')
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json']
    }
}
