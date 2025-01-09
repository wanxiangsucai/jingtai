//by:QQ162-8582-080 2017-09-19
//替换所有的回车换行    
function TransferString(content)    
{    
    var string = content;    
    try{    
        string=string.replace(/\r\n/g,"%0A")    
        string=string.replace(/\n/g,"%0A");
        string=string.replace("&#10;","%0A");		
    }catch(e) {    
        alert(e.message);    
    }    
    return string;    
}  
$(function () {
    //$("#alert_coll_page").show();

    $("#ziti").val($("#hidZiTi").val());
    $("#selectZitiPX").val($("#hidZitiPX").val());

    //选择颜色
    $(".pickerTable li").click(function () {
        $("#myColor").val($(this).attr("hx"));
        //        $("#isTouMing").val(0);
    });

    $("#selectZitiPX").change(function () {
        $("#zitiPX").val($(this).val());
    });

    //确定颜色
    $("#setColor").click(function () {
        $("#alert_coll_page").hide();
        $("#" + $("#hidmyId").val()).val($("#myColor").val());
    });

    //字体颜色
    $("#zitiColor").click(function () {
        $("#hidmyId").val("zitiColor");
        $("#myModalLabel").html("选取文字的颜色");
        $("#myColor").val($("#zitiColor").val());
        $("#isBgPicDiv").hide();
        $("#messageText").hide();
        $("#alert_coll_page").show();
    });

    //背景颜色
    $("#bgColor").click(function () {
        $("#hidmyId").val("bgColor");
        $("#myModalLabel").html("选取背景的颜色");
        $("#myColor").val($("#bgColor").val());
        $("#isBgPicDiv").show();
        $("#messageText").show();
        $("#alert_coll_page").show();

        //        if ($(this).val() != "") {
        //            $("#isTouMing").val(0);
        //        }

    });

    //    $("#isTouMing").change(function () {
    //        if ($(this).val() == 1) {
    //            $("#myColor").val("");
    //        }
    //    });

    //渐变颜色
    $("#jbcolor").click(function () {
        $("#hidmyId").val("jbcolor");
        $("#myModalLabel").html("选取文字的颜色");
        $("#myColor").val($("#jbcolor").val());
        $("#isBgPicDiv").hide();
        $("#messageText").hide();
        $("#alert_coll_page").show();
    });

    $("#jianbain").change(function () {
        if ($(this).val() == 1) {
            $("#fangxiang").removeAttr("disabled");
            $("#jbcolor").removeAttr("disabled");
        }
        else {
            $("#fangxiang").attr("disabled", "disabled");
            $("#jbcolor").attr("disabled", "disabled");
        }
    });

    $("#alert_coll_colse").click(function () {
        $("#alert_coll_page").hide();
    });

    $("#createZiTi").click(function () {
        var content = $("#content").val();
		var content2 = TransferString(content);
        $.cookie("yishuziContent2", content, { path: '/' });

        var ziti = $("#ziti").val();
        var zitiPX = $("#zitiPX").val();
        var zitiColor = $("#zitiColor").val().replace("#", "");
        var bgColor = $("#bgColor").val().replace("#", "");
        var touying = $("#touying").val();
        var xieti = $("#xieti").val();
        var xiahuaxian = $("#xiahuaxian").val();
        var cuti = $("#cuti").val();
        var jianbain = $("#jianbain").val();
        var fangxiang = $("#fangxiang").val();
        var jbcolor = $("#jbcolor").val().replace("#", "");
        var jiaoDu = $("#ziTiJiaoDu").val();
        var zitiWidth = $("#zitiWidth").val();
        var zitiHeight = $("#zitiHeight").val();
        var zitiZuoJu = $("#zitiZuoJu").val();
        var zitiShangJu = $("#zitiShangJu").val();

        $.cookie("yishuziZiTi", ziti, { path: '/' });
        $.cookie("yishuziPX", zitiPX, { path: '/' });
        $.cookie("yishuziXieTi", xieti, { path: '/' });
        $.cookie("yishuziXianHuaXian", xiahuaxian, { path: '/' });
        $.cookie("yishuziCuTi", cuti, { path: '/' });
        $.cookie("yishuziZiTiColor", zitiColor, { path: '/' });
        $.cookie("yishuziBgColor", bgColor, { path: '/' });
        $.cookie("yishuziTouYing", touying, { path: '/' });
        $.cookie("yishuziJianBain", jianbain, { path: '/' });
        $.cookie("yishuziFangXiang", fangxiang, { path: '/' });
        $.cookie("yishuziJbColor", jbcolor, { path: '/' });
        $.cookie("yishuziJiaoDu", jiaoDu, { path: '/' });
        $.cookie("yishuziWidth", zitiWidth, { path: '/' });
        $.cookie("yishuziHeight", zitiHeight, { path: '/' });
        $.cookie("yishuziZuoJu", zitiZuoJu, { path: '/' });
        $.cookie("yishuziShangJu", zitiShangJu, { path: '/' });

        //var vid = $("#ziti").find("option:selected").attr("vid");
        //window.location.href = "/zitiinfo/" + vid + ".html";

        var timestamp = Date.parse(new Date());
        //var url = "http://test.com/?ziti=" + ziti + "&zitiPX=" + zitiPX + "&zitiColor=" + zitiColor + "&bgColor=" + bgColor + "&touying=" + touying + "&xieti=" + xieti + "&xiahuaxian=" + xiahuaxian + "&cuti=" + cuti + "&jianbain=" + jianbain + "&fangxiang=" + fangxiang + "&jbcolor=" + jbcolor + "&time=" + timestamp;
        var url = "/plugins/make?text=" + content2 + "&font=" +ziti + "&size=" + zitiPX + "&ztys=" + zitiColor + "&bjys=" + bgColor + "&touying=" + touying + "&jiacu=" + cuti + "&jiaodu=" + jiaoDu + "&lpx=" + zitiZuoJu + "&tpx=" + zitiShangJu + "&width=" + zitiWidth + "&height=" + zitiHeight + "&time=" + timestamp;
//test.com/ziti/?text=%E4%BD%A0%E5%A5%BD&font=1.ttf&size=40&jiaodu=0&bjys=FFFFFF&ztys=000000&jiacu=1&lpx=20&tpx=50&width=200&height=100

        $("#userImg").attr("src", url);
        $("#userImgDiv").show();
        $("html,body").animate({ scrollTop: 0 }, 500);
    });

    $("#zitiimg dt").click(function () {
        var content = $("#content").val();
		var content2 = TransferString(content);
        $.cookie("yishuziContent2", content, { path: '/' });

        var zitiColor = $(this).attr("data-color");
        $("#zitiColor").val(zitiColor);
        var bgColor = $(this).attr("data-background-color");
        $("#bgColor").val(bgColor);

        zitiColor = zitiColor.replace("#", "");
        bgColor = bgColor.replace("#", "");

        //$("#isTouMing").val(0);

        var ziti = $("#ziti").val();
        var zitiPX = $("#zitiPX").val();
        var touying = $("#touying").val();
        var xieti = $("#xieti").val();
        var xiahuaxian = $("#xiahuaxian").val();
        var cuti = $("#cuti").val();
        var jianbain = $("#jianbain").val();
        var fangxiang = $("#fangxiang").val();
        var jbcolor = $("#jbcolor").val().replace("#", "");
        var jiaoDu = $("#ziTiJiaoDu").val();
        var zitiWidth = $("#zitiWidth").val();
        var zitiHeight = $("#zitiHeight").val();
        var zitiZuoJu = $("#zitiZuoJu").val();
        var zitiShangJu = $("#zitiShangJu").val();

        $.cookie("yishuziZiTi", ziti, { path: '/' });
        $.cookie("yishuziPX", zitiPX, { path: '/' });
        $.cookie("yishuziXieTi", xieti, { path: '/' });
        $.cookie("yishuziXianHuaXian", xiahuaxian, { path: '/' });
        $.cookie("yishuziCuTi", cuti, { path: '/' });
        $.cookie("yishuziZiTiColor", zitiColor, { path: '/' });
        $.cookie("yishuziBgColor", bgColor, { path: '/' });
        $.cookie("yishuziTouYing", touying, { path: '/' });
        $.cookie("yishuziJianBain", jianbain, { path: '/' });
        $.cookie("yishuziFangXiang", fangxiang, { path: '/' });
        $.cookie("yishuziJbColor", jbcolor, { path: '/' });
        $.cookie("yishuziJiaoDu", jiaoDu, { path: '/' });
        $.cookie("yishuziWidth", zitiWidth, { path: '/' });
        $.cookie("yishuziHeight", zitiHeight, { path: '/' });
        $.cookie("yishuziZuoJu", zitiZuoJu, { path: '/' });
        $.cookie("yishuziShangJu", zitiShangJu, { path: '/' });

        //var vid = $("#ziti").find("option:selected").attr("vid");
        //window.location.href = "/zitiinfo/" + vid + ".html";
        var timestamp = Date.parse(new Date());
        //var url = "http://test.com/?ziti=" + ziti + "&zitiPX=" + zitiPX + "&zitiColor=" + zitiColor + "&bgColor=" + bgColor + "&touying=" + touying + "&xieti=" + xieti + "&xiahuaxian=" + xiahuaxian + "&cuti=" + cuti + "&jianbain=" + jianbain + "&fangxiang=" + fangxiang + "&jbcolor=" + jbcolor + "&time=" + timestamp;
        var url = "/plugins/make?text=" + content2 + "&font=" +ziti + "&size=" + zitiPX + "&ztys=" + zitiColor + "&bjys=" + bgColor + "&touying=" + touying + "&jiacu=" + cuti + "&jiaodu=" + jiaoDu + "&lpx=" + zitiZuoJu + "&tpx=" + zitiShangJu + "&width=" + zitiWidth + "&height=" + zitiHeight + "&time=" + timestamp;
//test.com/ziti/?text=%E4%BD%A0%E5%A5%BD&font=1.ttf&size=40&jiaodu=0&bjys=FFFFFF&ztys=000000&jiacu=1&lpx=20&tpx=50&width=200&height=100

        $("#userImg").attr("src", url);
        $("#userImgDiv").show();
        $("html,body").animate({ scrollTop: 0 }, 500);
    });

    $("#content").focus(function () {
        var txt = $("#content").val();
        if (txt == "输入文字后，选择字体属性，点击生成即可！") {
            $("#content").val("");
            $("#content").removeClass("colorA5").addClass("color000");
        }
        else if (txt == "Please input you want to convert English！") {
            $("#content").val("");
            $("#content").removeClass("colorA5").addClass("color000");
        }
        else if (txt == "1234567890") {
            $("#content").val("");
            $("#content").removeClass("colorA5").addClass("color000");
        }
    }).blur(function () {
        var txt = $("#content").val();
        var type = $("#hidType").val();
        if (txt == "") {
            if (type == 9) {
                $("#content").val("Please input you want to convert English！");
            }
            else if (type == 11) {
                $("#content").val("1234567890");
            }
            else {
                $("#content").val("输入文字后，选择字体属性，点击生成即可！");
            }

            $("#content").removeClass("color000").addClass("colorA5");
        }
    });

    $("#search_ziti").click(function () {
        var cssName = $(this).attr("class");
        if (cssName.indexOf("search_selected") > 0) {
            $(this).removeClass("search_selected");
        }
        else {
            $(this).addClass("search_selected");
        }
    });

    $('#search_kuang').click(function (event) {
        event.stopPropagation();
    });

    $('#searchText').keyup(function () {
        var searchText = $('#searchText').val();
        if (searchText != "") {
            var params = { name: searchText };
            $.post("#", params, function (data) {
                $("#result_search").html(data);
                $("#result_search").find("dd").click(function () {
                    var ztype = $(this).attr("ztype");
                    var zid = $(this).attr("zid");
                    if (zid) {
                        window.location.href = "/zitiinfo/" + ztype + "-" + zid + ".html";
                    }
                    else {
                        $('#searchText').val("");
                        $("#result_search").html("");
                    }
                });
            });
        }
        else {
            $("#result_search").html("");
        }
    });
});

