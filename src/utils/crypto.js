import CryptoJS from 'crypto-js';

/**
 * Decrypts a string using AES.
 * @param {string} encryptedData - The ciphertext.
 * @param {string} password - The riddle answer (decryption key).
 * @returns {object|null} - The decrypted JSON object (content) or null if failure.
 */
export const decryptContent = (encryptedData, password) => {
    try {
        const normalizedKey = password.trim().toLowerCase();
        const bytes = CryptoJS.AES.decrypt(encryptedData, normalizedKey);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedText) return null;

        return JSON.parse(decryptedText);
    } catch (error) {
        console.error("Decryption failed:", error);
        return null;
    }
};
