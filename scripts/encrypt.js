import fs from 'fs';
import path from 'path';
import CryptoJS from 'crypto-js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_DATA_DIR = path.join(__dirname, '../raw_data');
const OUTPUT_DIR = path.join(__dirname, '../public/data');

// Ensure output dir exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const encryptData = () => {
    const configPath = path.join(RAW_DATA_DIR, 'config.json');

    if (!fs.existsSync(configPath)) {
        console.error('❌ Config file not found at:', configPath);
        process.exit(1);
    }

    const levels = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const publicManifest = [];

    levels.forEach((level, index) => {
        console.log(`🔒 Encrypting Level ${index + 1}: ${level.riddle}`);

        const key = level.answer.trim().toLowerCase();

        // Read image if exists
        let imageBase64 = null;
        if (level.content.image) {
            const imagePath = path.join(RAW_DATA_DIR, 'images', level.content.image);
            if (fs.existsSync(imagePath)) {
                const fileData = fs.readFileSync(imagePath);
                // Basic mime type detection
                const ext = path.extname(imagePath).toLowerCase().replace('.', '');
                const mime = ext === 'jpg' ? 'jpeg' : ext;
                imageBase64 = `data:image/${mime};base64,${fileData.toString('base64')}`;
            } else {
                console.warn(`⚠️  Image not found: ${level.content.image}`);
            }
        }

        const payload = {
            text: level.content.text,
            image: imageBase64,
            isFinal: level.isFinal || false
        };

        // Encrypt payload
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(payload), key).toString();
        const filename = `level_${index}.lock`; // .lock file extension for fun

        fs.writeFileSync(path.join(OUTPUT_DIR, filename), encrypted);

        // Add to public manifest (SAFE TO PUBLISH)
        publicManifest.push({
            id: index,
            riddle: level.riddle,
            file: `data/${filename}`,
            hint: level.hint || ""
        });
    });

    // Write manifest
    fs.writeFileSync(
        path.join(__dirname, '../public/manifest.json'),
        JSON.stringify(publicManifest, null, 2)
    );

    console.log('✅ Encryption complete! Public assets generated in public/data');
};

encryptData();
