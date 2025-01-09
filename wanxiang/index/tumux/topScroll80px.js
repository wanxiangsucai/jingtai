function AutoScroll1c(objg1c){
        $(objg1c).find("ul:first").animate({
                marginTop:"-80px"
        },1500,function(){
                $(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
        });
}
$(document).ready(function(){
setInterval('AutoScroll1c("#scrollDiv180,#scrollDiv280,#scrollDiv380,#scrollDiv480,#scrollDiv580,#scrollDiv680,#scrollDiv780,#scrollDiv880")',7000)
});