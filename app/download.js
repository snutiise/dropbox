window.$ = window.jQuery = require('jquery');
$(document).ready(function(){
    $.ajax({
        url: 'http://sodeok.xyz:8002/list',
        type: 'POST',
        success:function(data){
            if(data!="[]"){
                let json=JSON.parse(data);
                for(let i=0;i<Object.keys(json).length;i++){
                    let list="<a href='http://sodeok.xyz:8002/download/"+String(json[i]["code"])+"'><div class='file'><img src='img/file.png' /><span>"+ String(json[i]["filename"]) + "</span></div></a>";
                    $("#dropboxDownload").append(list);
                }
            }
            else $("#dropboxDownload").html("<h2>공유 파일이 존재하지 않습니다!</h2>");
        }
    });
});