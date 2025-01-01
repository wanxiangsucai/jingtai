var jifen_list_array={};
//获取积分打赏用户数据
function get_jifen_list(){
	$.get(give_jifen_listurl,function(res){
		if(res.code==0){
			jifen_list_array = res.data;
			set_jifen_list();	//积分打赏列表						
		}
	});
}
$(function(){
	get_jifen_list();
});

//积分打赏列表
function set_jifen_list(){
	for(var k in jifen_list_array){
		var str = '';
		jifen_list_array[k].forEach((rs)=>{
			str += `<a href="/member.php/home/${rs.uid}.html" target="_blank" title="${rs.username} ${rs.create_time} 打赏"><span><img src="${rs.user_icon}" onerror="this.src='/public/static/images/nobody.gif'"></span>赏<em>${rs.money}</em><label>积分</label></a>`;
		});
		$("#jifen_list_warp_"+k).html(str);
	}
}


//输入密码查看内容
function view_content_password(str){
	layer.prompt({
            title: '请输入访问密码',
            formType: 0
       }, function(value){
		   $.get(viewContentPassword+"?pwd="+value+"&md5str="+str,function(res){
			   if(res.code==0){
				   window.location.reload();
			   }else{
					layer.alert('密码不对');
			   }
		   });
    });
}


//消费积分才能查看
function view_content_paymoney(str){
	layer.confirm('你确认支付吗?',{title:'提醒!',btn:['确认支付','取消']},function(){
		$.get(viewContentPaymoney+"?md5str="+str,function(res){
			if(res.code==0){
				 window.location.reload();
			}else{
				if(res.data.paymoney && res.data.paymoney>0){
					layer.alert(res.msg,{title:'你的余额不足!'},function(){
						Qibo.pay(res.data.paymoney);
					});					
				}else{
					layer.alert(res.msg);
				}
			}
		});
	});
}



//关注圈子 
$(document).ready(function () {
	$(".gzqun").each(function(){
		var id = $(this).data('id');
		var that = this;
		if(my_uid==""){	//游客点关注,就直接进入对应的__QUN__
			$(this).click(function(){
				window.location.href = qunContentShow + "?id=" + id;
			});
		}else{
			//检查是否已关注
			$.get(qun_member_ckjoin+"?id="+id,function(res){
				if(res.code==1){	//还没关注
					$(that).click(function(){	//添加关注点击事件
						$.get(qun_member_join+"?id="+id,function(res){
							if(res.code==1){	//关注失败
								layer.alert(res.msg);
							}else if(res.code==0){	//关注成功
								layer.msg('已关注,'+res.msg);
								$(that).html('已关注');
								$(that).click(function(){
									window.location.href = qunContentShow+"?id="+id;
								});
							}
						});						
					});
				}else if(res.code==0){	//已关注
					$(that).html('已关注');
					$(that).click(function(){
						window.location.href = qunContentShow + "?id=" + id;
					});
				}
			});
			
		}		
	});
});


//打赏RMB
function gave_rmb(aid,rid){
	layer.open({
	  type: 1,
	  title:'我要打赏',
	  area: ['300'], //宽高，高参数忽略
	  content: '<ul class="replayBox"><ol><input class="gavemoney" type="number" step="0.01"  min="0.3" placeholder="请输入打赏金额" />单位:元</ol><li><button onclick="post_rmb('+aid+','+rid+');">确定</button><span onclick="layer.closeAll();">取消</span></li></ul>'
	});

	jQuery.getScript("/public/static/js/pay.js").done(function() {			
	}).fail(function() {
		layer.msg('public/static/js/pay.js加载失败',{time:800});
	});
}
function post_rmb(aid,rid){
	var money = $('.replayBox .gavemoney').val();
	money = parseFloat(money).toFixed(2);
	if(isNaN(money)){
		layer.msg('请输入正确的金额',{time:800});
		return ;
	}else if(money<0.3){
		layer.msg('打赏金额不能小于0.3元',{time:800});
		return ;
	}
	$.get(give_rmb_url+"?id=" + aid + '&rid=' + rid + '&money=' + money + '&' + Math.random(),function(res){
		if(res.code==0){
			layer.closeAll(); //关闭所有层
			layer.msg(res.msg);
		}else if(res.code==2){
			layer.msg('你的余额只有'+res.data.money+',请先充值',{time:1000});
			setTimeout(function(){
				Pay.mobpay( $('.replayBox .gavemoney').val(),'论坛打赏',function(type,index){
					layer.close(index);
					if(type=='ok'){
						layer.msg('充值成功,你可以继续打赏了');
					}else{
						layer.alert('充值失败');
					}
				});
				//callpay();
			},1000);
		}else{
			layer.alert(res.msg);
		}
	});
}


