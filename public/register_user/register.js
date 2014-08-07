jQuery(function () {
	var fileSchema ;
	function initUploadOperation() {
		function readURL(input) {
			if (input.files && input.files[0]) {
				$('#croparea').show();
				var reader = new FileReader();
				reader.onload = function (e) {
					$('#original').attr('src', e.target.result);
					$('#preview').attr('src', e.target.result);
					$('#original').Jcrop({
						onChange:showPreview,
						onSelect:showPreview,
						aspectRatio:1
					})
				};
				reader.readAsDataURL(input.files[0]);
			}
		}
		$('#file_upload').change(function(){
			 readURL(this);
		});


		$('#save_user').off('click').on('click',function(){
			var x = $('#x').val();
			var y = $('#y').val();
			var width = $('#w').val();
			var height = $('#h').val();
			var nickname = $('#fname').val();
			var postUrl = '/postImage';
			var data = {_x: x,
									_y: y,
									_width: width,
									_height: height,
									_nickname: nickname};
			$.post(postUrl, data).done(function(res){


			}).fail(function(){
					alert('upload Fail');
			})

		});

		function showPreview(coords) {
			var rx = 128 / coords.w;
			var ry = 128 / coords.h;
			$('#preview').css({
				width: Math.round(rx * 500) + 'px',
				height: Math.round(ry * 370) + 'px',
				marginLeft: '-' + Math.round(rx * coords.x) + 'px',
				marginTop: '-' + Math.round(ry * coords.y) + 'px'
			});
			$('#x').val(coords.x);
			$('#y').val(coords.y);
			$('#w').val(coords.w);
			$('#h').val(coords.h);
		}
	}
	initUploadOperation();
});