const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

// Caminho para o arquivo de chave de serviço baixado do Firebase
const serviceAccountPath = path.resolve(__dirname, '../../../firebase-service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const dbFirestore = admin.firestore();

module.exports = { dbFirestore, admin };
