
function dr_iframe_login(url,width,height) {
    layer.open({
        type: 2,
        skin: 'layui-layer-rim',
        title: false,
        area: [width, height],
        content: url
    });
};
function dr_div_show(id) {
    layer.open({
        type: 1,
  		shade: false,
  		title: false,
  		content: $('#'+id+'')
    });
};
function dr_show_image(src) {
//	var img = new Image();
//	var height = img.realheight;
//  var width = img.realwidth;
    layer.open({
        type: 1,
        title: '图片查看',
	  	skin: 'layui-layer-rim',
	  	area: ['70%', '70%'],
	  	content: '<img src="'+src+'"/>'
    });
   
};
function dr_img_show(title,src,text) {
	layer.open({
	    type: 1,
	    title: title,
	  	skin: 'layui-layer-rim',
	  	content: '<div style="padding: 20px;"><p><img src="'+src+'" width="240" /></p><div class="text-center">'+text+'</div></div>'
  	});
};
function dr_text_show(title,id,width,height) {
	layer.open({
	    type: 1,
	    title: title,
	  	skin: 'layui-layer-rim',
	  	area: [width, height],
	  	content: $('#'+id+'')
  	});
};
function dr_html_show(title,html,width,height) {
	layer.open({
	    type: 1,
	    title: title,
	  	skin: 'layui-layer-rim',
	  	area: [width, height],
	  	content: html
  	});
};
function dr_ajax_btn(url) {
    $.ajax({type: "POST",dataType:"json", url: url,
        success: function(data) {
            if (data.status) {
            	dr_tips(data.code,3,1);
            } else {
                dr_tips(data.code);
            }
        }
    });
}
function Popbody(name,title,html,day,wide,high) {
	var pop_is = CookieGet(name);
	var html = $(html).html();
	if(!pop_is){
		layer.open({
			type: 1,
			title: title,
			skin: 'layui-layer-rim',
			content: html,
			area: [wide+'px', high+'px'],
			cancel: function(){
				CookieSet(name,1,day);
			}
		});
	}
}
$(function () { 
	$(".copytext").each(function(){
		var clipboard = new Clipboard(this);
		clipboard.on('success', function(e) {
			dr_tips('复制成功',3,1);
		});
		clipboard.on('error', function(e) {
			dr_tips('当前浏览器不支持直接复制功能，请按Ctrl + C，进行复制。');
		});
	});
});
$(function () { 
	$(".short").each(function(){
		var weblink= $(this).attr("data-clipboard-text");
		var btnlink =$(this);
		$.ajax({
			type : 'GET',
	        url : 'https://api.weibo.com/2/short_url/shorten.json?source=2849184197&url_long='+encodeURIComponent(weblink),
	        dataType : 'JSONP', 
	        success : function(r) {
	        	url_short = r.data.urls[0].url_short;
	        	btnlink.attr("data-clipboard-text",url_short);
	        	btnlink.find(".textlink").text(url_short);
        	} 		        	
	    });
	});
});
function CookieSet(name,value,days){
	var expires;
	if (days) {
		expires = days;
	} else{
		expires = "";
	}
	$.cookie(name,value,{expires:expires,path:'/'});
}
function CookieGet(name){
	var styles = $.cookie(name);
	return styles;
}
function CookieDel(name,tips){
	if(window.confirm(tips)){
		$.cookie(name,null,{expires:-1,path: '/'});
		location.reload();
	}else{
		return false;
	}
}
$(function () { 
	setInterval(function(){
		if($(".animated-circles").hasClass("animated")){
			$(".animated-circles").removeClass("animated");
		}else{
			$(".animated-circles").addClass('animated');
		}
	},3000);
	var wait = setInterval(function(){
		$(".livechat-hint").removeClass("show_hint").addClass("hide_hint");
		clearInterval(wait);
	},4500);
	$(".livechat-girl").hover(function(){
		
		clearInterval(wait);
		$(".livechat-hint").removeClass("hide_hint").addClass("show_hint");
	},function(){
		$(".livechat-hint").removeClass("show_hint").addClass("hide_hint");
	});
	$(".animated").click(function(){
		//window.open("http://wpa.qq.com/msgrd?v=3&uin=2686114666&site=qq&menu=yes");
		layer.open({
		    type: 1,
		    title: false,
		  	skin: 'layui-layer-rim',
		  	area: ['300px', ''],
		  	content: $('#kefu')
		});
	});
});
$(function () { 
	$("[data-toggle='tooltip']").tooltip(); 
	var a = $(window);
	$scrollTopLink = $("a.backtop");
	a.scroll(function() {
		500 < $(this).scrollTop() ? $scrollTopLink.css("display", "") : $scrollTopLink.css("display", "none");
	});
	$scrollTopLink.on("click", function() {
		$("html, body").animate({
			scrollTop: 0
		}, 400);
		return !1
	});
});