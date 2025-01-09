;layui.define(['form', 'notice', 'carousel'], function (exports) {
    var $ = layui.jquery
        , notice = layui.notice
        , layer = layui.layer
        , carousel = layui.carousel;

    /**
     * 首页轮播
     */

    var topCarousel = carousel.render({
        elem: '#main-carousel'
        , width: '100%'
        , height: '264px'
        , arrow: 'always'
        , anim: 'fade'
        , indicator: 'none'
    });

    var baiduCarousel = carousel.render({
        elem: '#baidu-carousel'
        , width: '100%'
        , height: '685px'
        , arrow: 'none'
        , anim: 'fade'
        , autoplay: false
    });

    var commentScroll = layui.common.myScroll({
        elem: '#commentScroll',
        speed: 3000,
        rowHeight: 123
    });

    /**
     * 搜索
     */
    $('.search .type').on('click', function () {
        if ($(this).children('button').hasClass("open")) {
            $(this).children('ul').slideUp(200).siblings('button').removeClass('open')
        } else {
            $(this).children('ul').slideDown(200).siblings('button').addClass('open')
        }
    })

    $('.search ul li').on('click', function () {
        var content = $(this).html() + '<span class="icu icu-down"></span>'
            , event = $(this).data('event')
        $('#search').attr('placeholder', $(this).data('info'))
        $('.search .type button').html(content).attr('data-event', event)
    })

    $('.gotoSearch').on('click', function () {
        var event = $('.search .type button').attr('data-event')
            , name = $('.search .type button').text()
            , keyword = $('#search').val()
            , localInfo = window.location
            , url
            , stringify = layui.common.stringify({k: keyword, type: 'site'})

        if (keyword == '' || typeof keyword === 'undefined') {
            notice({
                msg: '搜索内容不能为空'
                , style: 'error'
            })
            return false
        }

        switch (event) {
            case 'baidu':
                url = 'https://www.baidu.com/s?tn=baidu&si=' + localInfo.host + '&wd=' + keyword
                break;
            case 'so':
                url = 'https://www.so.com/s?q=' + keyword + '&ie=utf8&src=zz_luhu.co&site=luhu.co&rg=0';
                break;
            case 'sogou':
                url = 'https://www.sogou.com/web?_asf=' + localInfo.host + '&query=' + keyword
                break;
            case 'bing':
                url = 'https://cn.bing.com/search?q=' + keyword
                break;
            default:
                url = localInfo.protocol + '//' + localInfo.host
                break;
        }
        if (event === 'local') {
            location.href = url + '/search?' + stringify
            return false
        } else {
            layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                btnAlign: 'c',
                area: '300px',
                shade: 0.15,
                id: 'search_open',
                btn: ['确定', '取消'],
                content: "<div style='padding: 30px; line-height: 24px; font-size: 14px; text-align: center; background-color: #393D49; color: #fff;'>确定跳转到 " + name + "<br />搜索 " + keyword + "</div>",
                yes: function (index) {
                    window.open(url)
                    layer.close(index)
                }
            })
        }
    })

    $("body").keydown(function () {
        if (event.keyCode == "13") {
            $('.gotoSearch').click();
        }
    });

    $(".openBaidu").on('click', function () {
        let title = $(this).attr('title'),
            name = $('.logo h2').text();
        window.open('https://www.baidu.com/s?ie=UTF-8&wd=' + $(this).attr('title') + '&oq=' + name);
        return false;
    })

    exports('main', {});
})