//打赏RMB
function gave_rmb(aid){
	layer.confirm('<div class="replayBox"><input class="gavemoney" type="number" step="0.01"  min="0.3" placeholder="请输入打赏金额" />单位:元</div>',{
		title:'我要打赏',
	},function(){
		post_rmb(aid);
	});

	jQuery.getScript("/public/static/js/pay.js").done(function() {			
	}).fail(function() {
		layer.msg('public/static/js/pay.js加载失败',{time:800});
	});

	function post_rmb(aid){
		var money = $('.replayBox .gavemoney').val();
		money = parseFloat(money).toFixed(2);
		if(isNaN(money)){
			layer.msg('请输入正确的金额',{time:800});
			return ;
		}else if(money<0.3){
			layer.msg('打赏金额不能小于0.3元',{time:800});
			return ;
		}
		$.get(give_rmb_url+"?id=" + aid +  '&money=' + money,function(res){
			if(res.code==0){
				layer.msg(res.msg,{icon:1,time:4000, shift: 1});
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
}