function check_login(){
	if(my_uid==""){
		layer.confirm('你还没登录,你确认要登录吗？', {
            btn : [ '确定', '取消' ]
        }, function(index) {
            location.href=login_url;
        });		
	}else{
		return true;
	}
}



//主题点赞
function TopicAgree(){	
	$.get(TopicAgreeUrl,function(res){
		if(res.code==0){
			var num =  $('.topic_agree').html();
			num++;
			$('.topic_agree').html(num);
			layer.msg("点赞成功！",{time:500});
		}else{
			layer.msg("点赞失败:"+res.msg,{time:2500});
		}	
	});
}

//回复点赞
function reply_agree(id){
	$.get(ReplyAgreeUrl+"?id="+id,function(res){
		if(res.code==0){
			var num =  $('.replyAgree'+id).html();
			num++;
			$('.replyAgree'+id).html(num);
			layer.msg("点赞成功！",{time:500});
		}else{
			layer.msg("点赞失败:"+res.msg,{time:2500});
		}	
	});
}


//删除信息
function delinfo(aid,id){
	var url;
	if(id>0){
		url = ReplyDeleteUrl+"?id="+id;
	}else{
		url = TopicDeleteUrl+"?id="+aid;
	}
	$.get(url,function(res){
		if(res.code==0){
			layer.msg("删除成功！",{time:500});
			if(id==0){
				location.href = BbsUrl;
			}else{
				location.reload();
			}
		}else{
			layer.msg("删除失败:"+res.msg,{time:2500});
		}	
	});
}

//修改信息
function editinfo(aid,id){
	var url;
	if(id>0){
		url = ReplyEditUrl+"?id="+id;
	}else{
		url = TopicEditUrl+"?id="+aid;
	}
	location.href = url;
}

//插入表情
function choose_face(obj,face){
	$(obj).find('img').css('border','1px solid red');
	$(".replayBox textarea").last().insert({"text":face});
}


//上传评论图片
function open_upfile_images(){
	if(typeof(wexin_jsdk_upimg)=="function"){	//微信中上传图片
		return wexin_jsdk_upimg($(".atc_picurl").last() , function(pic,pic_array){
			end_upfile_images(pic_array.join(','));
		} , true);
	}

	layer.open({
		type:2,
		area:['98%','95%'],
		content:UpImgUrl+"?img="+$(".atc_picurl").last().val(),
	});
}
function end_upfile_images(imgs){
	$(".atc_picurl").last().val(imgs);
	if(imgs!=''){
		$(".images_num").last().html(imgs.split(',').length);
		$(".images_num").last().show();
	}else{
		$(".images_num").last().hide();
	}
}


//上传评论视频
function open_upfile_mv(){
	if(typeof(wxapp_upload_mv)=="function"){	//微信中上传视频
		return wxapp_upload_mv(end_upfile_mv)
	}
	layer.open({
		type:2,
		area:['98%','55%'],
		content:UpMvUrl,
	});
}
function end_upfile_mv(url){
	$(".atc_mvurl").last().val(url);
	if(url!=''){
		$(".mv_num").last().show();
	}else{
		$(".mv_num").last().hide();
	}
}


//对主题发表评论
function postcomment(){
	if(check_login()!=true) return ;
	pid = 0;
	layer.open({
	  type: 1,
	  title:'评论主题',
	  area: ['90%'], //宽高，高参数忽略
	  content: $(".comment-box").html()
	});
}

//引用回复
function replyuser(id,touser){
	if(check_login()!=true) return ;
	pid = id;
	layer.open({
	  type: 1,
	  title:'给TA回复',
	  area: ['90%'], //宽高，高参数忽略
	  content: $(".comment-box").html(),
	});
	if(typeof touser!='undefined'){
		$(".replayBox textarea").last().val(touser);
	}
}


