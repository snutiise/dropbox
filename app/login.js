window.$ = window.jQuery = require('jquery');
let crypto = require('crypto');
const {ipcRenderer} = require('electron');

$(document).ready(function(){
    $("#login").on("click", function(){
        $.ajax({
            url: 'http://sodeok.xyz:8002/login',
            type: 'POST',
            data: {id:$(this).parent().find('input').eq(0).val(),pw:crypto.createHash('md5').update(String($(this).parent().find('input').eq(1).val())).digest("hex")},
            success:function(data){
                if(data!="fail") {
                    ipcRenderer.send('login', data);
                    location.href="upload.html";
                }
                else alert(data);
            }
        });
    });
});