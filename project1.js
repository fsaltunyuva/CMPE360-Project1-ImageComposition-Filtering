// BackGround is the background image to be changed.
// ForeGround is the foreground image.
// ForeGroundOpacity is the opacity of the foreground image.
// ForeGroundPosition is the The foreground image's location, measured in pixels. It can be negative, and the alignment of the foreground and background's top-left pixels is indicated by (0,0).

function composite(BackGround, ForeGround, ForeGroundOpacity, ForeGroundPosition) {
    var bgData = BackGround.data;
    var fgData = ForeGround.data;
    var width = BackGround.width;
    var height = BackGround.height;

    
}

//Apply the grayscale filter to whole image if selected
//Apply the brightness filter whole image if selected, when you click the button brightness level will increase for each click
//Apply your filter what you want

    function applyFilter() {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        var filter = document.getElementById('filterSelect').value;

        
    }

