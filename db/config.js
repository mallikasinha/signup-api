
module.exports = {
    development: {
        username: 'mallika',
        password: 'mallika',
        database: 'nodeapp',
        host: '127.0.0.1',
        dialect: 'postgres'
    },
    test: {
        username: 'aptrental_dev',
        password: 'aptrental_dev',
        database: 'aptrental_test',
        host: '127.0.0.1',
        dialect: 'postgres'
    },
    production:{
        username: 'rental',
        password: 'rental',
        database: 'rental',
        host: '127.0.0.1',
        dialect: 'postgres'
    }
};