var cache_need_tncode = typeof(needTncode) != 'undefined' ? needTncode : false;
function ajax_post(){
	if(cache_need_tncode==true){
		open_tncode(function(){
			cache_need_tncode = false;
			real_post();
		});
	}else{
		real_post();
	}	
}

//提交回复信息
var havepost = false;
var pid = 0;
function real_post(){
	var url = posturl;
	if(pid>0){
		url += "?pid="+pid;
	}
	var contents = $('.replayBox textarea').last().val();			
	if(contents==''){
		layer.msg("请输入评论内容！",{time:1500});		
	}else{
		if(contents.replace(/\[(face\d+)\]/g,"")==""){
			layer.alert('不允许只发表情!');
			return false;			
		}
		if(havepost==true){
			layer.msg('请不要重复提交');
			return false;
		}
		layer.msg('内容提交中,请稍候');
		havepost = true;		
		contents = contents.replace(new RegExp('<',"g"),'&lt;');
		contents = contents.replace(new RegExp('>',"g"),'&gt;');
		contents = contents.replace(new RegExp('\n',"g"),'<br>');
		contents = contents.replace(new RegExp(' ',"g"),'&nbsp;');
		$.post(
			url,
			{'content':contents,'picurl':$(".atc_picurl").last().val(),'mvurl':$(".atc_mvurl").last().val()},
			function(res,status){
				if(typeof(needTncode)!='undefined'){
					cache_need_tncode = needTncode;
				}				
				havepost = false;
				if(res.code==0){
					if(pid>0){
						$('.repalyinfs'+pid).html(res.data);
					}else{
						$('.ListComment').html(res.data);
						//$('.ShowMoreComment').fadeIn();
					}
					give_jifen();	//重置打赏积分事件
					layer.closeAll(); //关闭所有层
					if(res.msg!=''){
						layer.msg(res.msg,{icon: 6,//shade : [0.1 , '#000' , true]
						time: typeof(needTncode)!='undefined'&&needTncode ? 8000 : 3000,
						});
					}else{
						layer.msg('发表成功！');
					}
					format_reply();
					//HiddenShowMoreComment();
					//隐藏的内容需要刷新才可见
					if(($(".contentHtml").html()).indexOf('需要刷新网页才可见')>0){
						window.location.reload();
					}
					
				}else{
					layer.alert(res.msg,function(index){
						layer.close(index);
						if(res.msg.indexOf('手机')>-1){
							layer.open({
								type: 2,
								title:'绑定手机',
								area: ['95%', '80%'],
								shade: 0.4,
								content:bind_phone_url,
							});
						}else if( res.msg.indexOf('公众号')>-1 ){
							layer.alert("<img width='300' src='"+mp_img_url+"'><br>请用微信扫码关注上面的公众号",{title:'请扫码关注下面的公众号',});
						}
					});
				}
			}
		);				
	}
}


function act_yz(aid,id){
	$.get(yz_url+"id="+aid+"&rid="+id,function(res){
		if(res.code==0){
			if(res.data.status==1){
				$(".status-1[data-rid="+id+"]").removeClass("status-1").addClass("status-0");
			}else{
				$(".status-0[data-rid="+id+"]").removeClass("status-0").addClass("status-1");
			}
			layer.msg('设置成功');
		}else{
			layer.alert(res.msg);
		}
	});
}

//添加收藏夹
function add_fav(){
	$.get(addFavUrl,function(res){
		if(res.code==0){
			$(".bbs_fav").addClass('bbs_have_fav');
			layer.msg('收藏成功');
		}else if(res.code==2){
			layer.confirm("你收藏过了,是否要取消收藏呢?",{},function(){
				$.get(addFavUrl.replace('/fav-api-add','/fav-api-delete'),function(res){
					if(res.code==0){
						$(".bbs_fav").removeClass('bbs_have_fav');
						layer.msg('你成功取消了收藏');
					}else{
						layer.alert(res.msg);
					}
				})
			});
		}else{
			layer.alert(res.msg);
		}
	})
}

$(function(){
	if(my_uid>0){
		var url = addFavUrl.replace('/fav-api-add','/fav-api-check');
		$.get(url,function(res){
			if(res.code==0){
				$(".bbs_fav").addClass('bbs_have_fav');
			}
		});
	}
});

