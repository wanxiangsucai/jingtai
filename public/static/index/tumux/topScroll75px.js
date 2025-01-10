function AutoScroll1b(objg1b){
        $(objg1b).find("ul:first").animate({
                marginTop:"-75px"
        },1500,function(){
                $(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
        });
}
$(document).ready(function(){
setInterval('AutoScroll1b("#scrollDiv175,#scrollDiv275,#scrollDiv375,#scrollDiv475,#scrollDiv575,#scrollDiv675,#scrollDiv775,#scrollDiv875")',5000)
});