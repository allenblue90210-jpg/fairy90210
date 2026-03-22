const { Jimp } = require('jimp');
const path = require('path');

const src = "C:\\Users\\Allen\\.gemini\\antigravity\\brain\\2aaf5015-5368-4f8f-abbf-bf60c33ab31d\\media__1774179540560.png";
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
        h: Math.floor(H * 0.55)
    });
    await thumbUp.write(path.join(destDir, 'phone_rate_up.png'));

    // Crop 2: Blue Thumb Down
    const thumbDown = image.clone().crop({
        x: Math.floor(W * 0.57), 
        y: 0, 
        w: Math.floor(W * 0.43), 
        h: Math.floor(H * 0.55)
    });
    await thumbDown.write(path.join(destDir, 'phone_rate_down.png'));

    // Crop 3: Slider Bar
    const slider = image.clone().crop({
        x: 0, 
        y: Math.floor(H * 0.60), 
        w: W, 
        h: Math.floor(H * 0.40)
    });
    await slider.write(path.join(destDir, 'phone_rate_slider.png'));

    console.log("Successfully sliced assets");
  } catch (err) {
    console.error("Error slicing:", err);
  }
}

run();
