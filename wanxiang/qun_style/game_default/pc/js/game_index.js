$(function() {
	//----------------------------------------------------------
	function ZoomPic_list() {
		this.initialize.apply(this, arguments)
	}
	ZoomPic_list.prototype = {
		initialize: function(id) {
			var _this = this;
			this.wrap = typeof id === "string" ? document.getElementById(id) : id;
			this.oUl = this.wrap.getElementsByTagName("ul")[0];
			this.aLi = this.wrap.getElementsByTagName("li");
			this.prev = this.wrap.getElementsByTagName("span")[0];
			this.next = this.wrap.getElementsByTagName("span")[1];
			this.timer = 6000;
			this.aSort = [];
			this.iCenter = 2;
			this._doPrev = function() {
				return _this.doPrev.apply(_this)
			};
			this._doNext = function() {
				return _this.doNext.apply(_this)
			};
			this.options = [{
				width: 385,
				height: 241,
				top: 45,
				left: -112,
				opacity: 100,
				zIndex: 1
			}, {
				width: 449,
				height: 281,
				top: 28,
				left: -72,
				opacity: 100,

				zIndex: 2

			}, {
				width: 540,
				height: 338,
				top: 0,
				opacity: 100,
				left: 0,
				zIndex: 3
			}, {
				width: 449,
				height: 281,
				top: 28,
				opacity: 100,
				left: 160,
				zIndex: 2

			}, {
				width: 385,
				height: 241,
				top: 45,
				opacity: 100,
				left: 260,
				zIndex: 1
			}, ];
			for (var i = 0; i < this.aLi.length; i++) this.aSort[i] = this.aLi[i];
			this.aSort.unshift(this.aSort.pop());
			this.setUp();
			this.addEvent(this.prev, "click", this._doPrev);
			this.addEvent(this.next, "click", this._doNext);
			this.doImgClick();
			this.timer = setInterval(function() {
				_this.doNext()
				//$('#focus_Box ul li').eq(2).addClass('bg2').siblings().removeClass('bg2')
			}, 7000);
			this.wrap.onmouseover = function() {
				clearInterval(_this.timer)
				//$('#focus_Box ul li').eq(2).addClass('bg2').siblings().removeClass('bg2')

			};
			this.wrap.onmouseout = function() {
				_this.timer = setInterval(function() {
					_this.doNext()
				//	$('#focus_Box ul li').eq(2).addClass('bg2').siblings().removeClass('bg2')

				}, 7000);
			}
		},
		doPrev: function() {
			this.aSort.unshift(this.aSort.pop());
			this.setUp()
			//$('#warp_Box ul li').eq(2).addClass('bg2').siblings().removeClass('bg2')

		},
		doNext: function() {
			this.aSort.push(this.aSort.shift());
			this.setUp()
			//$('#warp_Box ul li').eq(2).addClass('bg2').siblings().removeClass('bg2')
		},
		doImgClick: function() {
			var _this = this;
			for (var i = 0; i < this.aSort.length; i++) {
				this.aSort[i].onclick = function() {
					if (this.index > _this.iCenter) {
						for (var i = 0; i < this.index - _this.iCenter; i++) _this.aSort.push(_this.aSort.shift());
						_this.setUp()
					} else if (this.index < _this.iCenter) {
						for (var i = 0; i < _this.iCenter - this.index; i++) _this.aSort.unshift(_this.aSort.pop());
						_this.setUp()
					}
				}
			}
		},
		setUp: function() {
			var _this = this;
			var i = 0;
			for (i = 0; i < this.aSort.length; i++) this.oUl.appendChild(this.aSort[i]);
			for (i = 0; i < this.aSort.length; i++) {
				this.aSort[i].index = i;
				if (i < 5) {
					this.css(this.aSort[i], "display", "block");
					this.doMove(this.aSort[i], this.options[i], function() {
						_this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("img")[0], {
							opacity: 100
						}, function() {
							_this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("img")[0], {
								opacity: 100
							}, function() {
								_this.aSort[_this.iCenter].onmouseover = function() {
									_this.doMove(this.getElementsByTagName("div")[0], {
										bottom: 0
									})
								};
								_this.aSort[_this.iCenter].onmouseout = function() {
									_this.doMove(this.getElementsByTagName("div")[0], {
										bottom: -100
									})
								}
							})
						})
					});
					//console.log('1')
				} else {
					//console.log("1")
					this.css(this.aSort[i], "display", "none");
					this.css(this.aSort[i], "width", 0);
					this.css(this.aSort[i], "height", 0);
					this.css(this.aSort[i], "top", 37);
					this.css(this.aSort[i], "left", this.oUl.offsetWidth / 2)
				}
				if (i < this.iCenter || i > this.iCenter) {
					this.css(this.aSort[i].getElementsByTagName("img")[0], "opacity", 100)
					this.aSort[i].onmouseover = function() {
						_this.doMove(this.getElementsByTagName("img")[0], {
							opacity: 100
						})
					};
					this.aSort[i].onmouseout = function() {
						_this.doMove(this.getElementsByTagName("img")[0], {
							opacity: 100
						})
					};
					this.aSort[i].onmouseout();
				} else {
					this.aSort[i].onmouseover = this.aSort[i].onmouseout = null
				}
			}
		},
		addEvent: function(oElement, sEventType, fnHandler) {
			return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
		},
		css: function(oElement, attr, value) {
			if (arguments.length == 2) {
				return oElement.currentStyle ? oElement.currentStyle[attr] : getComputedStyle(oElement, null)[attr]
			} else if (arguments.length == 3) {
				switch (attr) {
					case "width":
					case "height":
					case "top":
					case "left":
					case "bottom":
						oElement.style[attr] = value + "px";
						break;
					case "opacity":
						//					oElement.style.filter = "alpha(opacity=" + value + ")";
						oElement.style.opacity = value / 100;
						break;
					default:
						oElement.style[attr] = value;
						break
				}
			}
		},
		doMove: function(oElement, oAttr, fnCallBack) {
			if (oElement == undefined) {
				return false;
			}
			var _this = this;
			clearInterval(oElement.timer);
			oElement.timer = setInterval(function() {
				var bStop = true;
				for (var property in oAttr) {
					var iCur = parseFloat(_this.css(oElement, property));
					property == "opacity" && (iCur = parseInt(iCur.toFixed(2) * 100));
					var iSpeed = (oAttr[property] - iCur) / 5;
					iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

					if (iCur != oAttr[property]) {
						bStop = false;
						_this.css(oElement, property, iCur + iSpeed)
					}
				}
				if (bStop) {
					clearInterval(oElement.timer);
					fnCallBack && fnCallBack.apply(_this, arguments)
				}
			}, 30)
		}
	};



	var img_html = $("#warp_Box .ul").html();
	//切换图的tab
	function imgtab() {
		//点击切换的图片的tab
		$(".lef_bot .top_bot p").click(function() {

			var i = $(this).index() - 1 //获取当前的索引

			$(this).addClass("p1").siblings().removeClass("p1") //当前的显示的添加样式

			if (i == 0) {
				$("#warp_Box .ul ul").remove() //删除当前显示的内容
				$("#warp_Box .ul").append(img_html) //添加的元素内容

			} else {
				var a1 = $(".warp_bot .ul").eq(i).html() //获取当前需要添加的元素内容

				$("#warp_Box .ul ul").remove() //删除当前显示的内容

				$("#warp_Box .ul").append(a1) //添加的元素内容
			}

		
			new ZoomPic_list("warp_Box");
		})

	}

	imgtab()
		//------------------------------------------------------------

	var x1 = 1

	function ZoomPic() {
		this.initialize.apply(this, arguments)

	}
	ZoomPic.prototype = {

		initialize: function(id) {
			var _this = this;
			this.wrap = typeof id === "string" ? document.getElementById(id) : id;
			this.oUl = this.wrap.getElementsByTagName("ul")[0];
			this.aLi = this.wrap.getElementsByTagName("li");
			this.prev = this.wrap.getElementsByTagName("span")[0];
			this.next = this.wrap.getElementsByTagName("span")[1];
			this.timer = 6000;
			this.aSort = [];
			this.iCenter = 2;
			this._doPrev = function() {
				return _this.doPrev.apply(_this)
			};
			this._doNext = function() {
				return _this.doNext.apply(_this)
			};
			this.options = [{
				width: 140,
				height: 35,
				top: 13,
				left: 1,
				opacity: 100,
				zIndex: 1
			}, {
				width: 165,
				height: 49,
				top: 6,
				left: 60,
				opacity: 100,
				fontSize: 20,
				zIndex: 2

			}, {
				width: 243,
				height: 63,
				top: 1,
				opacity: 100,
				left: 135,
				zIndex: 3
			}, {
				width: 165,
				height: 49,
				top: 6,
				opacity: 100,
				left: 280,
				zIndex: 2

			}, {
				width: 140,
				height: 35,
				top: 13,
				opacity: 100,
				left: 370,
				zIndex: 1
			}, ];
			for (var i = 0; i < this.aLi.length; i++) this.aSort[i] = this.aLi[i];
			this.aSort.unshift(this.aSort.pop());
			this.setUp();
			this.addEvent(this.prev, "click", this._doPrev);
			this.addEvent(this.next, "click", this._doNext);
			ast()

		},
		doPrev: function() {
			this.aSort.unshift(this.aSort.pop());
			this.setUp()
			$('#focus_Box ul li').eq(2).addClass('bg2a').siblings().removeClass('bg2a')
			ast()

			x1--
			if (x1 < 0) {
				x1 = $(".ar_center .tab_warp").length - 1
			}
			$(".ar_center .tab_warp").eq(x1).show().removeClass("hide").siblings().hide()



		},
		doNext: function() {
			this.aSort.push(this.aSort.shift());
			this.setUp()
			$('#focus_Box ul li').eq(2).addClass('bg2a').siblings().removeClass('bg2a')
			ast()

			x1++
			if (x1 > $(".ar_center .tab_warp").length - 1) {
				x1 = 0
			}
			$(".ar_center .tab_warp").eq(x1).show().removeClass("hide").siblings().hide()


		},

		setUp: function() {
			var _this = this;
			var i = 0;
			for (i = 0; i < this.aSort.length; i++) this.oUl.appendChild(this.aSort[i]);
			for (i = 0; i < this.aSort.length; i++) {
				this.aSort[i].index = i;
				if (i < 5) {
					this.css(this.aSort[i], "display", "block");
					this.doMove(this.aSort[i], this.options[i], function() {
						_this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("p")[0], {
							opacity: 100
						}, function() {
							_this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("p")[0], {
								opacity: 100
							}, function() {
								_this.aSort[_this.iCenter].onmouseover = function() {
									_this.doMove(this.getElementsByTagName("div")[0], {
										bottom: 0
									})
								};
								_this.aSort[_this.iCenter].onmouseout = function() {
									_this.doMove(this.getElementsByTagName("div")[0], {
										bottom: -100
									})
								}
							})
						})
					});
			
				} else {
				
					this.css(this.aSort[i], "display", "none");
					this.css(this.aSort[i], "width", 0);
					this.css(this.aSort[i], "height", 0);
					this.css(this.aSort[i], "top", 37);
					//console.log(this.oUl.offsetWidth / 2 +'注意')
					this.css(this.aSort[i], "left", this.oUl.offsetWidth / 2)
				}
				if (i < this.iCenter || i > this.iCenter) {
					this.css(this.aSort[i].getElementsByTagName("p")[0], "opacity", 100)
					this.aSort[i].onmouseover = function() {
						_this.doMove(this.getElementsByTagName("p")[0], {
							opacity: 100
						})
					};
					this.aSort[i].onmouseout = function() {
						_this.doMove(this.getElementsByTagName("p")[0], {
							opacity: 100
						})
					};
					this.aSort[i].onmouseout();
				} else {
					this.aSort[i].onmouseover = this.aSort[i].onmouseout = null
				}
			}
		},
		addEvent: function(oElement, sEventType, fnHandler) {
			return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
		},
		css: function(oElement, attr, value) {
			if (arguments.length == 2) {
				return oElement.currentStyle ? oElement.currentStyle[attr] : getComputedStyle(oElement, null)[attr]
			} else if (arguments.length == 3) {
				switch (attr) {
					case "width":
					case "height":
					case "top":
					case "left":

						if(isNaN(value)){
							value =10
						}
						oElement.style[attr] = value + "px";
						break;
					case "opacity":
						
						oElement.style.opacity = value / 100;
						break;

					default:
						oElement.style[attr] = value;
						break
				}
			}
		},
		doMove: function(oElement, oAttr, fnCallBack) {
				if (oElement == undefined) {
					return false;
				}
				var _this = this;
				clearInterval(oElement.timer);
				oElement.timer = setInterval(function() {
					var bStop = true;
					for (var property in oAttr) {
						var iCur = parseFloat(_this.css(oElement, property));
						property == "opacity" && (iCur = parseInt(iCur.toFixed(2) * 100));
						var iSpeed = (oAttr[property] - iCur) / 5;
						iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

						if (iCur != oAttr[property]) {
							bStop = false;
							_this.css(oElement, property, iCur + iSpeed)
						}
					}
					if (bStop) {
						clearInterval(oElement.timer);
						fnCallBack && fnCallBack.apply(_this, arguments)
					}
				}, 30)
			}
		
	};

	window.onload = function() {
		if($('#focus_Box').size()>=1){
			new ZoomPic("focus_Box");
		}
		new ZoomPic_list("warp_Box");
		ast()
	};



})