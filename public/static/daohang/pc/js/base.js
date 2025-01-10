;layui.extend({
    notice: "../../common/js/notice"
    , axios: "../../common/js/axios"
    , qrcode: "../../common/js/qrcode"
    , ClipboardJS: "../../common/js/ClipboardJS"
    , select: "../../common/js/select"
    , layarea: "../../common/js/layarea"
    , common: "../../common/js/common"
    , base64: "../../common/js/base64"
    , nprogress: "../../common/js/nprogress"
}).define(["jquery", "flow", "element", "rate", "form", "laytpl", "common", "base64", "ClipboardJS", "notice", "qrcode", "nprogress"], function (exports) {
    var $ = layui.jquery
        , form = layui.form
        , flow = layui.flow
        , notice = layui.notice
        , rate = layui.rate
        , base64 = layui.base64
        , common = layui.common;

    NProgress.start();
    $(function () {
        NProgress.done();
    })

    /**
     * 评分
     */
    rate.render({
        elem: "#score"
        , half: true
        , value: $('#score').data('ratenum')
        , theme: "#FF8000"
        , text: false
        , setText: function (value) {
            this.span.text(value);
        }
        , choose: function (value) {
            var data = {
                id: $('#score').data('id')
                , type: $('#score').data('type')
            }
                , stringify = common.stringify($.extend(data, {star: value}))
                , postData = base64.encode(stringify)
            common.request({
                url: "/common/postMarksData/"
                , method: "post"
                , data: {data: postData}
            }).then((info) => {
                notice({
                    msg: info.msg, style: "success", autoclose: 1500
                })
            }).catch((error) => {
                notice({
                    msg: error.msg, style: "error", autoclose: 1500
                })
            })
        }
    });

    /**
     * 推广处理
     */
    $('.openPromote').on('click', function (res) {
        var __data = $(this).data()
            , __hostUrl = [location.protocol, '//', location.host, location.pathname]
            , __localUrl = __data.url || __hostUrl.join('');

        if (!__data.promotion) {
            common.nologin();
            return false;
        }

        delete __data.url
        var __url = __localUrl + '?spread=' + base64.encode(JSON.stringify(__data));

        layer.open({
            type: 1,
            title: false,
            closeBtn: false,
            scrollbar: false,
            btnAlign: 'c',
            btn: ['关闭'],
            area: ['380px', '400px'],
            content: '<div class="promote-open"><div class="title">微信扫码或复制链接转发推广赚取佣金</div><div class="promote-qrcode"></div><textarea readonly data-clipboard-text="' + __url + '" class="layui-textarea share-link">' + __url + '</textarea></div>',
            success: function () {
                $('.promote-qrcode').each(function () {
                    var defaultParams = {
                        text: __url,
                        width: 152,
                        height: 152,
                        colorDark: '#000000',
                        colorLight: '#ffffff',
                        correctLevel: layui.qrcode.CorrectLevel.L
                    };
                    return new layui.qrcode(this, defaultParams);
                });
            }
        });
        return false;
    })

    /**
     * 分享代码
     */

    var share = {
        url: ($('link[rel="canonical"]').attr('href') || document.URL),
        pic: ($('meta[itemprop="image"]').attr('content') || 'https://statics.' + layui.common.getMainHost() + '/main/images/favicon.png'),
        title: ($('meta[itemprop="name"]').attr('content') || document.title),
        desc: ($('meta[itemprop="description"]').attr('content') || $('meta[name="description"]').attr('content'))
    }

    $('.sidebar-share a').on('click', function () {
        let type = $(this).data('share');
        switch (type) {
            case 'wechat':
                layer.open({
                    type: 1,
                    title: false,
                    closeBtn: false,
                    scrollbar: false,
                    btnAlign: 'c',
                    btn: ['关闭'],
                    area: ['330px', '390px'],
                    content: '<div class="promote-open"><div class="title">微信扫一扫，转发朋友圈或好友</div><div class="promote-qrcode" style="margin-top: 25px"></div></div>',
                    success: function () {
                        $('.promote-qrcode').each(function () {
                            var defaultParams = {
                                text: share.url,
                                width: 252,
                                height: 252,
                                colorDark: '#000000',
                                colorLight: '#ffffff',
                                correctLevel: layui.qrcode.CorrectLevel.L
                            };
                            return new layui.qrcode(this, defaultParams);
                        });
                    }
                });
                return false;
            case 'weibo':
                var url = 'http://service.weibo.com/share/share.php?url=' + share.url + '&title=%23芦虎导航%23 %23好站推荐%23 ' + share.title + '&appkey=3001084155&pic=' + share.pic
                    , w = 650
                    , h = 490;
                break;
            case 'qq':
                var url = 'http://connect.qq.com/widget/shareqq/index.html?url=' + share.url + '&showcount=0&desc=&summary=' + share.desc + '&title=' + share.title + '&site=www.bldhw.com&pics=' + share.pic + '&style=203&width=19&height=22'
                    , w = 750
                    , h = 650;
                break;
            case 'qzone':
                var url = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=qzone&url=' + share.url + '&title=' + share.title + '&summary=' + share.desc
                    , w = 650
                    , h = 490;
                break;
            case 'douban':
                var url = 'https://www.douban.com/share/service?image=' + share.pic + '&href=' + share.url + '&name=' + share.title
                    , w = 750
                    , h = 610;
                break;
            case 'huaban':
                var url = 'https://huaban.com/bookmarklet/?url=' + share.url + '&title=' + share.title + '&media=' + share.pic
                    , w = 710
                    , h = 560;
                break;
            case 'collect':
                try {
                    window.external.addFavorite(share.url, share.title);
                } catch (e) {
                    try {
                        window.sidebar.addPanel(share.title, share.url, '');
                    } catch (e) {
                        layer.msg("请按 Ctrl+D 键添加到收藏夹", {
                            time: 2000
                        });
                    }
                }
                return false;
            case 'print':
                window.print();
                return false;
        }

        var openTop = (window.screen.height - 30 - h) / 2
            , openLeft = (window.screen.width - 10 - w) / 2;
        window.open(url, "newwindow", "height=" + h + ", width=" + w + ", top=" + openTop + ",left=" + openLeft + ", toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no")
    })

    var pic_list;
    $('.content').find('img').each(function (index) {
        if (index === 0) pic_list = this.src;
    })


    $('.share-popover').each(function () {
        var defaultParams = {
            text: share.url,
            width: 82,
            height: 82,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: layui.qrcode.CorrectLevel.L
        };
        return new layui.qrcode(this, defaultParams);
    });

    var clipboard = new layui.ClipboardJS('.share-link');
    clipboard.on('success', function (e) {
        layui.notice({msg: '内容复制成功！', style: 'success', autoclose: 1500})
        e.clearSelection();
    });
    clipboard.on('error', function (e) {
        layui.notice({msg: '复制失败！', style: 'error', autoclose: 1500})
    });

    $('.left-share ul li').on('click', function () {
        var dom = $(this)
        var to = dom.data('share')
        var url = ''
        switch (to) {
            case 'qq':
                url = 'http://connect.qq.com/widget/shareqq/index.html?url=' + share.url + '&showcount=0&desc=&summary=' + share.desc + '&title=' + share.title + '&site=www.bldhw.com&pics=' + share.pic + '&style=203&width=19&height=22';
                w = 750, h = 650;
                break;
            case 'weibo':
                url = 'http://service.weibo.com/share/share.php?url=' + share.url + '&title=' + share.title + '&appkey=3001084155&pic=' + share.pic;
                w = 650, h = 490;
                break;
            case 'comment':
                var to = null;
                $("html,body").animate({
                    scrollTop: $('#comment').offset().top
                }, 300)
                break;
        }
        if (to) {
            window.open(url, "newwindow", "height=" + h + ", width=" + w + ", toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no")
        }
    });

    /**
     * 分享跟随滚动
     */
    // (function () {
    //     setTimeout(function () {
    //         var mainScroll = $('body').find('*#ScrollTop');
    //         for (var p = mainScroll.length; p > 0; p--) {
    //             !function () {
    //                 var ScrollE = mainScroll.eq(p - 1);
    //                 var ScrollTop = ScrollE.offset().top
    //                 $(window).scroll(function () {
    //                     var offsetTop = $(window).scrollTop() - ScrollTop + 80 + "px";
    //                     if ($(window).scrollTop() > ScrollTop - 80) {
    //                         ScrollE.animate({top: offsetTop}, {duration: 0, queue: true});
    //                     } else {
    //                         ScrollE.animate({top: 0}, {duration: 0, queue: true});
    //                     }
    //                 });
    //             }();
    //         }
    //     }, 100);
    // })();

    /**
     * 生成海报
     */
    $('body').on('click', '.create_poster', function () {
        var data = $(this).data()
            , stringify = common.stringify(data)
            , postData = layui.base64.encode(stringify);

        var publishLoading = layer.msg('分享海报生成中……', {
            shade: [0.7, '#393D49']
            , time: 0
        })
        common.request({
            url: "/common/postCreatePoster/"
            , method: "post"
            , data: {data: postData}
        }).then((info) => {
                layer.close(publishLoading)
                layer.open({
                    type: 1,
                    title: false,
                    skin: 'poster-img',
                    closeBtn: true,
                    area: ['290px', '617px'],
                    offset: 'auto',
                    shade: 0.7,
                    scrollbar: false,
                    shadeClose: true,
                    id: 'GetPopup',
                    anim: 2,
                    moveType: 0,
                    content: '<div style="background-image: url(\'https://uploads.' + common.getMainHost() + '/images/loading.gif\'); background-repeat: no-repeat; background-position: center center;" ><img src="' + info.src + '!/fxfn2/610x325/gravity/north/quality/100/progressive/true/ignore-error/true/compress/true/lossless/true" style="width: 100%"></div>' +
                        '<div class="cover-share">' +
                        '<a href="https://service.weibo.com/share/share.php?url=' + share.url + '&title=【' + share.title + '】' + share.desc + '&appkey=3323874806&pic=' + info.src + '" target="_blank" data-title="分享到微博"><i class="icu icu-share-weibo"></i></a>' +
                        '<a href="https://connect.qq.com/widget/shareqq/index.html?url=' + share.url + '&title=' + share.title + '&pics=' + info.src + '&summary=' + share.desc + '&site=www.' + common.getMainHost() + '" target="_blank" data-title="分享给QQ好友"><i class="icu icu-share-qq"></i></a>' +
                        '<a href="https://api.' + common.getMainHost() + '/common/getPosterDown/' + info.down + '" data-title="下载海报图片"><i class="icu icu-download"></i></a>' +
                        '</div>'
                });
            }
        ).catch((error) => {
            layui.notice({
                msg: error.msg, style: "error", autoclose: 1500, onOpen: function () {
                    layer.close(publishLoading)
                }
            })
        })
        return false
    })


    /**
     * 获取评论
     */
    var comment_List_Tpl = '<div class="comment-list">' +
        '   <div class="commentList-user">\n' +
        '       <a href="{{d.user_url}}" title="{{d.nickname}}" target="_blank"><img src="{{d.avatar}}" class="avatar"></a>\n' +
        '       <div class="userInfo">\n' +
        '           <p class="nickname">' +
        '               <a href="{{d.user_url}}" title="{{d.nickname}}" target="_blank">{{d.nickname}}</a>' +
        '               <span class="level" style="background-color: {{d.level_info.color}}">{{d.level_info.name}}</span>' +
        '           </p>\n' +
        '           <div class="comment-content"><p>{{d.content}}</p></div>\n' +
        '           <div class="content-bottom">' +
        '               <div class="agree-disagree left">' +
        '                   <div class="data-agree{{# if(d.like){ }} layui-btn-normal{{# } }} postLike" data-id="{{d.id}}" data-type="comment" data-userid="{{d.userid}}"><i class="icu icu-agree"></i><span>{{d.like_count || 0}}</span></div>' +
        '                   <div class="data-disagree{{# if(d.like){ }} deleteLike{{# } }}" data-id="{{d.id}}" data-type="comment" data-userid="{{d.userid}}"><i class="icu icu-disagree"></i></div>' +
        '               </div>' +
        '               <div class="comment-count data-reply left" data-id="{{d.topid || d.id}}" data-userid="{{d.userid}}"><i class="icu icu-comment"></i><span>{{d.comments_count || 0}}</span></div>' +
        '               <div class="more-operate left">' +
        '                   <a href="javascript:;" class="post-report left"><i class="Blood icon-report"></i>举报</a>' +
        '               </div>' +
        '               <div class="data-time right">{{d.addtime}}</div>' +
        '           </div>' +
        '       </div>' +
        '       {{#if (d.reward){ }}<i class="icu icu-reward"></i> {{# } }}\n' +
        '   </div>\n' +
        '   <div class="children" id="comment-list-{{d.id}}">' +
        '   {{# if(d.Comments && d.Comments.length){ }}' +
        '   {{# layui.each(d.Comments, function(index, item){ }}\n' +
        '       <div class="reply-list">' +
        '           <img src="{{item.avatar}}" class="avatar">' +
        '           <div class="reply-content"><a href="{{item.user_url}}" target="_blank">{{item.nickname}}</a><span>回复</span><a href="{{item.reply_user_url}}" target="_blank">{{item.reply_nickname}}</a> {{item.content}}</div>' +
        '           <div class="content-bottom">' +
        '               <div class="data-time left">{{item.addtime}}</div>' +
        '               <div class="data-reply right" data-id="{{d.topid || d.id}}" data-userid="{{item.userid}}">回复</div>' +
        '           </div>' +
        '       </div>\n' +
        '   {{# }); }}' +
        '   {{# } }}' +
        '   </div>' +
        '</div>';

    /**
     * 发表评论
     */
    form.on('submit(CommentPublish)', function (res) {
        if (typeof user === 'undefined' || user === null) {
            common.nologin();
            return false;
        }
        if (res.field.content.length < 5) {
            layui.notice({
                msg: '评论内容不能少于5个字'
                , style: 'error'
            })
            return false;
        }
        var __othis = $(this)
            , __textarea = $('.comment-textarea')
            , stringify = common.stringify(res.field)
            , postData = layui.base64.encode(stringify)
            , publishLoading = layer.msg('正在发布评论，请稍等……', {
            shade: [0.7, '#393D49']
            , time: 0
        })

        __othis.attr('disabled', true).addClass('layui-disabled');
        common.request({
            url: "/comment/postCommentData/"
            , method: "post"
            , data: {data: postData}
        }).then((info) => {
            try {
                layui.notice({
                    msg: info.msg, style: "success", autoclose: 1500, onOpen: function () {
                        layer.close(publishLoading)
                        if (info.data.topid != 0) {
                            $('#Comment-List').find('.forum-reply-forum').remove();
                            var userData = $('#Comment-List').find('#comment-list-' + info.data.topid).parent().find('.data-reply').data();
                            $('#Comment-List').find('#comment-list-' + info.data.topid).parents('.comment-list').slice(-1).children('.children').prepend(layui.laytpl('<div class="reply-list">' +
                                '           <img src="{{d.avatar}}" class="avatar">' +
                                '           <div class="reply-content"><a href="{{d.user_url}}" target="_blank">{{d.nickname}}</a> <span>回复</span> {{d.content}}</div>' +
                                '           <div class="content-bottom">' +
                                '               <div class="data-time left">{{d.addtime}}</div>' +
                                '               {{# if(d.status == 0){ }}' +
                                '               <div class="data-status right">审核中</div>' +
                                '               {{# } }}' +
                                '           </div>' +
                                '       </div>').render(info.data))
                        } else {
                            $('.comment-textarea').val('');
                            $('.form-remove').click();
                            $('.no-comment').hide();
                            $('#Comment-List').prepend(layui.laytpl(comment_List_Tpl).render(info.data));
                        }
                        __othis.attr('disabled', false).removeClass('layui-disabled')
                        __textarea.val('')
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }).catch((error) => {
            layui.notice({
                msg: error.msg, style: "error", autoclose: 1500, onOpen: function () {
                    layer.close(publishLoading)
                    __othis.attr('disabled', false).removeClass('layui-disabled')
                    __textarea.val('')
                    $('.form-remove').click();
                }
            })
        })
        return false;
    })

    /**
     * 回复评论
     */
    $('body').on('click', '.data-reply', function () {
        if (typeof user == 'undefined') {
            common.nologin();
            return false;
        }
        $('body').find('.openComment').removeClass('openComment');
        $('.comment-textarea').removeClass('focus');
        $('.form-remove').remove();
        var formHtml = $('#comment').html()
            , id = $(this).data('id')
            , replyUid = $(this).data('userid');
        $(this).addClass('openComment');
        $('.comment-list').find('.forum-reply-forum').remove();
        $(this).parent().parent().append(formHtml).find('input[name=topid]').val(id)
            .parent().find('.form-button span').hide()
            .parent().find('button').parent().append('<div class="layui-btn bg-report form-remove">取消</div><input type="hidden" name="reply_userid" value="' + replyUid + '">')
            .find('.comment-publish').html('回复');
        $('.comment-list').find('.forum-reply-forum').addClass('comment-keyframes');
    });

    $('body').on('click', '.openComment', function () {
        $('.form-remove').click(), $(this).removeClass('openComment');
    });

    $('body').on('click', '.form-remove', function () {
        $('body').find('.openComment').removeClass('openComment');
        $('.comment-list').find('.forum-reply-forum').remove();
        $('textarea[name=content]').removeClass('focus');
        $('.form-remove').remove();
    });

    $('.comment-form textarea[name=content]').on('click', function () {
        if (typeof user == 'undefined') {
            common.nologin();
            return false;
        }
        if (!$(this).hasClass('focus')) {
            $(this).addClass('focus').parent().find('.form-button').prepend('<div class="layui-btn layui-btn-report form-remove">再想想</div>');
            $('.comment-list').find('.forum-reply-forum').remove();
        }
    })

    flow.lazyimg({
        elem: 'img.load'
    });
    exports("base", {})
})