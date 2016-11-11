let pwd = process.cwd();
console.log('cwd: ', pwd);
console.log('PWD: ', process.env.PWD);
pwd = pwd.substring(0, pwd.indexOf('.meteor'))
require('dotenv').config({path: (process.env.PWD || pwd) + '/.env'});
