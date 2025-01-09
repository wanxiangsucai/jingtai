var mydialog;
function Mydialog(settings) {
    this.options = $.extend({
        loadurl: '',
        id: 'mydialog',
        ismask: true,
        istemp: true,
        timeout: 0,
        showIcon: false,
        showCloseBtn: false,
        isConfirm: false,
        isDrag: false,
        position: "fixed",
        title: '',
        isResize: false,
        bindEventList: []
    }, settings);
    var maskStr = this.options.ismask ? '<div id="dialogMask" style="position:' + this.options.position + ';left:0;top:0;z-index:1000;width:100%;height:100%;background-color:#000;filter:alpha(opacity=40);opacity:.4"></div>' : ""; //蒙版DIV
    this.tempDialog = '<div id="' + this.options.id + '" class="dialog" style="position: ' + this.options.position + '; z-index: 1001; cursor: default;"><div class="dialog-inner" style="width:100%;height:100%;"></div></div>' + maskStr; //Dialog容器
    this.dialog = []; //最外层Dialog
    this.dialogInner = []; //Dialog容器对象
    this.loadurl = this.options.loadurl; //如果是弹出另一个页面  传入URL
    this._id = this.options.id; //最外层Dialog的id
    this.ismask = this.options.ismask; //是否出现蒙版
    this.istemp = this.options.istemp; //是否使用默认模板
    this.dialoginfostatus = ""; //状态图标提示
    this.dialoginfo = ""; //提示信息
    this.timeout = this.options.timeout; //超时设置
    this.showIcon = this.options.showIcon; //是否显示提示图标
    this.showCloseBtn = this.options.showCloseBtn; //是否显示关闭按钮
    this.isConfirm = this.options.isConfirm; //是否是confirm
    this.title = this.options.title;//Ajax调用页面的标题
    this.isDrag = this.options.isDrag; //是否允许拖动
    this.position = this.options.position;//定位方式
    this.isResize = this.options.isResize; //是否允许改变Dialog的大小
    this.bindEventList = this.options.bindEventList;
    var _this = this;
    $(window).resize(function () {
        if ($("#" + _this.options.id).length) Mydialog.center(_this.options.id);
    });
}
//获取默认模板
Mydialog.prototype.getTemp = function (settings) {
    var options = $.extend({}, settings);
    var iconClass = "";
    if (options.status) iconClass = Mydialog.getIconClass(options.status);
    var tempdefault = '<div class="dialogcontent">';
    tempdefault += '<div class="dialoginfowrap">';
    tempdefault += '<div class="dialogclose"><a href="javascript:mydialog.close();" title="关闭">关闭</a></div>';
    //是否显示提示图标
    if (this.showIcon) {
        tempdefault += '<div class="dialoginfo ' + iconClass + '">';
        tempdefault += '<h3 style="padding-top:16px;">' + options.dialoginfo + '</h3>';
    } else {
        tempdefault += '<div>';
        tempdefault += '<h3>' + options.dialoginfo + '</h3>';
    }
    tempdefault += '</div>';
    if (this.isConfirm) {
        tempdefault += '<div class="clearfix dialogfoot">';
        tempdefault += '<button class="button button-highlight" id="okConfirm" type="button" title="确定"><span>确定</span></button>';
        tempdefault += '<button class="button" type="button" id="clearConfirm" title="取消"><span>取消</span></button>';
        tempdefault += '</div>';
    } else {
        //是否显示关闭Button
        if (this.showCloseBtn) {
            tempdefault += '<div class="clearfix dialogfoot">';
            tempdefault += '<button class="button button-highlight" type="button" onclick="mydialog.close();" title="关闭"><span>关闭</span></button>';
            tempdefault += '</div>';
        }
    }
    tempdefault += '</div>';
    tempdefault += '</div>';
    return tempdefault;
}
//提示消息框
Mydialog.prototype.alertDialog = function (dialoginfo, status) {
    this.appendBody();
    this.dialoginfostatus = status;
    this.dialoginfo = dialoginfo;
    this.dialogInner.html(this.getTemp({ status: this.dialoginfostatus, dialoginfo: this.dialoginfo }));
    Mydialog.center(this._id);
    if (this.isDrag) this.dragObject(Mydialog.getid(this._id));
}
//Confirm提示框
Mydialog.prototype.confirmDialog = function (dialoginfo, okCallback, clearCallback) {
    this.appendBody();
    this.dialoginfo = dialoginfo;
    this.dialogInner.html(this.getTemp({ dialoginfo: this.dialoginfo, okCallback: okCallback, clearCallback: clearCallback }));
    //点击确定 执行
    $("#okConfirm").off("click");
    $("#okConfirm").on("click", function () {
        if (okCallback) okCallback(this);
        mydialog.close();
    });
    //点击取消 执行
    $("#clearConfirm").off("click");
    $("#clearConfirm").on("click", function () {
        if (clearCallback) clearCallback(this);
        mydialog.close();
    });
    Mydialog.center(this._id);
    if (this.isDrag) this.dragObject(Mydialog.getid(this._id));
}
//Dialog显示另一个页面
Mydialog.prototype.pageLoad = function (loadurl, title) {
    var _this = this;
    this.loadurl = loadurl;
    this.title = title || '';
    _this._ajax({ type: "post", url: _this.loadurl, beforeSendCallback: function () {
        _this.waiting();
    }, successCallback: function (data) {
        if (_this.istemp) {
            var thtml = '<div class="dialogcontent"><div class="clearfix dialoghead" id="dialogTitleBar"><h1 class="dialogtitle">' + _this.title + '</h1>';
            thtml += '<div class="dialogclose"><a href="javascript:mydialog.close();" title="关闭">关闭</a></div></div><div class="dialoginfowrap">' + data + '</div></div>';
            _this.dialogInner.html(thtml);
        } else _this.dialogInner.html(data);
        if (_this.isDrag) {
            var elm = Mydialog.getid('dialogTitleBar');
            if (elm) {
                _this.dragObject(Mydialog.getid(_this._id), elm);
                elm.style.cursor = 'move';
            }
        }
        Mydialog.center(_this._id);
        _this._bindSubmit();
        //var bindObj=[{$elm:"绑定元素",bindEvent:"绑定事件",callback:"执行函数"}]
        //_this.bindEvent(_this.bindEventList);
    }
    });
}
//将Dialog主题添加到Body
Mydialog.prototype.appendBody = function () {
    if (!$("#" + this._id).length) {
        $("body").append(this.tempDialog);
        $("#" + this._id).css("position", this.position);
    }
    this.dialog = $("#" + this._id);
    this.dialogInner = $("#" + this._id + " .dialog-inner");
    if (sys.ie <= 6) {
        this.dialog.css({ position: "absolute" });
    }
    if (this.isResize) Mydialog.resize(this);
    if (this.timeout) Mydialog.timeOut();
}
//正在载入
Mydialog.prototype.waiting = function () {
    var _this = this;
    _this.appendBody();
    _this.dialogInner.html('<div class="dropdownmenuloader"><span>正在载入...</span></div>');
    Mydialog.center(_this._id);
}
//Ajax
Mydialog.prototype._ajax = function (options) {
    jQuery.ajax({
        type: options.type,
        url: options.url,
        data:options.data,
        beforeSend: function () {
            if (options.beforeSendCallback) options.beforeSendCallback();
        },
        success: function (data) {
            if (options.successCallback) options.successCallback(data);
        }
    });
}
Mydialog.prototype._bindSubmit = function () {
    var _this = this;
    $("#save").off("click");
    $("#save").on("click", function () {
        var b = true;
//        jQuery.post("/ajaxseo.aspx?t=chkkw", "kw=" + $("#keyword").val(), function (data) {
//            if (data == 1) {
        _this._ajax({type: "post", url: _this.loadurl, data: {t:"add",keyword:escape($("#keyword").val())}, successCallback: function (data) {
                    _this.dialogInner.html(data);
                    _this._bindSubmit();
                    if (_this.isDrag) {
                        var elm = Mydialog.getid('dialogTitleBar');
                        if (elm) {
                            _this.dragObject(Mydialog.getid(_this._id), elm);
                            elm.style.cursor = 'move';
                        }
                    }
                }
                });
//            } else {
//                if ($(".dialogmsg-error").length)
//                    $(".dialogmsg-error").html(data);
//                else
//                    $(".dialogbody").before('<div class="dialogmsg dialogmsg-error">' + data + '</div>');
//            }
//        });
    });
}
//[{$elm:"绑定元素",bindEvent:"绑定事件",callback:"执行函数"}]
Mydialog.prototype.bindEvent = function (bindObj) {
    for (var i = 0; i < bindObj.length; i++) {
        var item = bindObj[i];
        var $elm = item.$elm;
        var bindEvent = item.bindEvent;
        item.$elm.on(item.bindEvent, function (e) { item.callback(e) });
    }
}
//关闭
Mydialog.prototype.close = function () {
    if (this.dialog.length) {
        this.dialog.remove();
        if (this.ismask) $("#dialogMask").remove();
    }
}
///设置一个对象可拖拽
Mydialog.prototype.dragObject = function (obj, mover) {
    var ht = mover || obj;
    var _this = this;
    function mouseup(e) {
        e = e || window.event;
        if (obj.drag) {
            obj.drag = 0;
            if (sys.ie) ht.releaseCapture();
            else {
                window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                e.preventDefault();
            }
            document.body.onselectstart = null;
        }
    }
    function mousemove(e) {
        if (!obj.drag) return;
        e = e || window.event;
        var l, t;
        l = e.clientX - obj._x;
        t = e.clientY - obj._y;
        if (l < 0) l = 0;
        if (t < 0) t = 0;
        var inner = Mydialog.getInner();
        if (l + obj.offsetWidth >= inner.width) l = inner.width - obj.offsetWidth;
        if (t + obj.offsetHeight >= inner.height) t = inner.height - obj.offsetHeight;
        $(obj).css({ left: l + "px", top: t + "px" });
    }
    function mousedown(e) {
        e = e || window.event;
        if (sys.ie) ht.setCapture();
        else {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            e.preventDefault();
        }
        var l = Mydialog.getLeft(obj), t = Mydialog.getTop(obj);
        obj._x = e.clientX - l;
        obj._y = e.clientY - t;
        obj.drag = 1;
        document.body.onselectstart = function () { return false; };
    }
    $(ht).on("mousedown", mousedown);
    if (!sys.ie) {
        ht = document.body;
        ht = document.body;
    }
    $(ht).on("mousemove", mousemove);
    $(ht).on("mouseup", mouseup);
}
/*******Mydialog private function*********/
//改变Dialog的大小
Mydialog.resize = function (_this) {
    _this.dialogInner.after('<div id="splitter" style="cursor:nw-resize;width:20px;height:20px;position:absolute;right:6px;bottom:6px;background:#ddd;"></div>');
    $("#splitter").on("mousedown", function () {
        var screenY = event.screenY;
        var screenX = event.screenX;
        var $elm = $(this);
        var pos = $elm.position();
        var h = _this.dialog.height();
        var w = _this.dialog.width();
        $(document).on("mousemove", function (event) {
            var inner = Mydialog.getInner();
            var diffY = event.screenY - screenY; //移动的距离Y
            var diffX = event.screenX - screenX; //移动的距离X
            if (diffX < 0) diffX = 0;
            if (diffY < 0) diffY = 0;
            _this.dialog.css({ height: h + diffY, width: w + diffX });
            Mydialog.stopDefault(event);
        });
        $(document).on("mouseup", function (event) {
            $(document).off("mousemove");
            $(document).off("mouseup");
            Mydialog.center(_this._id);
            Mydialog.stopDefault(event);
        });
    });
}
//弹出框居中
Mydialog.center = function (id) {
    // 获取要居中的元素 
    var elm = document.getElementById(id);
    // 通过窗口宽高和div宽高计算位置 
    var inner = Mydialog.getInner();
    elm.style.left = ((inner.width - elm.clientWidth) / 2) + "px";
    elm.style.top = ((inner.height - elm.clientHeight) / 2) + "px";
}
//跨浏览器获取视口大小
Mydialog.getInner = function () {
    return {
        width: window.innerWidth || document.documentElement && document.documentElement.clientWidth || 0,
        height: window.innerHeight || document.documentElement && document.documentElement.clientHeight || 0
    }
}
//自动关闭
Mydialog.timeOut = function () {
    var timeclear, _this = this;
    clearTimeout(timeclear);
    timeclear = setTimeout(_this.close, _this.timeout);
}
//获取Top的距离
Mydialog.getTop = function (e) {
    var offset = e.offsetTop;
    if (e.offsetParent != null) offset += Mydialog.getTop(e.offsetParent);
    return offset;
}
//获取Left的距离
Mydialog.getLeft = function (e) {
    var offset = e.offsetLeft;
    if (e.offsetParent != null) offset += Mydialog.getLeft(e.offsetParent);
    return offset;
}
//提示显示的图片样式
Mydialog.getIconClass = function (status) {
    switch (status) {
        case "error":
            return "dialoginfo-error";
        case "alert":
            return "dialoginfo-alert";
        case "success":
            return "dialoginfo-success";
            break;
        default:
            return "dialoginfo-success";
    }
}
Mydialog.getid = function (id) {
    return (typeof id == 'string') ? document.getElementById(id) : id;
}
//阻止浏览器的默认行为
Mydialog.stopDefault = function (e) {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault(); //其他浏览器
    else e.returnValue = false; //IE浏览器
}
//初始化Dialog
mydialog = new Mydialog();