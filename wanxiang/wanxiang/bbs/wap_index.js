//点赞
function digg_topic(id,obj){
	layer.msg("提交中,请稍候！",{time:500});
	$(obj).find('em').css({'color':'blue'});
	$.get(digg_url+"?id="+id,function(res){
		layer.closeAll();
		if(res.code==0){
			var num =  $(obj).find('em').html();
			num++;
			$(obj).find('em').html(num);
			layer.msg("点赞成功！",{time:500});
		}else{
			layer.msg("点赞失败:"+res.msg,{time:2500});
		}	
	});
}


var Mpage=2,byorder='list',fid=0,showmorebbs='<span onclick="ShowMoreInfo()">加载更多</span>';
function ShowMoreInfo(){
	$('.ShowMoreInfo').html('内容加载中……');
	$.get(more_url+Mpage+'&order='+byorder+'&fid='+fid,function(res){
		if(res.code==0){
			if(res.data==''){
				if(Mpage==1){
					layer.msg("没有相应的帖子！",{time:500});
					$('.ListInfos').html('');
					$('.ShowMoreInfo').html('');
				}else{
					layer.msg("已经显示完了！",{time:500});
					$('.ShowMoreInfo').html('');
				}				
			}else{
				if(Mpage==1){
					$('.ListInfos').html("<span class='Mpage"+Mpage+"'></span>");
				}else{
					$('.ListInfos').append("<span class='Mpage"+Mpage+"'></span>");
				}			
				$('.Mpage'+Mpage).hide();
				$('.Mpage'+Mpage).html(res.data);
				$('.Mpage'+Mpage).fadeIn();
				$('.ShowMoreInfo').html(showmorebbs);

				//避免有新回复,出现最后一条是重复的.
				var first_id = $(res.data).eq(0).data('id');
				if($('.ListInfos .lists[data-id='+first_id+']').length>1){
					$('.ListInfos .lists[data-id='+first_id+']').eq(0).remove();
				}
				navigateTo();
				scroll_get = true;
				Mpage++;
			}
			sessionStorage.setItem("history_data",$('.ListInfos').html()); //存放到历史记录

			if(Mpage<=2){
				mescroll.endSuccess();
			}else{
				mescroll.endSuccess(res.data==''?0:20);
			}

		}else{
			layer.msg(res.msg,{time:1000});
		}
	});
}

//切换栏目
$(document).ready(function () {
	$("#bbs_sort .swiper-slide").click(function(){
		$(this).addClass('ck').siblings().removeClass('ck');
		fid = $(this).data("fid");
		if(fid==undefined){
			fid=0;
			byorder = $(this).data("type");
		}else{
			byorder = 'list';
		}
		if(fid==0 && byorder=='list'){
			$(".ListType").show(300);
		}else{
			$(".ListType").hide(300);
		}
		Mpage = 1;
		ShowMoreInfo();
	});
});

//滚动显示更多
var scroll_get = true;	//做个标志,不要反反复复的加载
var ck_history = true;
var hand_history = null;
$(document).ready(function () {

	//获取浏览记录
	var old_data = sessionStorage.getItem("history_data");
	var parameter = sessionStorage.getItem("history_parameter");
	if(old_data!=null && parameter!=null){
		var ar = parameter.split(',');		
		if(parseInt(ar[0])>0)Mpage = ar[0];
		if(ar[1]!=undefined&&ar[1]!='undefined')byorder = ar[1];
		if(ar[1]!=undefined&&ar[1]!='undefined')fid = ar[2];
		old_height = ar[3];
		var mintime = Math.floor( (new Date().getTime() - ar[4])/1000 );
		if(mintime<600){	//10分钟内,就保留之前的浏览记录
			var rows = $('.ListInfos .lists').length;
			var new_data = $('.ListInfos').html();
			$('.ListInfos').html(old_data);	//历史记录
			if(fid==0 && byorder=='list'){
				$('.ListInfos .lists').each(function(i){
					if(i<rows){
						$(this).remove();
					}else{
						return false;
					}
				});
				$('.ListInfos').prepend(new_data);
			}

			setTimeout(function(){
				//$(window).scrollTop(old_height)	//滚动到之前的位置
				var num = Math.floor(old_height/$(window).height())*400;
				if(num>2){
					num=2;
				}
				//$("html,body").animate({scrollTop:old_height},num);
				$(".mescroll").animate({scrollTop:old_height},num);
			},500);
		}
	}
	var roll_obj = $(".mescroll");//$(window);
	roll_obj.scroll(function () {
		
		var scroll_Height = roll_obj.scrollTop(); //页面滚动的高度距离
		//if (scroll_get==true &&  (400 + scroll_Height)>($(document).height() - $(window).height())) {
		if (scroll_get==true &&  (400 + scroll_Height)>($(".bbsContainer").height() - $(window).height())) {
			scroll_get = false;			
			layer.msg('内容加截中,请稍候',{time:1500});
			ShowMoreInfo();
		}
		if(scroll_Height>300){
			$(".bbsContainer .ChangeShow .types").addClass("topmenu");
		}else{
			$(".bbsContainer .ChangeShow .types").removeClass("topmenu");
		}
		//console.log("滚动条高度"+scroll_Height,$(".bbsContainer").height() );
		
		if(ck_history==true){
			ck_history = false;
			if(hand_history!=null){
				clearTimeout(hand_history);
			}
			hand_history = setTimeout(function(){
				ck_history = true;
				var top = roll_obj.scrollTop();
				var parameter = Mpage+','+byorder+','+fid+','+top+','+(new Date().getTime());
				if(top==0){
					parameter = null;
				}
				sessionStorage.setItem("history_parameter",parameter); //存放到历史记录
			},200);
		}
	});
});


