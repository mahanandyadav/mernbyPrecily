const path=require('path');
const webpack=require('webpack');

const environment=process.env.ENVIRONMENT;

console.log('environment::::::::::',environment);

let ENVIRONMENT_VARIABLES={
    'process.env.ENVIRONMENT':JSON.stringify('development'),
    'process.env.PORT':JSON.stringify('3001'),
    'process.env.MONGO_CONNECTION_STRING':JSON.stringify('mongodb:://mongo-db:27017'),
}
if(environment==='test'){
    ENVIRONMENT_VARIABLES={
        'process.env.ENVIRONMENT':JSON.stringify('test'),
        'process.env.PORT':JSON.stringify('3001'),
        'process.env.MONGO_CONNECTION_STRING':JSON.stringify('mongodb:://mongo-db:27017'),
    }
}else if(environment==='production'){
    ENVIRONMENT_VARIABLES={
        'process.env.ENVIRONMENT':JSON.stringify('production'),
        'process.env.PORT':JSON.stringify('80'),
        'process.env.MONGO_CONNECTION_STRING':JSON.stringify('mongodb+srv://mny:QTCdKtIouJJWbUYN@cluster0.zxfwd.mongodb.net/MernDocker?retryWrites=true&w=majority'),
    }
}

module.exports={
    entry:'./index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'api.bundle.js',
    },
    target:'node',
    plugins:[
        new webpack.DefinePlugin(ENVIRONMENT_VARIABLES),
    ],
}

