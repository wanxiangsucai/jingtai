var index  = function(){
   jQuery('.navTitleBox,.popup').hover(function(){
       jQuery(this).addClass('navTitleBoxbg').parent().addClass('navTitleBoxbg').find('.popup').show();
    }, function() {
       jQuery(this).removeClass('navTitleBoxbg').parent().removeClass('navTitleBoxbg').find('.popup').hide()
    });
    var options = {useEasing: true, useGrouping: true,separator: ',', },
        docnum=jQuery("#docnum").text()
    new CountUp('docnum', 0, docnum, 0, 2.5, options).start();
    jQuery(".right_userlist").slide({titCell:".titCell ul",mainCell:".bd ul",autoPage:true,effect:"top",autoPlay:true,scroll:1,vis:1,delayTime:700,interTime:4000,easing:"easeInQuint"});
    jQuery('.toplist h2').on("click",function(){
        var index=jQuery(this).index();
        jQuery(this).addClass('active').siblings().removeClass('active');
        var l=0;
        if(index===2){
            l=90;
        }
        jQuery('.active-line').attr('style','transform: translateX('+ parseInt(l)+'px); width: 40px;');
        jQuery('.toplist .bd').hide();
        jQuery('.toplist .bd'+index).show();
    });
}