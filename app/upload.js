window.$ = window.jQuery = require('jquery');

let dropbox = document.getElementById('dropbox');
dropbox.ondragover = function (e) {
    e.preventDefault(); // 이 부분이 없으면 ondrop 이벤트가 발생하지 않습니다.
};

dropbox.ondrop = function (e) {
    e.preventDefault(); // 이 부분이 없으면 파일을 브라우저 실행해버립니다.
    let data = e.dataTransfer;
    let file = new FormData();
    flag=false;
    for (let i = 0; i < data.files.length; i++) {
        file.append('file', data.files[i]);
        if(i==data.files.length-1) flag=true;
    }
    if(flag)
    $.ajax({
        url: 'http://localhost:8002/upload',
        type: 'POST',
        data: file,
        cache: false,
        contentType: false,
        processData: false,
        xhr: function() {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', function(e) {
                    if (e.lengthComputable) {
                        $('progress').attr({
                            value: e.loaded,
                            max: e.total
                        });
                    }
                } , false);
            }
            return myXhr;
        },
        success:function(data){
            if(data=="ok")
            $('progress').attr({
                value: 0,
                max: 0
            });
        }
    });
};