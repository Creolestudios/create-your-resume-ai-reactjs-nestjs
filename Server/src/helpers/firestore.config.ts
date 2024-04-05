import * as admin from 'firebase-admin';
import * as fs from 'fs';
const filePath = './src/helpers/talresume.json';
const fileContents = fs.readFileSync(filePath, 'utf8');
const jsonData = JSON.parse(fileContents);
admin.initializeApp({
  credential: admin.credential.cert(jsonData)
}); 

module.exports = admin;
