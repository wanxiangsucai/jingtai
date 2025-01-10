mod_class.yinyue = {

	init:function(res){
		if(in_pc==true){
			$('#btn_yinyue').click(function(){
				layer.open({
						type:2,
						id: 'yinyue',
						title: '<i class="fa fa-music"></i> 音乐盒',
						area: ['530px', '526px'],
						resize:false,
						offset:'l',
						shade:0,
						moveOut:true,
						content: window.location.protocol+'//'+window.location.host+'/public/static/music/pc.php'
					});
			});
		}else{
			$("#btnSend").removeClass("disabled").addClass("primary");
			$('#btn_yinyue').click(function(){
				layer.open({
						type:2,
						id: 'yinyue',
						title: '<i class="fa fa-music"></i> 音乐盒',
						area: ['100%', '100%'],
						resize:false,
						offset:'l',
						shade:0,
						moveOut:true,
						content: window.location.protocol+'//'+window.location.host+'/public/static/music/pc.php'
					});
			});
		}
		
	},
	
	finish:function(res){  //所有模块加载完才执行
	var audios = document.getElementsByTagName("audio");
	// 暂停函数
	function pauseAll() {
		var self = this;
		[].forEach.call(audios, function (i) {
			// 将audios中其他的audio全部暂停
			i !== self && i.pause();
		})
	}
	// 给play事件绑定暂停函数
	[].forEach.call(audios, function (i) {
		i.addEventListener("play", pauseAll.bind(i));
	})
	},
	logic_init:function(res){  //init()只做界面渲染与页面元素的事件绑定,若做逻辑的话,更换圈子时PC端不执行,执行的话,会导致界面重复渲染。logic_init()做逻辑处理,满足更换圈子房间的需要
	},

}