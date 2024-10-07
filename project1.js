// BackGround is the background image to be changed.
// ForeGround is the foreground image.
// ForeGroundOpacity is the opacity of the foreground image.
// ForeGroundPosition is the foreground image's location, measured in pixels. It can be negative, and the alignment of the foreground and background's top-left pixels is indicated by (0,0).

// Variable to store the original image to return to when filter is selected as "None"
var originalImage = null;

function composite(BackGround, ForeGround, ForeGroundOpacity, ForeGroundPosition) {
    var bgData = BackGround.data;
    var fgData = ForeGround.data;

    var bgWidth = BackGround.width;
    var bgHeight = BackGround.height;
    var fgWidth = ForeGround.width;
    var fgHeight = ForeGround.height;

    var fgX = ForeGroundPosition.x; // Foreground starting X position
    var fgY = ForeGroundPosition.y; // Foreground starting Y position

    // Loop through each pixel in the foreground
    for (var y = 0; y < fgHeight; y++) { // Loop through each row
        for (var x = 0; x < fgWidth; x++) { // Loop through each column
            // Index of the current pixel in the foreground
            var fgIndex = (y * fgWidth + x) * 4; // 4 channels: RGBA (Calculate the index of the pixel in the 1D array)

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

                // Foreground opacity calculation to not ignore the black pixels
                var fgAlpha = (fgData[fgIndex + 3] / 255) * ForeGroundOpacity; // Foreground alpha combined with global opacity

                if (fgAlpha > 0) { // Only blend if the foreground pixel is not fully transparent
                    // Replacing the RGB values with the formula from the second page of “Image
                    // Compositing Fundamentals” from Alvy Ray Smith
                    // (https://www.cs.princeton.edu/courses/archive/fall00/cs426/papers/smith95a.pdf).
                    bgData[bgIndex] = bgData[bgIndex] * (1 - ForeGroundOpacity) + fgData[fgIndex] * ForeGroundOpacity; // Red
                    bgData[bgIndex + 1] = bgData[bgIndex + 1] * (1 - ForeGroundOpacity) + fgData[fgIndex + 1] * ForeGroundOpacity; // Green
                    bgData[bgIndex + 2] = bgData[bgIndex + 2] * (1 - ForeGroundOpacity) + fgData[fgIndex + 2] * ForeGroundOpacity; // Blue
                }
            }
        }
    }
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
        // Using the formula in https://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
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

function myFilter(imgData, context) { // Custom filter that inverts the colors of the image (Negative filter)
    // let brightnessLevel = Math.floor(Math.random() * 31) - 15; // Generate a random number between -15 and 15
    //
    // for (var i = 0; i < imgData.data.length; i += 4) { // Loop through each pixel
    //     // Increase the RGB values by the brightness level
    //     imgData.data[i] += brightnessLevel;
    //     imgData.data[i + 1] += brightnessLevel;
    //     imgData.data[i + 2] += brightnessLevel;
    // }

    for (var i = 0; i < imgData.data.length; i += 4) { // Loop through each pixel
        imgData.data[i] = 255 - imgData.data[i];       // Red
        imgData.data[i + 1] = 255 - imgData.data[i + 1]; // Green
        imgData.data[i + 2] = 255 - imgData.data[i + 2]; // Blue
        // Alpha channel remains the same (imgData.data[i + 3])
    }
    context.putImageData(imgData, 0, 0); // Put the new image data back to the canvas
}