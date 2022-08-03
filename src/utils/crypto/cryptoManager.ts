const crypto = require("crypto-js");

export function encrypt (data: string): string {
    return crypto.AES.encrypt(data, crypto.enc.Utf8.parse(process.env.REACT_APP_AES_ENCRYPT_KEY), {
        iv: crypto.enc.Utf8.parse(process.env.REACT_APP_AES_INIT_VECTOR),
        mode: crypto.mode.CBC
    }).toString();
}

export function decrypt (encryptedData: string): string {
    return crypto.AES.decrypt(encryptedData, crypto.enc.Utf8.parse(process.env.REACT_APP_AES_ENCRYPT_KEY), {
        iv: crypto.enc.Utf8.parse(process.env.REACT_APP_AES_INIT_VECTOR),
        mode: crypto.mode.CBC
    }).toString(crypto.enc.Utf8);

}