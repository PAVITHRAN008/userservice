
import crypto from "crypto"


const algorithm = 'aes-256-cbc';
const key = Buffer.from('12345678901234567890123456789012');
const iv = Buffer.from('1234567890123456');
const decryptedPassword = async (encryptedPassword) => {
    try {
        const encryptedText = Buffer.from(encryptedPassword, 'base64');
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (err) {
        console.error("Password decryption error:", err.message);
        throw err;
    }
};
export default decryptedPassword