jQuery(function () {
  var fileSchema;
  var filename;
  var scale;
  var IMAGEBORDER = 250;

  function initUploadOperation() {
    var imageType = /image.*/;
    function readURL(input) {
      var file = input.files[0];
      if (file.type.match(imageType)) {
        $('#croparea').show();
        var reader = new FileReader();
        reader.onload = function (e) {
          $('#imageOriginal')[0].innerHTML = "";
          var origin = new Image();
          origin.src = reader.result;
          origin.id = 'original';
          fileSchema = reader.result;
          $('#imageOriginal')[0].appendChild(origin);
          origin.onload = function () {
            console.log(this.height,this.width);
            if (parseFloat(this.height / IMAGEBORDER) > parseFloat(this.width / IMAGEBORDER)) {
              scale = parseFloat(this.height / IMAGEBORDER);
              resizeImageHeight($('#original'));
            } else {
              scale = parseFloat(this.width / IMAGEBORDER);
              resizeImageWidth($('#original'));
            }
            $('#preview').attr('src', reader.result);
            $('#original').Jcrop({
              onChange:showPreview,
              onSelect:showPreview,
              aspectRatio:1,
              addClass: 'jcrop-drak'
            })
          }
        };
        reader.readAsDataURL(file);
        filename = file.name;
      } else {
        alert('The File APIS not fully supported in this browser');
      }
    }

    function resizeImageHeight(oImage) {
      var img_height = oImage.height();
      var div_height = oImage.parent().height();
      if (img_height < div_height) {
        //IMAGE IS SHORTER THAN CONTAINER HEIGHT - CENTER IT VERTICALLY
        var newMargin = (div_height-img_height)/2+'px';
        oImage.css({'margin-top': newMargin });
      } else if (img_height>div_height){
        //IMAGE IS GREATER THAN CONTAINER HEIGHT - REDUCE HEIGHT TO CONTAINER MAX - SET WIDTH TO AUTO
        oImage.css({'width': 'auto', 'height': '100%'});
        //CENTER IT HORIZONTALLY
        var img_width = oImage.width();
        var div_width = oImage.parent().width();
        var newMargin = (div_width-img_width)/2+'px';
        oImage.css({'margin-left': newMargin});
      }
    }

    function resizeImageWidth(oImage) {
      var img_width = oImage.width();
      var div_width = oImage.parent().width();
      if(img_width<div_width){
        //IMAGE IS SHORTER THAN CONTAINER HEIGHT - CENTER IT VERTICALLY
        var newMargin = (div_width-img_width)/2+'px';
        oImage.css({'margin-left': newMargin });
      }else if(img_width>div_width){
        //IMAGE IS GREATER THAN CONTAINER HEIGHT - REDUCE HEIGHT TO CONTAINER MAX - SET WIDTH TO AUTO
        oImage.css({'width': '100%', 'height': 'auto'});
        //CENTER IT HORIZONTALLY
        var img_height = oImage.height();
        var div_height = oImage.parent().height();
        var newMargin = (div_height-img_height)/2+'px';
        oImage.css({'margin-top': newMargin});
      }
    }

    function showPreview(coords) {
      var rx = 128 / coords.w;
      var ry = 128 / coords.h;
      var img_height = $('#original').height();
      var img_width = $('#original').width();
      $('#preview').css({
        width:Math.round(rx * img_width) + 'px',
        height:Math.round(ry * img_height) + 'px',
        marginLeft:'-' + Math.round(rx * coords.x) + 'px',
        marginTop:'-' + Math.round(ry * coords.y) + 'px'
      });
      $('#x').val(coords.x);
      $('#y').val(coords.y);
      $('#w').val(coords.w);
      $('#h').val(coords.h);
    }

    $('#file_upload').change(function () {
      readURL(this);
    });

    function createResquestObj() {
      var postData = {};
      var x = $('#x').val();
      if (x) {
        postData['x'] = x;
      }
      var y = $('#y').val() ;
      if (y) {
        postData['y'] = y;
      }
      var width = $('#w').val();
      if (width) {
        postData['width'] = width;
      }
      var height = $('#h').val();
      if (height) {
        postData['height'] = height;
      }
      var nickname = $('#fname').val();
      if (nickname) {
        postData['nickname'] = nickname;
      }
      if (filename) {
        postData['filename'] = filename;
      }
      if (fileSchema) {
        postData['imagedata'] = fileSchema;
      }
      if (scale) {
        postData['scale'] = scale;
      }
      postData['userid'] = 'abc';
      return postData;
    }
    $('#save_user').off('click').on('click', function () {
      var postUrl = '/postImage';
      var data = createResquestObj();
      $.post(postUrl, data).done(function (res) {

      }).fail(function () {
          alert('upload Fail');
        })
    });
  }
  initUploadOperation();
});