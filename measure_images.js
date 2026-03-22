const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const files = [
    { name: 'star_fail.png', label: 'Red' },
    { name: 'star_poor.png', label: 'Orange' },
    { name: 'star_fair.png', label: 'Yellow' },
    { name: 'star_good.png', label: 'Light Green' },
    { name: 'star_very_good.png', label: 'Green' }
];

async function measure() {
    for (const file of files) {
        try {
            const image = await loadImage(`public/icons/${file.name}`);
            const canvas = createCanvas(image.width, image.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            const imageData = ctx.getImageData(0, 0, image.width, image.height);
            const data = imageData.data;

            let minX = image.width, maxX = 0, minY = image.height, maxY = 0;

            for (let y = 0; y < image.height; y++) {
                for (let x = 0; x < image.width; x++) {
                    const index = (y * image.width + x) * 4;
                    const alpha = data[index + 3];
                    if (alpha > 0) {
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }

            const visibleWidth = maxX - minX + 1;
            const visibleHeight = maxY - minY + 1;

            console.log(`${file.label} (${file.name}):`);
            console.log(`  File size: ${image.width}x${image.height}`);
            console.log(`  Content size: ${visibleWidth}x${visibleHeight}`);
            console.log(`  Ratio: ${(visibleWidth / image.width).toFixed(2)}w, ${(visibleHeight / image.height).toFixed(2)}h`);
        } catch (err) {
            console.log(`Error measuring ${file.name}:`, err.message);
        }
    }
}

measure();
