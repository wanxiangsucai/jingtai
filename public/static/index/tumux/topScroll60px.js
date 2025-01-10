function AutoScroll2(objg2){
        $(objg2).find("ul:first").animate({
                marginTop:"-60px"
        },1500,function(){
                $(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
        });
}
$(document).ready(function(){
setInterval('AutoScroll2("#scrollDiv160,#scrollDiv260,#scrollDiv360,#scrollDiv460,#scrollDiv560,#scrollDiv660,#scrollDiv760,#scrollDiv860")',7000)
});