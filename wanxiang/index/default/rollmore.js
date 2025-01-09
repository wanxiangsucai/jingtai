//滚动显示更多
var scroll_get = true;	//做个标志,不要反反复复的加载
var ck_history = true;
var hand_history = null;
var byorder='list';
var fid=0;
$(document).ready(function () {

	//获取浏览记录
	var old_data = sessionStorage.getItem("cms_history_data");
	var parameter = sessionStorage.getItem("cms_history_parameter");
	if(old_data!=null && parameter!=null){
		var ar = parameter.split(',');		
		if(parseInt(ar[0])>0)morepage = ar[0];
		if(ar[1]!=undefined&&ar[1]!='undefined')byorder = ar[1];
		if(ar[1]!=undefined&&ar[1]!='undefined')fid = ar[2];
		old_height = ar[3];
		var mintime = Math.floor( (new Date().getTime() - ar[4])/1000 );
		if(mintime<600){	//10分钟内,就保留之前的浏览记录
			var rows = $('.ListArticles .Lists').length;  //新加载数据的条数
			var new_data = $('.ListArticles').html();	//新加载的数据
			$('.ListArticles').html(old_data);	//历史记录
			if(fid==0 && byorder=='list'){
				//下面是把历史记录中的前部分,也即新加载的多少条的前面全删除掉,删除重复的数据
				$('.ListArticles .Lists').each(function(i){
					if(i<rows){
						$(this).remove();
					}else{
						return false;
					}
				});
				$('.ListArticles').prepend(new_data);  //把新加载的数据放在历史记录的最前面
			}

			setTimeout(function(){
				//$(window).scrollTop(old_height)	//滚动到之前的位置
				var num = Math.floor(old_height/$(window).height())*400;
				if(num>2){
					num=2;
				}
				$("html,body").animate({scrollTop:old_height},num);
			},500);
		}
	}
	
	$(window).scroll(function () {
		
		var scroll_Height = $(window).scrollTop(); //页面滚动的高度距离
		if (scroll_get==true &&  (400 + scroll_Height)>($(document).height() - $(window).height())) {
			scroll_get = false;			
			layer.msg('内容加截中,请稍候',{time:1500});
			ShowMoreInfo();
		}
		if(scroll_Height>300){
			//$(".bbsContainer .ChangeShow .types").addClass("topmenu");
		}else{
			//$(".bbsContainer .ChangeShow .types").removeClass("topmenu");
		}
		
		if(ck_history==true){
			ck_history = false;
			if(hand_history!=null){
				clearTimeout(hand_history);
			}
			hand_history = setTimeout(function(){
				ck_history = true;
				var top = $(window).scrollTop();
				var parameter = morepage+','+byorder+','+fid+','+top+','+(new Date().getTime());
				if(top==0){
					parameter = null;
				}
				sessionStorage.setItem("cms_history_parameter",parameter); //存放到历史记录
			},200);
		}
	});
});