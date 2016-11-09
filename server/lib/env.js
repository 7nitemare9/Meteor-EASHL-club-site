let pwd = process.cwd();
pwd = pwd.substring(0, pwd.indexOf('.meteor'))
require('dotenv').config({path: process.env.PWD || pwd + '/.env'});
