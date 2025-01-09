function post_comment(pid){			
		if(pid>0){
			repalyid=pid;
			comment_post_url=comment_base_url+"?pid="+pid;
		}
		layer.open({
		  type: 1,
			title:'发表评论',
		  skin: 'layui-layer-demo', //样式类名
		  area: ['320px', '281px'], //宽高
		  closeBtn: 0, //不显示关闭按钮
		  anim: 2,
		  shadeClose: true, //开启遮罩关闭
		  content: '<ul class="PostCommentBox"><ol><textarea placeholder="请输入评论内容"></textarea></ol><!--<li><button type="butter" onclick="post_comment1(pid)">发表</button><button type="butter" onclick="layer.closeAll()">取消</button></li>--></ul>',
			btn:['确认','取消'],
			btn1:function(){
				post_comment1(pid)
			}
		});
	}


function post_comment1(pid){
	if(cache_need_tncode==true){
		open_tncode(function(){
			cache_need_tncode = false;
			real_post1(pid);
		});
	}else{
		real_post1(pid);
	}	
}

	//引用评论
function real_post1(pid){
	var contents=$('.PostCommentBox textarea').val();
	if(contents==''){
		layer.alert("请输入评论内容！");
	}else{
	    $('.PostCommentBox textarea').val('发表成功……');
	    layer.closeAll();
	    layer.msg('发表成功！');
		$.post(
			comment_post_url,
			{content:contents},
			function(res,status){
				if(res.code==0){
					$('.ListComment').html(res.data);
                    commentpage = 1;
					layer.msg('发表成功！', function(){ layer.closeAll(); });
					HiddenShowMoreComment();
				}else{
					layer.alert('评论发表失败:'+res.msg);
				}
			}
		);				
	}			
}

	
function post_commentPc(commentId) {
  var commentElement = document.getElementById("comment" + commentId);
  var commentContent = commentElement.value;

  if (cache_need_tncode == true) {
    open_tncode(function() {
      cache_need_tncode = false;
      real_post2(commentId);
    });
  } else {
    real_post2(commentId);
  }
}

function real_post2(commentId) {
  var contents=$('.PostCommentBox1 textarea').val();
  if (contents === ''){
    layer.alert("请输入评论内容！");
  } else {
    $('.PostCommentBox1 textarea').val('');
    layer.msg('发表成功！');
    $.post(
      comment_post_url,
      { content: contents },
      function(res, status){
        cache_need_tncode = needTncode;
        $('.PostCommentBox1 textarea').val('');
        if (res.code == 0){
          $('.ListComment').html(res.data);
          commentpage = 1;
          layer.msg('发表成功！');
          HiddenShowMoreComment();
        } else {
          layer.alert('评论发表失败：' + res.msg);
        }
      }
    );
  }

}



	function dingcomment(id){
			var agree=parseInt($('.agree'+id).html());
			$.get(comment_base_url+'?agree=1&id='+id+'&'+Math.random(),function(res){
				if(res.code==0){
					agree++;
					$('.agree'+id).html(agree);
					layer.msg('点赞成功！');
				}else{
					layer.alert('点赞失败:'+res.msg);
				}
			});
	}

	function ShowMoreComment(){
			commentpage++;
			$.get(comment_page_url+'?page='+commentpage+'&'+Math.random(),function(res){
				if(res.code==0){
					if(res.data==''){
						layer.msg('显示完了！');
						$('.ShowMoreComment').fadeOut();
					}else{
						res.data="<div class='pages"+commentpage+"'>"+res.data+"</div>";			
						$('.ListComment').append(res.data);
						$('.ListComment .pages'+commentpage).hide();
						$('.ListComment .pages'+commentpage).show(500);
					}
				}else{
					layer.msg(res.msg,{time:2500});
				}
			});
	}
	
	function HiddenShowMoreComment(){
			var Comments=$('.ListComment .lists').length;
			if(parseInt(Comments/comment_rows)<1){
				$('.ShowMoreComment').hide();
			}else{
				$('.ShowMoreComment').show();
			}
	}

	HiddenShowMoreComment();