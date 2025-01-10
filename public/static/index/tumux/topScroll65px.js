function AutoScroll1d(objg1d){
        $(objg1d).find("ul:first").animate({
                marginTop:"-65px"
        },1500,function(){
                $(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
        });
}
$(document).ready(function(){
setInterval('AutoScroll1d("#scrollDiv165,#scrollDiv265,#scrollDiv365,#scrollDiv465,#scrollDiv565,#scrollDiv665,#scrollDiv765,#scrollDiv865")',7000)
});