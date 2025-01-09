function getModuleString(){
    var moArray = [];
    $(".openbtn span").each(function(){
        moArray.push($(this).text());
    });
    $('#mostr').val(moArray.join());
}


