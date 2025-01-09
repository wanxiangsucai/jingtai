console.log(navigator.userAgent);
moment.tz.setDefault("Asia/Shanghai"); 

// 页面路径
var this_url = location.href;

var save_add_url = '/index.php/p/behaviorrecord-logs-add.html';

var title = document.title;

// 停留时间，按秒计算
var second = 1;
var seconds = 0;
setInterval(() => {
    var num = 0;
    if(localStorage.getItem("tingliu_time"+this_url)){
        num = parseInt(localStorage.getItem("tingliu_time"+this_url));
    } else{
        localStorage.setItem("tingliu_time"+this_url, second);  // 保存页面停留时间，防止刷新
    }
    second++;
    seconds = second + num;
    // console.log(second,num,seconds);
}, 1000);
// 进入页面时间戳
var now_date_in = Math.round(moment().format('X'));
if(localStorage.getItem("now_date"+this_url)){
    now_date_in = localStorage.getItem("now_date"+this_url);
} else{
    localStorage.clear();
    localStorage.setItem("now_date"+this_url, now_date_in);
}
// console.log(localStorage.getItem("now_date"+this_url),now_date_in);
// console.log(window.__wxjs_environment === 'miniprogram' , location.search.indexOf("miniprogram") != -1);  // 检查是否为小程序或者H5

// var get_timgliu_time = localStorage.getItem("tingliu_time"+this_url);

// var now_url = $.cookie('now_url', this_url ,{expires:1,path:'/'});
// console.log(now_url);

$(function(){
    var submit_arr = {
        'now_date':now_date_in,
        'url':this_url,
        'timelength':seconds,
        'title':title
    }
    // if($.cookie('now_url') == null || $.cookie('now_url') == undefined){
        save_add(submit_arr);
    // }
    $.cookie('now_url', this_url);
})

/**
 * 离开当前页面时，停留时间等
 */
window.onbeforeunload = function(){
    var submit_arr = {
        'now_date':now_date_in,
        'url':this_url,
        'timelength':seconds,
        'title':title,
        'exitpage':1
    }
    localStorage.setItem("tingliu_time"+this_url, seconds);
    save_add(submit_arr);
    // localStorage.clear();
    // console.log(submit_arr,54);
};
/**
 * @param array datas 数组对象
 */
function save_add(datas={}){
    $.ajax({
        type: 'post',
        url: save_add_url,
        data: datas,
        dataType: 'json',
        success: function(data){
            console.log(data);
        },
        error: function(res){}
    })
}
