;layui.define(['axios', 'laytpl', 'carousel', 'layer'], function (exports) {
    var $ = layui.jquery
        , axios = layui.axios
        , layer = layui.layer
        , localStorageName = '__LuHu_Table';

    $('.add-company').on('click', function () {
        if (typeof user === 'undefined' || user === null) {
            layui.common.nologin();
            return false;
        }

        layer.prompt({
            formType: 0,
            placeholder: '请输入营业执照上完整企业名称',
            text: '示例企业：上海千度网络中心<br><em class="font-danger">注意：恶意提交垃圾信息，将做封号处理！</em>',
            title: '提交企业',
            btnAlign: 'c',
            area: ['350px', '40px'],
            move: false,
            yes: function (index, result) {
                let __input = result.find('.layui-layer-input'),
                    __value = __input.val(),
                    stringify = layui.common.stringify({uid: user.id, company: __value}),
                    postData = layui.base64.encode(stringify);
                if (__value.length === 0) {
                    layer.tips("公司名称必须填写", __input)
                } else {
                    layui.common.request({
                        url: "/company/postPublishData/"
                        , method: "post"
                        , data: {data: postData}
                    }).then((info) => {
                        layer.close(index)
                        layer.msg(info.msg, {
                            time: 1500,
                            shade: [0.3, '#000000']
                        })
                    }).catch((error) => {
                        layer.msg(error.msg, {
                            time: 1500,
                            shade: [0.3, '#000000']
                        })
                    })
                    return false;
                }
            },
            cancel: function () {
                layer.closeAll();
            }
        });
    })

    /**
     * axios请求封装
     * @param e
     * @returns {Promise<unknown>}
     */
    const request = function (e) {
        axios.defaults.baseURL = 'https://api.luhu.co/';
        axios.defaults.crossDomain = true;
        axios.defaults.withCredentials = true;
        axios.interceptors.request.use(function (config) {
            if (typeof ($('meta[name="X-CSRF-TOKEN"]').attr('content')) != 'undefined') {
                config.headers = {
                    "X-CSRF-TOKEN": $('meta[name="X-CSRF-TOKEN"]').attr('content')
                }
            }

            if (config.method === 'get') {
                config.params = config.data
            }

            if (config.method === 'post') {
                config.headers = $.extend(
                    config.headers,
                    {"X-Requested-With": "XMLHttpRequest"}
                )
            }
            return config;
        })

        return new Promise((resolve, reject) => {
            axios($.extend({
                method: "get"
                , responseType: 'json'
                , timeout: 60000
            }, e)).then((res) => {
                if (res.data.code === 0) {
                    resolve(res.data)
                } else {
                    reject(res.data)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }

    $('.gotoWebSite').on('click', function () {
        let id = $(this).data('id');
        request({
            url: "/website/postOutSiteData/"
            , method: "post"
            , data: {id: id}
        }).then((info) => {
            console.log(info.msg)
        }).catch((error) => {
            console.log(error.msg)
        })
    })

    /**
     * 实例化请求参数
     * @param data
     * @returns {string}
     */
    const stringify = function (data) {
        return Object.keys(data).sort().map(key => key + '=' + data[key]).join('&')
    }

    /**
     * 获取url参数
     * @param name
     * @returns {string|null}
     */
    const getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    /**
     * 右侧工具条
     */
    $(".goto-top").on('click', function () {
        $("html,body").animate({scrollTop: 0}, 300);
    });

    $('.bar-menu-main li').hover(function (event) {
        var title = $(this).data('title');
        if (title) {
            layer.tips(title, this, {
                time: 0,
                tips: [2, 'rgba(0,0,0,.9)']
            });
        }
    }, function () {
        layer.closeAll('tips');
    });


    /**
     * 获取网站根域名
     * @returns {string}
     */
    const getMainHost = function () {
        let key = `mh_${Math.random()}`;
        let keyR = new RegExp(`(^|;)\\s*${key}=12345`);
        let expiredTime = new Date(0);
        let domain = document.domain;
        let domainList = domain.split('.');
        let urlItems = [];
        urlItems.unshift(domainList.pop());
        while (domainList.length) {
            urlItems.unshift(domainList.pop());
            let mainHost = urlItems.join('.');
            let cookie = `${key}=${12345};domain=.${mainHost}`;

            document.cookie = cookie;
            if (keyR.test(document.cookie)) {
                document.cookie = `${cookie};expires=${expiredTime}`;
                return mainHost;
            }
        }
    }

    /**
     * html转义
     * @param html
     * @returns {string}
     * @constructor
     */
    const html_encode = function (html) {
        var temp = document.createElement("div");
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    }
    const html_decode = function (text) {
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    }


    $('.goto-login-btn').on('click', function () {
        var url = $(this).attr("href"),
            callback = $('link[rel="canonical"]').attr("href");
        location.href = url + '?callback=' + callback;
        return false;
    })

    $('.goto-register-btn').on('click', function () {
        var url = $(this).attr("href"),
            callback = $('link[rel="canonical"]').attr("href");
        location.href = url + '?callback=' + callback;
        return false;
    })

    $('.goto-Login').on('click', function () {
        $('.goto-login-btn').click();
    })

    $('.goto-Register').on('click', function () {
        $('.goto-register-btn').click();
    })


    /**
     * 未登录
     */
    const nologin = function () {
        layer.open({
            type: 1,
            title: false,
            closeBtn: false,
            area: '400px;',
            shade: 0.5,
            shadeClose: true,
            scrollbar: false,
            id: 'oitol-nologin',
            skin: 'oitol-nologin',
            btn: ['登录', '注册'],
            btnAlign: 'c',
            moveType: 1,
            content: '<div class="nologin"><img src="https://statics.' + getMainHost() + '/common/images/nologin-title.png" class="nologin-title"> <p class="title">您还未登录</p><p class="info">（请先登录/注册再进行此操作）</p><a href="javascript:;" class="layui-layer-close"><i class="icu icu-close"></i></a></div>',
            yes: function (layero) {
                $('.goto-login-btn').click();
                return false;
            },
            btn2: function (layero) {
                $('.goto-register-btn').click();
                return false;
            }
        });
    }

    layui.laytpl.format_number = function (num) {
        if (num >= 100000) {
            num = Math.round(num / 10000) + ' w';
        } else if (num >= 10000) {
            num = Math.round(num / 10000 * 100) / 100 + ' w';
        } else if (num >= 1000) {
            num = Math.round(num / 1000 * 100) / 100 + ' k';
        }
        return num;
    }

    const closeWindow = function () {
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
            location.href = "about:blank";
        } else {
            window.opener = null;
            window.open('', '_self');
        }
        window.close();
    }

    const noDebuger = function () {
        function openDebuger() {
            var d = new Date();
            debugger;
            if (new Date() - d > 10) {
                closeWindow()
                return true;
            }
            return false;
        }

        function start() {
                while (openDebuger()) {
                    openDebuger();
                }
            }

            if (!openDebuger()) {
                window.onblur = function () {
                    setTimeout(function () {
                        start();
                    }, 500)
                }
            } else {
                start();
            }
        };

    if (typeof user == 'undefined' || user == null || (typeof user != 'undefined' && user != null && user.groupid < 95)) {
            let threshold = 160;
            setInterval(function () {
                if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
                    closeWindow()
                    return false;
                } else {
                    noDebuger();
                return false;
            }
        }, 1e3);


        // document.oncontextmenu = function () {
        //     return false;
        // }
        //
        // document.onkeydown = function (e) {
        //     var currKey = 0, evt = e || window.event;
        //     currKey = evt.keyCode || evt.which || evt.charCode;
        //     if (evt.ctrlKey || (currKey == 123) || (evt.ctrlKey && evt.shiftKey && (currKey == 67 || currKey == 73))) {
        //         evt.preventDefault();
        //         window.event.cancelBubble = true;
        //         window.event.returnValue = false;
        //     }
        // }
    }

    const __setCookie = function (name, value, expired = 1) {
        let time = new Date();
        time.setTime(time.getTime() + (expired * 24 * 60 * 60 * 1000));
        let expires = "expires=" + time.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";domain=" + getMainHost() + ";path=/";
    }

    const __getCookie = function (name) {
        var name = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    //无线循环
    var myScroll = function (options) {
        var defaults = {speed: 40, rowHeight: 24}
            , opts = $.extend({}, defaults, options)
            , intId = []
            , elem = $(opts.elem);

        function marquee(obj, step) {
            obj.find("ul").animate({marginTop: '-=' + opts.rowHeight}, 500, function () {
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if (s >= step) {
                    $(this).find('li').slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }

        elem.each(function (i) {
            var sh = opts["rowHeight"], speed = opts["speed"], _this = elem;
            intId[i] = setInterval(function () {
                if (_this.find("ul").height() <= _this.height()) {
                    clearInterval(intId[i]);
                } else {
                    marquee(_this, sh);
                }
            }, speed);
            _this.hover(function () {
                clearInterval(intId[i]);
            }, function () {
                intId[i] = setInterval(function () {
                    if (_this.find("ul").height() <= _this.height()) {
                        clearInterval(intId[i]);
                    } else {
                        marquee(_this, sh);
                    }
                }, speed);
            });
        });
    }


    exports('common', {
        request: request
        , stringify: stringify
        , __setCookie: __setCookie
        , __getCookie: __getCookie
        , getUrlParam: getUrlParam
        , getMainHost: getMainHost
        , html_encode: html_encode
        , html_decode: html_decode
        , nologin: nologin
        , myScroll: myScroll
    });
})