function selectZiTi(ziti, id) {
    var content = $("#content").val();
    $.cookie("yishuziContent2", content, { path: '/' });

    var zitiPX = $("#zitiPX").val();
    var zitiColor = $("#zitiColor").val().replace("#", "");
    var bgColor = $("#bgColor").val().replace("#", "");
    var touying = $("#touying").val();
    var xieti = $("#xieti").val();
    var xiahuaxian = $("#xiahuaxian").val();
    var cuti = $("#cuti").val();
    var jianbain = $("#jianbain").val();
    var fangxiang = $("#fangxiang").val();
    var jbcolor = $("#jbcolor").val().replace("#", "");
    var jiaoDu = $("#ziTiJiaoDu").val();
    var zitiWidth = $("#zitiWidth").val();
    var zitiHeight = $("#zitiHeight").val();
    var zitiZuoJu = $("#zitiZuoJu").val();
    var zitiShangJu = $("#zitiShangJu").val();

    $.cookie("yishuziZiTi", ziti, { path: '/' });
    $.cookie("yishuziPX", zitiPX, { path: '/' });
    $.cookie("yishuziXieTi", xieti, { path: '/' });
    $.cookie("yishuziXianHuaXian", xiahuaxian, { path: '/' });
    $.cookie("yishuziCuTi", cuti, { path: '/' });
    $.cookie("yishuziZiTiColor", zitiColor, { path: '/' });
    $.cookie("yishuziBgColor", bgColor, { path: '/' });
    $.cookie("yishuziTouYing", touying, { path: '/' });
    $.cookie("yishuziJianBain", jianbain, { path: '/' });
    $.cookie("yishuziFangXiang", fangxiang, { path: '/' });
    $.cookie("yishuziJbColor", jbcolor, { path: '/' });
    $.cookie("yishuziJiaoDu", jiaoDu, { path: '/' });
    $.cookie("yishuziWidth", zitiWidth, { path: '/' });
    $.cookie("yishuziHeight", zitiHeight, { path: '/' });
    $.cookie("yishuziZuoJu", zitiZuoJu, { path: '/' });
    $.cookie("yishuziShangJu", zitiShangJu, { path: '/' });

    window.location.href = "/zitiinfo/" + id + ".html";
}