//发短消息
var haveSendMsg = false;
function sendmsg(name,ifsend){
	if(check_login()!=true) return ;
	if(ifsend==true){
		var contents = $(".sendmsgBox textarea").val();		
		contents = contents.replace("<","&lt;");
		contents = contents.replace(">","&gt;");
		contents = contents.replace("\n","<br>");
		contents = contents.replace(" ","&nbsp;");
		layer.closeAll();
		if(contents==''){
			layer.alert('内容不能为空!');
			return ;
		}
		if(haveSendMsg==true){
			layer.msg('请不要重复提交');
			return ;
		}
		haveSendMsg = true;
		layer.msg('正在发送消息,请稍候...'); 
        $.post(PostMsgUrl, {content:contents,touser:name}).success(function (res) {
			haveSendMsg = false;
            if(res.code==0){
				layer.closeAll(); //关闭所有层
				layer.msg('消息发送成功！');
				$(".sendmsgBox textarea").val('');
			}else{
				layer.alert(res.msg);
			}
		}).fail(function () {
			layer.open({title: '提示',content: '服务器发生错误'});
		});
	}else{
		layer.open({
		  type: 1,
		  title:'给 '+name+' 发私信',
		  area: ['90%'], //宽高，高参数忽略
		  content: '<ul class="replayBox sendmsgBox"><ol><textarea placeholder="请输入私信内容"></textarea></ol><li><span onclick="layer.closeAll();">取消</span><button onclick="sendmsg(\''+name+'\','+true+');">立即发送</button></li></ul>'
		});
	}
}


//显示分页
var page=1;
var totalpage = 1;
var check_showMore=1;
$('.ShowMoreBox').hide();
function howMoreComment(){
	page++;
	check_showMore=0;
	$('.ShowMoreBox').fadeIn();
	$.get(pageurl + "?page="+page+"&"+Math.random(),function(res){
		$('.ShowMoreArtic').fadeOut();
		if(res.code==0){
			if(res.data==''){
				if(res.paginate.total==0){
					//layer.msg("还没有评论",{time:500});
				}else{
					layer.msg("没有更多内容了！",{time:500});
				}				
				$('.ShowMoreBox').hide();
			}else{
				$('.ListComment').append(res.data);
				check_showMore=1;
				format_reply();
				give_jifen();	//重置打赏积分事件
				set_jifen_list();
			}
		}else{
			layer.msg(res.msg,{time:2500});
		}
	});
}


function give_jifen(){
	$(".give-money").each(function(){
		var that = $(this);
		var id = that.data('id');
		var rid = typeof(that.data('rid'))=='undefined' ? 0 : that.data('rid');
		var cid = typeof(that.data('cid'))=='undefined' ? 0 : that.data('cid');
		
		/*
		that.each(function(){
			var obj = $(this);
			$.post(count_money_url,{'sysname':sys_dirname,'id':id,'rid':rid,'cid':cid},function(res){
				if(res.code==0){	//有人打赏过了
					if(obj.html()!='')obj.html(' '+res.data);
					obj.click(function(){
						layer.confirm('请问你是要打赏？还是要查看打赏的用户列表',{btn:['我要打赏','查看用户']},function(){
							layer.closeAll();
							putnum();
						},function(){
							getlist();
						});						
					});
				}else{	//还没人打赏
					obj.click(function(){						
						putnum();
					});					
				}
			});
		});*/

		//打赏点击事件
		that.off('click');
		that.click(function(){
			putnum();
		});
		
		//显示打赏用户
		var getlist = function(){
			layer.closeAll();
			layer.load(1);
			$.post(getlist_money_url,{'sysname':sys_dirname,'id':id,'rid':rid,'cid':cid},function(res){
				layer.closeAll();
				if(res.code==0){
					var str = '';
					res.data.forEach(function(rs){
						str += '<div style="padding:5px;"><span style="color:blue;">' + rs.username + '</span> 打赏积分: ' + rs.money + ' 个 <span style="color:#666;">['+rs.create_time+']</span></div>';
					});
					layer.open({
					  title:'打赏用户列表',
					  type: 1,
					  area: '98%',
					  content: '<div style="padding:15px;">' + str + '</div>',
					});
				}else{
					layer.alert(res.msg);
				}
			}).fail(function(){layer.closeAll();layer.alert('页面出错了!')});
		}
		
		//打赏输入积分个数
		var putnum = function(){
			layer.prompt({
				  formType: 0,
				  value: '3',
				  title: '请输入要打赏的积分个数',
				  //area: ['100px', '20px'] //formType:2 自定义文本域宽高
				}, function(value, index, elem){
					layer.close(index);
					postdata(value);
				}
			);
		};
		
		//打赏提交数据
		var postdata = function(num){			
			layer.load(1);
			$.post(give_money_url,{'sysname':sys_dirname,'money':num,'id':id,'rid':rid,'cid':cid,'about':''},function(res){
				layer.closeAll();
				if(res.code==0){
					layer.msg('谢谢你的打赏!');
					get_jifen_list();
				}else{
					layer.alert(res.msg);
				}
			}).fail(function(){layer.closeAll();layer.alert('页面出错了!')});
		}		
	});
}


