const { Jimp } = require('jimp');
const path = require('path');

const src = "C:\\Users\\Allen\\.gemini\\antigravity\\brain\\fac922ad-8b91-4e7f-90a4-986a471c52b8\\media__1774170080833.png";
const destDir = path.join(__dirname, 'public', 'icons');

async function run() {
  try {
    const image = await Jimp.read(src);
    
    // Autocrop to remove white space padding
    image.autocrop();
    const W = image.bitmap.width;
    const H = image.bitmap.height;

    console.log(`Dimensions after autocrop: ${W}x${H}`);

    // Crop 1: Red Thumb Up
    const thumbUp = image.clone().crop({
        x: 0, 
        y: 0, 
        w: Math.floor(W * 0.43), 
        h: Math.floor(H * 0.65)
    });
    await thumbUp.write(path.join(destDir, 'phone_rate_up.png'));

    // Crop 2: Blue Thumb Down
    const thumbDown = image.clone().crop({
        x: Math.floor(W * 0.57), 
        y: 0, 
        w: Math.floor(W * 0.43), 
        h: Math.floor(H * 0.65)
    });
    await thumbDown.write(path.join(destDir, 'phone_rate_down.png'));

    // Crop 3: Slider Bar
    const slider = image.clone().crop({
        x: 0, 
        y: Math.floor(H * 0.70), 
        w: W, 
        h: Math.floor(H * 0.30)
    });
    await slider.write(path.join(destDir, 'phone_rate_slider.png'));

    console.log("Successfully sliced assets");
  } catch (err) {
    console.error("Error slicing:", err);
  }
}

run();
