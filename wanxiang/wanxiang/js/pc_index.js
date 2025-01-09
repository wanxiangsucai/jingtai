
     //滚动显示更多
     var scroll_get  = true;	//做个标志,不要反反复复的加载
     $(document).ready(function () {
         $(window).scroll(function () {
             if (scroll_get==true &&  (200 + $(window).scrollTop())>($(document).height() - $(window).height())) {
                 scroll_get = false;
                 layer.msg('内容加截中,请稍候',{time:1000});
                 ShowMoreInfo();
             }
     
             if ($(window).scrollTop() > 100) {
                 $(".topUpCont").show();
             } else {
                 $(".topUpCont").hide();
             }
     
         });
     
         $(".topUpCont").click(function () {
             $("html,body").animate({scrollTop:0},500);
         });
     });
     
     //切换显示
     function choose_type(i){
         default_i = i;
         scroll_get = true;
     }
     
     

  function imgbig(img) {
      var imgsrc = $(img).attr('src');
      $("#bigimg").css("display","block");
      $("#bigimg").html("<img src="+imgsrc+" />");
  }
  
  function closeimg() {
      $("#bigimg").css("display","none");
  }
    // 使用原生JavaScript实现
    const duidd = document.querySelector('.duidd');
    const duiddContent = dropdown.querySelector('.duidd-content');

    duidd.addEventListener('mouseover', () => {
      duiddContent.style.display = 'block';
    });

    duidd.addEventListener('mouseout', () => {
      duiddContent.style.display = 'none';
    });
        // 使用原生JavaScript实现
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    dropdown.addEventListener('mouseover', () => {
      dropdownContent.style.display = 'block';
    });

    dropdown.addEventListener('mouseout', () => {
      dropdownContent.style.display = 'none';
    });
    

function postComment(commentId) {
    var content = document.querySelector("#post_comment_" + commentId + " .comment_content").value;
    
    if (content.trim() === '') {
        layer.alert("请输入评论内容！");
    } else {
        // 直接提示评论发布成功信息
        layer.msg('评论发布成功,审核后会第一时间显示！');
    }
}



