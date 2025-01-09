/*! UEditorPlus v2.0.0*/
!function(){function initTabs(){for(var a=$G("tabhead").children,b=0;b<a.length;b++)domUtils.on(a[b],"click",function(a){var b=a.target||a.srcElement;setTabFocus(b.getAttribute("data-content-id"))});editorOpt.disableUpload||($G("tabhead").querySelector('[data-content-id="upload"]').style.display="inline-block"),editorOpt.disableOnline||($G("tabhead").querySelector('[data-content-id="online"]').style.display="inline-block"),editorOpt.selectCallback&&($G("imageSelect").style.display="inline-block",domUtils.on($G("imageSelect"),"click",function(a){editorOpt.selectCallback(editor,function(a){if(a){$G("url").value=a.path,$G("title").value=a.name;var b=new Image;b.onload=function(){$G("width").value=b.width,$G("height").value=b.height,remoteImage.setPreview()},b.onerror=function(){remoteImage.setPreview()},b.src=a.path}})}));var c=editor.selection.getRange().getClosedNode();setTabFocus((c&&c.tagName&&"img"==c.tagName.toLowerCase(),"remote"))}function setTabFocus(a){if(a){var b,c,d=$G("tabhead").children;for(b=0;b<d.length;b++)c=d[b].getAttribute("data-content-id"),c==a?(domUtils.addClass(d[b],"focus"),domUtils.addClass($G(c),"focus")):(domUtils.removeClasses(d[b],"focus"),domUtils.removeClasses($G(c),"focus"));switch(a){case"remote":remoteImage=remoteImage||new RemoteImage;break;case"upload":setAlign(editor.getOpt("imageInsertAlign")),uploadImage=uploadImage||new UploadImage("queueList");break;case"online":setAlign(editor.getOpt("imageManagerInsertAlign")),onlineImage=onlineImage||new OnlineImage("imageList"),onlineImage.reset()}}}function initButtons(){dialog.onok=function(){for(var a,b=!1,c=[],d=$G("tabhead").children,e=0;e<d.length;e++)if(domUtils.hasClass(d[e],"focus")){a=d[e].getAttribute("data-content-id");break}switch(a){case"remote":c=remoteImage.getInsertList();break;case"upload":c=uploadImage.getInsertList();var f=uploadImage.getQueueCount();if(f)return $(".info","#queueList").html('<span style="color:red;">'+"还有2个未上传文件".replace(/[\d]/,f)+"</span>"),!1;break;case"online":c=onlineImage.getInsertList()}c&&(editor.execCommand("insertimage",c),b&&editor.fireEvent("catchRemoteImage"))}}function initAlign(){domUtils.on($G("alignIcon"),"click",function(a){var b=a.target||a.srcElement;b.className&&b.className.indexOf("-align")!=-1&&setAlign(b.getAttribute("data-align"))})}function setAlign(a){a=a||"none";var b=$G("alignIcon").children;for(i=0;i<b.length;i++)b[i].getAttribute("data-align")==a?(domUtils.addClass(b[i],"focus"),$G("align").value=b[i].getAttribute("data-align")):domUtils.removeClasses(b[i],"focus")}function getAlign(){var a=$G("align").value||"none";return"none"==a?"":a}function RemoteImage(a){this.container=utils.isString(a)?document.getElementById(a):a,this.init()}function UploadImage(a){this.$wrap=a.constructor==String?$("#"+a):$(a),this.init()}function OnlineImage(a){this.container=utils.isString(a)?document.getElementById(a):a,this.init()}var remoteImage,uploadImage,onlineImage,editorOpt={};window.onload=function(){editorOpt=editor.getOpt("imageConfig"),initTabs(),initAlign(),initButtons()},RemoteImage.prototype={init:function(){this.initContainer(),this.initEvents()},initContainer:function(){this.dom={url:$G("url"),width:$G("width"),height:$G("height"),border:$G("border"),vhSpace:$G("vhSpace"),title:$G("title"),align:$G("align")};var a=editor.selection.getRange().getClosedNode();a&&this.setImage(a)},initEvents:function(){function a(){b.setPreview()}var b=this,c=$G("lock");domUtils.on($G("url"),"keyup",a),domUtils.on($G("border"),"keyup",a),domUtils.on($G("title"),"keyup",a),domUtils.on($G("width"),"keyup",function(){if(c.checked){var d=c.getAttribute("data-proportion");$G("height").value=Math.round(this.value/d)}else b.updateLocker();a()}),domUtils.on($G("height"),"keyup",function(){if(c.checked){var d=c.getAttribute("data-proportion");$G("width").value=Math.round(this.value*d)}else b.updateLocker();a()}),domUtils.on($G("lock"),"change",function(){var a=parseInt($G("width").value)/parseInt($G("height").value);c.setAttribute("data-proportion",a)})},updateLocker:function(){var a=$G("width").value,b=$G("height").value,c=$G("lock");a&&b&&a==parseInt(a)&&b==parseInt(b)?(c.disabled=!1,c.title=""):(c.checked=!1,c.disabled="disabled",c.title=lang.remoteLockError)},setImage:function(a){if(a.tagName&&("img"==a.tagName.toLowerCase()||a.getAttribute("src"))&&a.src){var b=a.getAttribute("data-word-image"),c=b?b.replace("&amp;","&"):a.getAttribute("_src")||a.getAttribute("src",2).replace("&amp;","&"),d=editor.queryCommandValue("imageFloat");c!==$G("url").value&&($G("url").value=c),c&&($G("width").value=a.width||"",$G("height").value=a.height||"",$G("border").value=a.getAttribute("border")||"0",$G("vhSpace").value=a.getAttribute("vspace")||"0",$G("title").value=a.title||a.alt||"",setAlign(d),this.setPreview(),this.updateLocker())}},getData:function(){var a={};for(var b in this.dom)a[b]=this.dom[b].value;return a},setPreview:function(){var a,b,c=$G("url").value,d=$G("width").value,e=$G("height").value,f=$G("border").value,g=$G("title").value,h=$G("preview");a=d&&e?Math.min(d,h.offsetWidth):h.offsetWidth,a=a+2*f>h.offsetWidth?a:h.offsetWidth-2*f,b=d&&e?a*e/d:"",c&&(h.innerHTML='<img src="'+c+'" width="'+a+'" height="'+b+'" border="'+f+'px solid #000" title="'+g+'" />')},getInsertList:function(){var a=this.getData();if(a.url){var b={src:a.url,_src:a.url};return b._propertyDelete=[],b.style=[],a.width?(b.width=a.width,b.style.push("width:"+a.width+"px")):b._propertyDelete.push("width"),a.height?(b.height=a.height,b.style.push("height:"+a.height+"px")):b._propertyDelete.push("height"),a.border?b.border=a.border:b._propertyDelete.push("border"),a.align?b.floatStyle=a.align:b._propertyDelete.push("floatStyle"),a.vhSpace?b.vspace=a.vhSpace:b._propertyDelete.push("vspace"),a.title?b.alt=a.title:b._propertyDelete.push("alt"),b.style.length>0?b.style=b.style.join(";"):b._propertyDelete.push("style"),[b]}return[]}},UploadImage.prototype={init:function(){this.imageList=[],this.initContainer(),this.initUploader()},initContainer:function(){this.$queue=this.$wrap.find(".filelist")},initUploader:function(){function a(a){var b=h('<li id="'+a.id+'"><p class="title">'+a.name+'</p><p class="imgWrap"></p><p class="progress"><span></span></p></li>'),c=h('<div class="file-panel"><span class="cancel">'+lang.uploadDelete+'</span><span class="rotateRight">'+lang.uploadTurnRight+'</span><span class="rotateLeft">'+lang.uploadTurnLeft+"</span></div>").appendTo(b),d=b.find("p.progress span"),e=b.find("p.imgWrap"),g=h('<p class="error"></p>').hide().appendTo(b),i=function(a){switch(a){case"exceed_size":text=lang.errorExceedSize;break;case"interrupt":text=lang.errorInterrupt;break;case"http":text=lang.errorHttp;break;case"not_allow_type":text=lang.errorFileType;break;default:text=lang.errorUploadRetry}g.text(text).show()};"invalid"===a.getStatus()?i(a.statusText):(e.text(lang.uploadPreview),browser.ie&&browser.version<=7?e.text(lang.uploadNoPreview):f.makeThumb(a,function(a,b){if(a||!b)e.text(lang.uploadNoPreview);else{var c=h('<img src="'+b+'">');e.empty().append(c),c.on("error",function(){e.text(lang.uploadNoPreview)})}},t,u),w[a.id]=[a.size,0],a.rotation=0,a.ext&&z.indexOf(a.ext.toLowerCase())!=-1||(i("not_allow_type"),f.removeFile(a))),a.on("statuschange",function(e,f){"progress"===f?d.hide().width(0):"queued"===f&&(b.off("mouseenter mouseleave"),c.remove()),"error"===e||"invalid"===e?(i(a.statusText),w[a.id][1]=1):"interrupt"===e?i("interrupt"):"queued"===e?w[a.id][1]=0:"progress"===e&&(g.hide(),d.css("display","block")),b.removeClass("state-"+f).addClass("state-"+e)}),b.on("mouseenter",function(){c.stop().animate({height:30})}),b.on("mouseleave",function(){c.stop().animate({height:0})}),c.on("click","span",function(){var b,c=h(this).index();switch(c){case 0:return void f.removeFile(a);case 1:a.rotation+=90;break;case 2:a.rotation-=90}x?(b="rotate("+a.rotation+"deg)",e.css({"-webkit-transform":b,"-mos-transform":b,"-o-transform":b,transform:b})):e.css("filter","progid:DXImageTransform.Microsoft.BasicImage(rotation="+~~(a.rotation/90%4+4)%4+")")}),b.insertBefore(n)}function b(a){var b=h("#"+a.id);delete w[a.id],c(),b.off().find(".file-panel").off().end().remove()}function c(){var a,b=0,c=0,d=p.children();h.each(w,function(a,d){c+=d[0],b+=d[0]*d[1]}),a=c?b/c:0,d.eq(0).text(Math.round(100*a)+"%"),d.eq(1).css("width",Math.round(100*a)+"%"),e()}function d(a,b){if(a!=v){var c=f.getStats();switch(m.removeClass("state-"+v),m.addClass("state-"+a),a){case"pedding":j.addClass("element-invisible"),k.addClass("element-invisible"),o.removeClass("element-invisible"),p.hide(),l.hide(),f.refresh();break;case"ready":o.addClass("element-invisible"),j.removeClass("element-invisible"),k.removeClass("element-invisible"),p.hide(),l.show(),m.text(lang.uploadStart),f.refresh();break;case"uploading":p.show(),l.hide(),m.text(lang.uploadPause);break;case"paused":p.show(),l.hide(),m.text(lang.uploadContinue);break;case"confirm":if(p.show(),l.hide(),m.text(lang.uploadStart),c=f.getStats(),c.successNum&&!c.uploadFailNum)return void d("finish");break;case"finish":p.hide(),l.show(),c.uploadFailNum?m.text(lang.uploadRetry):m.text(lang.uploadStart)}v=a,e()}g.getQueueCount()?m.removeClass("disabled"):m.addClass("disabled")}function e(){var a,b="";"ready"===v?b=lang.updateStatusReady.replace("_",q).replace("_KB",WebUploader.formatSize(r)):"confirm"===v?(a=f.getStats(),a.uploadFailNum&&(b=lang.updateStatusConfirm.replace("_",a.successNum).replace("_",a.successNum))):(a=f.getStats(),b=lang.updateStatusFinish.replace("_",q).replace("_KB",WebUploader.formatSize(r)).replace("_",a.successNum),a.uploadFailNum&&(b+=lang.updateStatusError.replace("_",a.uploadFailNum))),l.html(b)}var f,g=this,h=jQuery,i=g.$wrap,j=i.find(".filelist"),k=i.find(".statusBar"),l=k.find(".info"),m=i.find(".uploadBtn"),n=(i.find(".filePickerBtn"),i.find(".filePickerBlock")),o=i.find(".placeholder"),p=k.find(".progress").hide(),q=0,r=0,s=window.devicePixelRatio||1,t=113*s,u=113*s,v="",w={},x=function(){var a=document.createElement("p").style,b="transition"in a||"WebkitTransition"in a||"MozTransition"in a||"msTransition"in a||"OTransition"in a;return a=null,b}(),y=editor.getActionUrl(editor.getOpt("imageActionName")),z=(editor.getOpt("imageAllowFiles")||[]).join("").replace(/\./g,",").replace(/^[,]/,""),A=editor.getOpt("imageMaxSize"),B=editor.getOpt("imageCompressBorder");return WebUploader.Uploader.support()?editor.getOpt("imageActionName")?(f=g.uploader=WebUploader.create({pick:{id:"#filePickerReady",label:lang.uploadSelectFile},accept:{title:"Images",extensions:z,mimeTypes:"image/*"},swf:"../../third-party/webuploader/Uploader.swf",server:y,fileVal:editor.getOpt("imageFieldName"),duplicate:!0,fileSingleSizeLimit:A,threads:1,compress:!!editor.getOpt("imageCompressEnable")&&{width:B,height:B,quality:90,allowMagnify:!1,crop:!1,preserveHeaders:!0}}),f.addButton({id:"#filePickerBlock"}),f.addButton({id:"#filePickerBtn",label:lang.uploadAddFile}),d("pedding"),f.on("fileQueued",function(b){q++,r+=b.size,1===q&&(o.addClass("element-invisible"),k.show()),a(b)}),f.on("fileDequeued",function(a){a.ext&&z.indexOf(a.ext.toLowerCase())!=-1&&a.size<=A&&(q--,r-=a.size),b(a),c()}),f.on("filesQueued",function(a){f.isInProgress()||"pedding"!=v&&"finish"!=v&&"confirm"!=v&&"ready"!=v||d("ready"),c()}),f.on("all",function(a,b){switch(a){case"uploadFinished":d("confirm",b);break;case"startUpload":var c=utils.serializeParam(editor.queryCommandValue("serverparam"))||"",e=utils.formatUrl(y+(y.indexOf("?")==-1?"?":"&")+"encode=utf-8&"+c);f.option("server",e),d("uploading",b);break;case"stopUpload":d("paused",b)}}),f.on("uploadBeforeSend",function(a,b,c){y.toLowerCase().indexOf("jsp")!=-1&&(c["X-Requested-With"]="XMLHttpRequest")}),f.on("uploadProgress",function(a,b){var d=h("#"+a.id),e=d.find(".progress span");e.css("width",100*b+"%"),w[a.id][1]=b,c()}),f.on("uploadSuccess",function(a,b){var c=h("#"+a.id);try{var d=b._raw||b,e=utils.str2json(d);"SUCCESS"==e.state?(g.imageList.push(e),c.append('<span class="success"></span>')):c.find(".error").text(e.state).show()}catch(f){c.find(".error").text(lang.errorServerUpload).show()}}),f.on("uploadError",function(a,b){}),f.on("error",function(b,c){"Q_TYPE_DENIED"!=b&&"F_EXCEED_SIZE"!=b||a(c)}),f.on("uploadComplete",function(a,b){}),m.on("click",function(){return!h(this).hasClass("disabled")&&void("ready"===v?f.upload():"paused"===v?f.upload():"uploading"===v&&f.stop())}),m.addClass("state-"+v),void c()):void h("#filePickerReady").after(h("<div>").html(lang.errorLoadConfig)).hide():void h("#filePickerReady").after(h("<div>").html(lang.errorNotSupport)).hide()},getQueueCount:function(){var a,b,c,d=0,e=this.uploader.getFiles();for(b=0;a=e[b++];)c=a.getStatus(),"queued"!=c&&"uploading"!=c&&"progress"!=c||d++;return d},destroy:function(){this.$wrap.remove()},getInsertList:function(){var a,b,c=[],d=getAlign(),e=editor.getOpt("imageUrlPrefix");for(a=0;a<this.imageList.length;a++)b=this.imageList[a],c.push({src:e+b.url,_src:e+b.url,alt:b.original,floatStyle:d});return c}},OnlineImage.prototype={init:function(){this.reset(),this.initEvents()},initContainer:function(){this.container.innerHTML="",this.list=document.createElement("ul"),this.clearFloat=document.createElement("li"),domUtils.addClass(this.list,"list"),domUtils.addClass(this.clearFloat,"clearFloat"),this.list.appendChild(this.clearFloat),this.container.appendChild(this.list)},initEvents:function(){var a=this;domUtils.on($G("imageList"),"scroll",function(b){var c=this;c.scrollHeight-(c.offsetHeight+c.scrollTop)<10&&a.getImageData()}),domUtils.on(this.container,"click",function(a){var b=a.target||a.srcElement,c=b.parentNode;"li"==c.tagName.toLowerCase()&&(domUtils.hasClass(c,"selected")?domUtils.removeClasses(c,"selected"):domUtils.addClass(c,"selected"))})},initData:function(){this.state=0,this.listSize=editor.getOpt("imageManagerListSize"),this.listIndex=0,this.listEnd=!1,this.getImageData()},reset:function(){this.initContainer(),this.initData()},getImageData:function(){var _this=this;if(!_this.listEnd&&!this.isLoadingData){this.isLoadingData=!0;var url=editor.getActionUrl(editor.getOpt("imageManagerActionName")),isJsonp=utils.isCrossDomainUrl(url);ajax.request(url,{timeout:1e5,dataType:isJsonp?"jsonp":"",headers:editor.options.serverHeaders||{},data:utils.extend({start:this.listIndex,size:this.listSize},editor.queryCommandValue("serverparam")),method:"get",onsuccess:function(r){try{var json=isJsonp?r:eval("("+r.responseText+")");"SUCCESS"===json.state&&(_this.pushData(json.list),_this.listIndex=parseInt(json.start)+parseInt(json.list.length),_this.listIndex>=json.total&&(_this.listEnd=!0),_this.isLoadingData=!1)}catch(e){if(r.responseText.indexOf("ue_separate_ue")!=-1){var list=r.responseText.split(r.responseText);_this.pushData(list),_this.listIndex=parseInt(list.length),_this.listEnd=!0,_this.isLoadingData=!1}}},onerror:function(){_this.isLoadingData=!1}})}},pushData:function(a){var b,c,d,e,f=this,g=editor.getOpt("imageManagerUrlPrefix");for(b=0;b<a.length;b++)a[b]&&a[b].url&&(c=document.createElement("li"),d=document.createElement("img"),e=document.createElement("span"),domUtils.on(d,"load",function(a){return function(){f.scale(a,a.parentNode.offsetWidth,a.parentNode.offsetHeight)}}(d)),d.width=113,d.setAttribute("src",g+a[b].url+(a[b].url.indexOf("?")==-1?"?noCache=":"&noCache=")+(+new Date).toString(36)),d.setAttribute("_src",g+a[b].url),domUtils.addClass(e,"icon"),c.appendChild(d),c.appendChild(e),this.list.insertBefore(c,this.clearFloat))},scale:function(a,b,c,d){var e=a.width,f=a.height;"justify"==d?e>=f?(a.width=b,a.height=c*f/e,a.style.marginLeft="-"+parseInt((a.width-b)/2)+"px"):(a.width=b*e/f,a.height=c,a.style.marginTop="-"+parseInt((a.height-c)/2)+"px"):e>=f?(a.width=b*e/f,a.height=c,a.style.marginLeft="-"+parseInt((a.width-b)/2)+"px"):(a.width=b,a.height=c*f/e,a.style.marginTop="-"+parseInt((a.height-c)/2)+"px")},getInsertList:function(){var a,b=this.list.children,c=[],d=getAlign();for(a=0;a<b.length;a++)if(domUtils.hasClass(b[a],"selected")){var e=b[a].firstChild,f=e.getAttribute("_src");c.push({src:f,_src:f,alt:f.substr(f.lastIndexOf("/")+1),floatStyle:d})}return c}}}();