$(document).ready(function(){
    if(is_weixin()){
        layer.open({
            title:"温馨提示：",
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            area: ['100%', '100%'], //宽高
            content: '<div style="padding: 50px 25px;line-height: 50px;">根据微信相关规则，此页面微信内不做展示！<br/>请通过“右上角”【使用浏览器打开】查看该相关内容！<br/>给你造成的不便,深表歉意！</div>',
            closeBtn:0
        });
    }
})
function is_weixin(){
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }}