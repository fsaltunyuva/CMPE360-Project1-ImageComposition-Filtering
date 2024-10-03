// BackGround is the background image to be changed.
// ForeGround is the foreground image.
// ForeGroundOpacity is the opacity of the foreground image.
// ForeGroundPosition is the foreground image's location, measured in pixels. It can be negative, and the alignment of the foreground and background's top-left pixels is indicated by (0,0).

// Variable to store the original image to return to when filter is selected as "None"
var originalImage = null;

function composite(BackGround, ForeGround, ForeGroundOpacity, ForeGroundPosition) {
    var bgData = BackGround.data;
    var fgData = ForeGround.data;
    var width = BackGround.width;
    var height = BackGround.height;

    // // Calculate the position of the foreground image
    // var fgX = ForeGroundPosition[0];
    // var fgY = ForeGroundPosition[1];
    // var fgWidth = ForeGround.width;
    // var fgHeight = ForeGround.height;
    // var fgStartX = Math.max(0, fgX);
    // var fgStartY = Math.max(0, fgY);
    // var fgEndX = Math.min(width, fgX + fgWidth);
    // var fgEndY = Math.min(height, fgY + fgHeight);
    //
    // // Loop through each pixel of the foreground image
    // for (var y = fgStartY; y < fgEndY; y++) {
    //     for (var x = fgStartX; x < fgEndX; x++) {
    //         var fgIndex = (y - fgY) * fgWidth * 4 + (x - fgX) * 4; // Calculate the index of the foreground pixel
    //         var fgAlpha = fgData[fgIndex + 3] * ForeGroundOpacity; // Get the alpha of the foreground pixel and multiply it by the opacity
    //         if (fgAlpha > 0) { // If the pixel is not transparent
    //             var bgIndex = y * width * 4 + x * 4; // Calculate the index of the background pixel
    //             var bgAlpha = bgData[bgIndex + 3]; // Get the alpha of the background pixel
    //             var newAlpha = bgAlpha + fgAlpha * (1 - bgAlpha / 255); // Calculate the new alpha
    //             for (var i = 0; i < 3; i++) { // Loop through RGB
    //                 bgData[bgIndex + i] = (bgData[bgIndex + i] * bgAlpha + fgData[fgIndex + i] * fgAlpha * (1 - bgAlpha / 255)) / newAlpha; // Calculate the new RGB value
    //             }
    //             bgData[bgIndex + 3] = newAlpha; // Set the new alpha
    //         }
    //     }
    // }
    //
    // BackGround.data = bgData;
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
    }
    else if (filter === 'brightness') {
        brightness(imgData, context);
    }
    else if (filter === "none"){
        context.putImageData(originalImage, 0, 0);
    }
    else if (filter === 'StudentFilter') {
        // My own filter
        throw new Error('Not implemented');
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