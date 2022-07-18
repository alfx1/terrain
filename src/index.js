import {SimplexNoise} from "simplex-noise";
import {Output} from "./output";

const emojiPalette = [
    // "✔️",
    // "❌",
    // "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎"
    " ", " ", " ", " ", "🌳" 
];
const colorPalette = ["#b5cba4","#80c081","#65ba6f","#4ab45d","#78aae6","#6ba2e3","#5c99e0"];
var noiseRange = 0;
const noiseRange1Octave = Math.sqrt(2 / 4);
var doCalcNoiseRange = true;

const w = 48, h = 16;
const scale = 0.005;
const scale2 = 0.05;
let min = Infinity, max = -Infinity;

const main = () => {
    var output = new Output(w, h);
    output.reset();

    const seed = Date.now();
    const noise = new SimplexNoise(seed);
    const noise2 = new SimplexNoise(seed);
    // drawNoise();

    for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
            const a = mapNoise(
                fractalNoise(
                    x * scale,
                    y * scale,
                    8,
                    0.5, 0.25,
                    noise
                    ),
                    colorPalette.length
                )
            const b = mapNoise(
                fractalNoise(
                    x * scale2,
                    y * scale2,
                    3,
                    0.5, 0.25,
                    noise2
                    ),
                    emojiPalette.length
                )
            output.addColorTile(
                a >= 0 ? colorPalette[a] :  "#000000",
                b >= 0 ? emojiPalette[b] : "b"
                );

        }
}

const mapNoise = (value, maxInt) => {
    return Math.floor(((value + noiseRange) / (2 * noiseRange)) * maxInt);
}

const fractalNoise = (x, y, octaves, lac, per, noiseGeneretor) => {
    let value = 0;
    let perValue = 1;
    let lacValue = 1;
    for (let i = 1; i <= octaves; i++) {
        let nVal = noiseGeneretor.noise2D(
            x * i * (1 / lacValue),
            y * i * (1 / lacValue)
            ) * (perValue);
        value += nVal;
        if(doCalcNoiseRange)
            noiseRange += perValue
        perValue *= per;
        lacValue *= lac;  
    }
        
    min = value < min ? value : min;
    max = value > max ? value : max;
    if(doCalcNoiseRange) {
        doCalcNoiseRange = false;
        console.log("calc range: ", noiseRange);
    }
    return value;
}

const drawNoise = () => {  
    var ctx = document.getElementById("c").getContext("2d");
    var imageData = ctx.getImageData(0, 0, 500, 500);
    var data = imageData.data;

    for (let y = 0; y < 500; y++)
    for (let x = 0; x < 500; x++) {
        const value = mapNoise(
            fractalNoise(
                x * scale,
                y * scale,
                8,
                0.5, 0.3,
                noise
                ),
            255
            );
        // r g b a values assigned sequentially
        data[(x + y * 500) * 4 + 0] = 0;
        data[(x + y * 500) * 4 + 1] = value < 0 ? (value * -1) : 0;
        data[(x + y * 500) * 4 + 2] = value;
        data[(x + y * 500) * 4 + 3] = 255;
    }
    console.log("min: ", min);
    console.log("max: ", max);
    ctx.putImageData(imageData, 0, 0);
}

window.onload = main;