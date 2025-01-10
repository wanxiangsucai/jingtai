/**
 * Created by sf on 2018/8/3.
 */
var areaArr = []

var trackHost = 'https://segmentfault.com';
var viewApi = trackHost + '/ad/track/view'
var clickApi = trackHost + '/ad/track/click'

function ajax(opt) {
    opt = opt || {};//opt以数组方式存参，如果参数不存在就为空。
    opt.method = opt.method.toUpperCase() || 'POST';//转为大写失败，就转为POST
    opt.url = opt.url || '';//检查URL是否为空
    opt.async = opt.async || true;//是否异步
    opt.data = opt.data || null;//是否发送参数，如POST、GET发送参数
    opt.success = opt.success || function () {}; //成功后处理方式
    var xmlHttp = null;//定义1个空变量
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();//如果XMLHttpRequest存在就新建，IE大于9&&非IE有效
    }
    else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');//用于低版本IE
    }
    var params = [];//定义1个空数组
    for (var key in opt.data){
        params.push(key + '=' + opt.data[key]);//将opt里的data存到push里
    }
    var postData = params.join('&');//追加个& params
    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);//开始请求
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');//发送头信息，与表单里的一样。
        xmlHttp.send(postData);//发送POST数据
    }
    else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url, opt.async);//GET请求
        xmlHttp.send(null);//发送空数据
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {//readyState有5个状态，可以百度一下看看都有什么。当请求完成，并且返回数据成功
            opt.success(xmlHttp.responseText);//返回成功的数据
        }
    };
}

var sTitle="";
window.SFGridAd = {};
SFGridAd.d = function(o) {
    sTitle = o.getAttribute('stitle');
    document.getElementById("gridMapHoverBox").style.display = "block"
}

SFGridAd.e = function(o) {
    sTitle = "";
    document.getElementById("gridMapHoverBox").style.display = "none"
}

SFGridAd.c = function(id) {

    var clickApi2 = clickApi + '?id=' + id

    ajax({url: clickApi2, method: 'GET'})
};

// 这里 data 需要注入
[{"id":"1750000021403965","user_id":"1030000021270072","box_ad_id":"0","started":"1577376000","ended":"1579795200","cycles":"4","status":"0","banner":"\/221\/864\/2218648513-5e04256bcfb24","link":"https:\/\/www.e-iceblue.cn\/free-products.html","title":".NET Java Python Cloud \u6587\u6863\u5904\u7406\u63a5\u53e3+\u6559\u7a0b\uff0c\u52a9\u529b\u529e\u516c\u81ea\u52a8\u5316","area_info":{"area":"A7:O8","height":"34","width":"255","left":"0","top":"102","pos":{"rowTop":7,"rowBottom":8,"columnLeft":1,"columnRight":15},"size":30},"created":"1577323363","modified":"1577331473"},{"id":"1750000021422314","user_id":"1030000004271297","box_ad_id":"0","started":"1577635200","ended":"1578240000","cycles":"1","status":"0","banner":"\/478\/847\/478847969-5e05c3003ffc3","link":"https:\/\/github.com\/skr-shop\/manuals","title":"Skr Shop\u7535\u5546\u8bbe\u8ba1\u624b\u518c","area_info":{"area":"O1:O1","height":"17","width":"17","left":"238","top":"0","pos":{"rowTop":1,"rowBottom":1,"columnLeft":15,"columnRight":15},"size":1},"created":"1577435638","modified":"1577435910"},{"id":"1750000021422366","user_id":"1030000018361692","box_ad_id":"0","started":"1577635200","ended":"1578240000","cycles":"1","status":"0","banner":"\/139\/828\/139828641-5e05c3d04d26b","link":"http:\/\/vip-admin.com\/","title":"vipAdmin - \u540e\u53f0HTML\u6a21\u677f","area_info":{"area":"A5:A5","height":"17","width":"17","left":"0","top":"68","pos":{"rowTop":5,"rowBottom":5,"columnLeft":1,"columnRight":1},"size":1},"created":"1577435833","modified":"1577436152"},{"id":"1750000021443244","user_id":"1030000007747454","box_ad_id":"0","started":"1577808000","ended":"1579017600","cycles":"1","status":"0","banner":"\/333\/830\/3338301951-5e09b49ac90bd","link":"https:\/\/www.openinstall.io","title":"Android \/ iOS \u4e00\u4e2a\u5305\u8d70\u5929\u4e0b\uff01","area_info":{"area":"L5:O5","height":"17","width":"68","left":"187","top":"68","pos":{"rowTop":5,"rowBottom":5,"columnLeft":12,"columnRight":15},"size":4},"created":"1577694125","modified":"1577694413"},{"id":"1750000021462300","user_id":"1030000002496563","box_ad_id":"0","started":"1577980800","ended":"1579190400","cycles":"2","status":"0","banner":"\/593\/351\/593351944-5e0d522c62ff7","link":"https:\/\/fundebug.com\/?utm_source=sf_ad","title":"\u4e00\u884c\u4ee3\u7801\u641e\u5b9aBUG\u76d1\u63a7","area_info":{"area":"F5:I5","height":"17","width":"68","left":"85","top":"68","pos":{"rowTop":5,"rowBottom":5,"columnLeft":6,"columnRight":9},"size":4},"created":"1577931240","modified":"1577931351"}].forEach(function(item) {
    var html = '<area shape="rect" ' +
        'target="_blank" ' +
        'onmouseover="SFGridAd.d(this)" ' +
        'onmouseout="SFGridAd.e(this)" ' +
        'onclick="SFGridAd.c(' + item.id + ')" ' +
        'coords="' + item.area_info.left + ',' + item.area_info.top + ',' + ((+item.area_info.left)+(+item.area_info.width)) + ',' + ((+item.area_info.top)+(+item.area_info.height)) + '" ' +
        'href="/sponsor/' + item.id + '/redirect" ' +
        'stitle="' + item.title + '" />'

    areaArr.push(html)
})

document.getElementById('gridsMap').innerHTML = areaArr.join('')

document.getElementById('gridsMap').onmousemove = function(e) {
    var pos = getMousePos(e)

    document.getElementById("gridMapHoverBox").style.left = pos.x + 20 + 'px'
    document.getElementById("gridMapHoverBox").style.top = pos.y + 20 + 'px'

    document.getElementById("gridMapHoverBox").innerHTML = sTitle
}

// 增加 view 统计
setTimeout(function() {
    isShow = document.querySelector('img[src^="https://cdn.segmentfault.com/sponsor"]').clientHeight > 0
    if (isShow) ajax({url: viewApi, method: 'GET'})
}, 0)

function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    return { 'x': x, 'y': y };
}
