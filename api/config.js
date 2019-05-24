const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    dbUrl: 'mongodb://localhost/lab95_cocktails',
    mongoOptions: {
        useNewUrlParser: true,
        useCreateIndex: true,
    },
    facebook: {
        appId: '367448963902267',
        appSecret: 'e8f6f023a8e4fa2c04e3f13030288772'
    }
};