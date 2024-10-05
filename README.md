# CMPE360 Computer Graphics

## Project 1 - Compositing Images

Within this project, we aim to create an alpha compositing function
and applyFilter function
for raster images utilizing JavaScript. Firstly
you should download project1.zip file from LMS.

You will receive an HTML file that contains a basic web-based image compositing tool.

The component that is absent in this application (which you will be responsible
for) is the JavaScript function that combines a foreground image with a
background image using alpha blending. This is what the function appears like:

``` javascript
function composite(BackGround, ForeGround, ForeGroundOpacity, ForeGroundPosition) {
    var bgData = BackGround.data;
    var fgData = ForeGround.data;
    var width = BackGround.width;
    var height = BackGround.height;
  
}

function applyFilter() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    var filter = document.getElementById('filterSelect').value;

}
```

These functions require four input parameters:

- **BackGround**: This is the original background image that needs
modification.
- **ForeGround**: It represents the foreground image that will be
  combined with the background image.
- **ForeGroundOpacity**: Denoting the opacity of the foreground image,
  this argument is responsible for adjusting the alpha values of the
  foreground image.
- **ForeGroundPosition**: This indicates the placement of the foreground
  image on the background image. It contains pixel-based x and y
  coordinates. In this system, where x=0 and y=0 aligns the top-left pixels of
  both foreground and background images. Note that x and y coordinates
  provided may be negative.


The filter effect to be applied to the foreground and
background image. The filters are grayscale, brightness and one
different filter. When you click the Apply Filter, when you select
Brightness your brightness must be increased for each click.

The filters used in the funcUon will be as follows:

- **Grayscale**: Grayscale opUon converts the image to grayscale.
- **Brightness**: : You should adjust the brightness level. The brightness opUon
  increases the brightness of the image. The brightness will increase with each
  click to Apply Filter when the brightness option selected.
- **Custom Filter**: You will add a different filter what you want and explain your process.

To visually observe the effects of each filter, the funcUon must correctly
apply the filters.

These functions don't output anything. Instead, it alters the original background
image. The foreground image may vary in size, and its position can be negative.
Any parts of the foreground image that extend beyond the background image will
be disregarded.

For this project, you have been given the following files:

- **project1.html**: This file encompasses the complete interface
implementation, excluding the composite function.
- **project1.js**: It holds a temporary placeholder for the composite and
  applyFilter function. This file is included in project1.html. Ensure both
  files are in the same directory.

You also have access to these images for testing: background.png, cup.png and
tedu.png.

Your task is to finalize the composite and applyFilter function within the
project1.js file. These functions should blend the specified foreground image onto
the provided background image, considering the given opacity and position
arguments for the foreground image. 

### Test Examples
