window.$ = window.jQuery = require('jquery');
const {ipcRenderer} = require('electron');

let dropbox = document.getElementById('dropbox');
dropbox.ondragover = function (e) {
    e.preventDefault();
};

dropbox.ondrop = function (e) {
    e.preventDefault();
    let data = e.dataTransfer;
    let file = new FormData();
    flag=false;
    file.append("id",ipcRenderer.sendSync('upload', 'id'));
    for (let i = 0; i < data.files.length; i++) {
        file.append('file', data.files[i]);
        if(i==data.files.length-1) flag=true;
    }
    if(flag)
    $.ajax({
        url: 'http://sodeok.xyz:8002/upload',
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
            if(data=="ok"){
                $('progress').attr({
                    value: 0,
                    max: 0
                });
            }
            else alert(data);
        }
    });
};

$(document).ready(function(){
});