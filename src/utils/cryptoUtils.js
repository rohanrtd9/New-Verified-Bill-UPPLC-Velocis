import CryptoJS from 'crypto-js';
const secretKey = 'f3e1acb9e5f9b8dcb4561e903d5895f1a07e72c758e9b3af6f1f1d4a3e293f8a';
if (!secretKey) {
    throw new Error('Missing secret key in environment variables');
  }
export const encrypt = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};
export const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
