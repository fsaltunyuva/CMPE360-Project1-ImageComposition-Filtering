// BackGround is the background image to be changed.
// ForeGround is the foreground image.
// ForeGroundOpacity is the opacity of the foreground image.
// ForeGroundPosition is the foreground image's location, measured in pixels. It can be negative, and the alignment of the foreground and background's top-left pixels is indicated by (0,0).

// Variable to store the original image to return to when filter is selected as "None"
var originalImage = null;

function composite(BackGround, ForeGround, ForeGroundOpacity, ForeGroundPosition) {
    // var bgData = BackGround.data;
    // var fgData = ForeGround.data;
    // var width = BackGround.width;
    // var height = BackGround.height;
    //
    // for (var i = 0; i < fgData.length; i += 4) { // Loop through each pixel
    //     if (fgData[i] !== 0 || fgData[i + 1] !== 0 || fgData[i + 2] !== 0) { // If the pixel is not transparent
    //         bgData[i] = bgData[i] * (1 - ForeGroundOpacity) + fgData[i] * ForeGroundOpacity;
    //         bgData[i + 1] = bgData[i + 1] * (1 - ForeGroundOpacity) + fgData[i + 1] * ForeGroundOpacity;
    //         bgData[i + 2] = bgData[i + 2] * (1 - ForeGroundOpacity) + fgData[i + 2] * ForeGroundOpacity;
    //     }
    // }
    //
    // document.getElementById('canvas').getContext('2d').putImageData(BackGround, 0, 0);

    var bgData = BackGround.data;
    var fgData = ForeGround.data;
    var bgWidth = BackGround.width;
    var bgHeight = BackGround.height;
    var fgWidth = ForeGround.width;
    var fgHeight = ForeGround.height;

    var fgX = ForeGroundPosition.x; // Foreground starting X position
    var fgY = ForeGroundPosition.y; // Foreground starting Y position

    // Loop through each pixel in the foreground
    for (var y = 0; y < fgHeight; y++) {
        for (var x = 0; x < fgWidth; x++) {
            // Index of the current pixel in the foreground
            var fgIndex = (y * fgWidth + x) * 4; // 4 channels: RGBA

            // Target pixel's X and Y coordinates in the background (can have negative values)
            var bgX = x + fgX;
            var bgY = y + fgY;

            // Skip if the foreground pixel is out of bounds of the background (including negative positions)
            if (bgX >= 0 && bgX < bgWidth && bgY >= 0 && bgY < bgHeight) {
                var bgIndex = (bgY * bgWidth + bgX) * 4; // 4 channels: RGBA

                // In this way it also ignores the black pixels with the transparent ones
                // if (fgData[fgIndex] !== 0 || fgData[fgIndex + 1] !== 0 || fgData[fgIndex + 2] !== 0) { // If the pixel is not transparent
                //     bgData[bgIndex] = bgData[bgIndex] * (1 - ForeGroundOpacity) + fgData[fgIndex] * ForeGroundOpacity; // Red
                //     bgData[bgIndex + 1] = bgData[bgIndex + 1] * (1 - ForeGroundOpacity) + fgData[fgIndex + 1] * ForeGroundOpacity; // Green
                //     bgData[bgIndex + 2] = bgData[bgIndex + 2] * (1 - ForeGroundOpacity) + fgData[fgIndex + 2] * ForeGroundOpacity; // Blue
                // }

                var fgAlpha = fgData[fgIndex + 3] * ForeGroundOpacity / 255; // Foreground opacity calculation to not ignore the black pixels

                if (fgAlpha > 0) { // Only blend if the foreground pixel is not fully transparent
                    bgData[bgIndex] = bgData[bgIndex] * (1 - fgAlpha) + fgData[fgIndex] * fgAlpha; // Red
                    bgData[bgIndex + 1] = bgData[bgIndex + 1] * (1 - fgAlpha) + fgData[fgIndex + 1] * fgAlpha; // Green
                    bgData[bgIndex + 2] = bgData[bgIndex + 2] * (1 - fgAlpha) + fgData[fgIndex + 2] * fgAlpha; // Blue
                }
            }
        }
    }

    // Put the updated background data back on the canvas
    document.getElementById('canvas').getContext('2d').putImageData(BackGround, 0, 0);
}

//Apply the grayscale filter to whole image if selected
//Apply the brightness filter whole image if selected, when you click the button brightness level will increase for each click
//Apply your filter what you want

function applyFilter() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    var filter = document.getElementById('filterSelect').value;

    // Save the original image
    if (originalImage === null) { // Only in the first time
        originalImage = context.getImageData(0, 0, canvas.width, canvas.height);
    }
    // TODO: After changing the image and setting to filter as "None",
    //  the original image is not restored, instead  previous image loads.

    // Apply the selected filter
    if (filter === 'grayscale') {
        grayscale(imgData, context);
    } else if (filter === 'brightness') {
        brightness(imgData, context);
    } else if (filter === "none") {
        context.putImageData(originalImage, 0, 0);
    } else if (filter === 'StudentFilter') {
        myFilter(imgData, context);
    }
}

function grayscale(imgData, context) {
    for (var i = 0; i < imgData.data.length; i += 4) { // Loop through each pixel
        // Using the formula in https://tnt.studio/converting-a-color-image-to-grayscale-with-javascript
        let grayscale = (0.2126 * imgData.data[i]) +
            (0.7152 * imgData.data[i + 1]) +
            (0.0722 * imgData.data[i + 2]);

        // Set the RGB values to the grayscale value
        imgData.data[i] = grayscale;
        imgData.data[i + 1] = grayscale;
        imgData.data[i + 2] = grayscale;
    }

    context.putImageData(imgData, 0, 0); // Put the new image data back to the canvas
}

function brightness(imgData, context) {
    let brightnessLevel = 10;  // Increase the brightness level by 10 for each click

    for (var i = 0; i < imgData.data.length; i += 4) { // Loop through each pixel
        // Increase the RGB values by the brightness level
        imgData.data[i] += brightnessLevel;
        imgData.data[i + 1] += brightnessLevel;
        imgData.data[i + 2] += brightnessLevel;
    }

    context.putImageData(imgData, 0, 0); // Put the new image data back to the canvas
}

function myFilter(imgData, context) { // Custom filter that changes the brightness randomly
    // TODO: Negative effect can be used as a filter
    let brightnessLevel = Math.floor(Math.random() * 31) - 15; // Generate a random number between -15 and 15

    for (var i = 0; i < imgData.data.length; i += 4) { // Loop through each pixel
        // Increase the RGB values by the brightness level
        imgData.data[i] += brightnessLevel;
        imgData.data[i + 1] += brightnessLevel;
        imgData.data[i + 2] += brightnessLevel;
    }

    context.putImageData(imgData, 0, 0); // Put the new image data back to the canvas
}