window.$ = window.jQuery = require('jquery');
function byteConvertor(bytes) {
    bytes = parseInt(bytes);
    var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    var e = Math.floor(Math.log(bytes)/Math.log(1024));
    if(e == "-Infinity") return "0 "+s[0]; 
    else return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
}

$(document).ready(function(){
    $.ajax({
        url: 'http://sodeok.xyz:8002/list',
        type: 'POST',
        success:function(data){
            if(data!="[]"){
                let json=JSON.parse(data);
                for(let i=0;i<Object.keys(json).length;i++){
                    let icon='glyphicon glyphicon-file';
                    if(String(json[i]['type']).indexOf("video")>-1) icon='glyphicon glyphicon-facetime-video';
                    else if(String(json[i]['type']).indexOf("image")>-1) icon='glyphicon glyphicon-picture';
                    else if(String(json[i]['type']).indexOf("audio")>-1) icon='glyphicon glyphicon-music';
                    else if(String(json[i]['type']).indexOf("zip")>-1 || String(json[i]['type']).indexOf("7z")>-1 || String(json[i]['type']).indexOf("rar")>-1 || String(json[i]['type']).indexOf("bz")>-1 || String(json[i]['type']).indexOf("tar")>-1) icon='glyphicon glyphicon-compressed';

                    let list="<a href='http://sodeok.xyz:8002/download/"+String(json[i]["code"])+"'><div class='file'><span class='size'>"+byteConvertor(json[i]['size'])+"</span><span class='date'>"+new Date(Number(json[i]['date'])).toString()+"</span><span class='img "+icon+"'></span><span>"+ String(json[i]["filename"]) + "</span><span class='remove glyphicon glyphicon-remove'></span></div></a>";
                    $("#dropboxDownload").append(list);
                }
                $(".file").on("mouseenter", function(event){
                    $("#size").text($(this).find(".size").text());
                    $("#date").text($(this).find(".date").text());
                    $("#tooltip").css("left", $(this).offset().left+100);
                    $("#tooltip").css("top", $(this).offset().top);
                    $("#tooltip").css("opacity","1");
                    $("#tooltip").css("transition-duration","1");
                    $("#tooltip").css("z-index","100");
                });
                $(".file").on("mouseleave",function(){
                    $("#tooltip").css("z-index","-1");
                    $("#tooltip").css("opacity","0");
                    $("#tooltip").css("transition-duration","1");
                });
                $(".file").contextmenu(function() {
                    let $temp = $("<input>");
                    $("body").append($temp);
                    $temp.val($(this).parent().attr("href")).select();
                    document.execCommand("copy");
                    $temp.remove();
                });
                $(".remove").on("click", function(){
                    event.preventDefault();
                    let id=$(this).parent().parent().attr("href").split("download/")[1];
                    $.ajax({
                        url: 'http://sodeok.xyz:8002/delete',
                        type: 'POST',
                        data:{id:id},
                        success:function(data){
                            if(data=="ok") location.reload();
                        }
                    });
                })
            }
            else $("#dropboxDownload").html("<h2>공유 파일이 존재하지 않습니다!</h2>");
        }
    });
});