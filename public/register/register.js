jQuery(function(){
    function initUploadOperation() {
       $('#file_upload').fileupload({
           dataType: 'json',
           done: function(e, data) {
               $.each(data.result.files, function(index, file){
                    console.log(file.name);
               })  ;

           }
       })
    }

    initUploadOperation();
});