//下面是为了实现下拉刷新的功能
var mescroll;
$(function(){	
	mescroll = new MeScroll("mescroll", { //第一个参数"mescroll"对应上面布局结构div的id (1.3.5版本支持传入dom对象)
	       		//如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
	       		//解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
				down: {
					auto: false,
					callback: function(){
						Mpage = 1;
						ShowMoreInfo();						
						//sessionStorage.setItem("history_data",' ');
						//sessionStorage.setItem("history_parameter",null); //存放到历史记录
					}
				},
				up: {
					auto: false,
					callback: function(){
						setTimeout(function(){mescroll.endSuccess(0);},500);
						//ShowMoreInfo();
					}, //上拉加载的回调
					//以下是一些常用的配置,当然不写也可以的.
					//page: {
					//	num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
					//	size: 10 //每页数据条数,默认10
					//},
					//htmlNodata: '<p>-- END --</p>',
					//noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据; 避免列表数据过少(比如只有一条数据),显示无更多数据会不好看 这就是为什么无更多数据有时候不显示的原因.
					toTop: {
						//回到顶部按钮
						src: "/public/static/libs/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
						offset: 1000 //列表滚动1000px才显示回到顶部按钮	
					},
					//empty: {
						//列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
					//	warpId:	"xxid", //父布局的id (1.3.5版本支持传入dom元素)
					//	icon: "../img/mescroll-empty.png", //图标,默认null,支持网络图
					//	tip: "暂无相关数据~" //提示
					//},
					//lazyLoad: {
		        	//	use: true, // 是否开启懒加载,默认false
		        	//	attr: 'imgurl' // 标签中网络图的属性名 : <img imgurl='网络图  src='占位图''/>
		        	//}
				}
	});
});

//回复帖子 
var replayid=0;
function replaycomment(id){
	replayid=id;
	layer.open({
	  type: 1,
	  title:'我要回复',
	  area: ['90%'], //宽高，高参数忽略
	  content: '<ul class="replayBox"><ol><textarea placeholder="请输入回复内容"></textarea></ol><li><button onclick="replaycomment1();">确定</button><span onclick="layer.closeAll();">取消</span></li></ul>'
	});
}
function replaycomment1(){
	var replaycont=$('.replayBox textarea').val();
	//得到内容回复
	layer.alert(replaycont);
}






$(function() {
	var allow_change = true;
	function forbid_change(){
		allow_change = false;
		setTimeout(function(){
			allow_change = true;
		},100)
	}
	var left = 0;
    $("body").touchwipe({
        min_move_x : 150, // 横向灵敏度
        min_move_y : 40, // 纵向灵敏度
        wipeLeft : function() {//往左滑动
			if(allow_change==false){
				return false;
			}			
			$("#bbs_sort .swiper-slide").each(function(i){
				if($(this).hasClass('ck')){
					if(i<$("#bbs_sort .swiper-slide").length){
						var nextObj = $(this).next();
						nextObj.trigger("click");
						var w = nextObj.next().offset().left-nextObj.offset().left;
						left=left-w;
						if(nextObj.offset().left + w > $("body").width()){
							$(".ChangeShow .swiper-wrapper").css('transform','translate3d('+left+'px, 0px, 0px)');
						}						
						return false;
					}
				}
			});
        },
        wipeRight : function() {//往右滑动
			if(allow_change==false){
				return false;
			}
			$("#bbs_sort .swiper-slide").each(function(i){
				if($(this).hasClass('ck')){
					if(i>0){
						var prevObj = $(this).prev();
						prevObj.trigger("click");
						var w = prevObj.offset().left-prevObj.prev().offset().left;
						left=left+w+80;
						if(left>0)left=0;
						$(".ChangeShow .swiper-wrapper").css('transform','translate3d('+left+'px, 0px, 0px)');
						return false;
					}
				}
			});
        },
		wipeDown:function(){			
			forbid_change()
			//layer.msg('向下');
		},
		wipeUp:function(){			
			forbid_change()
			//layer.msg('向上');
		},
    });

	//栏目滑动切换
	var swiper2 = new Swiper('#bbs_sort', {
           spaceBetween: 0,
           slidesPerView:'auto',
           freeMode: true
	});

});
