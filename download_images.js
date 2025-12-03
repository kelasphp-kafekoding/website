import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const basePath = path.join(__dirname, 'public/assets/images/materi');

// Create directory if it doesn't exist
if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
}

const images = [
    {
        url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop',
        name: 'control-flow.png'
    },
    {
        url: 'https://miro.medium.com/v2/resize:fit:1050/1*DM5BGSBLQ_eL5wfvr6ANhw.png',
        name: 'if-statement.png'
    },
    {
        url: 'https://miro.medium.com/v2/resize:fit:1050/1*6LSVRg7hDKVnWOqBcHSTKg.jpeg',
        name: 'else-statement.jpeg'
    },
    {
        url: 'https://miro.medium.com/v2/resize:fit:1050/1*vXWOkg9cav5KuG1gd41p7A.png',
        name: 'jenis-perulangan.png'
    },
    {
        url: 'https://miro.medium.com/v2/resize:fit:1050/1*5MEyv8w1IHha14kfjo8qJA.png',
        name: 'for-loop.png'
    },
    {
        url: 'https://miro.medium.com/v2/resize:fit:1050/1*pszZf38KjMM3KYdct7yXnw.png',
        name: 'while-loop.png'
    },
    {
        url: 'https://miro.medium.com/v2/resize:fit:1050/0*JplysxXxs3QIj_qT',
        name: 'do-while-flowchart.png'
    },
    {
        url: 'https://miro.medium.com/v2/resize:fit:1050/1*B-jnCGALocuCx30O1Bkidg.png',
        name: 'do-while-php.png'
    }
];

function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const filepath = path.join(basePath, filename);
        const protocol = url.startsWith('https') ? https : http;
        
        console.log(`Downloading ${filename}...`);
        
        protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                downloadImage(response.headers.location, filename).then(resolve).catch(reject);
                return;
            }
            
            const file = fs.createWriteStream(filepath);
            response.pipe(file);
            
            file.on('finish', () => {
                file.close();
                console.log(`✓ ${filename} downloaded successfully`);
                resolve();
            });
            
            file.on('error', (err) => {
                fs.unlink(filepath, () => {});
                reject(err);
            });
        }).on('error', reject);
    });
}

async function downloadAll() {
    console.log('Starting downloads...\n');
    
    for (const img of images) {
        try {
            await downloadImage(img.url, img.name);
        } catch (err) {
            console.error(`✗ Failed to download ${img.name}: ${err.message}`);
        }
    }
    
    console.log('\n✓ All downloads completed!');
    console.log('\nFiles in directory:');
    const files = fs.readdirSync(basePath);
    files.forEach(file => {
        const stats = fs.statSync(path.join(basePath, file));
        console.log(`  - ${file} (${stats.size} bytes)`);
    });
}

downloadAll().catch(console.error);
