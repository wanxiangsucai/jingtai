! function (t) {
    function e(i) {
        if (n[i]) return n[i].exports;
        var o = n[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return t[i].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
    }
    var n = {};
    return e.m = t, e.c = n, e.p = "//<%=CSS_DOMAIN%>/qcloud/main/scripts/", e(0)
}({
    0: function (t, e, n) {
        "use strict";
        var i = n(1),
            o = function () {
                return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            },
            a = 768,
            r = {
                TOP_NAV_FIRST_LEVEL: {
                    selector: "#qcTopNavFstLevel",
                    component: n("iEML")
                },
                LEFT_NAV: {
                    winContentKey: "__QCCOMPONENT_LEFTNAV__",
                    selector: "#qcLeftNavSwitcher",
                    component: n("IdoP")
                },
                TOP_NAV_SND_LEVEL: {
                    winContentKey: "__QCCOMPONENT_TOPNAV__",
                    selector: "#qcTopNavSndLevelSheetContainer",
                    component: n("EZWm")
                }
            };
        i.extend(e, {
            init: function () {
                this.initComponents(), this.bindGlobalEvents(), this.currentMode = o() > a ? 1 : 0
            }, initComponents: function () {
                this.components = [];
                var t = this,
                    e = [r.TOP_NAV_FIRST_LEVEL, r.LEFT_NAV, r.TOP_NAV_SND_LEVEL];
                e.forEach(function (e) {
                    var n = i(e.selector);
                    if (0 !== n.length) {
                        var o = {
                            selector: e.selector
                        };
                        if (e.winContentKey) {
                            var a = window[e.winContentKey];
                            if (!a || !a.content) return void console.warn("qcmain::loaderjs:\n\tdata js for '" + e.selector + "' is not loaded!");
                            o.rawContent = a.content
                        }
                        t.components.push(e.component.init(o))
                    }
                })
            }, bindGlobalEvents: function () {
                var t = this,
                    e = i(window);
                e.off("scroll.qccomponent").on("scroll.qccomponent", function () {
                    t.components.forEach(function (t) {
                        t.onScroll && t.onScroll(arguments)
                    })
                }), e.off("resize.qccomponent").on("resize.qccomponent", function () {
                    t.components.forEach(function (e) {
                        e.onResize && e.onResize(arguments);
                        var n = o();
                        n <= a && 1 == t.currentMode && (t.currentMode = 0, e.onResizeNarrow && e.onResizeNarrow()), n > a && 0 == t.currentMode && (t.currentMode = 1, e.onResizeWide && e.onResizeWide())
                    })
                })
            }
        }), window.QCComponent = e
    }, 1: function (t, e) {
        t.exports = jQuery
    }, iEML: function (t, e, n) {
        "use strict";
        var i = n(1),
            o = n("z6Rq"),
            a = n("Agcf"),
            r = i.extend({}, a, {
                init: function (t) {
                    return this.opts = t, this.$root = i("#qcTopNavFstLevel"), 0 === this.$root.length ? void console.warn("qcmain::loaderjs::topnav_firstlevel:\n\tno selector `qcTopNavFirstLevel` found!") : (this.nosearch = 1 === +this.$root.data("nosearch"), this.nolang = 1 === +this.$root.data("nolang"), this.noleftnav = 1 === +this.$root.data("noleftnav"), this.nohome = 1 === +this.$root.data("nohome"), this.mountComponent(), this.initVariables(), this)
                }, mountComponent: function () {
                    this.$root.html(this.getTemplate())
                }, initVariables: function () {
                    var t = this;
                    if (!this.nosearch) {
                        this.$topNavSearch = i("#qcTopNavSearchBar");
                        var e = t.$(".J-qcTopNavSearchOpen"),
                            n = t.$(".J-qcTopNavSearchClose");
                        t.searchBar = o.newInstance({
                            el: t.$topNavSearch[0],
                            triggerEl: e[0],
                            closeEl: n[0],
                            onOpen: function () {
                                t.showMask()
                            }, onClose: function () {
                                t.hideMask()
                            }
                        })
                    }
                    this.nolang || (this.$langSwitcher = this.$(".J-qcTopNavFirstLevelLangSwitcher"), this.$langDropDown = this.$langSwitcher.find(".J-qcTopNavLangDropdown"), this.$langSwitcher.on("mouseenter", function () {
                        t.$langDropDown.show()
                    }).on("mouseleave", function () {
                        t.$langDropDown.hide()
                    }).on("click", ".J-qcTopNavLangItem", function () {
                        var e = i(this).data("type");
                        return "intl" == e && (t.doLogout(), t.goToIntlHome()), !1
                    }))
                }, onResizeNarrow: function () {
                    this.searchBar && "function" == typeof this.searchBar.isOpenState && this.searchBar.isOpenState() && this.searchBar.close()
                }, onResizeWide: function() {},
					getTemplate: function() {
						var t = '\n\t\t\t<a id="qcLeftNavSwitcher" href="javascript:;" class="c-nav-all-trigger" hotrep="hp.header.trigger" aria-haspopup="true" aria-expanded="false" role="button" aria-controls="qcLeftNavSwitcher">\n\t\t\t<i class="c-nav-all-trigger-icon"></i>\n\t\t\t<span class="c-nav-all-trigger-text">菜单</span>\n\t\t\t</a>\n\t\t\t<i class="c-nav-top-divider"></i>\n\t\t',
							e = '\n\t\t\t<span class="c-nav-top-search search-m search-cancel J-qcTopNavSearchOpen" href="javascript:;" role="button" hotrep="hp.header.opensearch">\n\t\t\t\t<i class="nav-search-icon"></i> 搜索\n\t\t\t<div id="qcTopNavSearchBar" class="c-top-searchbar">\n\t\t\t\t<div class="c-top-searchbar-inner">\n\t\t\t\t\t<div class="c-top-searchbar-box" role="combobox">\n\t\t\t\t\t\t<div class="c-searchbar-ctrl">\n\t\t\t\t\t\t\t<input type="search" class="search-ipt J-qcIptSearch" placeholder="请输入你要搜索的关键词"\n\t\t\t\t\t  \t\t\taria-autocomplete="list" autocomplete="on" aria-owns="search-list">\n\t\t\t\t\t  \t\t\t<div class="nav-search-icons-wrap">\n                            \t\t<a href="javascript:;" class="search-cancel-btn J-qcBtnCloseSearch">\n                                        <i class="nav-search-cancel-icon"></i>\n                                    </a>\n                    \t\t\t\t<i class="nav-search-divider"></i>\n \t\t\t                        <a href="javascript:;" class="search-btn J-qcBtnDoSearch" hotrep="hp.header.dosearch">\n                                        <i class="nav-search-icon"></i>\n                                    </a>\n                    </div>\n\t\t\t\t\t  \t</div>\n\t\t\t\t\t\t<span class="sr-only" aria-live="polite">0个推荐</span> <!--联想 start-->\n\t\t\t\t\t\t\t<div class="nav-dropdown-mini" tabindex="-1">\n\t\t\t\t\t\t\t\t<div class="dropdown-mini-inner dropdown-mini-lang">\n\t\t\t\t\t\t\t\t\t<div class="dropdown-mini-list J-qcSearchBoxHotWordWrapper">\n\t\t\t\t\t\t\t\t\t\t<h3 class="dropdown-mini-list-tit">热门搜索</h3>\n\t\t\t\t\t\t\t\t\t\t<textarea class="J-qcSearchData" style="display:none">{ "hotWords": ["云服务器", "短信", "微信小程序", "域名", "直播", "网站备案", "语音", "云数据库 MySQL", "对象存储", "CDN" ], "max": 5 }</textarea>\n\t\t\t\t\t\t\t\t\t\t<ul class="J-qcSearchBoxHotWordList" role="listbox">\n\t\t\t\t\t\t\t\t\t\t\t<li role="option" class="dropdown-mini-item J-qcSearchBoxHotWordItem">\n\t\t\t\t\t\t\t\t\t\t\t\t<a tabindex="-1" href="javascript:;" hotrep=""></a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="dropdown-mini-list J-qcSearchBoxResultWrapper" style="display: none">\n\t\t\t\t\t\t\t\t\t\t<ul id="search-list" class="J-qcSearchBoxResultList" role="listbox">\n\t\t\t\t\t\t\t\t\t\t\t<li role="option" class="dropdown-mini-item J-qcSearchBoxResultItem">\n\t\t\t\t\t\t\t\t\t\t\t\t<a tabindex="-1" href="javascript:;" hotrep=""></a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div> <!--联想 end-->\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</span>',
							n = '\n\t\t\t<div class="c-nav-dropdown-btn nav-dropdown-lang J-qcTopNavFirstLevelLangSwitcher">\n\t\t\t\t<a href="javascript:;" class="c-nav-dropdown-btn-inner" aria-expanded="false"\n\t\t\t   \t\taria-haspopup="true" aria-owns="language_select_owns" aria-controls="language_select_owns">\n\t\t\t\t\t<span class="sr-only">语言</span>\n\t\t\t\t\t<i class="c-nav-icon-global"></i>\n\t\t\t\t\t<span class="nav-dropdown-btn-txt">中国站</span>\n\t\t\t\t\t<i class="nav-dropdown-btn-icon"></i>\n\t\t\t\t</a>\n\t\t\t\t<div class="c-bubble c-bubble-top J-qcTopNavLangDropdown" style="display: none;">\n\t\t\t\t<div class="c-bubble-inner">\n\t\t\t\t\t<div class="nav-dropdown-mini">\n\t\t\t\t\t\t<div class="dropdown-mini-inner dropdown-mini-lang">\n\t\t\t\t\t\t\t<div class="dropdown-mini-list">\n\t\t\t\t\t\t\t\t<ul id="language_select_owns">\n\t\t\t\t\t\t\t\t\t<li class="dropdown-mini-item J-qcTopNavLangItem actived" data-type="cn"><a\n\t\t\t\t\t\t\t\t\t\t\t\thref="javascript:;">中国站</a></li>\n\t\t\t\t\t\t\t\t\t<li class="dropdown-mini-item J-qcTopNavLangItem" data-type="intl"><a\n\t\t\t\t\t\t\t\t\t\t\t\thref="javascript:;">International</a></li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t\t',
							i = '\n\t\t\t<div class="c-nav-entry-list">\n                <ul>\n\t\t\t\t\t<li class="c-nav-entry-item">\n            \t\t\t<a href="//www.xinyouw.org" target="_blank" hotrep="hp.header.fst.home">万象云首页</a>\n            \t\t</li>\n                </ul>\n            </div>\n\t\t';
						return '\n\t\t\t<div style="position:absolute;left:20px;top:0px;">\n\t\t\t\t' + (this.noleftnav ? "" : t) + '\n\t\t\t\t<a class="c-nav-bg-logo" href="//www.xinyouw.org" hotrep="hp.header.fst.logo">\n\t\t\t\t\t<i>腾讯云</i>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t\t<div class="c-nav-top-operation">\n\t\t\t\t' + (this.nosearch ? "" : e) + "\n                " + (this.nohome ? "" : i) + '\n\t\t\t\t<div class="c-nav-top-ctrl">\n\t\t\t\t\t' + (this.nolang ? "" : n) + '\n\t\t\t\t\t<div class="c-nav-top-links">\n\t\t\t\t\t\t<a href="/member.php" hotrep="hp.header.console" class="link-item">控制台</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>'
					}, onMaskClick: function () {
                    var t = this;
                    t.isNarrowMode() || t.searchBar.isOpenState() && t.searchBar.close()
                }, showMask: function () {
                    var t = "qcGlobalMaskPC",
                        e = i("#" + t);
                    e.length || (e = i('<div class="c-nav-mask"></div>').attr("id", t).css({
                        position: "fixed",
                        "z-index": 1e3
                    }).appendTo(this.$root.parent()), e.on("click", i.proxy(this.onMaskClick, this))), e.show()
                }, hideMask: function () {
                    var t = "qcGlobalMaskPC",
                        e = i("#" + t);
                    e.hide()
                }, $: function (t) {
                    return this.$root ? this.$root.find(t) : i(t)
                }
            });
        t.exports = r
    }, z6Rq: function (t, e, n) {
        "use strict";
        var i = n("lj6U"),
            o = n("pZfc"),
            a = n("vBeg"),
            r = {
                init: function (t) {
                    return this.opts = t || {}, this.$el = this.$searchBar = $(t.el), this.$trigger = $(t.triggerEl), this.$closer = $(t.closeEl), this.$searchBox = this.$(".J-qcSearchBox"), this.$iptSearch = this.$(".J-qcIptSearch"), this.$btnCloseSearch = this.$(".J-qcBtnCloseSearch"), this.$btnDoSearch = this.$(".J-qcBtnDoSearch"), this.$hotWordWrapper = this.$(".J-qcSearchBoxHotWordWrapper"), this.$hotWordList = this.$(".J-qcSearchBoxHotWordList"), this.$searchListWrapper = this.$(".J-qcSearchBoxResultWrapper"), this.$searchList = this.$(".J-qcSearchBoxResultList"), this.tipsList = [], this.activedTips = -1, this.setupHotWords(), this.bindEvents(), this
                }, bindEvents: function () {
                    var t = this;
                    this.$searchBox.on("keyup", function (e) {
                        27 == e.keyCode && (t.close(), t.$trigger.length > 0 && t.$trigger.focus())
                    }), t.$iptSearch.on("search", function () {
                        var e = $.trim(t.$iptSearch.val());
                        return e && t.goToSearchPage(e), !1
                    }).on("input", function (e) {
                        var n = t.searchKeyword = $.trim(t.$iptSearch.val());
                        n ? t.doRecommand(n) : (t.tipsList = [], t.renderTipsList([]))
                    }).on("keyup", function (e) {
                        var n = e.which,
                            i = $.trim(t.$iptSearch.val());
                        switch (n) {
                        case 27:
                            t.close();
                            break;
                        case 13:
                            if (i) t.$searchList.find(".curr").length ? location.href = t.$searchList.find(".curr a").attr("href") : t.goToSearchPage(i);
                            else if (t.$hotWordList.find(".curr").length) {
                                var o = t.$hotWordList.find(".curr a").data("keyword");
                                t.goToSearchPage(o)
                            }
                            break;
                        case 37:
                        case 39:
                            break;
                        case 38:
                        case 40:
                            t.moveInTipsList(38 == n ? -1 : 1), e.preventDefault()
                        }
                    }).on("click", function () {
                        t.open()
                    }), t.$trigger.on("click", function () {
                        t.open()
                    }), this.$btnDoSearch.on("click", function () {
                        var e = $.trim(t.$iptSearch.val());
                        return e && t.goToSearchPage(e), $(this).blur(), !1
                    }), this.$btnCloseSearch.on("click", function () {
                        return t.close(), !1
                    }), this.$searchBar.on("click", ".J-qcSearchBoxHotWordItem a,.J-qcSearchBoxSuggestWordItem a", function () {
                        var e = ($(this), $(this).data("keyword"));
                        t.goToSearchPage(e)
                    }), a.bindCommonKeyEvents(this.$iptSearch, {
                        onTab: function (e) {
                            e.shiftKey && t.$closer.length > 0 && (t.$closer.focus(), e.preventDefault())
                        }
                    }), a.bindCommonKeyEvents(this.$btnDoSearch, {
                        onTab: function (e) {
                            !e.shiftKey && t.$closer.length > 0 && (t.$closer.focus(), e.preventDefault())
                        }
                    }), a.bindCommonKeyEvents(this.$closer, {
                        onTab: function (e) {
                            e.shiftKey ? t.$btnDoSearch.focus() : t.$iptSearch.focus(), e.preventDefault()
                        }
                    })
                }, renderTipsList: function (t) {
                    var e = this,
                        t = t || [],
                        n = '<li role="option" class="dropdown-mini-item J-qcSearchBoxSuggestWordItem">\t\t\t\t<a tabindex="-1" href="javascript:;" data-keyword="<%= title  %>"><%= title %></a>\t\t\t\t</li>',
                        o = "";
                    t.length ? (o = t.map(function (t) {
                        return i.tmpl(n, t)
                    }).join(""), e.$searchList.html(o), e.$hotWordWrapper.hide(), e.$searchListWrapper.show()) : e.searchKeyword ? (e.$searchListWrapper.hide(), e.$hotWordWrapper.hide()) : (e.$searchListWrapper.hide(), e.$hotWordWrapper.show())
                }, moveInTipsList: function (t) {
                    var e = this.searchKeyword ? this.$searchList : this.$hotWordList,
                        n = e.children().length;
                    if (n) {
                        var i, o = e.find(".curr").index();
                        i = o === -1 ? t > 0 ? t - 1 : n + t : o + t, i === n || i === -1 ? e.find(".curr").removeClass("curr") : e.find("li:eq(" + i + ")").addClass("curr").siblings().removeClass("curr")
                    }
                }, doRecommand: i.debounce(function () {
                    var t = this,
                        e = t.searchKeyword;
                    o.jsonpGetter({
                        url: "https://" + i.getRealHostname() + "/search/ajax/searchtips",
                        data: {
                            kwd: e,
                            type: 1,
                            page: 1
                        },
                        callbackName: "callback",
                        success: function (n) {
                            0 == n.code && e === t.searchKeyword && (t.tipsList = n.data.dataList, t.activedTips = -1, t.renderTipsList(n.data.dataList))
                        }
                    })
                }, 200),
                goToSearchPage: function (t) {
                    var e = location.pathname,
                        n = 0 === e.indexOf("/document"),
                        o = n ? "7_1" : "1_1";
                    location.href = "https://" + i.getRealHostname() + "/search/" + encodeURIComponent(t) + "/" + o
                }, resetState: function () {
                    this.$iptSearch.val("").blur(), this.$searchBar.removeClass("searchbar-show"), this.searchKeyword = null, this.tipsList = [], this.renderTipsList()
                }, setupHotWords: function () {
                    try {
                        var t = $(".J-qcSearchData"),
                            e = JSON.parse(t.val() || "{}"),
                            n = i.shuffle(e.hotWords || []).slice(0, e.max),
                            o = '<li role="option" class="dropdown-mini-item J-qcSearchBoxHotWordItem"><a tabindex="-1" href="javascript:;" hotrep="" data-keyword="<%= keyword  %>"><%= keyword %></a></li>',
                            a = n.map(function (t) {
                                return i.tmpl(o, {
                                    keyword: t
                                })
                            }).join("");
                        this.$hotWordList.html(a)
                    } catch (t) {
                        console.error("setup search hot words fail:", t)
                    }
                }, open: function () {
                    this.$searchBar.addClass("searchbar-show"), this.opts.onOpen && this.opts.onOpen(), this.$iptSearch.focus()
                }, close: function () {
                    this.resetState(), this.setupHotWords(), this.opts.onClose && this.opts.onClose()
                }, $: function (t) {
                    return this.$searchBar.find(t)
                }
            };
        t.exports = {
            $searchBar: r,
            setup: function () {
                return this.$searchBar.init.apply(this.$searchBar, arguments), this
            }, isOpenState: function () {
                return this.$searchBar.$el.hasClass("searchbar-show")
            }, resetState: function () {
                this.$searchBar.resetState(this.$searchBar, arguments)
            }, open: function () {
                this.$searchBar.open(this.$searchBar, arguments)
            }, close: function () {
                this.$searchBar.close(this.$searchBar, arguments)
            }, newInstance: function (t) {
                var e = $.extend(!0, {}, this);
                return e.setup(t), e
            }
        }
    }, lj6U: function (t, e, n) {
        "use strict";
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            o = n("YHhD"),
            a = n(1);
        t.exports = {
            vsub: function (t, e) {
                return ("" + t).replace(/\$\{([^\{\}]+)\}/g, function (t, n, i) {
                    return null == (i = (e || {})[n]) ? "" : i
                })
            }, query: function (t) {
                return t = String(t).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1"), location.search.slice(1).match(RegExp("(?:^|&)" + t + "(?:=([^&#]*)?|[&#]|$)")) ? String(RegExp.$1 || "").replace(/\+/g, " ") : void 0
            }, i18n: function (t) {
                return function (e) {
                    return e = e || "zh",
                        function (n, o) {
                            o = o || "";
                            var a = t && t[n] && t[n][e] ? t[n][e] : n;
                            return "object" === ("undefined" == typeof o ? "undefined" : i(o)) ? this.vsub(a, o) : a + o
                        }
                }
            }, isMobile: function () {
                for (var t = navigator.userAgent.toLowerCase(), e = ["android", "ipad", "iphone", "windows phone"], n = 0; n < e.length; n++)
                    if (t.indexOf(e[n]) !== -1) return !0;
                return !1
            }, getWindowWidth: function () {
                return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            }, tmpl: function () {
                var t = {},
                    e = function (t) {
                        return 0 == t ? t : (t = (t || "").toString(), t.replace(/&(?!\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;"))
                    },
                    n = function (t, e) {
                        if (e)
                            for (var n in e) {
                                var i = new RegExp("<%#\\s?" + n + "%>", "g");
                                t = t.replace(i, e[n])
                            }
                        return t
                    };
                return function i(o, a, r) {
                    var s = !/\W/.test(o);
                    !s && (o = n(o, r));
                    var c = s ? t[o] = t[o] || i(n(document.getElementById(o).innerHTML, r)) : new Function("obj", "_escape", "var _p='';with(obj){_p+='" + o.replace(/[\r\t\n]/g, " ").split("\\'").join("\\\\'").split("'").join("\\'").split("<%").join("\t").replace(/\t-(.*?)%>/g, "'+$1+'").replace(/\t=(.*?)%>/g, "'+_escape($1)+'").split("\t").join("';").split("%>").join("_p+='") + "';} return _p;"),
                        l = function (t) {
                            return c(t, e)
                        };
                    return a ? l(a) : l
                }
            }(),
            getVcode: function () {
                return "//" + this.getRealHostname() + "/captcha?t=" + (new Date).getTime()
            }, getRealHostname: function () {
                var t = location.hostname;
                return t.indexOf("qcloud.com") != -1 ? "www.qcloud.com" : t.indexOf("cloud.tencent.com") != -1 ? "cloud.tencent.com" : "www.qcloud.com"
            }, getCookieDomain: function () {
                var t = location.hostname;
                return t.indexOf("qcloud.com") != -1 ? ".qcloud.com" : t.indexOf("cloud.tencent.com") != -1 ? ".cloud.tencent.com" : ".qcloud.com"
            }, getUin: function () {
                var t = o.get("uin") || "";
                return t.replace(/^o0*/, "")
            }, getCsrfCode: function () {
                var t = o.get("skey") || o.get("p_skey"),
                    e = "";
                if (t) {
                    for (var n = 5381, i = 0, a = t.length; i < a; i += 1) n += (n << 5) + t.charCodeAt(i);
                    e = 2147483647 & n
                }
                return e
            }, isLogined: function () {
                return !(!o.getCookie("uin") || !o.getCookie("skey") && !o.getCookie("p_skey"))
            }, jsonpGetter: function (t) {
                if (window.$) {
                    var t = t || {};
                    if (t.url = t.url || "", t.data = a.extend({
                        mc_gtk: this.getCsrfCode() || "",
                        csrfCode: this.getCsrfCode() || "",
                        uin: this.getUin() || ""
                    }, t.data || {}), t.success = t.success || t.sucCb || function () {}, t.error = t.error || t.errCb || function () {}, t.url) return a.ajax({
                        url: t.url,
                        method: "GET",
                        dataType: "jsonp",
                        jsonp: t.callbackName ? t.callbackName : "jsonpCallback",
                        data: t.data,
                        cache: !1,
                        traditional: t.traditional || !1,
                        success: function (e) {
                            !e || 0 != e.code && 0 != e.retcode ? t.error(e) : t.success(e)
                        }, error: function (t) {}
                    })
                }
            }, getWindowHeight: function () {
                return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            }, isIOS: function () {
                return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
            }, isIE: function () {
                return /MSIE/i.test(navigator.userAgent)
            }, isAndroid: function () {
                return /android/i.test(navigator.userAgent) && !window.MSStream
            }, debounce: function (t, e, n) {
                var i, o, a, r, s, c = function c() {
                    var l = (new Date).getTime() - r;
                    l < e && l >= 0 ? i = setTimeout(c, e - l) : (i = null, n || (s = t.apply(a, o), i || (a = o = null)))
                };
                return function () {
                    a = this, o = arguments, r = (new Date).getTime();
                    var l = n && !i;
                    return i || (i = setTimeout(c, e)), l && (s = t.apply(a, o), a = o = null), s
                }
            }, isInWechat: function () {
                return window.navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1
            }, sleep: function (t) {
                return new Promise(function (e) {
                    return setTimeout(e, t)
                })
            }, simulateScrollY: function (t) {
                var e = t.$ctx,
                    n = t.targetSelector,
                    i = t.step,
                    o = void 0 === i ? 30 : i,
                    r = t.innerScrollSelector,
                    s = void 0 === r ? ".c-scrollbar" : r,
                    c = t.forceSimulate,
                    l = void 0 !== c && c,
                    h = function (t, e) {
                        if (!s || !a(t).find(s).is(":visible")) {
                            var n = e.originalEvent || e,
                                i = n.wheelDelta || -n.detail;
                            t.scrollTop += (i < 0 ? 1 : -1) * o
                        }
                    },
                    u = "function" == typeof _ && "function" == typeof _.throttle ? _.throttle(h, 10) : h,
                    d = function (t) {
                        return function (e) {
                            (l || this.offsetHeight < this.scrollHeight) && (u(this, e), t && e.preventDefault())
                        }
                    },
                    p = e.find(n);
                p[0].addEventListener ? p.get().forEach(function (t) {
                    ["mousewheel", "DOMMouseScroll"].forEach(function (e) {
                        return t.addEventListener(e, d(!0), {
                            passive: !1
                        })
                    })
                }) : e.on("mousewheel DOMMouseScroll", n, d(!1))
            }, smoothScrollTop: function (t, e) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 200;
                a("html, body").not(":animated").animate({
                    scrollTop: t
                }, n, null, function () {
                    if (e && history && "function" == typeof history.pushState) {
                        var t = location.href.replace(/#[\s\S]*$/, "");
                        history.pushState({
                            url: t,
                            hash: e
                        }, null, t + "#" + e)
                    }
                })
            }, shuffle: function (t) {
                if (!Array.isArray(t)) return t;
                for (var e = [].slice.apply(t), n = e.length - 1; n > 0; n--) {
                    var i = Math.floor(Math.random() * (n + 1)),
                        o = e[n];
                    e[n] = e[i], e[i] = o
                }
                return e
            }, hashCode: function (t) {
                var e, n, i = 0;
                if (0 === t.length) return i;
                for (e = 0; e < t.length; e++) n = t.charCodeAt(e), i = (i << 5) - i + n, i |= 0;
                return i
            }, checkImgLazyLoad: function (t) {
                "1" != t.data("hasCheckedImgLazyLoad") && (t.data("hasCheckedLazyLoad", "1"), t.find("img.J-lazyLoadImg").each(function () {
                    var t = a(this),
                        e = t.data("src");
                    e && !t.attr("src") && t.attr("src", e)
                }))
            }
        }
    }, YHhD: function (t, e, n) {
        "use strict";

        function i(t) {
            return r.get(t)
        }

        function o(t, e, n) {
            return r.set(t, e, n)
        }

        function a(t, e) {
            return r.remove(t, e)
        }
        var r = n("WPtr"),
            s = {
                getCookie: i,
                setCookie: function (t, e, n, i, a, r) {
                    return o(t, e, {
                        expires: parseInt(n) / 60 * 24,
                        path: i,
                        domain: a,
                        secure: r
                    })
                }, delCookie: function (t, e, n, i) {
                    return a(t, {
                        path: e,
                        domain: n,
                        secure: i
                    })
                }, get: i,
                set: o,
                remove: a
            };
        t.exports = s
    }, WPtr: function (t, e, n) {
        var i, o;
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
        ! function (a) {
            i = a, o = "function" == typeof i ? i.call(e, n, e, t) : i, !(void 0 !== o && (t.exports = o))
        }(function () {
            function t() {
                for (var t = 0, e = {}; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var i in n) e[i] = n[i]
                }
                return e
            }

            function e(n) {
                function i(e, o, a) {
                    var r;
                    if ("undefined" != typeof document) {
                        if (arguments.length > 1) {
                            if (a = t({
                                path: "/"
                            }, i.defaults, a), "number" == typeof a.expires) {
                                var s = new Date;
                                s.setMilliseconds(s.getMilliseconds() + 864e5 * a.expires), a.expires = s
                            }
                            try {
                                r = JSON.stringify(o), /^[\{\[]/.test(r) && (o = r)
                            } catch (t) {}
                            return o = n.write ? n.write(o, e) : encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), e = encodeURIComponent(String(e)), e = e.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), e = e.replace(/[\(\)]/g, escape), document.cookie = [e, "=", o, a.expires && "; expires=" + a.expires.toUTCString(), a.path && "; path=" + a.path, a.domain && "; domain=" + a.domain, a.secure ? "; secure" : ""].join("")
                        }
                        e || (r = {});
                        for (var c = document.cookie ? document.cookie.split("; ") : [], l = /(%[0-9A-Z]{2})+/g, h = 0; h < c.length; h++) {
                            var u = c[h].split("="),
                                d = u.slice(1).join("=");
                            '"' === d.charAt(0) && (d = d.slice(1, -1));
                            try {
                                var p = u[0].replace(l, decodeURIComponent);
                                if (d = n.read ? n.read(d, p) : n(d, p) || d.replace(l, decodeURIComponent), this.json) try {
                                    d = JSON.parse(d)
                                } catch (t) {}
                                if (e === p) {
                                    r = d;
                                    break
                                }
                                e || (r[p] = d)
                            } catch (t) {}
                        }
                        return r
                    }
                }
                return i.set = i, i.get = function (t) {
                    return i(t)
                }, i.getJSON = function () {
                    return i.apply({
                        json: !0
                    }, [].slice.call(arguments))
                }, i.defaults = {}, i.remove = function (e, n) {
                    i(e, "", t(n, {
                        expires: -1
                    }))
                }, i.withConverter = e, i
            }
            return e(function () {})
        })
    }, pZfc: function (t, e, n) {
        "use strict";
        var i = n(1),
            o = n("YYEp"),
            a = n("YHhD"),
            r = n("K7Nt");
        t.exports = {
            getACSRFToken: function () {
                var t = a.get("skey") || a.get("p_skey"),
                    e = 5381;
                if (t) {
                    for (var n = 0, i = t.length; n < i; ++n) e += (e << 5) + t.charCodeAt(n);
                    return 2147483647 & e
                }
            }, isInIframe: function () {
                return top == window ? 0 : 1
            }, jsonpGetter: function (t) {
                if (window.$) {
                    var t = t || {};
                    if (t.url = t.url || "", t.data = i.extend({
                        mc_gtk: this.getACSRFToken() || "",
                        is_iniframe: this.isInIframe() || "0",
                        csrfCode: this.getACSRFToken() || "",
                        uin: this.getUin() || ""
                    }, t.data || {}), t.success = t.success || t.sucCb || function () {}, t.error = t.error || t.errCb || function () {}, t.url) return i.ajax({
                        url: t.url,
                        method: "GET",
                        dataType: "jsonp",
                        jsonp: t.callbackName ? t.callbackName : "jsonpCallback",
                        data: t.data,
                        cache: !1,
                        traditional: t.traditional || !1,
                        success: function (e) {
                            !e || 0 != e.code && 0 != e.retcode ? t.error(e) : t.success(e)
                        }, error: function (t) {}
                    })
                }
            }, getUin: function () {
                var t = a.get("uin");
                return t && (t = t.replace(/^o(0)*/gi, "")), t
            }, getUserInfo: function (t) {
                var e = this,
                    n = i.extend({
                        inTime: !1,
                        params: {},
                        succCb: i.noop,
                        errCb: i.noop
                    }, t),
                    r = a.get("uin") && (a.get("skey") || a.get("p_skey")),
                    s = JSON.stringify(n.params);
                return r ? (e.userInfoCache || (e.userInfoCache = {}), !n.inTime && e.userInfoCache[s] ? e.userInfoCache[s] : void this.jsonpGetter({
                    url: "https://" + o.DOMAIN_MAIN + "/services/ajax/get_user_info",
                    data: n.params || {}, callbackName: "callback",
                    traditional: !0,
                    success: function (t) {
                        e.userInfoCache[s] = t.data || {}, n.succCb.call(e, t.data)
                    }, error: function (t) {
                        n.errCb.call(e, t)
                    }
                })) : void n.errCb.call(e, null)
            }, logout: function (t) {
                var e = i.extend({
                        toLoginPage: !1,
                        onBeforeToLoginPage: i.noop
                    }, t),
                    n = "/",
                    r = o.COOKIE_DOMAIN;
                a.delCookie("skey", n, r), a.delCookie("uin", n, r), a.delCookie("intl", n, r), a.delCookie("nick", n, r), a.delCookie("ownerUin", n, r), a.delCookie("userinfo", n, r), a.delCookie("appid", n, r), a.delCookie("moduleId", n, r), a.delCookie("projectId", n, r), a.delCookie("regionId", n, r), e.toLoginPage && (e.onBeforeToLoginPage(), location.href = "https://" + o.DOMAIN_MAIN + "/login?s_url=" + encodeURIComponent(location.href))
            }, diplayCN_ENSiteOffline: function () {
                var t = this,
                    e = '\n\t\t\t<style>\n\t\t\t\t.tc-15-rich-dialog .line {\n\t\t\t\t\tmargin-bottom: 10px;\n\t\t\t\t\t-webkit-text-size-adjust: none;\n\t\t\t\t}\n\n\t\t\t\t.tc-15-rich-dialog .line a {\n\t\t\t\t\tcolor: #00a4ff;\n\t\t\t\t}\n\t\t\t</style>\n\t\t\t<p class="line">\u5c0a\u656c\u7684\u7528\u6237\uff0c<a href="https://www.xinyouw.org" data-region="intl">\u817e\u8baf\u4e91\u56fd\u9645\u7ad9-International</a> \u5df2\u5bf9\u5916\u63d0\u4f9b\u670d\u52a1\uff0c\u652f\u6301\u66f4\u4e30\u5bcc\u7684\u4ea7\u54c1\uff0c\u63d0\u4f9b\u66f4\u4e13\u4e1a\u7684\u82f1\u6587\u8bed\u8a00\u670d\u52a1\uff0c\u56e0\u6b64\u4e2d\u56fd\u7ad9\u4e0d\u518d\u63d0\u4f9b\u82f1\u6587\u8bed\u8a00\u670d\u52a1\uff0c\u60a8\u5df2\u7ecf\u8d2d\u4e70\u7684\u4e91\u4ea7\u54c1\u4e0d\u53d7\u5f71\u54cd\uff0c\u53ef\u4ee5\u5728\u4e2d\u56fd\u7ad9\u7ee7\u7eed\u4f7f\u7528\u3002</p>\n\t\t\t<p class="line">\u5982\u679c\u60a8\u5728\u4ea7\u54c1\u9009\u8d2d\u548c\u4f7f\u7528\u4e2d\u9047\u5230\u95ee\u9898\uff0c\u6b22\u8fce\u60a8 <a href="https://www.xinyouw.org">\u8054\u7cfb\u6211\u4eec</a>\uff0c\u6211\u4eec\u7aed\u8bda\u4e3a\u60a8\u63d0\u4f9b\u670d\u52a1\u3002</p>\n\t\t\t<br/>\n\t\t\t<p class="line">Dear customers, as <a href="https://www.xinyouw.org" data-region="intl">Tencent Cloud International</a> is open to global customers, providing more products and better language supports, we no longer provide English service in China Site. The cloud products and services you have purchased are not affected and can be used in China Site.</p>\n\t\t\t<p class="line">We are here to <a href="https://www.xinyouw.org">help</a> any questions and suggestions you may have when purchasing and using Tencent Cloud products and services.</p>\n\t\t';
                r.show({
                    title: "\u6e29\u99a8\u63d0\u793a (Service Notice)",
                    defaultWidth: 680,
                    body: e,
                    bodyAlign: "left",
                    buttons: [{
                        name: "\u786e\u5b9a (Confirm)"
                    }]
                }).off("click.switchregion").on("click.switchregion", '[data-region="intl"]', function (e) {
                    t.logout()
                })
            }
        }
    }, YYEp: function (t, e) {
        "use strict";
        var n = "cloud.tencent.com",
            i = "cloud.tencent.com",
            o = "intl.cloud.tencent.com",
            a = "buy.cloud.tencent.com",
            r = "console.cloud.tencent.com",
            s = ".cloud.tencent.com";
        location.hostname.indexOf("qcloud.com") != -1 && (n = "www.qcloud.com", i = "www.qcloud.com", a = "buy.qcloud.com", r = "console.qcloud.com", s = ".qcloud.com"), location.hostname == o && (n = o), t.exports = {
            DOMAIN_MAIN: n,
            DOMAIN_MAIN_CN: i,
            DOMAIN_MAIN_INTL: o,
            DOMAIN_BUY: a,
            DOMAIN_CONSOLE: r,
            COOKIE_DOMAIN: s
        }
    }, K7Nt: function (t, e, n) {
        "use strict";
        var i = n(1),
            o = function (t, e) {
                return ("" + t).replace(/\$\{([^\{\}]+)\}/g, function (t, n, i) {
                    return null == (i = (e || {})[n]) ? "" : i
                })
            },
            a = {
                $box: null,
                $mask: null,
                _tmpl: '<div class="tc-15-rich-dialog alert" role="alert"><div class="tc-15-rich-dialog-hd"><strong>${title}</strong><button class="tc-15-btn-close J-xout" href="javascript:;" title="\u5173\u95ed">\u5173\u95ed</button></div><div class="tc-15-rich-dialog-bd" style="text-align: ${bodyAlign}; overflow: auto">${body}</div><div class="tc-15-rich-dialog-ft J-footer" style="display:none;"><div class="tc-15-rich-dialog-ft-btn-wrap">${buttons}</div></div></div>',
                show: function (t) {
                    t || (t = {}), t.buttons || (t.buttons = []);
                    var e = i.map(t.buttons, function (t, e) {
                            return '<button class="tc-15-btn cmd" style="border: 0; border-radius: 0;">' + t.name + "</button>"
                        }).join(""),
                        n = o(this._tmpl, {
                            title: t.title || "\u63d0\u793a",
                            body: t.body || "",
                            bodyAlign: t.bodyAlign || "center",
                            buttons: e
                        }),
                        a = this._getBox().html(n);
                    return e && a.find(".J-footer").show(), t.defaultWidth && a.children().css("width", t.defaultWidth), a.children().css("max-width", this.getBoxMaxWidth()), this._showMask(), this._evented(t), a.show()
                }, getBoxMaxWidth: function () {
                    var t = 20;
                    return i(window).width() - 2 * t
                }, hide: function () {
                    this._hideMask(), this._getBox().empty().hide()
                }, _evented: function (t) {
                    var e = this,
                        n = i(window),
                        o = this._getBox(),
                        a = t.buttons;
                    t.noClose ? o.find(".J-xout").remove() : o.on("click", ".J-xout", function () {
                        e.hide()
                    }), o.find(".cmd").click(function () {
                        var t = i(this).index();
                        return "function" == typeof a[t].callback ? a[t].callback.call(i(this), o) : e.hide(), !1
                    }), n.off("resize.dialog").on("resize.dialog", function () {
                        o.css({
                            left: function () {
                                return (n.width() - o.width()) / 2
                            }, top: function () {
                                var t = (n.height() - o.height()) / 2;
                                return Math.max(0, Math.min(150, t))
                            }
                        })
                    }).trigger("resize.dialog")
                }, _showMask: function () {
                    this._getMask().show()
                }, _hideMask: function () {
                    this._getMask().hide()
                }, _getBox: function () {
                    return this.$box || (this.$box = i("<div>").css({
                        position: "fixed",
                        left: 0,
                        top: 0,
                        "z-index": 9001
                    }).appendTo("body")), this.$box
                }, _getMask: function () {
                    return this.$mask || (this.$mask = i("<div>").css({
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "#000",
                        opacity: ".6",
                        "z-index": 9e3
                    }).appendTo("body")), this.$mask
                }
            };
        t.exports = a
    }, vBeg: function (t, e, n) {
        "use strict";
        var i = n(1);
        t.exports = {
            bindCommonKeyEvents: function (t, e, n) {
                "undefined" == typeof n && (n = e, e = ""), n = i.extend({
                    onConfirm: i.noop,
                    onNext: i.noop,
                    onPrev: i.noop,
                    onPrevTab: i.noop,
                    onTab: i.noop,
                    onEsc: i.noop
                }, n), i(t).off("keydown.aria").on("keydown.aria", e, function (t) {
                    switch (t.keyCode) {
                    case 13:
                    case 32:
                        n.onConfirm.call(this, t);
                        break;
                    case 37:
                    case 38:
                        n.onPrev.call(this, t);
                        break;
                    case 39:
                    case 40:
                        n.onNext.call(this, t);
                        break;
                    case 9:
                        n.onTab.call(this, t);
                        break;
                    case 27:
                        n.onEsc.call(this, t)
                    }
                })
            }
        }
    }, Agcf: function (t, e, n) {
        "use strict";
        var i = n(1),
            o = n("YHhD"),
            a = n("YYEp"),
            r = n("zUp6"),
            s = 768;
        t.exports = i.extend({}, a, {
            doLogin: function () {
                var t = /^\/(login|register)/.test(location.pathname) ? "" : "?s_url=" + encodeURIComponent(location.href);
                location.href = "https://" + this.DOMAIN_MAIN + "/login" + t
            }, doLogout: function (t) {
                var e = i.extend({
                        toLoginPage: !1,
                        onBeforeToLoginPage: i.noop
                    }, t),
                    n = "/",
                    r = a.COOKIE_DOMAIN;
                o.delCookie("skey", n, r), o.delCookie("uin", n, r), o.delCookie("nick", n, r), o.delCookie("ownerUin", n, r), o.delCookie("userinfo", n, r), o.delCookie("appid", n, r), o.delCookie("moduleId", n, r), o.delCookie("projectId", n, r), o.delCookie("regionId", n, r), e.toLoginPage && (e.onBeforeToLoginPage(), location.href = "https://" + this.DOMAIN_MAIN + "/login?s_url=" + encodeURIComponent(location.href))
            }, doRegister: function () {
                var t = /^\/(login|register)/.test(location.pathname) ? "" : "?s_url=" + encodeURIComponent(location.href);
                location.href = "https://" + this.DOMAIN_MAIN + "/register" + t
            }, goToIntlHome: function () {
                location.href = "https://" + this.DOMAIN_MAIN_INTL
            }, isNarrowMode: function () {
                return r.getWindowWidth() <= s
            }, onReceive: function (t) {
                switch (t) {
                case "resize":
                    this.onResize();
                    break;
                case "scroll":
                    this.onScroll();
                    break;
                case "resizeNarrow":
                    this.onResizeNarrow();
                    break;
                case "resizeWide":
                    this.onResizeWide()
                }
            }, onScroll: function () {}, onResize: function () {}, onResizeNarrow: function () {}, onResizeWide: function () {}, onMaskClick: function () {}, showMask: function () {
                var t = "qcGlobalMask",
                    e = i("#" + t);
                e.length || (e = i('<div class="c-nav-mask"></div>').attr("id", t).css({
                    position: "fixed",
                    "z-index": 999
                }).appendTo(i("body")), e.on("click", i.proxy(this.onMaskClick, this))), e.is(":visible") || e.show()
            }, hideMask: function () {
                var t = "qcGlobalMask",
                    e = i("#" + t);
                e.is(":visible") && e.hide()
            }
        })
    }, zUp6: function (t, e) {
        "use strict";
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
        t.exports = {
            debounce: function (t, e, n) {
                var i, o, a, r, s, c = function c() {
                    var l = (new Date).getTime() - r;
                    l < e && l >= 0 ? i = setTimeout(c, e - l) : (i = null, n || (s = t.apply(a, o), i || (a = o = null)))
                };
                return function () {
                    a = this, o = arguments, r = (new Date).getTime();
                    var l = n && !i;
                    return i || (i = setTimeout(c, e)), l && (s = t.apply(a, o), a = o = null), s
                }
            }, tmpl: function () {
                var t = {},
                    e = function (t) {
                        return 0 == t ? t : (t = (t || "").toString(), t.replace(/&(?!\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;"))
                    },
                    i = function (t, e) {
                        if (e)
                            for (var n in e) {
                                var i = new RegExp("<%#\\s?" + n + "%>", "g");
                                t = t.replace(i, e[n])
                            }
                        return t
                    };
                return function o(a, r, s) {
                    var c = !/\W/.test(a);
                    !c && (a = i(a, s));
                    var l = c ? t[a] = t[a] || o(i(document.getElementById(a).innerHTML, s)) : new Function("obj", "_escape", "var _p='';with(obj){_p+='" + a.replace(/[\r\t\n]/g, " ").split("\\'").join("\\\\'").split("'").join("\\'").split("<%").join("\t").replace(/\t-(.*?)%>/g, "'+$1+'").replace(/\t=(.*?)%>/g, "'+_escape($1)+'").split("\t").join("';").split("%>").join("_p+='") + "';} return _p;"),
                        h = function (t) {
                            return "object" == ("undefined" == typeof t ? "undefined" : n(t)) && (t.QCCONSOLE_HOST = window.QCCONSOLE_HOST, t.QCMAIN_HOST = window.QCMAIN_HOST, t.QCBUY_HOST = window.QCBUY_HOST), l(t, e)
                        };
                    return r ? h(r) : h
                }
            }(),
            isIE: function () {
                return /MSIE/i.test(navigator.userAgent)
            }, getWindowWidth: function () {
                return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            }, shuffle: function (t) {
                if (!Array.isArray(t)) return t;
                for (var e = [].slice.apply(t), n = e.length - 1; n > 0; n--) {
                    var i = Math.floor(Math.random() * (n + 1)),
                        o = e[n];
                    e[n] = e[i], e[i] = o
                }
                return e
            }
        }
    }, IdoP: function (t, e, n) {
        "use strict";
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            o = n(1),
            a = n("lj6U"),
            r = n("2PxX"),
            s = r.pinyinUtil,
            c = 12,
            l = 20,
            h = 200,
            u = 200,
            d = {
                normal_width: 300,
                product_width_max: 950,
                product_width_min: 850,
                product_addon_width: 240
            },
            p = {
                init: function (t) {
                    return this.opts = t, this.mountComponent(), this.initVariables(), this.setupSubscriber(), this.start(), this
                }, mountComponent: function () {
                    o(this.opts.rawContent).appendTo("body")
                }, initVariables: function () {
                    if (this.$win = o(window), this.$leftNavSwitcher = o("#qcLeftNavSwitcher"), this.$leftNav = o("#qcLeftNav"), this.$leftNavCol = o(".J-qcLeftNavCol"), this.$fstLeftNav = o("#qcFstLeftNav"), this.$sndLeftNav = o("#qcSndLeftNav"), this.$trdLeftNav = o("#qcTrdLeftNav"), this.$subscriber = null, 0 === this.$leftNavSwitcher.length) throw new Error("Please make sure the left navigation its id named qcLeftNavSwitcher exists!");
                    this.winWidth = this.$win.width(), this.leftSwitcherHeight = this.$leftNavSwitcher.outerHeight(!0), this.leftNavColWidths = [0].concat(o.map(o(".J-qcLeftNavCol"), function (t) {
                        return o(t).width()
                    })), this.leftNavColPosLeft = this.leftNavColWidths.reduce(function (t, e, n) {
                        return 0 != n && (t[n] = t[n] + t[n - 1]), t
                    }, this.leftNavColWidths), this.activePath = []
                }, setupSubscriber: function () {
                    var t = this;
                    t.$subscriber = o({}), t.$subscriber.off().on("activePathChange", function () {
                        t.performLeftNavTransform()
                    })
                }, start: function () {
                    this.resetLeftNavHeight(), this.setupPCNavigation(), this.setupCurrNavPath(), this.setupProductSearchBar(), this.extractSearchSourceList(this.EXTRACT_SEARCH_SOURCE_TYPE.solution)
                }, onResize: function () {
                    this.resetLeftNavHeight()
                }, onScroll: function () {
                    this.resetLeftNavHeight()
                }, commitActivePath: a.debounce(function (t) {
                    this.activePath = t, this.$subscriber.trigger("activePathChange")
                }, 160),
                resetLeftNavHeight: function () {
                    var t = this.$leftNavSwitcher.get(0).getBoundingClientRect().top,
                        e = t + this.leftSwitcherHeight;
                    if (e > 0) {
                        this.$leftNav.css("top", e);
                        var n = this.$win.height() - e;
                        this.$leftNav.height(n), this.$leftNavCol.height(n)
                    }
                }, setupPCNavigation: function () {
                    var t = this;
                    t.$leftNav.show(), t.$fstLeftNav.css({
                        left: -h + "px"
                    }).hide(), t.$sndLeftNav.css({
                        left: "0px"
                    }).hide(), t.$trdLeftNav.css({
                        left: u + "px"
                    }).hide(), t.$leftNavCol.find("[data-root], .J-sndLevelMenu, .J-trdLevelMenu").show(), t.$leftNavSwitcher.off().on("mouseenter", function () {
                        t.commitActivePath([0]), a.checkImgLazyLoad(t.$trdLeftNav)
                    }).on("mouseleave", function () {
                        t.commitActivePath([])
                    }), t.$leftNav.off().on("mouseenter", function () {
                        t.commitActivePath([0])
                    }).on("mouseleave", function () {
                        t.commitActivePath([])
                    }).on("mouseenter", ".J-qcLeftNavCol", function () {
                        var e = o(this),
                            n = e.data("col");
                        if (n > 1) {
                            var i = t.activePath.slice(0, n - 1),
                                a = e.find("[data-parent]:visible").data("parent");
                            i.push(a), t.commitActivePath(i)
                        }
                    }).on("mouseenter", ".J-qcLeftNavCol .menu-link", function () {
                        var e = o(this),
                            n = e.closest(".J-qcLeftNavCol").data("col"),
                            i = e.data("id"),
                            a = e.data("action"),
                            r = t.activePath.slice(0, n),
                            s = e.data("layout");
                        3 != n && ("expand" == a && r.push(i), s && t.$trdLeftNav.addClass("product-menu"), setTimeout(function () {
                            t.commitActivePath(r)
                        }, 0))
                    }), a.simulateScrollY({
                        $ctx: t.$leftNav,
                        targetSelector: ".J-qcLeftNavCol, .J-qcLeftPdMenuWrapper",
                        forceSimulate: !0
                    })
                }, performLeftNavTransform: function () {
                    this.resetLeftNavHeight();
                    var t = this,
                        e = +t.$fstLeftNav.is(":visible"),
                        n = +t.$sndLeftNav.is(":visible"),
                        i = +t.$trdLeftNav.is(":visible"),
                        o = e + n + i,
                        a = t.activePath,
                        r = a.length,
                        s = 160,
                        c = [];
                    if (3 == r) {
                        t.$trdLeftNav.find("[data-parent]:visible").data("parent");
                        t.$trdLeftNav.find("[data-parent],[data-root]").hide();
                        var l = t.$trdLeftNav.find('[data-parent="' + a[2] + '"]');
                        t.adaptTrdColProductWidth(l), l.show().closest("[data-root]").show(), t.$trdLeftNav.scrollTop(0), t.$trdLeftNav.find(".J-qcLeftPdMenuWrapper").scrollTop(0).scrollLeft(0)
                    }
                    if (r >= 2) {
                        t.$sndLeftNav.find("[data-parent]:visible").data("parent");
                        t.$sndLeftNav.find("[data-parent]").hide(), t.$sndLeftNav.find('[data-parent="' + a[1] + '"]').show()
                    }
                    if (2 == r && t.$sndLeftNav.scrollTop(0), t.$fstLeftNav.find("[data-id]").removeClass("actived").find("a").attr("aria-expanded", !1), t.$sndLeftNav.find("[data-id]").removeClass("actived").find("a").attr("aria-expanded", !1), t.$leftNavSwitcher.toggleClass("actived", a.length > 0), t.$leftNavSwitcher.attr("aria-expanded", a.length > 0), a[1] && t.$fstLeftNav.find('[data-id="' + a[1] + '"]').addClass("actived").find("a").attr("aria-expanded", !0), a[2] && t.$sndLeftNav.find('[data-id="' + a[2] + '"]').addClass("actived").find("a").attr("aria-expanded", !0), r > o) {
                        var d = Array.apply(null, Array(o)).map(function () {
                                return 0
                            }),
                            p = Array.apply(null, Array(Math.abs(r - o))).map(function () {
                                return s
                            });
                        c = d.concat(p), t.$fstLeftNav.show().stop().animate({
                            left: "0px"
                        }, c[0], function () {
                            t.$leftNav.width(h), r > 1 && t.$sndLeftNav.show().stop().animate({
                                left: h + "px"
                            }, c[1], function () {
                                t.$leftNav.width(h + u), r > 2 && t.$trdLeftNav.show().stop().animate({
                                    left: h + u + "px"
                                }, c[2], function () {
                                    t.$leftNav.width(h + u + t.$trdLeftNav.width()), t.adaptTrdColProductHeight()
                                })
                            })
                        })
                    }
                    if (r < o) {
                        var f = o >= 3 && 3 > r;
                        f && t.$leftNav.width(h + u), t.$trdLeftNav.stop().animate({
                            left: h + u - t.$trdLeftNav.width() + "px"
                        }, f ? s : 0, function () {
                            t.$trdLeftNav.removeClass("product-menu"), t.$trdLeftNav.hide(), f = o >= 2 && 2 > r, f && t.$leftNav.width(h), r < 2 && t.$sndLeftNav.stop().animate({
                                left: "0px"
                            }, f ? s : 0, function () {
                                t.$sndLeftNav.hide(), f = o >= 1 && 1 > r, f && t.$leftNav.width(0), r < 1 && t.$fstLeftNav.stop().animate({
                                    left: -h + "px"
                                }, f ? s : 0, function () {
                                    t.$fstLeftNav.hide()
                                })
                            })
                        })
                    }
                }, adaptTrdColProductHeight: function () {
                    var t = this.$leftNavCol.height(),
                        e = this.$trdLeftNav.find(".J-qcPdDropDownMenu"),
                        n = e.closest(".c-scrollbar").eq(0),
                        i = n.width(),
                        o = e.outerWidth(!0),
                        a = i >= o ? 0 : c,
                        r = t - a;
                    this.$trdLeftNav.find(".J-qcPdMenuMain, .J-qcPdMenuRt").css({
                        minHeight: r
                    })
                }, adaptTrdColProductWidth: function (t) {
                    var e = t.find(".J-qcPdDropDownMenu");
                    if (e.length) {
                        var n = this.$win.width() - h - u - l;
                        n > d.product_width_max ? (e.outerWidth(d.product_width_max), t.width("auto")) : n < d.product_width_min ? (e.outerWidth(d.product_width_min), t.width(n)) : (e.outerWidth(n), t.width("auto")), e.find(".J-qcPdMenuMain").width("auto")
                    }
                }, setupCurrNavPath: function () {
                    var t = location.href,
                        e = t.split("?", 1)[0];
                    e = "/" === e.charAt(e.length - 1) ? e.substring(0, e.length - 1) : e;
                    var n = ["https://www.xinyouw.org", "https://www.xinyouw.org/qun", "https://www.xinyouw.org/bbs", "https://www.xinyouw.org"],
                        i = "^";
                    n.indexOf(e) > -1 && (i = ""), /^(\/product\/[\w-]+)(?:\/[\w-]+)?$/.test(location.pathname) && (e = "https://www.xinyouw.org" + RegExp.$1);
                    var a = o("#qcTrdLeftNav").find("[href" + i + '="' + e + '"]').not("[href*=match_ignore]").not(function () {
                            return o(this).closest(".J-qcPdMenuRt").length > 0
                        }),
                        r = a.filter(function () {
                            return "product-hot" === o(this).closest(".J-qcLeftPdMenuWrapper").data("parent")
                        });
                    r.length && (a = a.not(function () {
                        return "product-hot" === o(this).closest(".J-qcLeftPdMenuWrapper").data("parent")
                    }), r.eq(0).addClass("curr"));
                    for (var s = 0, c = a.length; s < c; s++) {
                        var l = a.eq(s),
                            h = l.attr("href");
                        if (h && h.split("?", 1)[0] === e) break
                    }
                    var u = a.eq(s),
                        d = void 0;
                    d = u.hasClass("J-qcPdMenuProduct") || u.hasClass("J-qcPdMenuChildProduct") ? u : u.closest(".menu-item,.menu-area-tit");
                    var p = d.closest(".nav-dropdown-menu-inner,.c-p-dropdown-menu-wrap").data("parent"),
                        f = void 0;
                    f = d.length > 0 ? o("#qcSndLeftNav").find('.menu-area .menu-link[data-id="' + p + '"]') : o("#qcSndLeftNav").find(".menu-item [href" + i + '="' + e + '"],.menu-area-tit [href' + i + '="' + e + '"]').not("[href*=match_ignore]").eq(0).parent(".menu-item,.menu-area-tit");
                    var v = f.closest(".nav-dropdown-menu-inner").data("parent"),
                        m = o("#qcFstLeftNav").find('.menu-area .menu-link[data-id="' + v + '"]');
                    if ([m, f, d].forEach(function (t) {
                        t.length > 0 && t.addClass("curr")
                    }), d.length > 0)
                        if (d.hasClass("hasitem")) {
                            var g = d.find('[href="' + t + '"]').parent();
                            g.is("li") && !g.hasClass("menu-item") && g.addClass("curr")
                        } else d.hasClass("J-qcPdMenuChildProduct") && d.closest(".p-menu-p-card").find(">.J-qcPdMenuProduct").addClass("curr")
                }, setupProductSearchBar: function () {
                    var t = this.extractSearchSourceList(this.EXTRACT_SEARCH_SOURCE_TYPE.product),
                        e = this.$leftNav.find(".J-qcPdMenuSearchBar");
                    e.each(function () {
                        new r({
                            el: this,
                            sourceList: t
                        })
                    })
                }, EXTRACT_SEARCH_SOURCE_CONFIG: {
                    product: {
                        WINDOW_STORAGE_KEY: "__PRODUCT_SEARCH_SOURCE_LIST",
                        extractRawList: function () {
                            var t = [],
                                e = o("#qcLeftNav .J-qcPdMenuBox");
                            return e.each(function () {
                                var e = o(this),
                                    n = o.trim(e.find(".J-qcPdMenuCategory").text()),
                                    i = e.find(".J-qcPdMenuProduct,.J-qcPdMenuChildProduct");
                                i.each(function () {
                                    var e = o(this),
                                        i = e.html().trim(),
                                        a = e.data("desc"),
                                        r = e.attr("href"),
                                        s = e.data("search-keywords");
                                    t.push({
                                        title: i,
                                        desc: a,
                                        keywords: s,
                                        url: r,
                                        parent: n
                                    })
                                })
                            }), t
                        }
                    },
                    solution: {
                        WINDOW_STORAGE_KEY: "__SOLUTION_SEARCH_SOURCE_LIST",
                        extractRawList: function () {
                            var t = [],
                                e = o("#qcSndLeftNav.J-qcLeftNavCol").find('[data-parent="solution"] .menu-area .menu-link'),
                                n = {};
                            e.each(function () {
                                n[o(this).data("id")] = o(this).text().trim()
                            });
                            var i = o("#qcLeftNav #qcTrdLeftNav").find('[data-root="solution"] .nav-dropdown-menu-inner');
                            return i.each(function () {
                                var e = o(this).find(".menu-item"),
                                    i = n[o(this).attr("data-parent").trim()];
                                e.each(function () {
                                    var e = o(this).find("a"),
                                        n = e.find("h3").html().trim(),
                                        a = e.children("span").text().trim(),
                                        r = e.attr("href"),
                                        s = o(this).data("search-keywords");
                                    if (t.push({
                                        title: n,
                                        keywords: s,
                                        desc: a,
                                        url: r,
                                        parent: i
                                    }), o(this).hasClass("hasitem")) {
                                        var c = o(this).find(".menu-item-child ul li a");
                                        c.each(function () {
                                            var e = o(this),
                                                n = e.text().trim(),
                                                r = e.attr("href"),
                                                s = e.data("desc"),
                                                c = e.data("search-keywords");
                                            t.push({
                                                title: n + "\u89e3\u51b3\u65b9\u6848",
                                                keywords: c,
                                                desc: s || a,
                                                url: r,
                                                parent: i
                                            })
                                        })
                                    }
                                })
                            }), t
                        }
                    }
                }, EXTRACT_SEARCH_SOURCE_TYPE: {
                    product: "product",
                    solution: "solution"
                }, extractSearchSourceList: function (t) {
                    function e(t) {
                        var e = /\/([^\/]+?)($|\?)/,
                            n = e.exec(t);
                        return n && n.length > 1 ? n[1] : ""
                    }

                    function n(t) {
                        var n = t.title,
                            i = t.desc,
                            o = t.keywords,
                            a = t.url,
                            c = t.parent;
                        if (n && i && a) {
                            var l = /<span.*\/span>/g;
                            n = n.replace(l, "");
                            var h = n.replace(/\s/g, "").toLowerCase(),
                                u = c ? c.replace(/\s/g, "").toLowerCase() : "";
                            if (r.indexOf(n) < 0 && r.indexOf(a) < 0) return r.push(n), r.push(a), {
                                title: n,
                                desc: i,
                                url: a,
                                slug: e(a),
                                pinyin: s.getPinyin(h),
                                pinyinFirstLetter: s.getFirstLetter(h).join(""),
                                parent: c,
                                parentPinyin: s.getPinyin(u),
                                keywords: o
                            }
                        }
                    }
                    var o = this.EXTRACT_SEARCH_SOURCE_CONFIG[t],
                        a = window[o.WINDOW_STORAGE_KEY];
                    if (a && "object" == ("undefined" == typeof a ? "undefined" : i(a))) return a;
                    var r = [],
                        c = o.extractRawList(),
                        l = c.map(n).filter(Boolean);
                    return window[o.WINDOW_STORAGE_KEY] = l, l
                }
            };
        t.exports = p
    }, "2PxX": function (t, e, n) {
        "use strict";

        function i(t) {
            this.opts = t || {}, this.handleItemClick = t.handleItemClick, this.$el = this.$productSearchBar = o(t.el), this.$searchInput = this.$(t.input || ".J-qcTopNavSearchInput"), this.$searchList = this.$(t.list || ".J-qcTopNavAllSearchList"), this.searchItemSelector = t.item || ".J-qcTopNavSearchItem", this.handleNoTipsEnterPressed = t.handleNoTipsEnterPressed, this.sourceList = t.sourceList || [], this.$searchInput.val(""), this.tipsList = [], t.renderList && (this.renderTipsList = t.renderList), this.renderTipsList(this.tipsList), this.bindEvents(), this.doRecommend = a.debounce(this.doRecommend, 150)
        }
        var o = n(1),
            a = n("lj6U"),
            r = n("Mjm+"),
            s = 160;
        i.prototype = {
            constructor: i,
            getKeywords: function () {
                return o.trim(this.$searchInput.val()).toLowerCase().replace(/(\'|\s)/g, "")
            }, bindEvents: function () {
                var t = this;
                t.$searchList.on("mouseenter", this.searchItemSelector, function () {
                    if (t.preventMouseEnter) return void(t.preventMouseEnter = !1);
                    var e = o(this).parent().children(t.searchItemSelector).index(o(this));
                    t.setActivedTips(e)
                }).on("mousewheel DOMMouseScroll", function (t) {
                    var e = t.originalEvent,
                        n = e.wheelDelta || -e.detail;
                    this.scrollTop += 25 * (n < 0 ? 1 : -1), t.preventDefault()
                }).on("mousedown", this.searchItemSelector + " a", function (t) {
                    location.href = o(this).attr("href"), t.preventDefault()
                }), t.$searchInput.on("search", function () {
                    var e = t.getKeywords();
                    return e && t.goToSearchPage(), !1
                }).on("blur", function (e) {
                    t.slideUpTipsList()
                }).on("input", function (e) {
                    t.doRecommend()
                }).on("keydown", function (e) {
                    var n = e.which;
                    switch (n) {
                    case 38:
                    case 40:
                        return t.getKeywords() ? t.moveInTipsList(38 === n ? -1 : 1) : t.blurInput(), !1
                    }
                }).on("keyup", function (e) {
                    var n = e.which,
                        i = t.getKeywords();
                    switch (n) {
                    case 27:
                        t.slideUpTipsList();
                        break;
                    case 13:
                        i && t.goToSearchPage();
                        break;
                    case 37:
                    case 39:
                        break;
                    case 38:
                    case 40:
                    }
                })
            }, moveInTipsList: function (t) {
                var e = this.activedTips + t;
                if (0 <= e && e < this.tipsList.length) {
                    for (var n = this.$searchList.children(this.searchItemSelector), i = n.eq(e), o = 0, a = 0; a < n.length; a++) {
                        var r = n.eq(a);
                        if (r.is(i)) break;
                        o += r.outerHeight(!0)
                    }
                    var s = o + i.outerHeight(!0),
                        c = this.$searchList.scrollTop(),
                        l = c + this.$searchList.height(),
                        h = c;
                    this.preventMouseEnter = !1, s > l ? (this.preventMouseEnter = !0, this.$searchList.scrollTop(c + s - l)) : o < h && (this.preventMouseEnter = !0, this.$searchList.scrollTop(c - (h - o))), this.setActivedTips(e)
                }
            }, setActivedTips: function (t) {
                if (!this.tipsList.length) return void(this.activedTips = -1);
                var e = this.$searchList.children(this.searchItemSelector);
                if (t < e.length && t > -1) {
                    e.each(function () {
                        o(this).removeClass("actived")
                    });
                    var n = e.eq(t);
                    n.addClass("actived"), this.activedTips = t
                }
            }, goToSearchPage: function () {
                if (this.tipsList && this.activedTips > -1 && this.activedTips < this.tipsList.length) {
                    var t = this.tipsList[this.activedTips];
                    "function" == typeof this.handleItemClick ? this.handleItemClick(t, this.activedTips, this.sourceList) : location.href = t.url
                } else "function" == typeof this.handleNoTipsEnterPressed && this.handleNoTipsEnterPressed()
            }, doRecommend: function () {
                var t = this,
                    e = t.sourceList,
                    n = t.getKeywords(),
                    i = {},
                    a = {},
                    r = {},
                    s = {},
                    c = {},
                    l = {},
                    h = {},
                    u = {};
                if (!n || !e.length) return void this.renderTipsList([]);
                e.forEach(function (e) {
                    e.title && e.title.replace(/\s/g, "").toLowerCase().indexOf(n) > -1 && (i[e.url] = e), t.matchPinyin(n, e.pinyin) && (a[e.url] = e), e.slug && e.slug.toLowerCase().indexOf(n) > -1 && (l[e.url] = e), e.desc && e.desc.replace(/\s/g, "").toLowerCase().indexOf(n) > -1 && (c[e.url] = e), e.parent && e.parent.replace(/\s/g, "").toLowerCase().indexOf(n) > -1 && (r[e.url] = e), t.matchPinyin(n, e.parentPinyin) && (s[e.url] = e), e.pinyinFirstLetter && e.pinyinFirstLetter.indexOf(n) > -1 && (h[e.url] = e), e.keywords && e.keywords.replace(/\s/g, "").toLowerCase().indexOf(n) > -1 && (u[e.url] = e)
                });
                var d = o.extend({}, i, a, l, c, r, s, h, u),
                    p = t.values(d);
                t.renderTipsList(p)
            }, matchPinyin: function (t, e) {
                if (!t || !e || !o.isArray(e) || e.length < 1) return !1;
                var n = e.join("").replace(/\s/g, "").toLowerCase();
                if (0 === n.indexOf(t)) return !0;
                if (n.indexOf(t) > 0)
                    for (var i = 0, a = e.length; i < a; i++)
                        if (0 === e.slice(i).join("").replace(/\s/g, "").toLowerCase().indexOf(t)) return !0;
                return !1
            }, values: function (t) {
                var e = [];
                for (var n in t) t.hasOwnProperty(n) && e.push(n);
                for (var i = -1, o = e.length, a = []; ++i < o;) a[i] = t[e[i]];
                return a
            }, renderTipsList: function (t) {
                var e = this;
                if (t = t || [], this.tipsList = t, t.length) {
                    var n = '\t\t\t<li class="p-all-search-item J-qcTopNavSearchItem">\t\t\t\t<a href="<%= url %>">\t\t\t\t\t<div class="p-all-search-item-inner">\t\t\t\t\t\t<h3 class="p-all-search-tit"><%= title %></h3>\t\t\t\t\t\t\t<div class="p-all-search-con">\t\t\t\t\t\t\t\t<%= desc %>\t\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</a>\t\t\t</li>',
                        i = t.map(function (t) {
                            return a.tmpl(n, t)
                        }).join("");
                    e.$searchList.html(i), e.slideDownTipsList(), e.setActivedTips(0), e.$searchList.scrollTop(0)
                } else {
                    if (this.getKeywords()) {
                        var i = '\t\t\t\t\t<li class="p-all-search-item disabled">\t\t\t\t\t\t<div class="p-all-search-item-inner">\t\t\t\t\t\t\t<h3 class="p-all-search-tit">\u6ca1\u6709\u627e\u5230\u7ed3\u679c\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165</h3>\t\t\t\t\t\t</div>\t\t\t\t\t</li>';
                        this.$searchList.html(i), e.slideDownTipsList()
                    } else e.slideUpTipsList();
                    this.setActivedTips(-1)
                }
            }, slideUpTipsList: function () {
                this.$searchList.slideUp(s)
            }, slideDownTipsList: function () {
                this.$searchList.slideDown(s)
            }, resetState: function () {
                this.$searchInput.val("").blur(), this.renderTipsList([])
            }, closeTipsList: function () {
                this.slideUpTipsList()
            }, onSheetSlideDown: function () {
                this.performWidthTransform()
            }, afterSheetSlideDown: function () {
                this.focusInput()
            }, focusInput: function () {
                this.$searchInput.focus()
            }, blurInput: function () {
                this.$searchInput.blur()
            }, performWidthTransform: function () {
                for (var t = this.$productSearchBar.width(), e = this.$(".J-qcTopNavSearchArea").width(), n = this.$(".J-qcTopNavHotWords").children(), i = 38, o = t - e - i, a = 75, r = Math.floor(o / a), s = 5, c = 0; c < s; c++) {
                    var l = n.eq(c);
                    c < r ? l.show() : l.hide()
                }
            }, $: function (t) {
                return this.$productSearchBar.find(t)
            }, close: function () {
                this.closeTipsList.apply(this, arguments)
            }
        }, window.ProductSearchBar = e = t.exports = i, e.pinyinUtil = r
    }, "Mjm+": function (t, e) {
        "use strict";

        function n() {
            c.notone = {};
            for (var t in s)
                for (var e = s[t], n = 0, i = e.length; n < i; n++) c.notone[e[n]] || (c.notone[e[n]] = []), c.notone[e[n]].push(t)
        }

        function i(t) {
            if (!t || /^ +$/g.test(t)) return "";
            for (var e = [
                []
            ], n = 0, i = t.length; n < i; n++) {
                var o = t.charAt(n),
                    a = c.notone[o] || [];
                if (a.length > 0) {
                    var r = [];
                    e.forEach(function (t) {
                        a.forEach(function (e) {
                            var n = t.slice();
                            n.push(e), r.push(n)
                        })
                    }), e = r
                } else e.forEach(function (t) {
                    t.push(o)
                })
            }
            var s = [];
            return e.forEach(function (t) {
                t.forEach(function (t) {
                    s.push(t)
                })
            }), s
        }

        function o(t) {
            if (!t || /^ +$/g.test(t)) return "";
            var e = [];
            e.push("");
            for (var n = 0, i = t.length; n < i; n++) {
                var o = t.charAt(n),
                    r = c.notone[o] || [];
                if (r.length > 0) {
                    var s = [];
                    e.forEach(function (t) {
                        r.forEach(function (e) {
                            r.length > 0 && s.push(t + e[0])
                        })
                    }), e = s
                } else e = e.map(function (t) {
                    return t + o
                })
            }
            return 0 === e.indexOf("") && e.shift(), a(e)
        }

        function a(t) {
            for (var e = [], n = {}, i = 0; i < t.length; i++) {
                var o = r(t[i]) + t[i];
                n[o] || (e.push(t[i]), n[o] = !0)
            }
            return e
        }
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            s = {
                a: "\u963f\u554a\u5475\u814c\u55c4\u5416\u9515",
                e: "\u989d\u963f\u4fc4\u6076\u9e45\u904f\u9102\u5384\u997f\u5ce8\u627c\u5a25\u9cc4\u54e6\u86fe\u5669\u6115\u8bb9\u9537\u57a9\u5a40\u9e57\u843c\u8c14\u83aa\u816d\u9507\u989a\u5443\u960f\u5c59\u82ca\u8f6d",
                ai: "\u7231\u57c3\u827e\u788d\u764c\u54c0\u6328\u77ee\u9698\u853c\u5509\u7691\u54ce\u972d\u6371\u66a7\u5ad2\u55f3\u7477\u55cc\u953f\u7839",
                ei: "\u8bf6",
                xi: "\u7cfb\u897f\u5e2d\u606f\u5e0c\u4e60\u5438\u559c\u7ec6\u6790\u620f\u6d17\u6089\u9521\u6eaa\u60dc\u7a00\u88ad\u5915\u6d12\u6670\u6614\u727a\u814a\u70ef\u7199\u5ab3\u6816\u819d\u9699\u7280\u8e4a\u7852\u516e\u7184\u66e6\u79a7\u5b09\u73ba\u595a\u6c50\u5f99\u7fb2\u94e3\u6dc5\u563b\u6b59\u71b9\u77fd\u87cb\u90d7\u550f\u7699\u96b0\u6a28\u6d60\u5ffe\u8725\u6a84\u90c4\u7fd5\u960b\u9cc3\u823e\u5c63\u8478\u8785\u54ad\u7c9e\u89cb\u6b37\u50d6\u91af\u9f37\u88fc\u7a78\u9969\u8204\u798a\u8bf6\u83e5\u84f0",
                yi: "\u4e00\u4ee5\u5df2\u610f\u8bae\u4e49\u76ca\u4ebf\u6613\u533b\u827a\u98df\u4f9d\u79fb\u8863\u5f02\u4f0a\u4eea\u5b9c\u5c04\u9057\u7591\u6bc5\u8c0a\u4ea6\u75ab\u5f79\u5fc6\u6291\u5c3e\u4e59\u8bd1\u7ffc\u86c7\u6ea2\u6905\u6c82\u6cc4\u9038\u8681\u5937\u9091\u6021\u7ece\u5f5d\u88d4\u59e8\u71a0\u8d3b\u77e3\u5c79\u9890\u501a\u8be3\u80f0\u5955\u7fcc\u7599\u5f08\u8f76\u86fe\u9a7f\u58f9\u7317\u81c6\u5f0b\u94f1\u65d6\u6f2a\u8fe4\u4f5a\u7fca\u8bd2\u603f\u75cd\u61ff\u9974\u5cc4\u63d6\u7719\u9552\u4ee1\u9edf\u8084\u54bf\u7ff3\u6339\u7f22\u5453\u5208\u54a6\u5db7\u7fbf\u9487\u6baa\u8351\u858f\u8734\u9571\u566b\u7654\u82e1\u6092\u55cc\u7617\u8864\u4f7e\u57f8\u572f\u8223\u914f\u5293",
                an: "\u5b89\u6848\u6309\u5cb8\u6697\u978d\u6c28\u4ffa\u80fa\u94f5\u8c19\u5eb5\u9eef\u9e4c\u6849\u57ef\u72b4\u63de\u5382\u5e7f",
                han: "\u5382\u6c49\u97e9\u542b\u65f1\u5bd2\u6c57\u6db5\u51fd\u558a\u61be\u7f55\u710a\u7ff0\u90af\u64bc\u701a\u61a8\u634d\u9163\u608d\u9f3e\u9097\u9894\u86b6\u6657\u83e1\u65f0\u9878\u72b4\u7113\u6496",
                ang: "\u6602\u4ef0\u76ce\u80ae",
                ao: "\u5965\u6fb3\u50b2\u71ac\u51f9\u9ccc\u6556\u9068\u93d6\u8884\u5773\u7ff1\u55f7\u62d7\u61ca\u5c99\u87af\u9a9c\u7352\u93ca\u8279\u5aaa\u5ed2\u8071",
                wa: "\u74e6\u6316\u5a03\u6d3c\u889c\u86d9\u51f9\u54c7\u4f64\u5a32\u5459\u817d",
                yu: "\u4e8e\u4e0e\u80b2\u4f59\u9884\u57df\u4e88\u9047\u5965\u8bed\u8a89\u7389\u9c7c\u96e8\u6e14\u88d5\u6108\u5a31\u6b32\u5401\u8206\u5b87\u7fbd\u903e\u8c6b\u90c1\u5bd3\u543e\u72f1\u55bb\u5fa1\u6d74\u6109\u79b9\u4fde\u90aa\u6986\u611a\u6e1d\u5c09\u6de4\u865e\u5c7f\u5cea\u7ca5\u9a6d\u745c\u79ba\u6bd3\u94b0\u9685\u828b\u71a8\u7600\u8fc2\u715c\u6631\u6c69\u65bc\u81fe\u76c2\u807f\u7afd\u8438\u59aa\u8174\u5704\u8c15\u89ce\u63c4\u9f89\u8c00\u4fe3\u9980\u5ebe\u59a4\u7610\u9b3b\u6b24\u9e6c\u9608\u5d5b\u96e9\u9e46\u5709\u872e\u4f1b\u7ea1\u7aac\u7ab3\u996b\u84e3\u72f3\u8080\u8201\u8753\u71e0",
                niu: "\u725b\u7ebd\u626d\u94ae\u62d7\u599e\u5ff8\u72c3",
                o: "\u54e6\u5662\u5594",
                ba: "\u628a\u516b\u5df4\u62d4\u4f2f\u5427\u575d\u7238\u9738\u7f62\u82ad\u8dcb\u6252\u53ed\u9776\u75a4\u7b06\u8019\u9c85\u7c91\u5c9c\u705e\u94af\u634c\u83dd\u9b43\u8307",
                pa: "\u6015\u5e15\u722c\u6252\u8db4\u7436\u556a\u8469\u8019\u6777\u94af\u7b62",
                pi: "\u88ab\u6279\u526f\u5426\u76ae\u574f\u8f9f\u5564\u5339\u62ab\u75b2\u7f62\u50fb\u6bd7\u576f\u813e\u8b6c\u5288\u5ab2\u5c41\u7435\u90b3\u88e8\u75de\u7656\u9642\u4e15\u6787\u567c\u9739\u5421\u7eb0\u7812\u94cd\u6de0\u90eb\u57e4\u6fde\u7765\u8298\u868d\u572e\u9f19\u7f74\u8731\u758b\u8c94\u4ef3\u5e80\u64d7\u7513\u9674",
                bi: "\u6bd4\u5fc5\u5e01\u7b14\u6bd5\u79d8\u907f\u95ed\u4f5b\u8f9f\u58c1\u5f0a\u5f7c\u903c\u78a7\u9f3b\u81c2\u853d\u62c2\u6ccc\u74a7\u5e87\u75f9\u6bd9\u5f3c\u5315\u9119\u965b\u88e8\u8d32\u655d\u84d6\u5421\u7be6\u7eb0\u4ffe\u94cb\u6bd6\u7b5a\u8378\u859c\u5a62\u54d4\u8df8\u6fde\u79d5\u835c\u610e\u7765\u59a3\u8298\u7b85\u9ac0\u7540\u6ed7\u72f4\u8406\u5b16\u895e\u822d",
                bai: "\u767e\u767d\u8d25\u6446\u4f2f\u62dc\u67cf\u4f70\u63b0\u5457\u64d8\u636d\u7a17",
                bo: "\u6ce2\u535a\u64ad\u52c3\u62e8\u8584\u4f5b\u4f2f\u73bb\u640f\u67cf\u6cca\u8236\u5265\u6e24\u535c\u9a73\u7c3f\u8116\u818a\u7c38\u83e0\u7934\u7b94\u94c2\u4eb3\u94b5\u5e1b\u64d8\u997d\u8ddb\u94b9\u8db5\u6a97\u5575\u9e41\u64d7\u8e23",
                bei: "\u5317\u88ab\u5907\u500d\u80cc\u676f\u52c3\u8d1d\u8f88\u60b2\u7891\u81c2\u5351\u6096\u60eb\u84d3\u9642\u94a1\u72c8\u5457\u7119\u789a\u8919\u5eb3\u97b4\u5b5b\u9e4e\u90b6\u943e",
                ban: "\u529e\u7248\u534a\u73ed\u822c\u677f\u9881\u4f34\u642c\u6591\u626e\u62cc\u6273\u74e3\u5742\u962a\u7eca\u94a3\u7622\u8228\u764d",
                pan: "\u5224\u76d8\u756a\u6f58\u6500\u76fc\u62da\u7554\u80d6\u53db\u62cc\u8e52\u78d0\u723f\u87e0\u6cee\u88a2\u897b\u4e2c",
                bin: "\u4efd\u5bbe\u9891\u6ee8\u658c\u5f6c\u6fd2\u6ba1\u7f24\u9b13\u69df\u6448\u8191\u73a2\u9554\u8c73\u9acc\u50a7",
                bang: "\u5e2e\u90a6\u5f6d\u65c1\u699c\u68d2\u8180\u9551\u7ed1\u508d\u78c5\u868c\u8c24\u6886\u6d5c\u84a1",
                pang: "\u65c1\u5e9e\u4e53\u78c5\u8783\u5f77\u6ec2\u9004\u802a",
                beng: "\u6cf5\u5d29\u868c\u8e66\u8ff8\u7ef7\u752d\u5623\u750f\u580b",
                bao: "\u62a5\u4fdd\u5305\u5b9d\u66b4\u80de\u8584\u7206\u70ae\u9971\u62b1\u5821\u5265\u9c8d\u66dd\u8446\u7011\u8c79\u5228\u8912\u96f9\u5b62\u82de\u7172\u8913\u8db5\u9e28\u9f85\u52f9",
                bu: "\u4e0d\u90e8\u6b65\u5e03\u8865\u6355\u5821\u57d4\u535c\u57e0\u7c3f\u54fa\u6016\u949a\u535f\u74ff\u900b\u6661\u91ad\u94b8",
                pu: "\u666e\u66b4\u94fa\u6d66\u6734\u5821\u8461\u8c31\u57d4\u6251\u4ec6\u84b2\u66dd\u7011\u6ea5\u8386\u5703\u749e\u6fee\u83e9\u8e7c\u530d\u5657\u6c06\u6535\u9568\u6534\u9564",
                mian: "\u9762\u68c9\u514d\u7ef5\u7f05\u52c9\u7720\u5195\u5a29\u817c\u6e11\u6e4e\u6c94\u9efe\u5b80\u7704",
                po: "\u7834\u7e41\u5761\u8feb\u9887\u6734\u6cca\u5a46\u6cfc\u9b44\u7c95\u9131\u73c0\u9642\u53f5\u7b38\u6cfa\u76a4\u948b\u94b7",
                fan: "\u53cd\u8303\u72af\u7e41\u996d\u6cdb\u7ffb\u51e1\u8fd4\u756a\u8d29\u70e6\u62da\u5e06\u6a0a\u85e9\u77fe\u68b5\u8543\u9492\u5e61\u7548\u8629\u8e6f\u71d4",
                fu: "\u5e9c\u670d\u526f\u8d1f\u5bcc\u590d\u798f\u592b\u5987\u5e45\u4ed8\u6276\u7236\u7b26\u9644\u8150\u8d74\u4f5b\u6d6e\u8986\u8f85\u5085\u4f0f\u629a\u8d4b\u8f90\u8179\u5f17\u80a4\u961c\u88b1\u7f1a\u752b\u6c1f\u65a7\u5b5a\u6577\u4fef\u62c2\u4fd8\u5490\u8151\u5b75\u8299\u6daa\u91dc\u812f\u832f\u99a5\u5b93\u7ec2\u8ba3\u544b\u7f58\u9eb8\u8760\u5310\u82be\u8709\u8dd7\u51eb\u6ecf\u876e\u9a78\u7ecb\u86a8\u7829\u6874\u8d59\u83d4\u5452\u8dba\u82fb\u62ca\u961d\u9c8b\u602b\u7a03\u90db\u83a9\u5e5e\u7953\u8274\u9efb\u9efc\u9cc6",
                ben: "\u672c\u4f53\u5954\u82ef\u7b28\u592f\u8d32\u951b\u755a\u574c",
                feng: "\u98ce\u4e30\u5c01\u5cf0\u5949\u51e4\u950b\u51af\u9022\u7f1d\u8702\u67ab\u75af\u8bbd\u70fd\u4ff8\u6ca3\u9146\u781c\u8451\u552a",
                bian: "\u53d8\u4fbf\u8fb9\u7f16\u904d\u8fa9\u97ad\u8fa8\u8d2c\u533e\u6241\u535e\u6c74\u8fab\u782d\u82c4\u8759\u9cca\u5f01\u7a86\u7b3e\u7178\u890a\u78a5\u5fed\u7f0f",
                pian: "\u4fbf\u7247\u7bc7\u504f\u9a97\u7fe9\u6241\u9a88\u80fc\u8e41\u8c1d\u728f\u7f0f",
                zhen: "\u9547\u771f\u9488\u5733\u632f\u9707\u73cd\u9635\u8bca\u586b\u4fa6\u81fb\u8d1e\u6795\u6862\u8d48\u796f\u5e27\u7504\u659f\u7f1c\u7bb4\u75b9\u7827\u699b\u9e29\u8f78\u7a39\u6eb1\u84c1\u80d7\u6939\u6715\u755b\u6d48",
                biao: "\u8868\u6807\u5f6a\u9556\u88f1\u98da\u8198\u98d9\u9573\u5a4a\u9aa0\u98d1\u6753\u9adf\u9cd4\u706c\u762d",
                piao: "\u7968\u6734\u6f02\u98d8\u5ad6\u74e2\u527d\u7f25\u6b8d\u779f\u9aa0\u560c\u83a9\u87b5",
                huo: "\u548c\u6d3b\u6216\u8d27\u83b7\u706b\u4f19\u60d1\u970d\u7978\u8c41\u56af\u85ff\u952a\u8816\u94ac\u8020\u956c\u5925\u706c\u5290\u6509",
                bie: "\u522b\u9cd6\u618b\u762a\u8e69",
                min: "\u6c11\u654f\u95fd\u95f5\u76bf\u6cef\u5cb7\u60af\u73c9\u62bf\u9efe\u7f17\u739f\u610d\u82e0\u9cd8",
                fen: "\u5206\u4efd\u7eb7\u594b\u7c89\u6c1b\u82ac\u6124\u7caa\u575f\u6c7e\u711a\u915a\u5429\u5fff\u68fc\u73a2\u9f22\u7035\u507e\u9cbc",
                bing: "\u5e76\u75c5\u5175\u51b0\u5c4f\u997c\u70b3\u79c9\u4e19\u6452\u67c4\u69df\u7980\u678b\u90b4\u51ab",
                geng: "\u66f4\u8015\u9888\u5e9a\u803f\u6897\u57c2\u7fb9\u54fd\u8d53\u7ee0\u9ca0",
                fang: "\u65b9\u653e\u623f\u9632\u8bbf\u7eba\u82b3\u4eff\u574a\u59a8\u80aa\u90a1\u822b\u5f77\u678b\u9c82\u531a\u94ab",
                xian: "\u73b0\u5148\u53bf\u89c1\u7ebf\u9650\u663e\u9669\u732e\u9c9c\u6d17\u5baa\u7ea4\u9677\u95f2\u8d24\u4ed9\u8854\u6380\u54b8\u5acc\u63ba\u7fa1\u5f26\u817a\u75eb\u5a34\u8237\u9985\u9170\u94e3\u51bc\u6d8e\u66b9\u7c7c\u9528\u82cb\u86ac\u8df9\u5c98\u85d3\u71f9\u9e47\u6c19\u83b6\u9730\u8de3\u7303\u5f61\u7946\u7b45",
                fou: "\u4e0d\u5426\u7f36",
                ca: "\u62c6\u64e6\u5693\u7924",
                cha: "\u67e5\u5bdf\u5dee\u8336\u63d2\u53c9\u5239\u832c\u6942\u5c94\u8be7\u78b4\u5693\u55b3\u59f9\u6748\u6c4a\u8869\u643d\u69ce\u9572\u82f4\u6aab\u9987\u9538\u7339",
                cai: "\u624d\u91c7\u8d22\u6750\u83dc\u5f69\u88c1\u8521\u731c\u8e29\u776c",
                can: "\u53c2\u6b8b\u9910\u707f\u60e8\u8695\u63ba\u74a8\u60ed\u7cb2\u5b71\u9a96\u9eea",
                shen: "\u4fe1\u6df1\u53c2\u8eab\u795e\u4ec0\u5ba1\u7533\u751a\u6c88\u4f38\u614e\u6e17\u80be\u7ec5\u8398\u547b\u5a76\u5a20\u7837\u8703\u54c2\u6939\u845a\u5432\u7cc1\u6e16\u8bdc\u8c02\u77e7\u80c2",
                cen: "\u53c2\u5c91\u6d94",
                san: "\u4e09\u53c2\u6563\u4f1e\u53c1\u7cc1\u9993\u6bf5",
                cang: "\u85cf\u4ed3\u82cd\u6ca7\u8231\u81e7\u4f27",
                zang: "\u85cf\u810f\u846c\u8d43\u81e7\u5958\u9a75",
                chen: "\u79f0\u9648\u6c88\u6c89\u6668\u741b\u81e3\u5c18\u8fb0\u886c\u8d81\u5ff1\u90f4\u5bb8\u8c0c\u789c\u55d4\u62bb\u6987\u4f27\u8c36\u9f80\u809c",
                cao: "\u8349\u64cd\u66f9\u69fd\u7cd9\u5608\u6f15\u87ac\u825a\u5c6e",
                ce: "\u7b56\u6d4b\u518c\u4fa7\u5395\u6805\u607b",
                ze: "\u8d23\u5219\u6cfd\u62e9\u4fa7\u548b\u5567\u4ec4\u7ba6\u8d5c\u7b2e\u8234\u6603\u8fee\u5e3b",
                zhai: "\u503a\u62e9\u9f50\u5b85\u5be8\u4fa7\u6458\u7a84\u658b\u796d\u7fdf\u7826\u7635\u54dc",
                dao: "\u5230\u9053\u5bfc\u5c9b\u5012\u5200\u76d7\u7a3b\u8e48\u60bc\u6363\u53e8\u7977\u7118\u6c18\u7e9b\u5202\u5e31\u5fc9",
                ceng: "\u5c42\u66fe\u8e6d\u564c",
                zha: "\u67e5\u624e\u70b8\u8bc8\u95f8\u6e23\u548b\u4e4d\u69a8\u6942\u672d\u6805\u7728\u54a4\u67de\u55b3\u558b\u94e1\u86b1\u5412\u600d\u781f\u63f8\u75c4\u54f3\u9f44",
                chai: "\u5dee\u62c6\u67f4\u9497\u8c7a\u4faa\u867f\u7625",
                ci: "\u6b21\u6b64\u5dee\u8bcd\u8f9e\u523a\u74f7\u78c1\u5179\u6148\u8328\u8d50\u7960\u4f3a\u96cc\u75b5\u9e5a\u7ccd\u5472\u7ca2",
                zi: "\u8d44\u81ea\u5b50\u5b57\u9f50\u54a8\u6ecb\u4ed4\u59ff\u7d2b\u5179\u5b5c\u6dc4\u7c7d\u6893\u9cbb\u6e0d\u59ca\u5431\u79ed\u6063\u753e\u5b73\u8a3e\u6ed3\u9531\u8f8e\u8d91\u9f87\u8d40\u7726\u7f01\u5472\u7b2b\u8c18\u5d6b\u9aed\u8308\u7ca2\u89dc\u8014",
                cuo: "\u63aa\u9519\u78cb\u632b\u6413\u64ae\u8e49\u9509\u539d\u5d6f\u75e4\u77ec\u7625\u811e\u9e7e",
                chan: "\u4ea7\u5355\u9610\u5d2d\u7f20\u63ba\u7985\u98a4\u94f2\u8749\u6400\u6f7a\u87fe\u998b\u5fcf\u5a75\u5b71\u89c7\u5edb\u8c04\u8c17\u6fb6\u9aa3\u7fbc\u8e94\u8487\u5181",
                shan: "\u5c71\u5355\u5584\u9655\u95ea\u886b\u64c5\u6c55\u6247\u63ba\u73ca\u7985\u5220\u81b3\u7f2e\u8d61\u912f\u6805\u717d\u59d7\u8dda\u9cdd\u5b17\u6f78\u8baa\u8222\u82eb\u759d\u63b8\u81bb\u9490\u5261\u87ee\u829f\u57cf\u5f61\u9a9f",
                zhan: "\u5c55\u6218\u5360\u7ad9\u5d2d\u7c98\u6e5b\u6cbe\u77bb\u98a4\u8a79\u65a9\u76cf\u8f97\u7efd\u6be1\u6808\u8638\u65c3\u8c35\u640c",
                xin: "\u65b0\u5fc3\u4fe1\u8f9b\u6b23\u85aa\u99a8\u946b\u82af\u950c\u5ffb\u8398\u6615\u8845\u6b46\u56df\u5fc4\u9561",
                lian: "\u8054\u8fde\u7ec3\u5ec9\u70bc\u8138\u83b2\u604b\u94fe\u5e18\u601c\u6d9f\u655b\u740f\u9570\u6fc2\u695d\u9ca2\u6b93\u6f4b\u88e2\u88e3\u81c1\u5941\u83b6\u880a\u8539",
                chang: "\u573a\u957f\u5382\u5e38\u507f\u660c\u5531\u7545\u5021\u5c1d\u80a0\u655e\u5018\u7316\u5a3c\u6dcc\u88f3\u5f9c\u6636\u6005\u5ae6\u83d6\u9cb3\u960a\u4f25\u82cc\u6c05\u60dd\u9b2f",
                zhang: "\u957f\u5f20\u7ae0\u969c\u6da8\u638c\u5e10\u80c0\u5f70\u4e08\u4ed7\u6f33\u6a1f\u8d26\u6756\u748b\u5d82\u4ec9\u7634\u87d1\u7350\u5e5b\u9123\u5adc",
                chao: "\u8d85\u671d\u6f6e\u7092\u949e\u6284\u5de2\u5435\u527f\u7ef0\u5632\u6641\u712f\u8016\u600a",
                zhao: "\u7740\u7167\u62db\u627e\u53ec\u671d\u8d75\u5146\u662d\u8087\u7f69\u948a\u6cbc\u5632\u722a\u8bcf\u6fef\u5541\u68f9\u7b0a",
                zhou: "\u8c03\u5dde\u5468\u6d32\u821f\u9aa4\u8f74\u663c\u5b99\u7ca5\u76b1\u8098\u5492\u5e1a\u80c4\u7ec9\u7ea3\u59af\u5541\u8bcc\u7e47\u78a1\u7c40\u914e\u836e",
                che: "\u8f66\u5f7b\u64a4\u5c3a\u626f\u6f88\u63a3\u577c\u7817\u5c6e",
                ju: "\u8f66\u5c40\u636e\u5177\u4e3e\u4e14\u5c45\u5267\u5de8\u805a\u6e20\u8ddd\u53e5\u62d2\u4ff1\u67dc\u83ca\u62d8\u70ac\u6854\u60e7\u77e9\u97a0\u9a79\u952f\u8e1e\u5480\u77bf\u67b8\u63ac\u6cae\u8392\u6a58\u98d3\u75bd\u949c\u8d84\u8e3d\u907d\u741a\u9f83\u6910\u82e3\u88fe\u6998\u72d9\u5028\u6989\u82f4\u8bb5\u96ce\u9514\u7aad\u97ab\u728b\u5c66\u91b5",
                cheng: "\u6210\u7a0b\u57ce\u627f\u79f0\u76db\u62a2\u4e58\u8bda\u5448\u51c0\u60e9\u6491\u6f84\u79e4\u6a59\u9a8b\u901e\u77a0\u4e1e\u665f\u94db\u57d5\u584d\u86cf\u67fd\u94d6\u9172\u88ce\u67a8",
                rong: "\u5bb9\u8363\u878d\u7ed2\u6eb6\u84c9\u7194\u620e\u6995\u8338\u5197\u5d58\u809c\u72e8\u877e",
                sheng: "\u751f\u58f0\u5347\u80dc\u76db\u4e58\u5723\u5269\u7272\u7538\u7701\u7ef3\u7b19\u7525\u5d4a\u665f\u6e11\u771a",
                deng: "\u7b49\u767b\u9093\u706f\u6f84\u51f3\u77aa\u8e6c\u5654\u78f4\u5d9d\u956b\u7c26\u6225",
                zhi: "\u5236\u4e4b\u6cbb\u8d28\u804c\u53ea\u5fd7\u81f3\u6307\u7ec7\u652f\u503c\u77e5\u8bc6\u76f4\u81f4\u6267\u7f6e\u6b62\u690d\u7eb8\u62d3\u667a\u6b96\u79e9\u65e8\u5740\u6ede\u6c0f\u679d\u829d\u8102\u5e1c\u6c41\u80a2\u631a\u7a1a\u916f\u63b7\u5cd9\u7099\u6809\u4f84\u82b7\u7a92\u54ab\u5431\u8dbe\u75d4\u8718\u90c5\u684e\u96c9\u7949\u90e6\u965f\u75e3\u86ed\u5e19\u67b3\u8e2f\u5fb5\u80dd\u6800\u8d3d\u7957\u8c78\u9e37\u646d\u8f75\u536e\u8f7e\u5f58\u89ef\u7d77\u8dd6\u57f4\u5902\u9ef9\u5fee\u9a98\u81a3\u8e2c",
                zheng: "\u653f\u6b63\u8bc1\u4e89\u6574\u5f81\u90d1\u4e01\u75c7\u6323\u84b8\u7741\u94ee\u7b5d\u62ef\u5ce5\u6014\u8be4\u72f0\u5fb5\u94b2",
                tang: "\u5802\u5510\u7cd6\u6c64\u5858\u8eba\u8d9f\u5018\u68e0\u70eb\u6dcc\u819b\u642a\u9557\u50a5\u87b3\u6e8f\u5e11\u7fb0\u6a18\u91a3\u8797\u8025\u94f4\u746d",
                chi: "\u6301\u5403\u6c60\u8fdf\u8d64\u9a70\u5c3a\u65a5\u9f7f\u7fc5\u5319\u75f4\u803b\u70bd\u4f88\u5f1b\u53f1\u557b\u577b\u7719\u55e4\u5880\u54e7\u830c\u8c49\u6555\u7b1e\u996c\u8e1f\u86a9\u67e2\u5ab8\u9b51\u7bea\u892b\u5f73\u9e31\u87ad\u761b\u7735\u50ba",
                shi: "\u662f\u65f6\u5b9e\u4e8b\u5e02\u5341\u4f7f\u4e16\u65bd\u5f0f\u52bf\u89c6\u8bc6\u5e08\u53f2\u793a\u77f3\u98df\u59cb\u58eb\u5931\u9002\u8bd5\u4ec0\u6cfd\u5ba4\u4f3c\u8bd7\u9970\u6b96\u91ca\u9a76\u6c0f\u7855\u901d\u6e7f\u8680\u72ee\u8a93\u62fe\u5c38\u5319\u4ed5\u67ff\u77e2\u5cd9\u4f8d\u566c\u55dc\u6805\u62ed\u5618\u5c4e\u6043\u8f7c\u8671\u8006\u8210\u83b3\u94c8\u8c25\u70bb\u8c55\u9ca5\u9963\u87ab\u917e\u7b6e\u57d8\u5f11\u793b\u84cd\u9cba\u8d33",
                qi: "\u4f01\u5176\u8d77\u671f\u6c14\u4e03\u5668\u6c7d\u5947\u9f50\u542f\u65d7\u68cb\u59bb\u5f03\u63ed\u679d\u6b67\u6b3a\u9a91\u5951\u8fc4\u4e9f\u6f06\u621a\u5c82\u7a3d\u5c90\u7426\u6816\u7f09\u742a\u6ce3\u4e5e\u780c\u7941\u5d0e\u7eee\u797a\u7948\u51c4\u6dc7\u675e\u8110\u9e92\u573b\u61a9\u82aa\u4f0e\u4fdf\u7566\u8006\u847a\u6c8f\u840b\u9a90\u9ccd\u7da6\u8bab\u8572\u5c7a\u9880\u4e93\u789b\u67d2\u5550\u6c54\u7dae\u8401\u5601\u86f4\u69ed\u6b39\u8291\u6864\u4e0c\u871e",
                chuai: "\u63e3\u8e39\u555c\u640b\u81aa",
                tuo: "\u6258\u8131\u62d3\u62d6\u59a5\u9a7c\u9640\u6cb1\u9e35\u9a6e\u553e\u692d\u5768\u4f57\u7823\u8dce\u5eb9\u67c1\u6a50\u4e47\u94ca\u6cb2\u9161\u9f0d\u7ba8\u67dd",
                duo: "\u591a\u5ea6\u593a\u6735\u8eb2\u94ce\u968b\u5484\u5815\u8235\u579b\u60f0\u54c6\u8e31\u8dfa\u6387\u5241\u67c1\u7f0d\u6cb2\u88f0\u54da\u96b3",
                xue: "\u5b66\u8840\u96ea\u524a\u859b\u7a74\u9774\u8c11\u5671\u9cd5\u8e05\u6cf6\u5f50",
                chong: "\u91cd\u79cd\u5145\u51b2\u6d8c\u5d07\u866b\u5ba0\u5fe1\u61a7\u8202\u833a\u94f3\u825f",
                chou: "\u7b79\u62bd\u7ef8\u916c\u6101\u4e11\u81ed\u4ec7\u7574\u7a20\u7785\u8e0c\u60c6\u4fe6\u7633\u96e0\u5e31",
                qiu: "\u6c42\u7403\u79cb\u4e18\u90b1\u4ec7\u914b\u88d8\u9f9f\u56da\u9052\u9cc5\u866c\u86af\u6cc5\u6978\u6e6b\u72b0\u9011\u5def\u827d\u4fc5\u8764\u8d47\u9f3d\u7cd7",
                xiu: "\u4fee\u79c0\u4f11\u5bbf\u8896\u7ee3\u81ed\u673d\u9508\u7f9e\u55c5\u5cab\u6eb4\u5ea5\u9990\u54bb\u9af9\u9e3a\u8c85",
                chu: "\u51fa\u5904\u7840\u521d\u52a9\u9664\u50a8\u755c\u89e6\u695a\u53a8\u96cf\u77d7\u6a71\u9504\u6ec1\u8e87\u6035\u7ecc\u6410\u520d\u870d\u9edc\u6775\u8e70\u4e8d\u6a17\u61b7\u696e",
                tuan: "\u56e2\u63e3\u6e4d\u7583\u629f\u5f56",
                zhui: "\u8ffd\u5760\u7f00\u63e3\u690e\u9525\u8d58\u60f4\u96b9\u9a93\u7f12",
                chuan: "\u4f20\u5ddd\u8239\u7a7f\u4e32\u5598\u693d\u821b\u948f\u9044\u6c1a\u5ddb\u8221",
                zhuan: "\u4e13\u8f6c\u4f20\u8d5a\u7816\u64b0\u7bc6\u9994\u556d\u989b",
                yuan: "\u5143\u5458\u9662\u539f\u6e90\u8fdc\u613f\u56ed\u63f4\u5706\u7f18\u8881\u6028\u6e0a\u82d1\u5b9b\u51a4\u5a9b\u733f\u57a3\u6c85\u586c\u57b8\u9e33\u8f95\u9e22\u7457\u571c\u7230\u82ab\u9f0b\u6a7c\u8788\u7722\u7ba2\u63be",
                cuan: "\u7a9c\u6512\u7be1\u8e7f\u64ba\u7228\u6c46\u9569",
                chuang: "\u521b\u5e8a\u7a97\u95ef\u5e62\u75ae\u6006",
                zhuang: "\u88c5\u72b6\u5e84\u58ee\u649e\u5986\u5e62\u6869\u5958\u50ee\u6206",
                chui: "\u5439\u5782\u9524\u708a\u690e\u9672\u69cc\u6376\u68f0",
                chun: "\u6625\u7eaf\u9187\u6df3\u5507\u693f\u8822\u9e51\u6710\u83bc\u80ab\u877d",
                zhun: "\u51c6\u5c6f\u6df3\u8c06\u80ab\u7a80",
                cu: "\u4fc3\u8d8b\u8da3\u7c97\u7c07\u918b\u5352\u8e74\u731d\u8e59\u851f\u6b82\u5f82",
                dun: "\u5428\u987f\u76fe\u6566\u8e72\u58a9\u56e4\u6c8c\u949d\u7096\u76f9\u9041\u8db8\u7818\u7905",
                qu: "\u533a\u53bb\u53d6\u66f2\u8d8b\u6e20\u8da3\u9a71\u5c48\u8eaf\u8862\u5a36\u795b\u77bf\u5c96\u9f8b\u89d1\u6710\u86d0\u766f\u86c6\u82e3\u9612\u8bce\u52ac\u8556\u8627\u6c0d\u9ee2\u883c\u74a9\u9eb4\u9e32\u78f2",
                xu: "\u9700\u8bb8\u7eed\u987b\u5e8f\u5f90\u4f11\u84c4\u755c\u865a\u5401\u7eea\u53d9\u65ed\u90aa\u6064\u589f\u6829\u7d6e\u5729\u5a7f\u620c\u80e5\u5618\u6d52\u7166\u9157\u8be9\u6710\u76f1\u84ff\u6e86\u6d2b\u987c\u52d6\u7cc8\u7809\u9191",
                chuo: "\u8f8d\u7ef0\u6233\u6dd6\u555c\u9f8a\u8e14\u8fb6",
                zu: "\u7ec4\u65cf\u8db3\u7956\u79df\u963b\u5352\u4fce\u8bc5\u955e\u83f9",
                ji: "\u6d4e\u673a\u5176\u6280\u57fa\u8bb0\u8ba1\u7cfb\u671f\u9645\u53ca\u96c6\u7ea7\u51e0\u7ed9\u79ef\u6781\u5df1\u7eaa\u5373\u7ee7\u51fb\u65e2\u6fc0\u7ee9\u6025\u5947\u5409\u5b63\u9f50\u75be\u8ff9\u9e21\u5242\u8f91\u7c4d\u5bc4\u6324\u573e\u5180\u4e9f\u5bc2\u66a8\u810a\u8dfb\u808c\u7a3d\u5fcc\u9965\u796d\u7f09\u68d8\u77f6\u6c72\u7578\u59ec\u85c9\u7620\u9aa5\u7f81\u5993\u8ba5\u7a37\u84df\u60b8\u5ac9\u5c8c\u53fd\u4f0e\u9cab\u8bd8\u696b\u8360\u621f\u7b95\u9701\u5d47\u89ca\u9e82\u757f\u7391\u7b08\u7284\u82a8\u5527\u5c50\u9afb\u6222\u4f76\u5048\u7b04\u8dfd\u84ba\u4e69\u54ad\u8d4d\u5d74\u866e\u638e\u9f51\u6b9b\u9c9a\u525e\u6d0e\u4e0c\u58bc\u857a\u5f50\u82b0\u54dc",
                cong: "\u4ece\u4e1b\u5306\u806a\u8471\u56f1\u742e\u6dd9\u679e\u9aa2\u82c1\u7481",
                zong: "\u603b\u4ece\u7efc\u5b97\u7eb5\u8e2a\u68d5\u7cbd\u9b03\u506c\u679e\u8159",
                cou: "\u51d1\u8f8f\u8160\u6971",
                cui: "\u8870\u50ac\u5d14\u8106\u7fe0\u8403\u7cb9\u6467\u7480\u7601\u60b4\u6dec\u5550\u96b9\u6bf3\u69b1",
                wei: "\u4e3a\u4f4d\u59d4\u672a\u7ef4\u536b\u56f4\u8fdd\u5a01\u4f1f\u5371\u5473\u5fae\u552f\u8c13\u4f2a\u6170\u5c3e\u9b4f\u97e6\u80c3\u754f\u5e37\u5582\u5dcd\u840e\u851a\u7eac\u6f4d\u5c09\u6e2d\u60df\u8587\u82c7\u709c\u5729\u5a13\u8bff\u73ae\u5d34\u6845\u504e\u9036\u502d\u7325\u56d7\u8473\u9697\u75ff\u732c\u6da0\u5d6c\u97ea\u7168\u8249\u96b9\u5e0f\u95f1\u6d27\u6ca9\u9688\u9c94\u8ece",
                cun: "\u6751\u5b58\u5bf8\u5fd6\u76b4",
                zuo: "\u4f5c\u505a\u5ea7\u5de6\u5750\u6628\u4f50\u7422\u64ae\u795a\u67de\u5511\u562c\u9162\u600d\u7b2e\u963c\u80d9",
                zuan: "\u94bb\u7e82\u6525\u7f35\u8e9c",
                da: "\u5927\u8fbe\u6253\u7b54\u642d\u6c93\u7629\u60ee\u55d2\u54d2\u8037\u9791\u977c\u8921\u7b2a\u601b\u59b2",
                dai: "\u5927\u4ee3\u5e26\u5f85\u8d37\u6bd2\u6234\u888b\u6b79\u5446\u96b6\u902e\u5cb1\u50a3\u68e3\u6020\u6b86\u9edb\u7519\u57ed\u8bd2\u7ed0\u73b3\u5454\u8fe8",
                tai: "\u5927\u53f0\u592a\u6001\u6cf0\u62ac\u80ce\u6c70\u949b\u82d4\u85b9\u80bd\u8dc6\u90b0\u9c90\u915e\u9a80\u70b1",
                ta: "\u4ed6\u5b83\u5979\u62d3\u5854\u8e0f\u584c\u69bb\u6c93\u6f2f\u736d\u55d2\u631e\u8e4b\u8dbf\u9062\u94ca\u9cce\u6ebb\u95fc",
                dan: "\u4f46\u5355\u77f3\u62c5\u4e39\u80c6\u65e6\u5f39\u86cb\u6de1\u8bde\u6c2e\u90f8\u803d\u6b9a\u60ee\u510b\u7708\u75b8\u6fb9\u63b8\u81bb\u5556\u7baa\u8043\u840f\u7605\u8d55",
                lu: "\u8def\u516d\u9646\u5f55\u7eff\u9732\u9c81\u5362\u7089\u9e7f\u7984\u8d42\u82a6\u5e90\u788c\u9e93\u9885\u6cf8\u5364\u6f5e\u9e6d\u8f98\u864f\u7490\u6f09\u565c\u622e\u9c88\u63b3\u6a79\u8f73\u902f\u6e0c\u84fc\u64b8\u9e2c\u680c\u6c07\u80ea\u9565\u7c0f\u823b\u8f82\u5786",
                tan: "\u8c08\u63a2\u5766\u644a\u5f39\u70ad\u575b\u6ee9\u8d2a\u53f9\u8c2d\u6f6d\u78b3\u6bef\u762b\u6a80\u75f0\u8892\u574d\u8983\u5fd0\u6619\u90ef\u6fb9\u94bd\u952c",
                ren: "\u4eba\u4efb\u8ba4\u4ec1\u5fcd\u97e7\u5203\u7eab\u996a\u598a\u834f\u7a14\u58ec\u4ede\u8f6b\u4ebb\u887d",
                jie: "\u5bb6\u7ed3\u89e3\u4ef7\u754c\u63a5\u8282\u5979\u5c4a\u4ecb\u9636\u8857\u501f\u6770\u6d01\u622a\u59d0\u63ed\u6377\u52ab\u6212\u7686\u7aed\u6854\u8beb\u6977\u79f8\u776b\u85c9\u62ee\u82a5\u8bd8\u78a3\u55df\u9889\u86a7\u5b51\u5a55\u7596\u6840\u8ba6\u75a5\u5048\u7faf\u88b7\u54dc\u5588\u5369\u9c92\u9ab1",
                yan: "\u7814\u4e25\u9a8c\u6f14\u8a00\u773c\u70df\u6cbf\u5ef6\u76d0\u708e\u71d5\u5ca9\u5bb4\u8273\u989c\u6bb7\u5f66\u63a9\u6df9\u960e\u884d\u94c5\u96c1\u54bd\u538c\u7130\u5830\u781a\u5501\u7109\u664f\u6a90\u8712\u5944\u4fe8\u814c\u598d\u8c1a\u5156\u7b75\u7131\u5043\u95eb\u5ae3\u9122\u6e6e\u8d5d\u80ed\u7430\u6edf\u9609\u9b47\u917d\u90fe\u6079\u5d26\u82ab\u5261\u9f39\u83f8\u990d\u57cf\u8c33\u8ba0\u53a3\u7f68",
                dang: "\u5f53\u515a\u6863\u8361\u6321\u5b95\u7800\u94db\u88c6\u51fc\u83ea\u8c20",
                tao: "\u5957\u8ba8\u8df3\u9676\u6d9b\u9003\u6843\u8404\u6dd8\u638f\u6ed4\u97ec\u53e8\u6d2e\u5555\u7ee6\u9955\u9f17",
                tiao: "\u6761\u8c03\u6311\u8df3\u8fe2\u773a\u82d5\u7a95\u7b24\u4f7b\u5541\u7c9c\u9aeb\u94eb\u7967\u9f86\u8729\u9ca6",
                te: "\u7279\u5fd1\u5fd2\u94fd\u615d",
                de: "\u7684\u5730\u5f97\u5fb7\u5e95\u951d",
                dei: "\u5f97",
                di: "\u7684\u5730\u7b2c\u63d0\u4f4e\u5e95\u62b5\u5f1f\u8fea\u9012\u5e1d\u654c\u5824\u8482\u7f14\u6ef4\u6da4\u7fdf\u5a23\u7b1b\u68e3\u837b\u8c1b\u72c4\u90b8\u5600\u7825\u577b\u8bcb\u5ae1\u955d\u78b2\u9ab6\u6c10\u67e2\u7c74\u7f9d\u7747\u89cc",
                ti: "\u4f53\u63d0\u9898\u5f1f\u66ff\u68af\u8e22\u60d5\u5254\u8e44\u68e3\u557c\u5c49\u5243\u6d95\u9511\u501c\u608c\u9016\u568f\u8351\u918d\u7ee8\u9e48\u7f07\u88fc",
                tui: "\u63a8\u9000\u5f1f\u817f\u892a\u9893\u8715\u5fd2\u717a",
                you: "\u6709\u7531\u53c8\u4f18\u6e38\u6cb9\u53cb\u53f3\u90ae\u5c24\u5fe7\u5e7c\u72b9\u8bf1\u60a0\u5e7d\u4f51\u91c9\u67da\u94c0\u9c7f\u56ff\u9149\u6538\u9edd\u83a0\u7337\u8763\u75a3\u5466\u86b4\u83b8\u839c\u94d5\u5ba5\u7e47\u5363\u7256\u9f2c\u5c22\u86b0\u4f91",
                dian: "\u7535\u70b9\u5e97\u5178\u5960\u7538\u7898\u6dc0\u6bbf\u57ab\u98a0\u6ec7\u766b\u5dc5\u60e6\u6382\u765c\u73b7\u4f43\u8e2e\u975b\u94bf\u7c1f\u576b\u963d",
                tian: "\u5929\u7530\u6dfb\u586b\u751c\u7538\u606c\u8146\u4f43\u8214\u94bf\u9617\u5fdd\u6b84\u754b\u681d\u63ad",
                zhu: "\u4e3b\u672f\u4f4f\u6ce8\u52a9\u5c5e\u9010\u5b81\u8457\u7b51\u9a7b\u6731\u73e0\u795d\u732a\u8bf8\u67f1\u7af9\u94f8\u682a\u77a9\u5631\u8d2e\u716e\u70db\u82ce\u891a\u86db\u62c4\u94e2\u6d19\u7afa\u86c0\u6e1a\u4f2b\u677c\u4f8f\u6f8d\u8bdb\u8331\u7bb8\u70b7\u8e85\u7fe5\u6f74\u90be\u69e0\u8233\u6a65\u4e36\u7603\u9e88\u75b0",
                nian: "\u5e74\u5ff5\u917f\u8f97\u78be\u5eff\u637b\u64b5\u62c8\u852b\u9cb6\u57dd\u9c87\u8f87\u9ecf",
                diao: "\u8c03\u6389\u96d5\u540a\u9493\u5201\u8c82\u51cb\u7889\u9cb7\u53fc\u94eb\u94de",
                yao: "\u8981\u4e48\u7ea6\u836f\u9080\u6447\u8000\u8170\u9065\u59da\u7a91\u7476\u54ac\u5c27\u94a5\u8c23\u80b4\u592d\u4fa5\u5406\u759f\u5996\u5e7a\u6773\u8200\u7a95\u7a88\u66dc\u9e5e\u723b\u7e47\u5fad\u8f7a\u94eb\u9cd0\u5d3e\u73e7",
                die: "\u8dcc\u53e0\u8776\u8fed\u789f\u7239\u8c0d\u7252\u800b\u4f5a\u558b\u581e\u74de\u9cbd\u57a4\u63f2\u8e40",
                she: "\u8bbe\u793e\u6444\u6d89\u5c04\u6298\u820d\u86c7\u62fe\u820c\u5962\u6151\u8d66\u8d4a\u4f58\u9e9d\u6b59\u7572\u538d\u731e\u63f2\u6ee0",
                ye: "\u4e1a\u4e5f\u591c\u53f6\u5c04\u91ce\u6db2\u51b6\u559d\u9875\u7237\u8036\u90aa\u54bd\u6930\u70e8\u6396\u62fd\u66f3\u6654\u8c12\u814b\u564e\u63f6\u9765\u90ba\u94d8\u63f2",
                xie: "\u4e9b\u89e3\u534f\u5199\u8840\u53f6\u8c22\u68b0\u978b\u80c1\u659c\u643a\u61c8\u5951\u5378\u8c10\u6cc4\u87f9\u90aa\u6b47\u6cfb\u5c51\u631f\u71ee\u69ad\u874e\u64b7\u5055\u4eb5\u6954\u9889\u7f2c\u9082\u9c91\u7023\u52f0\u698d\u85a4\u7ec1\u6e2b\u5ee8\u736c\u8e9e",
                zhe: "\u8fd9\u8005\u7740\u8457\u6d59\u6298\u54f2\u8517\u906e\u8f99\u8f84\u67d8\u9517\u8936\u8707\u86f0\u9e67\u8c2a\u8d6d\u647a\u4e47\u78d4\u87ab",
                ding: "\u5b9a\u8ba2\u9876\u4e01\u9f0e\u76ef\u9489\u952d\u53ee\u4ec3\u94e4\u753a\u914a\u5576\u7887\u815a\u7594\u738e\u8035",
                diu: "\u4e22\u94e5",
                ting: "\u542c\u5ead\u505c\u5385\u5ef7\u633a\u4ead\u8247\u5a77\u6c40\u94e4\u70c3\u9706\u753a\u8713\u8476\u6883\u839b",
                dong: "\u52a8\u4e1c\u8463\u51ac\u6d1e\u61c2\u51bb\u680b\u4f97\u549a\u5cd2\u6c21\u606b\u80f4\u7850\u578c\u9e2b\u5cbd\u80e8",
                tong: "\u540c\u901a\u7edf\u7ae5\u75db\u94dc\u6876\u6850\u7b52\u5f64\u4f97\u4f5f\u6f7c\u6345\u916e\u783c\u77b3\u6078\u5cd2\u4edd\u55f5\u50ee\u578c\u833c",
                zhong: "\u4e2d\u91cd\u79cd\u4f17\u7ec8\u949f\u5fe0\u4ef2\u8877\u80bf\u8e35\u51a2\u76c5\u86a3\u5fea\u953a\u822f\u87bd\u5902",
                dou: "\u90fd\u6597\u8bfb\u8c46\u6296\u515c\u9661\u9017\u7aa6\u6e0e\u86aa\u75d8\u8538\u94ad\u7bfc",
                du: "\u5ea6\u90fd\u72ec\u7763\u8bfb\u6bd2\u6e21\u675c\u5835\u8d4c\u7779\u809a\u9540\u6e0e\u7b03\u7afa\u561f\u728a\u5992\u724d\u8839\u691f\u9ee9\u828f\u9ad1",
                duan: "\u65ad\u6bb5\u77ed\u7aef\u953b\u7f0e\u7145\u6934\u7c16",
                dui: "\u5bf9\u961f\u8ffd\u6566\u5151\u5806\u7893\u9566\u603c\u619d",
                rui: "\u745e\u5151\u9510\u777f\u82ae\u854a\u8564\u868b\u6798",
                yue: "\u6708\u8bf4\u7ea6\u8d8a\u4e50\u8dc3\u5151\u9605\u5cb3\u7ca4\u60a6\u66f0\u94a5\u680e\u94ba\u6a3e\u7039\u9fa0\u54d5\u5216",
                tun: "\u541e\u5c6f\u56e4\u892a\u8c5a\u81c0\u9968\u66be\u6c3d",
                hui: "\u4f1a\u56de\u6325\u6c47\u60e0\u8f89\u6062\u5fbd\u7ed8\u6bc1\u6167\u7070\u8d3f\u5349\u6094\u79fd\u6e83\u835f\u6656\u5f57\u8bb3\u8bf2\u73f2\u5815\u8bd9\u8559\u6666\u7762\u9ebe\u70e9\u8334\u5599\u6867\u86d4\u6d04\u6d4d\u867a\u605a\u87ea\u54b4\u96b3\u7f0b\u54d5",
                wu: "\u52a1\u7269\u65e0\u4e94\u6b66\u5348\u5434\u821e\u4f0d\u6c61\u4e4c\u8bef\u4ea1\u6076\u5c4b\u6664\u609f\u543e\u96fe\u829c\u68a7\u52ff\u5deb\u4fae\u575e\u6bcb\u8bec\u545c\u94a8\u90ac\u6342\u9e5c\u5140\u5a7a\u59a9\u65bc\u620a\u9e49\u6d6f\u8708\u5514\u9a9b\u4ef5\u7110\u82b4\u92c8\u5e91\u9f2f\u727e\u6003\u572c\u5fe4\u75e6\u8fd5\u674c\u5be4\u9622",
                ya: "\u4e9a\u538b\u96c5\u7259\u62bc\u9e2d\u5440\u8f67\u6daf\u5d16\u90aa\u82bd\u54d1\u8bb6\u9e26\u5a05\u8859\u4e2b\u869c\u78a3\u57ad\u4f22\u6c29\u6860\u740a\u63e0\u5416\u775a\u75d6\u758b\u8fd3\u5c88\u7811",
                he: "\u548c\u5408\u6cb3\u4f55\u6838\u76d6\u8d3a\u559d\u8d6b\u8377\u76d2\u9e64\u5413\u5475\u82db\u79be\u83cf\u58d1\u8910\u6db8\u9602\u9616\u52be\u8bc3\u988c\u55ec\u8c89\u66f7\u7fee\u7ea5\u76cd",
                wo: "\u6211\u63e1\u7a9d\u6c83\u5367\u631d\u6da1\u65a1\u6e25\u5e44\u8717\u5594\u502d\u83b4\u9f8c\u809f\u786a",
                en: "\u6069\u6441\u84bd",
                n: "\u55ef\u5514",
                er: "\u800c\u4e8c\u5c14\u513f\u8033\u8fe9\u9975\u6d31\u8d30\u94d2\u73e5\u4f74\u9e38\u9c95",
                fa: "\u53d1\u6cd5\u7f5a\u4e4f\u4f10\u9600\u7b4f\u781d\u57a1\u73d0",
                quan: "\u5168\u6743\u5238\u6cc9\u5708\u62f3\u529d\u72ac\u94e8\u75ca\u8be0\u8343\u919b\u8737\u98a7\u7efb\u72ad\u7b4c\u9b08\u609b\u8f81\u754e",
                fei: "\u8d39\u975e\u98de\u80a5\u5e9f\u83f2\u80ba\u5561\u6cb8\u532a\u6590\u871a\u5983\u8bfd\u6249\u7fe1\u970f\u5420\u7eef\u8153\u75f1\u82be\u6ddd\u60b1\u72d2\u69a7\u7829\u9cb1\u7bda\u9544",
                pei: "\u914d\u57f9\u574f\u8d54\u4f69\u966a\u6c9b\u88f4\u80da\u5983\u9708\u6de0\u65c6\u5e14\u5478\u9185\u8f94\u952b",
                ping: "\u5e73\u8bc4\u51ed\u74f6\u51af\u5c4f\u840d\u82f9\u4e52\u576a\u67b0\u5a09\u4fdc\u9c86",
                fo: "\u4f5b",
                hu: "\u548c\u62a4\u8bb8\u6237\u6838\u6e56\u4e92\u4e4e\u547c\u80e1\u620f\u5ffd\u864e\u6caa\u7cca\u58f6\u846b\u72d0\u8774\u5f27\u745a\u6d52\u9e44\u7425\u6248\u552c\u6ef9\u60da\u795c\u56eb\u659b\u7b0f\u82b4\u9190\u7322\u6019\u553f\u623d\u69f2\u89f3\u7173\u9e55\u51b1\u74e0\u864d\u5cb5\u9e71\u70c0\u8f77",
                ga: "\u5939\u5496\u560e\u5c2c\u5676\u65ee\u4f3d\u5c15\u9486\u5c1c",
                ge: "\u4e2a\u5408\u5404\u9769\u683c\u6b4c\u54e5\u76d6\u9694\u5272\u9601\u6208\u845b\u9e3d\u6401\u80f3\u8238\u7599\u94ec\u9abc\u86e4\u54af\u572a\u9549\u988c\u4ee1\u784c\u55dd\u9b32\u8188\u7ea5\u88bc\u643f\u5865\u54ff\u867c",
                ha: "\u54c8\u86e4\u94ea",
                xia: "\u4e0b\u590f\u5ce1\u53a6\u8f96\u971e\u5939\u867e\u72ed\u5413\u4fa0\u6687\u9050\u778e\u5323\u7455\u552c\u5477\u9ee0\u7856\u7f45\u72ce\u7615\u67d9",
                gai: "\u6539\u8be5\u76d6\u6982\u6e89\u9499\u4e10\u82a5\u8d45\u5793\u9654\u6224",
                hai: "\u6d77\u8fd8\u5bb3\u5b69\u4ea5\u54b3\u9ab8\u9a87\u6c26\u55e8\u80f2\u91a2",
                gan: "\u5e72\u611f\u8d76\u6562\u7518\u809d\u6746\u8d63\u4e7e\u67d1\u5c34\u7aff\u79c6\u6a44\u77f8\u6de6\u82f7\u64c0\u9150\u7ec0\u6cd4\u5769\u65f0\u75b3\u6f89",
                gang: "\u6e2f\u94a2\u521a\u5c97\u7eb2\u5188\u6760\u7f38\u625b\u809b\u7f61\u6206\u7b7b",
                jiang: "\u5c06\u5f3a\u6c5f\u6e2f\u5956\u8bb2\u964d\u7586\u848b\u59dc\u6d46\u5320\u9171\u50f5\u6868\u7edb\u7f30\u729f\u8c47\u7913\u6d1a\u8333\u7ce8\u8029",
                hang: "\u884c\u822a\u676d\u5df7\u592f\u542d\u6841\u6c86\u7ed7\u9883",
                gong: "\u5de5\u516c\u5171\u4f9b\u529f\u7ea2\u8d21\u653b\u5bab\u5de9\u9f9a\u606d\u62f1\u8eac\u5f13\u6c5e\u86a3\u73d9\u89e5\u80b1\u5efe",
                hong: "\u7ea2\u5b8f\u6d2a\u8f70\u8679\u9e3f\u5f18\u54c4\u70d8\u6cd3\u8a07\u857b\u95f3\u8ba7\u836d\u9ec9\u85a8",
                guang: "\u5e7f\u5149\u901b\u6f62\u72b7\u80f1\u54a3\u6844",
                qiong: "\u7a77\u743c\u7a79\u909b\u8315\u7b47\u8deb\u86e9\u928e",
                gao: "\u9ad8\u544a\u641e\u7a3f\u818f\u7cd5\u9550\u768b\u7f94\u9506\u6772\u90dc\u777e\u8bf0\u85c1\u7bd9\u7f1f\u69c1\u69d4",
                hao: "\u597d\u53f7\u6beb\u8c6a\u8017\u6d69\u90dd\u7693\u660a\u768b\u84bf\u58d5\u704f\u568e\u6fe0\u869d\u8c89\u98a2\u55e5\u8585\u5686",
                li: "\u7406\u529b\u5229\u7acb\u91cc\u674e\u5386\u4f8b\u79bb\u52b1\u793c\u4e3d\u9ece\u7483\u5389\u5398\u7c92\u8389\u68a8\u96b6\u6817\u8354\u6ca5\u7281\u6f13\u54e9\u72f8\u85dc\u7f79\u7bf1\u9ca4\u783a\u540f\u6fa7\u4fd0\u9a8a\u6ea7\u783e\u8385\u9502\u7b20\u8821\u86ce\u75e2\u96f3\u4fea\u5088\u91b4\u680e\u90e6\u4fda\u67a5\u55b1\u9026\u5a0c\u9e42\u623e\u782c\u5533\u575c\u75a0\u870a\u9ee7\u7301\u9b32\u7c9d\u84e0\u5456\u8dde\u75ac\u7f21\u9ca1\u9ce2\u5ae0\u8a48\u609d\u82c8\u7be5\u8f79",
                jia: "\u5bb6\u52a0\u4ef7\u5047\u4f73\u67b6\u7532\u5609\u8d3e\u9a7e\u5ac1\u5939\u7a3c\u94be\u631f\u62ee\u8fe6\u4f3d\u988a\u6d43\u67b7\u621b\u835a\u75c2\u9889\u9553\u7b33\u73c8\u5cac\u80db\u8888\u90cf\u846d\u88b7\u7615\u94d7\u8dcf\u86f1\u605d\u54ff",
                luo: "\u843d\u7f57\u7edc\u6d1b\u903b\u87ba\u9523\u9a86\u841d\u88f8\u6f2f\u70d9\u645e\u9aa1\u54af\u7ba9\u73de\u634b\u8366\u784c\u96d2\u6924\u9559\u8dde\u7630\u6cfa\u8136\u7321\u502e\u8803",
                ke: "\u53ef\u79d1\u514b\u5ba2\u523b\u8bfe\u9897\u6e34\u58f3\u67ef\u68f5\u5475\u5777\u606a\u82db\u54b3\u78d5\u73c2\u7a1e\u778c\u6e98\u8f72\u7aa0\u55d1\u75b4\u874c\u5ca2\u94ea\u988f\u9ac1\u86b5\u7f02\u6c2a\u9a92\u94b6\u951e",
                qia: "\u5361\u6070\u6d3d\u6390\u9ac2\u88b7\u54ad\u845c",
                gei: "\u7ed9",
                gen: "\u6839\u8ddf\u4e98\u826e\u54cf\u831b",
                hen: "\u5f88\u72e0\u6068\u75d5\u54cf",
                gou: "\u6784\u8d2d\u591f\u53e5\u6c9f\u72d7\u94a9\u62d8\u52fe\u82df\u57a2\u67b8\u7bdd\u4f5d\u5abe\u8bdf\u5ca3\u5f40\u7f11\u7b31\u97b2\u89cf\u9058",
                kou: "\u53e3\u6263\u5bc7\u53e9\u62a0\u4f5d\u853b\u82a4\u770d\u7b58",
                gu: "\u80a1\u53e4\u987e\u6545\u56fa\u9f13\u9aa8\u4f30\u8c37\u8d3e\u59d1\u5b64\u96c7\u8f9c\u83c7\u6cbd\u5495\u5471\u9522\u94b4\u7b8d\u6c69\u688f\u75fc\u5d2e\u8f71\u9e2a\u726f\u86ca\u8bc2\u6bc2\u9e58\u83f0\u7f5f\u560f\u81cc\u89da\u77bd\u86c4\u9164\u727f\u9cb4",
                pai: "\u724c\u6392\u6d3e\u62cd\u8feb\u5f98\u6e43\u4ff3\u54cc\u848e",
                gua: "\u62ec\u6302\u74dc\u522e\u5be1\u5366\u5471\u8902\u5250\u80cd\u8bd6\u9e39\u681d\u5459",
                tou: "\u6295\u5934\u900f\u5077\u6109\u9ab0\u4ea0",
                guai: "\u602a\u62d0\u4e56",
                kuai: "\u4f1a\u5feb\u5757\u7b77\u810d\u84af\u4fa9\u6d4d\u90d0\u8489\u72ef\u54d9",
                guan: "\u5173\u7ba1\u89c2\u9986\u5b98\u8d2f\u51a0\u60ef\u704c\u7f50\u839e\u7eb6\u68fa\u65a1\u77dc\u500c\u9e73\u9ccf\u76e5\u63bc\u6dab",
                wan: "\u4e07\u5b8c\u665a\u6e7e\u73a9\u7897\u987d\u633d\u5f2f\u8513\u4e38\u839e\u7696\u5b9b\u5a49\u8155\u873f\u60cb\u70f7\u742c\u7579\u8c4c\u525c\u7ea8\u7efe\u8118\u83c0\u8284\u7ba2",
                ne: "\u5462\u54ea\u5450\u8bb7\u7592",
                gui: "\u89c4\u8d35\u5f52\u8f68\u6842\u67dc\u572d\u9b3c\u7845\u7470\u8dea\u9f9f\u532e\u95fa\u8be1\u7678\u9cdc\u6867\u7688\u9c91\u523d\u6677\u5080\u772d\u59ab\u7085\u5e8b\u7c0b\u523f\u5b84\u5326",
                jun: "\u519b\u5747\u4fca\u541b\u5cfb\u83cc\u7ae3\u94a7\u9a8f\u9f9f\u6d5a\u96bd\u90e1\u7b60\u76b2\u9e87\u6343",
                jiong: "\u7a98\u70af\u8fe5\u7085\u5182\u6243",
                jue: "\u51b3\u7edd\u89d2\u89c9\u6398\u5d1b\u8bc0\u7357\u6289\u7235\u56bc\u5014\u53a5\u8568\u652b\u73cf\u77cd\u8e76\u8c32\u9562\u9cdc\u5671\u6877\u5658\u6485\u6a5b\u5b53\u89d6\u5282\u721d",
                gun: "\u6eda\u68cd\u8f8a\u886e\u78d9\u9ca7\u7ef2\u4e28",
                hun: "\u5a5a\u6df7\u9b42\u6d51\u660f\u68cd\u73f2\u8364\u9984\u8be8\u6eb7\u960d",
                guo: "\u56fd\u8fc7\u679c\u90ed\u9505\u88f9\u5e3c\u6da1\u6901\u56d7\u8748\u8662\u8052\u57da\u63b4\u7313\u5d1e\u873e\u5459\u9998",
                hei: "\u9ed1\u563f\u55e8",
                kan: "\u770b\u520a\u52d8\u582a\u574e\u780d\u4f83\u5d4c\u69db\u77b0\u961a\u9f9b\u6221\u51f5\u83b0",
                heng: "\u8861\u6a2a\u6052\u4ea8\u54fc\u73e9\u6841\u8605",
                mo: "\u4e07\u6ca1\u4e48\u6a21\u672b\u5192\u83ab\u6469\u58a8\u9ed8\u78e8\u6478\u6f20\u8109\u819c\u9b54\u6cab\u964c\u62b9\u5bde\u8611\u6479\u84e6\u998d\u8309\u563f\u8c1f\u79e3\u87c6\u8c89\u5aeb\u9546\u6b81\u8031\u5b37\u9ebd\u763c\u8c8a\u8c98",
                peng: "\u9e4f\u670b\u5f6d\u81a8\u84ec\u78b0\u82f9\u68da\u6367\u4ea8\u70f9\u7bf7\u6f8e\u62a8\u787c\u6026\u7830\u562d\u87db\u580b",
                hou: "\u540e\u5019\u539a\u4faf\u7334\u5589\u543c\u9005\u7bcc\u7cc7\u9aba\u5f8c\u9c8e\u760a\u5820",
                hua: "\u5316\u534e\u5212\u8bdd\u82b1\u753b\u6ed1\u54d7\u8c41\u9a85\u6866\u733e\u94e7\u7809",
                huai: "\u6000\u574f\u6dee\u5f8a\u69d0\u8e1d",
                huan: "\u8fd8\u73af\u6362\u6b22\u60a3\u7f13\u5524\u7115\u5e7b\u75ea\u6853\u5bf0\u6da3\u5ba6\u57b8\u6d39\u6d63\u8c62\u5942\u90c7\u571c\u737e\u9ca9\u9b1f\u8411\u902d\u6f36\u953e\u7f33\u64d0",
                xun: "\u8baf\u8bad\u8fc5\u5b59\u5bfb\u8be2\u5faa\u65ec\u5de1\u6c5b\u52cb\u900a\u718f\u5f87\u6d5a\u6b89\u9a6f\u9c9f\u85b0\u8340\u6d54\u6d35\u5ccb\u57d9\u5dfd\u90c7\u91ba\u6042\u8368\u7aa8\u8548\u66db\u736f",
                huang: "\u9ec4\u8352\u714c\u7687\u51f0\u614c\u6643\u6f62\u8c0e\u60f6\u7c27\u749c\u604d\u5e4c\u6e5f\u8757\u78fa\u968d\u5fa8\u9051\u8093\u7bc1\u9cc7\u87e5\u7640",
                nai: "\u80fd\u4e43\u5976\u8010\u5948\u9f10\u8418\u6c16\u67f0\u4f74\u827f",
                luan: "\u4e71\u5375\u6ee6\u5ce6\u9e3e\u683e\u92ae\u631b\u5b6a\u8114\u5a08",
                qie: "\u5207\u4e14\u5951\u7a83\u8304\u780c\u9532\u602f\u4f3d\u60ec\u59be\u8d84\u6308\u90c4\u7ba7\u614a",
                jian: "\u5efa\u95f4\u4ef6\u89c1\u575a\u68c0\u5065\u76d1\u51cf\u7b80\u8270\u8df5\u517c\u9274\u952e\u6e10\u67ec\u5251\u5c16\u80a9\u8230\u8350\u7bad\u6d45\u526a\u4fed\u78b1\u8327\u5978\u6b7c\u62e3\u6361\u714e\u8d31\u6e85\u69db\u6da7\u5811\u7b3a\u8c0f\u996f\u950f\u7f04\u7751\u8b07\u8e47\u8171\u83c5\u7fe6\u622c\u6bfd\u7b15\u728d\u7877\u97af\u726e\u67a7\u6e54\u9ca3\u56dd\u88e5\u8e3a\u641b\u7f23\u9e63\u84b9\u8c2b\u50ed\u620b\u8dbc\u6957",
                nan: "\u5357\u96be\u7537\u6960\u5583\u56e1\u8d67\u8169\u56dd\u877b",
                qian: "\u524d\u5343\u94b1\u7b7e\u6f5c\u8fc1\u6b20\u7ea4\u7275\u6d45\u9063\u8c26\u4e7e\u94c5\u6b49\u9ed4\u8c34\u5d4c\u5029\u94b3\u831c\u8654\u5811\u948e\u9a9e\u9621\u63ae\u94a4\u6266\u828a\u728d\u8368\u4edf\u82a1\u60ad\u7f31\u4f65\u6106\u8930\u51f5\u80b7\u5c8d\u6434\u7b9d\u614a\u6920",
                qiang: "\u5f3a\u62a2\u7586\u5899\u67aa\u8154\u9535\u545b\u7f8c\u8537\u8941\u7f9f\u8dc4\u6a2f\u6215\u5af1\u6217\u709d\u956a\u9516\u8723",
                xiang: "\u5411\u9879\u76f8\u60f3\u4e61\u8c61\u54cd\u9999\u964d\u50cf\u4eab\u7bb1\u7f8a\u7965\u6e58\u8be6\u6a61\u5df7\u7fd4\u8944\u53a2\u9576\u98e8\u9977\u7f03\u9aa7\u8297\u5ea0\u9c9e\u8459\u87d3",
                jiao: "\u6559\u4ea4\u8f83\u6821\u89d2\u89c9\u53eb\u811a\u7f34\u80f6\u8f7f\u90ca\u7126\u9a84\u6d47\u6912\u7901\u4f7c\u8549\u5a07\u77eb\u6405\u7ede\u9175\u527f\u56bc\u997a\u7a96\u8de4\u86df\u4fa5\u72e1\u59e3\u768e\u832d\u5ce4\u94f0\u91ae\u9c9b\u6e6b\u5fbc\u9e6a\u50ec\u564d\u827d\u6322\u656b",
                zhuo: "\u7740\u8457\u7f34\u684c\u5353\u6349\u7422\u707c\u6d4a\u914c\u62d9\u8301\u6dbf\u956f\u6dd6\u5544\u6fef\u712f\u502c\u64e2\u65ab\u68f9\u8bfc\u6d5e\u799a",
                qiao: "\u6865\u4e54\u4fa8\u5de7\u6084\u6572\u4fcf\u58f3\u96c0\u77a7\u7fd8\u7a8d\u5ced\u9539\u64ac\u835e\u8df7\u6a35\u6194\u9798\u6a47\u5ce4\u8bee\u8c2f\u6100\u9792\u7857\u5281\u7f32",
                xiao: "\u5c0f\u6548\u9500\u6d88\u6821\u6653\u7b11\u8096\u524a\u5b5d\u8427\u4fcf\u6f47\u785d\u5bb5\u5578\u56a3\u9704\u6dc6\u54ee\u7b71\u900d\u59e3\u7bab\u9a81\u67ad\u54d3\u7ee1\u86f8\u5d24\u67b5\u9b48",
                si: "\u53f8\u56db\u601d\u65af\u98df\u79c1\u6b7b\u4f3c\u4e1d\u9972\u5bfa\u8086\u6495\u6cd7\u4f3a\u55e3\u7940\u53ae\u9a77\u5636\u9536\u4fdf\u5df3\u86f3\u549d\u801c\u7b25\u7e9f\u7cf8\u9e36\u7f0c\u6f8c\u59d2\u6c5c\u53b6\u5155",
                kai: "\u5f00\u51ef\u6168\u5c82\u6977\u607a\u63e9\u9534\u94e0\u5ffe\u57b2\u5240\u950e\u8488",
                jin: "\u8fdb\u91d1\u4eca\u8fd1\u4ec5\u7d27\u5c3d\u6d25\u65a4\u7981\u9526\u52b2\u664b\u8c28\u7b4b\u5dfe\u6d78\u895f\u9773\u747e\u70ec\u7f19\u9485\u77dc\u89d0\u5807\u9991\u8369\u5664\u5ed1\u5997\u69ff\u8d46\u887f\u537a",
                qin: "\u4eb2\u52e4\u4fb5\u79e6\u94a6\u7434\u79bd\u82b9\u6c81\u5bdd\u64d2\u8983\u5659\u77dc\u55ea\u63ff\u6eb1\u82a9\u887e\u5ed1\u9513\u5423\u6a8e\u8793",
                jing: "\u7ecf\u4eac\u7cbe\u5883\u7ade\u666f\u8b66\u7adf\u4e95\u60ca\u5f84\u9759\u52b2\u656c\u51c0\u955c\u775b\u6676\u9888\u8346\u5162\u9756\u6cfe\u61ac\u9cb8\u830e\u8148\u83c1\u80eb\u9631\u65cc\u7cb3\u9753\u75c9\u7b90\u5106\u8ff3\u5a67\u80bc\u522d\u5f2a\u734d",
                ying: "\u5e94\u8425\u5f71\u82f1\u666f\u8fce\u6620\u786c\u76c8\u8d62\u9896\u5a74\u9e70\u8367\u83b9\u6a31\u745b\u8747\u8426\u83ba\u988d\u81ba\u7f28\u701b\u6979\u7f42\u8365\u8424\u9e66\u6ee2\u84e5\u90e2\u8314\u5624\u748e\u5b34\u763f\u5ab5\u6484\u6f46",
                jiu: "\u5c31\u7a76\u4e5d\u9152\u4e45\u6551\u65e7\u7ea0\u8205\u7078\u759a\u63ea\u548e\u97ed\u7396\u81fc\u67e9\u8d73\u9e20\u9e6b\u53a9\u557e\u9604\u6855\u50e6\u9b0f",
                zui: "\u6700\u7f6a\u5634\u9189\u5480\u855e\u89dc",
                juan: "\u5377\u6350\u5708\u7737\u5a1f\u5026\u7ee2\u96bd\u954c\u6d93\u9e43\u9104\u8832\u72f7\u9529\u684a",
                suan: "\u7b97\u9178\u849c\u72fb",
                yun: "\u5458\u8fd0\u4e91\u5141\u5b55\u8574\u97f5\u915d\u8018\u6655\u5300\u82b8\u9668\u7ead\u90e7\u7b60\u607d\u97eb\u90d3\u6c32\u6b92\u6120\u6600\u83c0\u72c1",
                qun: "\u7fa4\u88d9\u9021\u9e87",
                ka: "\u5361\u5580\u5496\u5494\u54af\u4f67\u80e9",
                kang: "\u5eb7\u6297\u625b\u6177\u7095\u4ea2\u7ce0\u4f09\u94aa\u95f6",
                keng: "\u5751\u94ff\u542d",
                kao: "\u8003\u9760\u70e4\u62f7\u94d0\u6832\u5c3b\u7292",
                ken: "\u80af\u57a6\u6073\u5543\u9f88\u88c9",
                yin: "\u56e0\u5f15\u94f6\u5370\u97f3\u996e\u9634\u9690\u59fb\u6bb7\u6deb\u5c39\u836b\u541f\u763e\u5bc5\u8335\u573b\u57a0\u911e\u6e6e\u8693\u6c24\u80e4\u9f88\u7aa8\u5591\u94df\u6d07\u72fa\u5924\u5ef4\u5432\u972a\u831a\u5819",
                kong: "\u7a7a\u63a7\u5b54\u6050\u5025\u5d06\u7b9c",
                ku: "\u82e6\u5e93\u54ed\u9177\u88e4\u67af\u7a9f\u630e\u9ab7\u5800\u7ed4\u5233\u55be",
                kua: "\u8de8\u5938\u57ae\u630e\u80ef\u4f89",
                kui: "\u4e8f\u594e\u6127\u9b41\u9988\u6e83\u532e\u8475\u7aa5\u76d4\u9035\u777d\u9997\u8069\u559f\u5914\u7bd1\u5cbf\u55b9\u63c6\u9697\u5080\u668c\u8dec\u8489\u6126\u609d\u8770",
                kuan: "\u6b3e\u5bbd\u9acb",
                kuang: "\u51b5\u77ff\u6846\u72c2\u65f7\u7736\u5321\u7b50\u909d\u5739\u54d0\u8d36\u593c\u8bf3\u8bd3\u7ea9",
                que: "\u786e\u5374\u7f3a\u96c0\u9e4a\u9619\u7638\u69b7\u7094\u9615\u60ab",
                kun: "\u56f0\u6606\u5764\u6346\u7428\u951f\u9cb2\u918c\u9ae1\u6083\u9603",
                kuo: "\u6269\u62ec\u9614\u5ed3\u86de",
                la: "\u62c9\u843d\u5783\u814a\u5566\u8fa3\u8721\u5587\u524c\u65ef\u782c\u908b\u760c",
                lai: "\u6765\u83b1\u8d56\u7750\u5f95\u7c41\u6d9e\u8d49\u6fd1\u765e\u5d03\u75a0\u94fc",
                lan: "\u5170\u89c8\u84dd\u7bee\u680f\u5c9a\u70c2\u6ee5\u7f06\u63fd\u6f9c\u62e6\u61d2\u6984\u6593\u5a6a\u9611\u8934\u7f71\u5549\u8c30\u9567\u6f24",
                lin: "\u6797\u4e34\u90bb\u8d41\u7433\u78f7\u6dcb\u9e9f\u9716\u9cde\u51db\u62ce\u9074\u853a\u541d\u7cbc\u5d99\u8e8f\u5eea\u6aa9\u5549\u8f9a\u81a6\u77b5\u61d4",
                lang: "\u6d6a\u6717\u90ce\u5eca\u72fc\u7405\u6994\u8782\u9606\u9512\u83a8\u5577\u8497\u7a02",
                liang: "\u91cf\u4e24\u7cae\u826f\u8f86\u4eae\u6881\u51c9\u8c05\u7cb1\u667e\u9753\u8e09\u83a8\u690b\u9b49\u589a",
                lao: "\u8001\u52b3\u843d\u7edc\u7262\u635e\u6d9d\u70d9\u59e5\u4f6c\u5d02\u5520\u916a\u6f66\u75e8\u91aa\u94d1\u94f9\u6833\u8022",
                mu: "\u76ee\u6a21\u6728\u4ea9\u5e55\u6bcd\u7267\u83ab\u7a46\u59c6\u5893\u6155\u725f\u7261\u52df\u7766\u7f2a\u6c90\u66ae\u62c7\u59e5\u94bc\u82dc\u4eeb\u6bea\u5776",
                le: "\u4e86\u4e50\u52d2\u808b\u53fb\u9cd3\u561e\u4ec2\u6cd0",
                lei: "\u7c7b\u7d2f\u96f7\u52d2\u6cea\u857e\u5792\u78ca\u64c2\u956d\u808b\u7fb8\u8012\u5121\u5ad8\u7f27\u9179\u561e\u8bd4\u6a91",
                sui: "\u968f\u5c81\u867d\u788e\u5c3f\u96a7\u9042\u9ad3\u7a57\u7ee5\u968b\u9083\u7762\u795f\u6fc9\u71e7\u8c07\u772d\u837d",
                lie: "\u5217\u70c8\u52a3\u88c2\u730e\u51bd\u54a7\u8d94\u6d0c\u9b23\u57d2\u6369\u8e90",
                leng: "\u51b7\u6123\u68f1\u695e\u5844",
                ling: "\u9886\u4ee4\u53e6\u96f6\u7075\u9f84\u9675\u5cad\u51cc\u73b2\u94c3\u83f1\u68f1\u4f36\u7f9a\u82d3\u8046\u7fce\u6ce0\u74f4\u56f9\u7eeb\u5464\u68c2\u86c9\u9143\u9cae\u67c3",
                lia: "\u4fe9",
                liao: "\u4e86\u6599\u7597\u8fbd\u5ed6\u804a\u5be5\u7f2a\u50da\u71ce\u7f2d\u6482\u64a9\u5639\u6f66\u9563\u5bee\u84fc\u7360\u948c\u5c25\u9e69",
                liu: "\u6d41\u5218\u516d\u7559\u67f3\u7624\u786b\u6e9c\u788c\u6d4f\u69b4\u7409\u998f\u905b\u938f\u9a9d\u7efa\u954f\u65d2\u7198\u9e68\u950d",
                lun: "\u8bba\u8f6e\u4f26\u4ed1\u7eb6\u6ca6\u62a1\u56f5",
                lv: "\u7387\u5f8b\u65c5\u7eff\u8651\u5c65\u5415\u94dd\u5c61\u6c2f\u7f15\u6ee4\u4fa3\u9a74\u6988\u95fe\u507b\u891b\u634b\u8182\u7a06",
                lou: "\u697c\u9732\u6f0f\u964b\u5a04\u6402\u7bd3\u55bd\u9542\u507b\u7618\u9ac5\u8027\u877c\u5d5d\u848c",
                mao: "\u8d38\u6bdb\u77db\u5192\u8c8c\u8302\u8305\u5e3d\u732b\u9ae6\u951a\u61cb\u88a4\u7266\u536f\u94c6\u8004\u5cc1\u7441\u87ca\u8306\u8765\u65c4\u6cd6\u6634\u7780",
                long: "\u9f99\u9686\u5f04\u5784\u7b3c\u62e2\u804b\u9647\u80e7\u73d1\u7abf\u830f\u5499\u783b\u5785\u6cf7\u680a\u7643",
                nong: "\u519c\u6d53\u5f04\u8113\u4fac\u54dd",
                shuang: "\u53cc\u723d\u971c\u5b40\u6cf7",
                shu: "\u672f\u4e66\u6570\u5c5e\u6811\u8f93\u675f\u8ff0\u7f72\u6731\u719f\u6b8a\u852c\u8212\u758f\u9f20\u6dd1\u53d4\u6691\u67a2\u5885\u4fde\u66d9\u6292\u7ad6\u8700\u85af\u68b3\u620d\u6055\u5b70\u6cad\u8d4e\u5eb6\u6f31\u587e\u500f\u6f8d\u7ebe\u59dd\u83fd\u9ecd\u8167\u79eb\u6bf9\u6bb3\u758b\u6445",
                shuai: "\u7387\u8870\u5e05\u6454\u7529\u87c0",
                lve: "\u7565\u63a0\u950a",
                ma: "\u4e48\u9a6c\u5417\u6469\u9ebb\u7801\u5988\u739b\u561b\u9a82\u62b9\u8682\u551b\u87c6\u72b8\u6769",
                me: "\u4e48\u9ebd",
                mai: "\u4e70\u5356\u9ea6\u8fc8\u8109\u57cb\u973e\u836c\u52a2",
                man: "\u6ee1\u6162\u66fc\u6f2b\u57cb\u8513\u7792\u86ee\u9cd7\u9992\u5e54\u8c29\u87a8\u71b3\u7f26\u9558\u989f\u5881\u9794",
                mi: "\u7c73\u5bc6\u79d8\u8ff7\u5f25\u871c\u8c1c\u89c5\u9761\u6ccc\u772f\u9e8b\u7315\u8c27\u54aa\u7cdc\u5b93\u6c68\u919a\u5627\u5f2d\u8112\u5196\u5e42\u7962\u7e3b\u863c\u8288\u7cf8\u6549",
                men: "\u4eec\u95e8\u95f7\u7792\u6c76\u626a\u7116\u61d1\u9794\u9494",
                mang: "\u5fd9\u76f2\u832b\u8292\u6c13\u83bd\u87d2\u9099\u786d\u6f2d",
                meng: "\u8499\u76df\u68a6\u731b\u5b5f\u840c\u6c13\u6726\u9530\u6aac\u52d0\u61f5\u87d2\u8722\u867b\u9efe\u8813\u8268\u750d\u824b\u77a2\u791e",
                miao: "\u82d7\u79d2\u5999\u63cf\u5e99\u7784\u7f2a\u6e3a\u6dfc\u85d0\u7f08\u9088\u9e4b\u676a\u7707\u55b5",
                mou: "\u67d0\u8c0b\u725f\u7f2a\u7738\u54de\u936a\u86d1\u4f94\u53b6",
                miu: "\u7f2a\u8c2c",
                mei: "\u7f8e\u6ca1\u6bcf\u7164\u6885\u5a92\u679a\u59b9\u7709\u9b45\u9709\u6627\u5a9a\u73ab\u9176\u9541\u6e44\u5bd0\u8393\u8882\u6963\u7cdc\u5d4b\u9545\u6d7c\u7338\u9e5b",
                wen: "\u6587\u95ee\u95fb\u7a33\u6e29\u7eb9\u543b\u868a\u96ef\u7d0a\u761f\u6c76\u97eb\u520e\u74ba\u739f\u960c",
                mie: "\u706d\u8511\u7bfe\u4e5c\u54a9\u881b",
                ming: "\u660e\u540d\u547d\u9e23\u94ed\u51a5\u8317\u6e9f\u9169\u7791\u879f\u669d",
                na: "\u5185\u5357\u90a3\u7eb3\u62ff\u54ea\u5a1c\u94a0\u5450\u637a\u8872\u954e\u80ad",
                nei: "\u5185\u90a3\u54ea\u9981",
                nuo: "\u96be\u8bfa\u632a\u5a1c\u7cef\u61e6\u50a9\u558f\u6426\u9518",
                ruo: "\u82e5\u5f31\u504c\u7bac",
                nang: "\u56ca\u9995\u56d4\u66e9\u652e",
                nao: "\u8111\u95f9\u607c\u6320\u7459\u6dd6\u5b6c\u57b4\u94d9\u6861\u5476\u7847\u7331\u86f2",
                ni: "\u4f60\u5c3c\u5462\u6ce5\u7591\u62df\u9006\u502a\u59ae\u817b\u533f\u9713\u6eba\u65ce\u6635\u576d\u94cc\u9cb5\u4f32\u6029\u7768\u730a",
                nen: "\u5ae9\u6041",
                neng: "\u80fd",
                nin: "\u60a8\u6041",
                niao: "\u9e1f\u5c3f\u6eba\u8885\u8132\u8311\u5b32",
                nie: "\u6444\u8042\u634f\u6d85\u954d\u5b7d\u637b\u8616\u556e\u8e51\u55eb\u81ec\u954a\u989e\u4e5c\u9667",
                niang: "\u5a18\u917f",
                ning: "\u5b81\u51dd\u62e7\u6cde\u67e0\u549b\u72de\u4f5e\u804d\u752f",
                nu: "\u52aa\u6012\u5974\u5f29\u9a7d\u5e11\u5b65\u80ec",
                nv: "\u5973\u9495\u8844\u6067",
                ru: "\u5165\u5982\u5973\u4e73\u5112\u8fb1\u6c5d\u8339\u8925\u5b7a\u6fe1\u8815\u5685\u7f1b\u6ebd\u94f7\u6d33\u85b7\u8966\u98a5\u84d0",
                nuan: "\u6696",
                nve: "\u8650\u759f",
                re: "\u70ed\u82e5\u60f9\u558f",
                ou: "\u533a\u6b27\u5076\u6bb4\u5455\u79ba\u85d5\u8bb4\u9e25\u74ef\u6ca4\u8026\u6004",
                pao: "\u8dd1\u70ae\u6ce1\u629b\u5228\u888d\u5486\u75b1\u5e96\u72cd\u530f\u812c",
                pou: "\u5256\u638a\u88d2",
                pen: "\u55b7\u76c6\u6e53",
                pie: "\u77a5\u6487\u82e4\u6c15\u4e3f",
                pin: "\u54c1\u8d2b\u8058\u9891\u62fc\u62da\u98a6\u59d8\u5ad4\u6980\u725d",
                se: "\u8272\u585e\u745f\u6da9\u556c\u7a51\u94ef\u69ed",
                qing: "\u60c5\u9752\u6e05\u8bf7\u4eb2\u8f7b\u5e86\u503e\u9877\u537f\u6674\u6c22\u64ce\u6c30\u7f44\u78ec\u873b\u7b90\u9cad\u7dae\u82d8\u9ee5\u570a\u6aa0\u8b26",
                zan: "\u8d5e\u6682\u6512\u5811\u661d\u7c2a\u7ccc\u74d2\u933e\u8db1\u62f6",
                shao: "\u5c11\u7ecd\u53ec\u70e7\u7a0d\u90b5\u54e8\u97f6\u634e\u52fa\u68a2\u9798\u828d\u82d5\u52ad\u8244\u7b72\u6753\u6f72",
                sao: "\u626b\u9a9a\u5ac2\u68a2\u7f2b\u6414\u7619\u81ca\u57fd\u7f32\u9ccb",
                sha: "\u6c99\u53a6\u6740\u7eb1\u7802\u5565\u838e\u5239\u6749\u50bb\u715e\u9ca8\u970e\u55c4\u75e7\u88df\u6332\u94e9\u553c\u6b43",
                xuan: "\u53bf\u9009\u5ba3\u5238\u65cb\u60ac\u8f69\u55a7\u7384\u7eda\u6e32\u7487\u70ab\u8431\u7663\u6f29\u7729\u6684\u714a\u94c9\u6966\u6ceb\u8c16\u75c3\u78b9\u63ce\u955f\u5107",
                ran: "\u7136\u67d3\u71c3\u5189\u82d2\u9aef\u86ba",
                rang: "\u8ba9\u58e4\u6518\u56b7\u74e4\u7a70\u79b3",
                rao: "\u7ed5\u6270\u9976\u5a06\u6861\u835b",
                reng: "\u4ecd\u6254",
                ri: "\u65e5",
                rou: "\u8089\u67d4\u63c9\u7cc5\u97a3\u8e42",
                ruan: "\u8f6f\u962e\u670a",
                run: "\u6da6\u95f0",
                sa: "\u8428\u6d12\u6492\u98d2\u5345\u4ee8\u810e",
                suo: "\u6240\u4e9b\u7d22\u7f29\u9501\u838e\u68ad\u7410\u55e6\u5506\u5522\u5a11\u84d1\u7fa7\u6332\u686b\u55cd\u7743",
                sai: "\u601d\u8d5b\u585e\u816e\u567b\u9cc3",
                shui: "\u8bf4\u6c34\u7a0e\u8c01\u7761\u6c35",
                sang: "\u6851\u4e27\u55d3\u6421\u98a1\u78c9",
                sen: "\u68ee",
                seng: "\u50e7",
                shai: "\u7b5b\u6652",
                shang: "\u4e0a\u5546\u5c1a\u4f24\u8d4f\u6c64\u88f3\u5892\u664c\u57a7\u89de\u6b87\u71b5\u7ef1",
                xing: "\u884c\u7701\u661f\u8165\u7329\u60fa\u5174\u5211\u578b\u5f62\u90a2\u9967\u9192\u5e78\u674f\u6027\u59d3\u9649\u8347\u8365\u64e4\u60bb\u784e",
                shou: "\u6536\u624b\u53d7\u9996\u552e\u6388\u5b88\u5bff\u7626\u517d\u72e9\u7ef6\u824f\u624c",
                shuo: "\u8bf4\u6570\u7855\u70c1\u6714\u94c4\u5981\u69ca\u84b4\u6420",
                su: "\u901f\u7d20\u82cf\u8bc9\u7f29\u5851\u8083\u4fd7\u5bbf\u7c9f\u6eaf\u9165\u5919\u612b\u7c0c\u7a23\u50f3\u8c21\u6d91\u850c\u55c9\u89eb",
                shua: "\u5237\u800d\u5530",
                shuan: "\u6813\u62f4\u6dae\u95e9",
                shun: "\u987a\u77ac\u821c\u542e",
                song: "\u9001\u677e\u5b8b\u8bbc\u9882\u8038\u8bf5\u5d69\u6dde\u6002\u609a\u5d27\u51c7\u5fea\u7ae6\u83d8",
                sou: "\u8258\u641c\u64de\u55fd\u55d6\u53df\u998a\u85ae\u98d5\u55fe\u6eb2\u953c\u878b\u778d",
                sun: "\u635f\u5b59\u7b0b\u836a\u69ab\u96bc\u72f2\u98e7",
                teng: "\u817e\u75bc\u85e4\u6ed5\u8a8a",
                tie: "\u94c1\u8d34\u5e16\u992e\u841c",
                tu: "\u571f\u7a81\u56fe\u9014\u5f92\u6d82\u5410\u5c60\u5154\u79c3\u51f8\u837c\u948d\u83df\u580d\u9174",
                wai: "\u5916\u6b6a\u5d34",
                wang: "\u738b\u671b\u5f80\u7f51\u5fd8\u4ea1\u65fa\u6c6a\u6789\u5984\u60d8\u7f54\u8f8b\u9b4d",
                weng: "\u7fc1\u55e1\u74ee\u84ca\u8579",
                zhua: "\u6293\u631d\u722a",
                yang: "\u6837\u517b\u592e\u9633\u6d0b\u626c\u6768\u7f8a\u8be6\u6c27\u4ef0\u79e7\u75d2\u6f3e\u75a1\u6cf1\u6b83\u6059\u9e2f\u5f89\u4f6f\u600f\u7080\u70ca\u9785\u86d8",
                xiong: "\u96c4\u5144\u718a\u80f8\u51f6\u5308\u6c79\u828e",
                yo: "\u54df\u5537",
                yong: "\u7528\u6c38\u62e5\u52c7\u6d8c\u6cf3\u5eb8\u4fd1\u8e0a\u4f63\u548f\u96cd\u752c\u955b\u81c3\u9095\u86f9\u607f\u6175\u58c5\u75c8\u9cd9\u5889\u9954\u5581",
                za: "\u6742\u624e\u54b1\u7838\u548b\u531d\u5482\u62f6",
                zai: "\u5728\u518d\u707e\u8f7d\u683d\u4ed4\u5bb0\u54c9\u5d3d\u753e",
                zao: "\u9020\u65e9\u906d\u67a3\u566a\u7076\u71e5\u7cdf\u51ff\u8e81\u85fb\u7682\u6fa1\u86a4\u5523",
                zei: "\u8d3c",
                zen: "\u600e\u8c2e",
                zeng: "\u589e\u66fe\u7efc\u8d60\u618e\u9503\u7511\u7f7e\u7f2f",
                zhei: "\u8fd9",
                zou: "\u8d70\u90b9\u594f\u63cd\u8bf9\u9a7a\u966c\u6971\u9139\u9cb0",
                zhuai: "\u8f6c\u62fd",
                zun: "\u5c0a\u9075\u9cdf\u6a3d\u6499",
                dia: "\u55f2",
                nou: "\u8028"
            },
            c = {};
        n(), t.exports = {
            getPinyin: i,
            getFirstLetter: o
        }
    }, EZWm: function (t, e, n) {
        "use strict";
        n("gEze");
        var i = n("Agcf"),
            o = n("z6Rq"),
            a = n("YHhD"),
            r = n("pZfc"),
            s = n("lj6U"),
            c = "toggle-animate",
            l = $.extend({}, i, {
                init: function (t) {
                    return this.opts = t, this.mountComponent(), this.initVariables(), this.setupBubbleMaxHeight(), this.setupSearchWidget(), this.setupProductSearchBar(), this.setupSubscriber(), this.bindEvents(), this.start(), this
                }, mountComponent: function () {
                    $(this.opts.rawContent).appendTo($(this.opts.selector))
                }, initVariables: function () {
                    this.isNeedRender = !0, this.$win = $(window), this.$nav = $("#navigationBar,#navigationBarM"), this.$navPC = $("#navigationBar"), this.$topNavSndLevel = $("#qcTopNavSndLevel"), this.$topNavMain = $("#qcTopNavMain"), this.$topNavSndOpera = $("#qcTopNavSndOpera"), this.$topNavMOpera = $("#qcTopNavMOpera"), this.$topNavList = this.$topNavSndLevel.find(".J-qcTopNavList"), this.$topNavMSearch = $("#qcTopNavMSearch"), this.$topNavMMenuOpen = this.$topNavMOpera.find(".J-qcTopNavMMenu"), this.$topNavMSearchOpen = this.$topNavMOpera.find(".J-qcTopNavMSearchOpen"), this.$topNavMUserProfileOpen = this.$topNavMOpera.find(".J-qcTopNavProfile"), this.$topNavMUserProfile = $("#qcTopNavMUserProfile"), this.$topNavMMenu = $("#qcTopNavMMenu"), this.$topNavSheetWrapper = $("#qcTopNavSheetWrapper"), this.$topNavBubble = this.$topNavSheetWrapper.find(".J-qcTopNavBubbleInner"), this.absolute = window.ISABSOLUTEHEADER, this.searchBars = null, this.activedSheetId = 0, this.isLogin = a.get("uin") && (a.get("skey") || a.get("p_skey")), this.userInfo = {
                        nick: a.get("nick") || ""
                    }
                }, setupBubbleMaxHeight: function () {
                    var t = $(".J-qcTopNavBubbleInner"),
                        e = 10,
                        n = this.$topNavSndLevel.get(0).getBoundingClientRect().bottom,
                        i = this.$win.height() - n - e;
                    t.css({
                        "max-height": i
                    })
                }, setupPdBubbleLayout: function (t) {
                    var e = this.$topNavSheetWrapper.find(".J-qcTopNavBubbleMenuConWrap");
                    e.css({
                        backgroundColor: "#fff"
                    });
                    var n = 200,
                        i = this.$win.width(),
                        o = 20,
                        a = i - t - o - n,
                        r = void 0;
                    r = a > 950 ? 950 : a < 850 ? 850 : a, e.width(Math.min(r, a)), e.find(".J-qcTopNavBubbleMenuCon").css({
                        minWidth: 800
                    }), this.$topNavSheetWrapper.find(".J-qcPdMenuMain").width("auto");
                    var s = this.$topNavSheetWrapper.find(".J-qcPdMenuMain, .J-qcPdMenuRt"),
                        c = s.closest(".J-qcTopNavBubbleInner").height();
                    s.css({
                        minHeight: c
                    })
                }, bindEvents: function () {
                    function t() {
                        var t = $(this),
                            n = t.data("id"),
                            i = t.data("action");
                        "expand" == i ? e.activedSheetId = n : e.activedSheetId = 0, e.emit("sheetStateChange")
                    }
                    var e = this,
                        n = e.$topNavList.find(".J-qcTopNavDropdownWrapper");
                    e.$topNavList.on("mouseenter", ".J-qcTopNavItem", t).on("mouseenter", ".J-qcTopNavMore", function () {
                        e.activedSheetId = 0, e.emit("sheetStateChange"), n.show()
                    }).on("mouseleave", function () {
                        e.activedSheetId = 0, e.emit("sheetStateChange")
                    }).on("mouseleave", ".J-qcTopNavMore", function () {
                        n.hide()
                    }).on("click", ".J-qcTopNavMore .J-qcTopNavOption", function () {
                        t.apply(this, arguments), n.hide()
                    }), e.$topNavSheetWrapper.on("mouseenter", "[data-parent]", function () {
                        e.activedSheetId = $(this).data("parent"), e.emit("sheetStateChange")
                    }).on("mouseleave", "[data-parent]", function () {
                        e.activedSheetId = 0, e.searchBars && e.searchBars.forEach(function (t) {
                            return t.resetState()
                        }), e.isNeedRender = !0, e.emit("sheetStateChange")
                    }), e.$topNavSheetWrapper.find(".J-qcTopNavBubbleMenuLt").menuAim({
                        activate: e.activePdItem.bind(e),
                        rowSelector: ".J-qcTopNavBubbleMenuItem"
                    }), e.$topNavSndOpera.on("mouseleave", ".J-qcTopNavProfile", function () {
                        $(this).find(".J-qcTopNavProfileDropdown").hide()
                    }).on("mouseenter", ".J-qcTopNavProfile", function () {
                        e.isLogin && $(this).find(".J-qcTopNavProfileDropdown").show()
                    }), e.$topNavMOpera.on("click", ".J-qcTopNavProfile", function () {
                        $(".J-topNavfooter").hide(), $(".J-topNavfooter[data-type=" + (e.isLogin ? "has-login" : "not-login") + "]").show(), $(".J-qcTopNavNickname").parents("li.dropdown-mini-item")[e.isLogin ? "show" : "hide"](), $(".J-qcTopNavBtnLogoutWrapper")[e.isLogin ? "show" : "hide"](), e.expandMUserProfile(), e.hideMCtrl()
                    }).on("click", ".J-qcTopNavMMenu", function () {
                        e.isMMenuCloseMode() ? e.closeMCtrlDetail() : (e.expandMMenu(), e.hideMCtrl())
                    }), e.$topNavMUserProfile.on("click", ".J-doLoginBtn", function () {
                        e.doLogin()
                    }).on("click", ".J-doRegistryBtn", function () {
                        e.doRegister()
                    }), e.$topNavMMenu.on("click", ".J-qcMenuTitle", function () {
                        var t = $(this),
                            n = t.data("action") || "toggle";
                        switch (n) {
                        case "link":
                            return !0;
                        case "lang":
                            var i = t.data("lang") || "cn";
                            switch (i) {
                                default:
                                case "cn":
                                    location.href = "https://www.xinyouw.org";
                                break;
                            case "intl":
                                e.doLogout(), e.goToIntlHome()
                            }
                            return !1;
                        default:
                        case "toggle":
                            var o = t.next(),
                                a = !t.hasClass("actived");
                            return t.toggleClass("actived"), o.length && a && (o.find(".J-qcMenuTitle").removeClass("actived"), o.find(".J-qcMenuList").hide()), o.slideToggle("fast"), !1
                        }
                    }), e.$nav.on("click", ".J-qcTopNavBtnRegister", function () {
                        return e.doRegister(), !1
                    }).on("click", ".J-qcTopNavBtnLogin", function () {
                        return e.doLogin(), !1
                    }).on("click", ".J-qcTopNavBtnLogout", function () {
                        return e.doLogout({
                            toLoginPage: !0,
                            onBeforeToLoginPage: function () {
                                e.resetLoginState()
                            }
                        }), e.resetLoginState(), !1
                    }).on("click", ".J-qcTopNavListMore", function () {
                        var t = e.$topNavMain.hasClass("collapsed");
                        if (e.$topNavMain.toggleClass("collapsed"), t) e.$topNavList.css("left", "0px");
                        else {
                            var n = $.map(e.$topNavList.find(".J-qcTopNavItem"), function (t) {
                                    return $(t).width()
                                }).reduce(function (t, e) {
                                    return t + e
                                }, 0),
                                i = e.$topNavList.parent(".J-qcTopNavListWrapper").innerWidth();
                            e.$topNavList.css("left", i - n)
                        }
                    }), s.simulateScrollY({
                        $ctx: this.$topNavBubble,
                        targetSelector: ".J-qcTopNavBubbleMenuConWrap",
                        step: 30,
                        forceSimulate: !0
                    }), e.bindUpDownKeydownEvent()
                }, resetLoginState: function () {
                    this.isLogin = !1, this.userInfo = {}, this.renderUserProfile(), this.closeMCtrlDetail()
                }, setupSearchWidget: function () {
                    var t = this;
                    t.searchBarM = o.newInstance({
                        el: t.$topNavMSearch[0],
                        triggerEl: t.$topNavMSearchOpen[0],
                        closeEl: null,
                        onOpen: function () {
                            t.$topNavMSearch.fadeIn("fast"), t.hideMCtrl(), t.showMask()
                        }, onClose: function () {
                            t.$topNavMSearch.fadeOut("fast"), t.showMCtrl(), t.hideMask()
                        }
                    })
                }, setupProductSearchBar: function () {
                    var t = this,
                        e = void 0,
                        n = Date.now(),
                        i = 10,
                        o = {
                            product: {
                                WINDOW_STORAGE_KEY: "__PRODUCT_SEARCH_SOURCE_LIST",
                                el: ".J-qcPdMenuSearchBar"
                            },
                            solution: {
                                WINDOW_STORAGE_KEY: "__SOLUTION_SEARCH_SOURCE_LIST",
                                el: ".J-qcSolutionMenuSearchBar"
                            }
                        };
                    e = setInterval(function () {
                        var a = window[o.product.WINDOW_STORAGE_KEY] || [],
                            r = window[o.solution.WINDOW_STORAGE_KEY] || [],
                            s = a.length && r.length && "function" == typeof window.ProductSearchBar;
                        (s || (Date.now() - n) / 1e3 > i) && (clearInterval(e), s && (t.searchBars = [o.product, o.solution].map(function (e) {
                            var n = e.WINDOW_STORAGE_KEY,
                                i = e.el;
                            return new window.ProductSearchBar({
                                el: t.$topNavSheetWrapper.find(i),
                                sourceList: window[n]
                            })
                        })))
                    }, 1e3)
                }, setupCurrNavPath: function () {
                    var t = this,
                        e = location.href,
                        n = [],
                        i = this.$topNavMain.find(".J-qcTopNavItem").find('[href="' + e + '"]'),
                        o = i.eq(0).parent();
                    if (0 === o.length) {
                        var a = function (e) {
                            if (e) {
                                var n = t.$topNavSheetWrapper.find(".J-qcTopNavBubbleMenuLt .J-qcTopNavBubbleMenuItem");
                                n.filter("[data-menuroot=" + e + "]").addClass("curr")
                            }
                        };
                        /^(\/product\/[\w-]+)(?:\/[\w-]+)?$/.test(location.pathname) && (e = "https://www.xinyouw.org" + RegExp.$1);
                        var r = this.$topNavSheetWrapper.find(".J-qcTopNavBubbleMenuCon,.J-qcTopNavMenuList"),
                            s = r.find('[href="' + e + '"]').not("[href*=match_ignore]").not(function () {
                                return $(this).closest(".J-qcPdMenuRt").length > 0
                            }),
                            c = s.filter(function () {
                                return "hot" === $(this).closest(".J-qcPdMenuCon").data("menuparent")
                            });
                        c.length && (s = s.not(function () {
                            return "hot" === $(this).closest(".J-qcPdMenuCon").data("menuparent")
                        }), c.eq(0).addClass("curr"));
                        var l = e.split("?", 1)[0];
                        0 === s.length && (s = r.find('[href^="' + l + '"]'));
                        for (var h = 0, u = s.length; h < u; h++) {
                            var d = s.eq(h).attr("href");
                            if (d && d.split("?", 1)[0] === l) break;
                            h === u - 1 && (h = u)
                        }
                        var p = s.eq(h);
                        p.hasClass("J-qcPdMenuChildProduct") ? (n = p, p.closest(".p-menu-p-card").find(">.J-qcPdMenuProduct").addClass("curr"), a(p.closest(".J-qcPdMenuCon").data("menuparent"))) : p.hasClass("J-qcPdMenuProduct") ? (n = p, a(p.closest(".J-qcPdMenuCon").data("menuparent"))) : n = p.parents(".menu-item");
                        var f = n.parents(".J-qcTopNavBubbleInner").data("parent");
                        o = this.$topNavList.children('[data-id="' + f + '"]')
                    }
                    if (0 === o.length) {
                        var v = /^(?:https?:\/\/)?[a-zA-Z.\-_0-9]+\/([a-zA-Z.\-_0-9]+)\/.*$/,
                            m = v.exec(e);
                        if (m && m.length > 1) {
                            var g = m[1];
                            o = this.$topNavMain.find('.J-qcTopNavItem[data-id="' + g + '"]')
                        }
                    }
                    0 === o.length && (0 === e.indexOf("https://market.cloud.tencent.com") ? o = this.$topNavMain.find('.J-qcTopNavItem[data-id="market"]') : 0 === e.indexOf("https://buy.cloud.tencent.com/price") ? o = this.$topNavMain.find('.J-qcTopNavItem[data-id="price"]') : 0 === e.indexOf("https://partners.cloud.tencent.com") && (o = this.$topNavMain.find('.J-qcTopNavItem[data-id="cooperate"]'))), [n, o].forEach(function (t) {
                        t.length > 0 && t.addClass("curr")
                    })
                }, setupSubscriber: function () {
                    var t = this;
                    t.$navPC.on("sheetStateChange", s.debounce(function (e, n, i) {
                        "noNeedRender" === i && (t.isNeedRender = !1), "needRender" === i && (t.isNeedRender = !0), t.performSheetTransform(n)
                    }, 160))
                }, emit: function () {
                    this.$navPC.trigger.apply(this.$navPC, arguments)
                }, start: function () {
                    this.renderUserProfile(), this.setupCurrNavPath(), this.fetchUserInfo(), this.buildMMenu()
                }, onResize: function () {
                    this.setupBubbleMaxHeight()
                }, onResizeNarrow: function () {
                    this.$topNavMMenu.hide(), this.hideMask()
                }, onResizeWide: function () {
                    this.isMMenuCloseMode() && this.closeMCtrlDetail(), this.hideMask()
                }, onMaskClick: function () {}, expandMUserProfile: function () {
                    this.$topNavMUserProfile.is(":visible") || ($("body").css({
                        overflow: "hidden"
                    }), this.$topNavMUserProfile.fadeIn(200), this.showMask())
                }, collapseMUserProfile: function () {
                    this.$topNavMUserProfile.is(":visible") && ($("body").css({
                        overflow: "initial"
                    }), this.$topNavMUserProfile.fadeOut(200), this.hideMask())
                }, expandMMenu: function () {
                    this.$topNavMMenu.is(":visible") || (this.showMask(), this.$topNavMMenu.fadeIn("fast"))
                }, collapseMMenu: function () {
                    this.$topNavMMenu.is(":visible") && (this.$topNavMMenu.stop().fadeOut("fast"), this.hideMask())
                }, renderUserProfile: function () {
                    var t = this,
                        e = t.isLogin,
                        n = e ? (t.userInfo.msgInfo || {}).unread || 0 : 0,
                        i = e && t.userInfo.accountInfo ? (t.userInfo.accountInfo.voucher || {}).leftAmount || 0 : 0,
                        o = n > 0 || i > 0;
                    t.$nav.find(".J-qcTopNavNickname").text(t.userInfo.nick), t.$nav.find(".J-qcTopNavBtnLogoutWrapper").toggle(e), t.$nav.find(".J-qcTopNavBtnLogin").toggle(!e), t.$nav.find(".J-qcTopNavBtnRegister").toggle(!e), e ? t.$topNavSndOpera.find(".J-qcTopNavProfile").show() : t.$topNavSndOpera.find(".J-qcTopNavProfile").hide(), t.$nav.find(".J-qcTopNavProfile i").toggleClass("has-msg", o), t.$nav.find(".J-qcTopNavUserMsg").text(n).toggle(o), i && (t.$nav.find(".J-qcTopNavUserVoucher").text("\u4ee3\u91d1\u5238(" + i + ")").show(), t.$nav.find(".J-qcTopNavMUserVoucherNum").text(i), t.$nav.find(".J-qcTopNavMUserVoucher").show()), t.$topNavSndOpera.css("visibility", "visible")
                }, fetchUserInfo: function () {
                    var t = this;
                    t.isLogin && r.getUserInfo({
                        params: {
                            info: ["msgInfo", "accountInfo"]
                        },
                        succCb: function (e) {
                            t.isLogin = !0, t.userInfo = e, t.renderUserProfile()
                        }, errCb: function (e) {
                            t.isLogin = !1, t.userInfo = {}, t.renderUserProfile()
                        }
                    })
                }, performSheetTransform: function (t) {
                    var e = this,
                        t = t || this.activedSheetId,
                        n = $(window).width(),
                        i = e.$topNavList.find('[data-id="' + t + '"]'),
                        o = e.$topNavSheetWrapper.find('[data-parent="' + t + '"]'),
                        a = !!o.data("layout"),
                        r = void 0;
                    if (a) r = n < 1367 ? 824 : 1034, s.checkImgLazyLoad(o);
                    else {
                        var c = o.find(".menu-list-col").length,
                            l = n <= 100 ? 180 : n <= 1250 ? 200 : 231,
                            h = 10;
                        r = c * l + 2 * h
                    }
                    var u = n <= 1200 ? 10 : n <= 1560 ? (n - 1150) / 5 : 90,
                        d = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                    if (t && o.length) {
                        var p = i.offset().left + Math.floor(i.width() / 2),
                            f = Math.max(p - Math.floor(r / 2), u),
                            v = p - f;
                        a && e.setupPdBubbleLayout(f), o.css("left", v).show().siblings().hide(), e.isNeedRender && e.$topNavSheetWrapper.css({
                            "padding-left": 0,
                            left: f
                        }), d ? e.$topNavSheetWrapper.show() : e.$topNavSheetWrapper.stop(!0, !0).slideDown(200), e.afterSheetSlideDown()
                    } else {
                        d ? e.$topNavSheetWrapper.hide() : e.$topNavSheetWrapper.stop(!0, !0).slideUp(160);
                        var m = e.$topNavSheetWrapper.find(".J-qcTopNavBubbleMenuItem");
                        if (m.length) {
                            var g = m.eq(0);
                            e.activePdItem(g)
                        }
                    }
                }, activePdItem: function (t) {
                    var e = $(t),
                        n = this;
                    e.addClass("actived").siblings(".J-qcTopNavBubbleMenuItem").removeClass("actived");
                    var i = e.data("menuroot");
                    n.$topNavSheetWrapper.find(".J-qcPdMenuCon,.J-qcPdMenuRt").hide();
                    var o = n.$topNavSheetWrapper.find(".J-qcPdMenuCon[data-menuparent=" + i + "]"),
                        a = n.$topNavSheetWrapper.find(".J-qcPdMenuRt[data-menuparent=" + i + "]"),
                        r = n.$topNavSheetWrapper.find(".J-qcTopNavBubbleMenu");
                    o.children().length > 3 ? r.addClass("c-more-cols") : r.removeClass("c-more-cols"), o.css("display", "block"), a.css("display", "block"), this.it % 5 === 0 || (this.it || (this.it = 0), this.it++), o.closest(".J-qcTopNavBubbleMenuConWrap").scrollTop(0).scrollLeft(0), n.searchBars && n.searchBars.forEach(function (t) {
                        return t.blurInput()
                    })
                }, afterSheetSlideDown: function () {
                    self.searchBars && self.searchBars.forEach(function (t) {
                        return t.onSheetSlideDown()
                    });
                    var t = this.$topNavSheetWrapper.find(".J-qcPdMenuMain, .J-qcPdMenuRt"),
                        e = t.closest(".J-qcTopNavBubbleInner").height();
                    t.css({
                        minHeight: e
                    })
                }, bindUpDownKeydownEvent: function () {
                    var t = this,
                        e = 60;
                    this.$win.on("keydown", function (n) {
                        if (t.activedSheetId) {
                            var i = n.which,
                                o = t.$topNavBubble.filter("[data-parent=" + t.activedSheetId + "]"),
                                a = o.scrollTop();
                            switch (i) {
                            case 38:
                                a > 0 && (o.scrollTop(a - Math.min(a, e)), n.preventDefault());
                                break;
                            case 40:
                                var r = 0;
                                o.children().each(function () {
                                    r += $(this).outerHeight()
                                });
                                var s = r - a - o.height();
                                s > 0 && (o.scrollTop(a + Math.min(s, e)), n.preventDefault())
                            }
                        }
                    })
                }, parseNavigationData: function () {
                    function t(t, e) {
                        var n = a.find('[data-root="' + t + '"]'),
                            i = n.find(".J-fstLevelTitle"),
                            o = {
                                title: i.html(),
                                link: e
                            };
                        return i.data("productlayout") ? (o.children = [], $.map(n.find(".J-qcLeftPdMenuWrapper"), function (t) {
                            var e = $(t).find(".J-sndLevelHiddenTitle");
                            if (e.data("flatmobile")) {
                                var n = {
                                    title: $.trim(e.text())
                                };
                                n.children = $.map($(t).find(".J-qcPdMenuProduct"), function (t) {
                                    var e = $(t),
                                        n = {
                                            title: e.html().trim(),
                                            link: $.trim(e.prop("href") || ""),
                                            hotrep: $.trim(e.attr("hotrep") || "")
                                        };
                                    return n
                                }), o.children.push(n)
                            } else $.map($(t).find(".J-qcPdMenuBox"), function (t) {
                                var e = {
                                    title: $(t).find(".J-qcPdMenuCategory").text()
                                };
                                e.children = $.map($(t).find(".J-qcPdMenuProduct"), function (t) {
                                    var e = $(t),
                                        n = {
                                            title: e.html().trim(),
                                            link: $.trim(e.prop("href") || ""),
                                            hotrep: $.trim(e.attr("hotrep") || "")
                                        },
                                        i = e.siblings(".p-menu-p-card-bd").find(".J-qcPdMenuChildProduct");
                                    return i.length && (n.children = $.map(i, function (t) {
                                        var e = $(t),
                                            n = {
                                                title: $.trim(e.text()),
                                                link: $.trim(e.prop("href") || ""),
                                                hotrep: $.trim(e.attr("hotrep") || "")
                                            };
                                        return n
                                    })), n
                                }), e.children.length && o.children.push(e)
                            })
                        })) : o.children = $.map(n.find(".J-sndLevelTitle"), function (t) {
                            var e = $(t).next(".J-sndLevelMenu"),
                                n = {
                                    title: $(t).html().trim()
                                };
                            return n.children = $.map(e.find(".menu-item"), function (t) {
                                var e = $(t),
                                    n = e.find("a"),
                                    i = {
                                        title: n.find("h3").html().trim(),
                                        link: (n.prop("href") || "").trim(),
                                        hotrep: (n.attr("hotrep") || "").trim()
                                    };
                                return e.hasClass("hasitem") && (i.children = $.map(e.find(".menu-item-child a"), function (t) {
                                    var e = $(t),
                                        n = {
                                            title: e.text().trim(),
                                            link: (e.prop("href") || "").trim(),
                                            hotrep: (e.attr("hotrep") || "").trim()
                                        };
                                    return n
                                })), i
                            }), n
                        }), o
                    }

                    function e(t, e) {
                        function n(t) {
                            var i = $(t),
                                o = i.find(".J-qcMenuTitle:eq(0)").text().trim(),
                                a = [],
                                r = i.children(".J-qcMenuList");
                            return a = r.length ? $.map(r.find(".menu-item, .menu-link"), function (t) {
                                var e = $(t),
                                    n = e.find("a"),
                                    i = $(t).hasClass("menu-item") ? n.find("h3").text().trim() : n.text().trim();
                                return {
                                    title: i,
                                    link: (n.attr("href") || "").trim(),
                                    hotrep: (n.attr("hotrep") || "").trim()
                                }
                            }) : $.map(i.children(".menu-area"), n), {
                                title: o,
                                link: e,
                                children: a
                            }
                        }
                        var i = o.find('[data-parent="' + t + '"]');
                        return n(i.children(".menu-area")[0])
                    }
                    var n = [],
                        i = $("#qcFstLeftNav"),
                        o = $("#qcSndLeftNav"),
                        a = $("#qcTrdLeftNav");
                    try {
                        n = $.map(i.find('[data-action="expand"]'), function (n) {
                            var i = $(n),
                                a = i.data("id"),
                                r = o.find('[data-parent="' + a + '"]'),
                                s = r.data("children"),
                                c = i.data("link");
                            return "external" === s ? t(a, c) : e(a, c)
                        })
                    } catch (t) {
                        console.warn("Navigation parse error", t), n = []
                    }
                    return n
                }, buildMMenu: function () {
                    var t = '\t\t\t<% list.forEach(function(fstItem) { %>\t\t\t\t<div class="c-nav-m-menu">\t\t\t\t\t<div class="m-tit-level-1 J-qcMenuTitle"><a href="javascript:;"><%- fstItem.title %></a></div>\t\t\t\t\t<div class="m-menu-ctrl J-qcMenuList" style="display: none">\t\t\t\t\t\t<% if (fstItem.link) { %>\t\t\t\t\t\t\t<div class="m-tit-level-2 J-qcMenuTitle noitem" data-action="link"><a href="<%- fstItem.link %>"><%- fstItem.title %> \u9996\u9875</a></div>\t\t\t\t\t\t<% } %>\t\t\t\t\t\t<% fstItem.children && fstItem.children.forEach(function(sndItem) { %>\t\t\t\t\t\t\t<% if (sndItem.children) { %>\t\t\t\t\t\t\t<div class="m-tit-level-2 J-qcMenuTitle hasitem"><a href="javascript:;"><%- sndItem.title %></a></div>\t\t\t\t\t\t\t<div class="m-menu-ctrl J-qcMenuList">\t\t\t\t\t\t\t\t<% sndItem.children && sndItem.children.forEach(function(trdItem) { %>\t\t\t\t\t\t\t\t<% if (trdItem.children && trdItem.children.length) { %>\t\t\t\t\t\t\t\t<div class="m-tit-level-3 J-qcMenuTitle hasitem"><a href="javascript:;"><%- trdItem.title %></a></div>\t\t\t\t\t\t\t\t<div class="m-menu-ctrl J-qcMenuList">\t\t\t\t\t\t\t\t<div class="m-tit-level-4-tit J-qcMenuTitle" data-action="link"><a href="<%= trdItem.link %>" hotrep="<%= trdItem.hotrep %>">\u6982\u89c8\u9875</a></div>\t\t\t\t\t\t\t\t\t<% trdItem.children.forEach(function(frthItem) { %>\t\t\t\t\t\t\t\t\t<div class="m-tit-level-4"><a href="<%= frthItem.link %>" hotrep="<%= frthItem.hotrep %>"><%- frthItem.title %></a></div>\t\t\t\t\t\t\t\t\t<% }); %>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<% } else { %>\t\t\t\t\t\t\t\t<div class="m-tit-level-3 J-qcMenuTitle" data-action="link"><a href="<%= trdItem.link %>" hotrep="<%= trdItem.hotrep %>"><%- trdItem.title %></a></div>\t\t\t\t\t\t\t\t<% } %>\t\t\t\t\t\t\t\t<% }); %>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<% } else { %>\t\t\t\t\t\t\t<div class="m-tit-level-3 J-qcMenuTitle" data-action="link"><a href="<%= sndItem.link %>" hotrep="<%= sndItem.hotrep %>"><%= sndItem.title %></a></div>\t\t\t\t\t\t\t<% } %>\t\t\t\t\t\t<% }); %>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t\t<% }); %>\t\t\t',
                        e = this.parseNavigationData();
                    if (e.length) {
                        var n = s.tmpl(t, {
                            list: e
                        });
                        return void this.$topNavMMenu.prepend(n)
                    }
                    var i = this,
                        o = Date.now(),
                        a = 5,
                        r = setInterval(function () {
                            var e = i.parseNavigationData();
                            if (e.length || (Date.now() - o) / 1e3 > a) {
                                clearInterval(r);
                                var n = s.tmpl(t, {
                                    list: e
                                });
                                i.$topNavMMenu.prepend(n)
                            }
                        }, 500)
                }, collapseMSearchBar: function () {
                    this.searchBarM && "function" == typeof this.searchBarM.isOpenState && this.searchBarM.isOpenState() && this.searchBarM.close()
                }, hideMCtrl: function () {
                    this.$topNavMMenuOpen.addClass(c), this.$topNavMSearchOpen.fadeOut("fast"), this.$topNavMUserProfileOpen.fadeOut("fast")
                }, showMCtrl: function () {
                    this.$topNavMMenuOpen.removeClass(c), this.$topNavMSearchOpen.fadeIn("fast"), this.$topNavMUserProfileOpen.fadeIn("fast")
                }, closeMCtrlDetail: function () {
                    this.collapseMUserProfile(), this.collapseMMenu(), this.collapseMSearchBar(), this.showMCtrl()
                }, isMMenuCloseMode: function () {
                    return this.$topNavMMenuOpen.hasClass(c)
                }
            });
        t.exports = l
    }, gEze: function (t, e) {
        "use strict";
        ! function (t) {
            function e(e) {
                var n = t(this),
                    i = null,
                    o = [],
                    a = null,
                    r = null,
                    s = t.extend({
                        rowSelector: "> li",
                        submenuSelector: "*",
                        submenuDirection: "right",
                        tolerance: 75,
                        enter: t.noop,
                        exit: t.noop,
                        activate: t.noop,
                        deactivate: t.noop,
                        exitMenu: t.noop
                    }, e),
                    c = 3,
                    l = 300,
                    h = function (t) {
                        o.push({
                            x: t.pageX,
                            y: t.pageY
                        }), o.length > c && o.shift()
                    },
                    u = function () {
                        r && clearTimeout(r), s.exitMenu(this) && (i && s.deactivate(i), i = null)
                    },
                    d = function () {
                        r && clearTimeout(r), s.enter(this), m(this)
                    },
                    p = function () {
                        s.exit(this)
                    },
                    f = function () {
                        v(this)
                    },
                    v = function (t) {
                        t != i && (i && s.deactivate(i), s.activate(t), i = t)
                    },
                    m = function t(e) {
                        var n = g();
                        n ? r = setTimeout(function () {
                            t(e)
                        }, n) : v(e)
                    },
                    g = function () {
                        function e(t, e) {
                            return (e.y - t.y) / (e.x - t.x)
                        }
                        if (!i || !t(i).is(s.submenuSelector)) return 0;
                        var r = n.offset(),
                            c = {
                                x: r.left,
                                y: r.top - s.tolerance
                            },
                            h = {
                                x: r.left + n.outerWidth(),
                                y: c.y
                            },
                            u = {
                                x: r.left,
                                y: r.top + n.outerHeight() + s.tolerance
                            },
                            d = {
                                x: r.left + n.outerWidth(),
                                y: u.y
                            },
                            p = o[o.length - 1],
                            f = o[0];
                        if (!p) return 0;
                        if (f || (f = p), f.x < r.left || f.x > d.x || f.y < r.top || f.y > d.y) return 0;
                        if (a && p.x == a.x && p.y == a.y) return 0;
                        var v = h,
                            m = d;
                        "left" == s.submenuDirection ? (v = u, m = c) : "below" == s.submenuDirection ? (v = d, m = u) : "above" == s.submenuDirection && (v = c, m = h);
                        var g = e(p, v),
                            $ = e(p, m),
                            w = e(f, v),
                            N = e(f, m);
                        return g < w && $ > N ? (a = p, l) : (a = null, 0)
                    };
                n.mouseleave(u).find(s.rowSelector).mouseenter(d).mouseleave(p).click(f), t(document).mousemove(h)
            }
            t.fn.menuAim = function (t) {
                return this.each(function () {
                    e.call(this, t)
                }), this
            }
        }(jQuery)
    }
});