//楼层
function bbslou(){
	var lou = 0;
	$(".CommentBox .lou").each(function(){
		lou++;
		$(this).html(lou+'楼')
	});
}

function format_reply(){
	/*
	$(".contentHtml img").each(function(){
		$(this).off('click');
		$(this).click(function(){
			show_big_img($(this).attr('src'));
		});
	});
	$(".CommentBox .replycontent img").each(function(){
		$(this).off('click');
		$(this).click(function(){
			show_big_img($(this).attr('src'));
		});
		$(this).css({"max-width":'100%',});
	});
	*/
	$(".CommentBox .replycontent").viewer('destroy').viewer({
		//url: 'data-original',
		navbar:false,
		title:false,
	});
	bbslou();
}

function show_big_img(url){
	$("<img />").attr("src", url).on("load", function () {
		var imgh = this.height;
		var imgw = this.width;
		if(imgh>$(window).height()-150){
			imgh = $(window).height()-150;
		}
		if(imgw>$(window).width()-10){
			imgw = $(window).width()-10;
		}
		layer.open({
				  type: 2,
				closeBtn:false,
				  title: false,
				  shadeClose: true,
				  maxmin: true,
				  offset: 'auto', 
				  shade: 0.7,
				  area: [imgw+'px' , imgh+'px'],
				  content: "/index.php/index/image/zoom.html?url="+url,
		});
	});
}


$(document).ready(function () {
	give_jifen();
	format_reply();
	$(".contentHtml").viewer({
		//url: 'data-original',
		navbar:false,
		title:false,
	});

	$(window).scroll(function () {
		var scroll_Height=$(window).scrollTop();
		if($('body').height()-scroll_Height<1300 && check_showMore==1){
			howMoreComment();
		}
	});

});


//采纳最佳答案同时打赏
function good_reply(rid){
	layer.confirm('你确认要打赏吗？不可撤回！',{
			btn:['确认','取消'],
			title:'提示',
		},function(){
			layer.closeAll(); //关闭所有层
			$.get(give_rmb_url + '?type=good_reply&rid='+rid,function(res){
				if(res.code==0){					
					layer.msg(res.msg);
				}else{
					layer.alert(res.msg);
				}
			});
	});
}

/*
//微信充值
    var wxpay = {};
	//调用微信JS api 支付
	function jsApiCall()
	{
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest',
			wxpay,
			function(res){
				WeixinJSBridge.log(res.err_msg);
				//alert(res.err_code+res.err_desc+res.err_msg);
				if(res.err_msg=='get_brand_wcpay_request:ok'){
					layer.msg('充值成功,请现在可以打赏了!');
				}
				//if(res.err_msg=='get_brand_wcpay_request:cancel')window.location.href="https://x1.php168.com/index/pay/index/banktype/weixin/action/pay_end_return.html?ispay=0&numcode=6e22a6621d";
			}
		);
	}

	function callpay()
	{
		var money = $('.replayBox .gavemoney').val();
			money = parseFloat(money).toFixed(2);
		if(isNaN(money)){
			money = 0.3;
		}
		$.get("{:iurl('index/wxapp.pay/index')}" + '?type=mp&title=打赏充值&money=' + money + '&' + Math.random(),function(res){
			if(res.code==0){
				wxpay = eval("("+res.data.json+")");
				if (typeof WeixinJSBridge == "undefined"){
					if( document.addEventListener ){
						document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
					}else if (document.attachEvent){
						document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
						document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
					}
				}else{
					jsApiCall();
				}


			}else{
				layer.alert(res.msg);
			}
		});
	}
*/
//callpay();