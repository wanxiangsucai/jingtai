(function () {

	if (!window.$) {
		console.warn('qcmain::loader:\n\tjquery don\'t be loaded first!');
		return;
	}

	var NAV_TYPE = {
		leftnav: 'leftnav',
		topnav_firstlevel: 'topnav_firstlevel',
		topnav_sndlevel: 'topnav_sndlevel',
	};

	var NAV_METADATA = {};
	NAV_METADATA[NAV_TYPE.leftnav] = {
			selector: '#qcLeftNavSwitcher',
			dataJs: "/public/static/blansj_xin/bbs/js/left-nav.3d5c6d779194888b1a83b65f11b89c9a.js",
	};
	NAV_METADATA[NAV_TYPE.topnav_firstlevel] = {
			selector: '#qcTopNavFstLevel',
	};
	NAV_METADATA[NAV_TYPE.topnav_sndlevel] = {
			selector: '#qcTopNavSndLevelSheetContainer',
			dataJs: "/public/static/blansj_xin/bbs/js/top-nav.9f760511796527724ccbee57db07c230.js",
	};

	var availableNavs = [NAV_TYPE.leftnav, NAV_TYPE.topnav_firstlevel, NAV_TYPE.topnav_sndlevel].filter(function (nav) {
		return $(NAV_METADATA[nav].selector).length > 0;
	});

	if(availableNavs.length === 0){
		return;
	}

	var shouldLoadDataJsNavs = availableNavs.filter(function (nav) {
		return !!NAV_METADATA[nav].dataJs;
	});

	var COMPLETED = 1 + shouldLoadDataJsNavs.length;
	var step = 0;

	function loadScript (src, callback) {
		var script = document.createElement('script');
		script.onerror = function (error) { callback(error, null); };
		script.onload = function () { callback(null, null); };
		script.src = src;
		document.head.appendChild(script);
	}

	function loadScriptCallback (error) {
		step++;
		if (error) {
			return;
		}
		if (step === COMPLETED && window.QCComponent) {
			window.QCComponent.init();
		}
	}

	shouldLoadDataJsNavs.forEach(function (nav) {
		loadScript(NAV_METADATA[nav].dataJs,loadScriptCallback)
	});

	var logicalScript = "/public/static/blansj_xin/bbs/js/index.5d3b31a0dff2bca5a9cb.js?max_age=31536000";
	loadScript(logicalScript, loadScriptCallback);
})();
