(function (define) {
    define(['jquery'], function ($) {
        return (function () {
            "use strict";

            function t(t, o) {
                return "string" == typeof t ? (o || document).getElementById(t) : t || null
            }

            function o(t, o) {
                t.classList ? t.classList.remove(o) : t.className = t.className.replace(new RegExp("(^|\\b)" + o.split(" ").join("|") + "(\\b|$)", "gi"), " ")
            }

            function e(t, o) {
                for (var e in o) o.hasOwnProperty(e) && (t[e] = o[e]);
                return t
            }

            var s, i, p, n, r, c, l, h, a = 150,
                u = function (o, p) {
                    if (this.defaults = {
                        msg: null,
                        style: "info",
                        autoclose: 2500,
                        position: "top-right",
                        icon: !0,
                        group: !1,
                        onOpen: !1,
                        onClose: !1
                    },
                        i = e(this.defaults, spop.defaults), "string" == typeof o || "string" == typeof p) s = {
                        msg: o,
                        style: p || i.style
                    };
                    else {
                        if ("object" != typeof o) return console.error("Invalid arguments."),
                            !1;
                        s = o
                    }
                    this.opt = e(i, s),
                    t("spop--" + this.opt.group) && this.remove(t("spop--" + this.opt.group)),
                        this.open()
                };
            u.prototype.create = function (o) {
                p = t(this.getPosition("spop--", this.opt.position)),
                    n = this.opt.icon ? '<i class="spop-icon ' + this.getStyle("spop-icon--", this.opt.style) + '"></i>' : "",
                    r = '<div class="spop-close" data-spop="close" aria-label="Close">&times;</div>' + n + '<div class="spop-body">' + o + "</div>",
                p || (this.popContainer = document.createElement("div"), this.popContainer.setAttribute("class", "spop-container " + this.getPosition("spop--", this.opt.position)), this.popContainer.setAttribute("id", this.getPosition("spop--", this.opt.position)), document.body.appendChild(this.popContainer), p = t(this.getPosition("spop--", this.opt.position))),
                    this.pop = document.createElement("div"),
                    this.pop.setAttribute("class", "spop spop--out spop--in " + this.getStyle("spop--", this.opt.style)),
                this.opt.group && "string" == typeof this.opt.group && this.pop.setAttribute("id", "spop--" + this.opt.group),
                    this.pop.setAttribute("role", "alert"),
                    this.pop.innerHTML = r,
                    p.appendChild(this.pop)
            },
                u.prototype.getStyle = function (t, o) {
                    return c = {
                        success: "success",
                        error: "error",
                        warning: "warning",
                        message: "message"
                    },
                    t + (c[o] || "info")
                },
                u.prototype.getPosition = function (t, o) {
                    return l = {
                        "top-left": "top-left",
                        "top-center": "top-center",
                        "top-right": "top-right",
                        "bottom-left": "bottom-left",
                        "bottom-center": "bottom-center",
                        "bottom-right": "bottom-right"
                    },
                    t + (l[o] || "top-right")
                },
                u.prototype.open = function () {
                    this.create(this.opt.msg),
                    this.opt.onOpen && this.opt.onOpen(), this.close()
                },
                u.prototype.close = function () {
                    this.opt.autoclose && "number" == typeof this.opt.autoclose && (this.autocloseTimer = setTimeout(this.remove.bind(this, this.pop), this.opt.autoclose)), this.pop.addEventListener("click", this.addListeners.bind(this), !1)
                },
                u.prototype.addListeners = function (t) {
                    h = t.target.getAttribute("data-spop"),
                    "close" === h && (this.autocloseTimer && clearTimeout(this.autocloseTimer), this.remove(this.pop))
                },
                u.prototype.remove = function (t) {
                    this.opt.onClose && this.opt.onClose(), o(t, "spop--in"), setTimeout(function () {
                        document.body.contains(t) && t.parentNode.removeChild(t)
                    }, a)
                },
                window.spop = function (t, o) {
                    return t && window.addEventListener ? new u(t, o) : !1
                }
            return spop
        })();
    })
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('jquery'));
    } else if (window.layui && layui.define) {
        layui.define('jquery', function (exports) {
            exports('notice', factory(layui.jquery));
        });
    } else {
        window.toastr = factory(window.jQuery);
    }
}));