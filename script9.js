(function (w, d) {
    w.luxiaChatEmbed = function (chatUrl) {
        let cogency_embed_data = {
            parent_id: "cogency-embed-1721331544",
            url: chatUrl,
            type: "bubble",
            options: {
                text: "Start Chat",
                css_class: "",
            },
        };

        let cache_version = cogency_embed_data?.timestamp || 1,
            public_url = cogency_embed_data.url,
            hostname = null,
            $bubble,
            $iframe,
            $embed_wrapper,
            $chat_wrapper,
            $chat_wrapper_header,
            $chat_wrapper_content,
            $chat_wrapper_close_control;

        let _createEl = (o) => {
            let type = o.type || "div",
                $el = document.createElement(type);

            for (const key of Object.keys(o)) {
                if (key != "attrs" && key != "type") $el[key] = o[key];
            }

            if (o.attrs) {
                for (let key of Object.keys(o.attrs)) {
                    let value = o.attrs[key];

                    if (key != key.toLowerCase())
                        key = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

                    $el.setAttribute(key, value);
                }
            }

            return $el;
        };

        let embeddedCSS = `
        .app-cogency-chat-embed-bubble{position:fixed!important;right:24px;bottom:28px;z-index:999999998;width:55px;height:55px;display:flex;align-items:center;justify-content:center;border-radius:50%;box-shadow:0 4px 10px 0 rgba(0,0,0,.04);transition:all .15s ease-in-out;background-color:#206bc4;cursor:pointer;border:2px solid #fff}.app-cogency-chat-embed-bubble:active{transform:scale(.965)!important}.app-cogency-chat-embed-bubble .bubble-icon{background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" /></svg>');background-size:contain;background-repeat:no-repeat;background-position:center;display:inline-block;width:35px;height:35px;position:relative}.app-cogency-chat-embed-bubble .bubble-text{font-size:12px;color:#fff}[data-is-shown=true] .app-cogency-chat-embed-bubble{display:none}#page-boards .app-cogency-chat-embed-bubble{right:20px;bottom:15px;width:45px;height:45px}#page-boards .bubble-icon{width:28px;height:28px}.app-cogency-chat-embed-iframe{position:relative;z-index:10;width:100%;min-height:710px;top:0;right:0;bottom:0;left:0;border:none}.app-cogency-chat-bubble-embed-wrapper{display:flex;flex-flow:column;width:450px;height:600px;overflow:hidden;background:#fff;position:fixed;right:24px;bottom:24px;z-index:999999999;visibility:hidden;border-radius:10px;box-shadow:rgba(50,50,93,.25) 0 13px 27px -5px,rgba(0,0,0,.3) 0 8px 16px -8px}[data-is-shown=true] .app-cogency-chat-bubble-embed-wrapper{visibility:visible}.app-cogency-chat-bubble-embed-wrapper-header{display:flex;align-items:center;justify-content:flex-end;padding:10px;background:#206bc4}.app-cogency-chat-bubble-embed-wrapper-content{display:flex;flex-flow:column;flex:1 0 auto;overflow:hidden}.app-cogency-chat-bubble-embed-wrapper-close-control{position:relative;width:20px;height:20px;opacity:.3}.app-cogency-chat-bubble-embed-wrapper-close-control:hover{opacity:1}.app-cogency-chat-bubble-embed-wrapper-close-control:after,.app-cogency-chat-bubble-embed-wrapper-close-control:before{position:absolute;left:10px;top:2px;content:' ';height:17px;width:2px;background-color:#fff}.app-cogency-chat-bubble-embed-wrapper-close-control:before{transform:rotate(45deg)}.app-cogency-chat-bubble-embed-wrapper-close-control:after{transform:rotate(-45deg)}
      `;

        let embeddedJS = `
        !function(root,factory){"object"==typeof exports&&"object"==typeof module?module.exports=factory():"function"==typeof define&&define.amd?define([],factory):"object"==typeof exports?exports.axios=factory():root.axios=factory()}(this,function(){return modules=[function(module,exports,__webpack_require__){module.exports=__webpack_require__(1)},function(module,exports,__webpack_require__){var utils=__webpack_require__(2),bind=__webpack_require__(3),Axios=__webpack_require__(4),mergeConfig=__webpack_require__(22);function createInstance(defaultConfig){var defaultConfig=new Axios(defaultConfig),instance=bind(Axios.prototype.request,defaultConfig);return utils.extend(instance,Axios.prototype,defaultConfig),utils.extend(instance,defaultConfig),instance}var axios=createInstance(__webpack_require__(10));axios.Axios=Axios,axios.create=function(instanceConfig){return createInstance(mergeConfig(axios.defaults,instanceConfig))},axios.Cancel=__webpack_require__(23),axios.CancelToken=__webpack_require__(24),axios.isCancel=__webpack_require__(9),axios.all=function(promises){return Promise.all(promises)},axios.spread=__webpack_require__(25),axios.isAxiosError=__webpack_require__(26),module.exports=axios,module.exports.default=axios},function(module,exports,__webpack_require__){var bind=__webpack_require__(3),toString=Object.prototype.toString;function isArray(val){return"[object Array]"===toString.call(val)}function isUndefined(val){return void 0===val}function isObject(val){return null!==val&&"object"==typeof val}function isPlainObject(val){return"[object Object]"===toString.call(val)&&(null===(val=Object.getPrototypeOf(val))||val===Object.prototype)}function isFunction(val){return"[object Function]"===toString.call(val)}function forEach(obj,fn){if(null!=obj)if(isArray(obj="object"!=typeof obj?[obj]:obj))for(var i=0,l=obj.length;i<l;i++)fn.call(null,obj[i],i,obj);else for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&fn.call(null,obj[key],key,obj)}module.exports={isArray:isArray,isArrayBuffer:function(val){return"[object ArrayBuffer]"===toString.call(val)},isBuffer:function(val){return null!==val&&!(void 0===val)&&null!==val.constructor&&!(void 0===val.constructor)&&"function"==typeof val.constructor.isBuffer&&val.constructor.isBuffer(val)},isFormData:function(val){return"undefined"!=typeof FormData&&val instanceof FormData},isArrayBufferView:function(val){return val="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(val):val&&val.buffer&&val.buffer instanceof ArrayBuffer},isString:function(val){return"string"==typeof val},isNumber:function(val){return"number"==typeof val},isObject:isObject,isPlainObject:isPlainObject,isUndefined:isUndefined,isDate:function(val){return"[object Date]"===toString.call(val)},isFile:function(val){return"[object File]"===toString.call(val)},isBlob:function(val){return"[object Blob]"===toString.call(val)},isFunction:isFunction,isStream:function(val){return isObject(val)&&isFunction(val.pipe)},isURLSearchParams:function(val){return"undefined"!=typeof URLSearchParams&&val instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:forEach,merge:function merge(){var result={};function assignValue(val,key){isPlainObject(result[key])&&isPlainObject(val)?result[key]=merge(result[key],val):isPlainObject(val)?result[key]=merge({},val):isArray(val)?result[key]=val.slice():result[key]=val}for(var i=0,l=arguments.length;i<l;i++)forEach(arguments[i],assignValue);return result},extend:function(a,b,thisArg){return forEach(b,function(val,key){a[key]=thisArg&&"function"==typeof val?bind(val,thisArg):val}),a},trim:function(str){return str.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(content){return content=65279===content.charCodeAt(0)?content.slice(1):content}}},function(module,exports){module.exports=function(fn,thisArg){return function(){for(var args=new Array(arguments.length),i=0;i<args.length;i++)args[i]=arguments[i];return fn.apply(thisArg,args)}}},function(module,exports,__webpack_require__){var utils=__webpack_require__(2),buildURL=__webpack_require__(5),InterceptorManager=__webpack_require__(6),dispatchRequest=__webpack_require__(7),mergeConfig=__webpack_require__(22);function Axios(instanceConfig){this.defaults=instanceConfig,this.interceptors={request:new InterceptorManager,response:new InterceptorManager}}Axios.prototype.request=function(config){"string"==typeof config?(config=arguments[1]||{}).url=arguments[0]:config=config||{},(config=mergeConfig(this.defaults,config)).method?config.method=config.method.toLowerCase():this.defaults.method?config.method=this.defaults.method.toLowerCase():config.method="get";var chain=[dispatchRequest,void 0],promise=Promise.resolve(config);for(this.interceptors.request.forEach(function(interceptor){chain.unshift(interceptor.fulfilled,interceptor.rejected)}),this.interceptors.response.forEach(function(interceptor){chain.push(interceptor.fulfilled,interceptor.rejected)});chain.length;)promise=promise.then(chain.shift(),chain.shift());return promise},Axios.prototype.getUri=function(config){return config=mergeConfig(this.defaults,config),buildURL(config.url,config.params,config.paramsSerializer).replace(/^\?/,"")},utils.forEach(["delete","get","head","options"],function(method){Axios.prototype[method]=function(url,config){return this.request(mergeConfig(config||{},{method:method,url:url,data:(config||{}).data}))}}),utils.forEach(["post","put","patch"],function(method){Axios.prototype[method]=function(url,data,config){return this.request(mergeConfig(config||{},{method:method,url:url,data:data}))}}),module.exports=Axios},function(module,exports,__webpack_require__){var utils=__webpack_require__(2);function encode(val){return encodeURIComponent(val).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}module.exports=function(url,params,paramsSerializer){var parts;return params&&(paramsSerializer=paramsSerializer?paramsSerializer(params):utils.isURLSearchParams(params)?params.toString():(parts=[],utils.forEach(params,function(val,key){null!=val&&(utils.isArray(val)?key+="[]":val=[val],utils.forEach(val,function(v){utils.isDate(v)?v=v.toISOString():utils.isObject(v)&&(v=JSON.stringify(v)),parts.push(encode(key)+"="+encode(v))}))}),parts.join("&")))&&(-1!==(params=url.indexOf("#"))&&(url=url.slice(0,params)),url+=(-1===url.indexOf("?")?"?":"&")+paramsSerializer),url}},function(module,exports,__webpack_require__){var utils=__webpack_require__(2);function InterceptorManager(){this.handlers=[]}InterceptorManager.prototype.use=function(fulfilled,rejected){return this.handlers.push({fulfilled:fulfilled,rejected:rejected}),this.handlers.length-1},InterceptorManager.prototype.eject=function(id){this.handlers[id]&&(this.handlers[id]=null)},InterceptorManager.prototype.forEach=function(fn){utils.forEach(this.handlers,function(h){null!==h&&fn(h)})},module.exports=InterceptorManager},function(module,exports,__webpack_require__){var utils=__webpack_require__(2),transformData=__webpack_require__(8),isCancel=__webpack_require__(9),defaults=__webpack_require__(10);function throwIfCancellationRequested(config){config.cancelToken&&config.cancelToken.throwIfRequested()}module.exports=function(config){return throwIfCancellationRequested(config),config.headers=config.headers||{},config.data=transformData(config.data,config.headers,config.transformRequest),config.headers=utils.merge(config.headers.common||{},config.headers[config.method]||{},config.headers),utils.forEach(["delete","get","head","post","put","patch","common"],function(method){delete config.headers[method]}),(config.adapter||defaults.adapter)(config).then(function(response){return throwIfCancellationRequested(config),response.data=transformData(response.data,response.headers,config.transformResponse),response},function(reason){return isCancel(reason)||(throwIfCancellationRequested(config),reason&&reason.response&&(reason.response.data=transformData(reason.response.data,reason.response.headers,config.transformResponse))),Promise.reject(reason)})}},function(module,exports,__webpack_require__){var utils=__webpack_require__(2);module.exports=function(data,headers,fns){return utils.forEach(fns,function(fn){data=fn(data,headers)}),data}},function(module,exports){module.exports=function(value){return!(!value||!value.__CANCEL__)}},function(module,exports,__webpack_require__){var utils=__webpack_require__(2),normalizeHeaderName=__webpack_require__(11),DEFAULT_CONTENT_TYPE={"Content-Type":"application/x-www-form-urlencoded"};function setContentTypeIfUnset(headers,value){!utils.isUndefined(headers)&&utils.isUndefined(headers["Content-Type"])&&(headers["Content-Type"]=value)}var adapter,defaults={adapter:adapter="undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process)?__webpack_require__(12):adapter,transformRequest:[function(data,headers){return normalizeHeaderName(headers,"Accept"),normalizeHeaderName(headers,"Content-Type"),utils.isFormData(data)||utils.isArrayBuffer(data)||utils.isBuffer(data)||utils.isStream(data)||utils.isFile(data)||utils.isBlob(data)?data:utils.isArrayBufferView(data)?data.buffer:utils.isURLSearchParams(data)?(setContentTypeIfUnset(headers,"application/x-www-form-urlencoded;charset=utf-8"),data.toString()):utils.isObject(data)?(setContentTypeIfUnset(headers,"application/json;charset=utf-8"),JSON.stringify(data)):data}],transformResponse:[function(data){if("string"==typeof data)try{data=JSON.parse(data)}catch(e){}return data}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(status){return 200<=status&&status<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};utils.forEach(["delete","get","head"],function(method){defaults.headers[method]={}}),utils.forEach(["post","put","patch"],function(method){defaults.headers[method]=utils.merge(DEFAULT_CONTENT_TYPE)}),module.exports=defaults},function(module,exports,__webpack_require__){var utils=__webpack_require__(2);module.exports=function(headers,normalizedName){utils.forEach(headers,function(value,name){name!==normalizedName&&name.toUpperCase()===normalizedName.toUpperCase()&&(headers[normalizedName]=value,delete headers[name])})}},function(module,exports,__webpack_require__){var utils=__webpack_require__(2),settle=__webpack_require__(13),cookies=__webpack_require__(16),buildURL=__webpack_require__(5),buildFullPath=__webpack_require__(17),parseHeaders=__webpack_require__(20),isURLSameOrigin=__webpack_require__(21),createError=__webpack_require__(14);module.exports=function(config){return new Promise(function(resolve,reject){var password,requestData=config.data,requestHeaders=config.headers,request=(utils.isFormData(requestData)&&delete requestHeaders["Content-Type"],new XMLHttpRequest),username=(config.auth&&(username=config.auth.username||"",password=config.auth.password?unescape(encodeURIComponent(config.auth.password)):"",requestHeaders.Authorization="Basic "+btoa(username+":"+password)),buildFullPath(config.baseURL,config.url));if(request.open(config.method.toUpperCase(),buildURL(username,config.params,config.paramsSerializer),!0),request.timeout=config.timeout,request.onreadystatechange=function(){var responseHeaders;request&&4===request.readyState&&(0!==request.status||request.responseURL&&0===request.responseURL.indexOf("file:"))&&(responseHeaders="getAllResponseHeaders"in request?parseHeaders(request.getAllResponseHeaders()):null,responseHeaders={data:config.responseType&&"text"!==config.responseType?request.response:request.responseText,status:request.status,statusText:request.statusText,headers:responseHeaders,config:config,request:request},settle(resolve,reject,responseHeaders),request=null)},request.onabort=function(){request&&(reject(createError("Request aborted",config,"ECONNABORTED",request)),request=null)},request.onerror=function(){reject(createError("Network Error",config,null,request)),request=null},request.ontimeout=function(){var timeoutErrorMessage="timeout of "+config.timeout+"ms exceeded";config.timeoutErrorMessage&&(timeoutErrorMessage=config.timeoutErrorMessage),reject(createError(timeoutErrorMessage,config,"ECONNABORTED",request)),request=null},utils.isStandardBrowserEnv()&&(password=(config.withCredentials||isURLSameOrigin(username))&&config.xsrfCookieName?cookies.read(config.xsrfCookieName):void 0)&&(requestHeaders[config.xsrfHeaderName]=password),"setRequestHeader"in request&&utils.forEach(requestHeaders,function(val,key){void 0===requestData&&"content-type"===key.toLowerCase()?delete requestHeaders[key]:request.setRequestHeader(key,val)}),utils.isUndefined(config.withCredentials)||(request.withCredentials=!!config.withCredentials),config.responseType)try{request.responseType=config.responseType}catch(e){if("json"!==config.responseType)throw e}"function"==typeof config.onDownloadProgress&&request.addEventListener("progress",config.onDownloadProgress),"function"==typeof config.onUploadProgress&&request.upload&&request.upload.addEventListener("progress",config.onUploadProgress),config.cancelToken&&config.cancelToken.promise.then(function(cancel){request&&(request.abort(),reject(cancel),request=null)}),requestData=requestData||null,request.send(requestData)})}},function(module,exports,__webpack_require__){var createError=__webpack_require__(14);module.exports=function(resolve,reject,response){var validateStatus=response.config.validateStatus;response.status&&validateStatus&&!validateStatus(response.status)?reject(createError("Request failed with status code "+response.status,response.config,null,response.request,response)):resolve(response)}},function(module,exports,__webpack_require__){var enhanceError=__webpack_require__(15);module.exports=function(message,config,code,request,response){message=new Error(message);return enhanceError(message,config,code,request,response)}},function(module,exports){module.exports=function(error,config,code,request,response){return error.config=config,code&&(error.code=code),error.request=request,error.response=response,error.isAxiosError=!0,error.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},error}},function(module,exports,__webpack_require__){var utils=__webpack_require__(2);module.exports=utils.isStandardBrowserEnv()?{write:function(name,value,expires,path,domain,secure){var cookie=[];cookie.push(name+"="+encodeURIComponent(value)),utils.isNumber(expires)&&cookie.push("expires="+new Date(expires).toGMTString()),utils.isString(path)&&cookie.push("path="+path),utils.isString(domain)&&cookie.push("domain="+domain),!0===secure&&cookie.push("secure"),document.cookie=cookie.join("; ")},read:function(name){name=document.cookie.match(new RegExp("(^|;\\s*)("+name+")=([^;]*)"));return name?decodeURIComponent(name[3]):null},remove:function(name){this.write(name,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(module,exports,__webpack_require__){var isAbsoluteURL=__webpack_require__(18),combineURLs=__webpack_require__(19);module.exports=function(baseURL,requestedURL){return baseURL&&!isAbsoluteURL(requestedURL)?combineURLs(baseURL,requestedURL):requestedURL}},function(module,exports){module.exports=function(url){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)}},function(module,exports){module.exports=function(baseURL,relativeURL){return relativeURL?baseURL.replace(/\/+$/,"")+"/"+relativeURL.replace(/^\/+/,""):baseURL}},function(module,exports,__webpack_require__){var utils=__webpack_require__(2),ignoreDuplicateOf=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];module.exports=function(headers){var key,i,parsed={};return headers&&utils.forEach(headers.split("\n"),function(line){i=line.indexOf(":"),key=utils.trim(line.substr(0,i)).toLowerCase(),i=utils.trim(line.substr(i+1)),!key||parsed[key]&&0<=ignoreDuplicateOf.indexOf(key)||(parsed[key]="set-cookie"===key?(parsed[key]||[]).concat([i]):parsed[key]?parsed[key]+", "+i:i)}),parsed}},function(module,exports,__webpack_require__){var originURL,msie,urlParsingNode,utils=__webpack_require__(2);function resolveURL(url){return msie&&(urlParsingNode.setAttribute("href",url),url=urlParsingNode.href),urlParsingNode.setAttribute("href",url),{href:urlParsingNode.href,protocol:urlParsingNode.protocol?urlParsingNode.protocol.replace(/:$/,""):"",host:urlParsingNode.host,search:urlParsingNode.search?urlParsingNode.search.replace(/^\?/,""):"",hash:urlParsingNode.hash?urlParsingNode.hash.replace(/^#/,""):"",hostname:urlParsingNode.hostname,port:urlParsingNode.port,pathname:"/"===urlParsingNode.pathname.charAt(0)?urlParsingNode.pathname:"/"+urlParsingNode.pathname}}module.exports=utils.isStandardBrowserEnv()?(msie=/(msie|trident)/i.test(navigator.userAgent),urlParsingNode=document.createElement("a"),originURL=resolveURL(window.location.href),function(requestURL){requestURL=utils.isString(requestURL)?resolveURL(requestURL):requestURL;return requestURL.protocol===originURL.protocol&&requestURL.host===originURL.host}):function(){return!0}},function(module,exports,__webpack_require__){var utils=__webpack_require__(2);module.exports=function(config1,config2){config2=config2||{};var config={},valueFromConfig2Keys=["url","method","data"],mergeDeepPropertiesKeys=["headers","auth","proxy","params"],defaultToConfig2Keys=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],directMergeKeys=["validateStatus"];function getMergedValue(target,source){return utils.isPlainObject(target)&&utils.isPlainObject(source)?utils.merge(target,source):utils.isPlainObject(source)?utils.merge({},source):utils.isArray(source)?source.slice():source}function mergeDeepProperties(prop){utils.isUndefined(config2[prop])?utils.isUndefined(config1[prop])||(config[prop]=getMergedValue(void 0,config1[prop])):config[prop]=getMergedValue(config1[prop],config2[prop])}utils.forEach(valueFromConfig2Keys,function(prop){utils.isUndefined(config2[prop])||(config[prop]=getMergedValue(void 0,config2[prop]))}),utils.forEach(mergeDeepPropertiesKeys,mergeDeepProperties),utils.forEach(defaultToConfig2Keys,function(prop){utils.isUndefined(config2[prop])?utils.isUndefined(config1[prop])||(config[prop]=getMergedValue(void 0,config1[prop])):config[prop]=getMergedValue(void 0,config2[prop])}),utils.forEach(directMergeKeys,function(prop){prop in config2?config[prop]=getMergedValue(config1[prop],config2[prop]):prop in config1&&(config[prop]=getMergedValue(void 0,config1[prop]))});var axiosKeys=valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys),valueFromConfig2Keys=Object.keys(config1).concat(Object.keys(config2)).filter(function(key){return-1===axiosKeys.indexOf(key)});return utils.forEach(valueFromConfig2Keys,mergeDeepProperties),config}},function(module,exports){function Cancel(message){this.message=message}Cancel.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},Cancel.prototype.__CANCEL__=!0,module.exports=Cancel},function(module,exports,__webpack_require__){var Cancel=__webpack_require__(23);function CancelToken(executor){if("function"!=typeof executor)throw new TypeError("executor must be a function.");this.promise=new Promise(function(resolve){resolvePromise=resolve});var resolvePromise,token=this;executor(function(message){token.reason||(token.reason=new Cancel(message),resolvePromise(token.reason))})}CancelToken.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},CancelToken.source=function(){var cancel;return{token:new CancelToken(function(c){cancel=c}),cancel:cancel}},module.exports=CancelToken},function(module,exports){module.exports=function(callback){return function(arr){return callback.apply(null,arr)}}},function(module,exports){module.exports=function(payload){return"object"==typeof payload&&!0===payload.isAxiosError}}],installedModules={},__webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0);function __webpack_require__(moduleId){var module;return(installedModules[moduleId]||(module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1},modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module)).exports}var modules,installedModules});
      `;


        let _embedCSS = () => {
            const style = d.createElement("style");
            style.textContent = embeddedCSS;
            d.head.appendChild(style);
            console.log("Embedded CSS loaded!");
        };

        let _embedJS = () => {
            const script = d.createElement("script");
            script.textContent = embeddedJS;
            d.body.appendChild(script);
            console.log("Embedded JS loaded!");
        };

        let getType = () => {
            return cogency_embed_data?.type;
        };

        let isBubble = () => {
            return getType() === "bubble";
        };

        let loadBubble = () => {
            $bubble = createBubble();
            document.querySelector("body").appendChild($embed_wrapper);
            $embed_wrapper.appendChild($bubble);
        };

        let loadStandaloneIframe = ($target = $embed_wrapper, callback) => {
            $iframe = createIframe();

            window.addEventListener("message", (event) => {
                if (!event.origin.match(hostname)) return;

                iframeAutoResize(event.data?.height);
            });

            $target.appendChild($iframe);
        };

        let onIframeLoaded = (event) => {
            let is_bubble = isBubble();

            if (is_bubble) iframeAutoResize(670);
        };

        let _onChannelLinkLoaded = () => {
            let parent_id = cogency_embed_data.parent_id;

            $embed_wrapper = d.querySelector(`#${parent_id}`);
            if (!$embed_wrapper) {
                console.error(`Element with id ${parent_id} not found.`);
                return;
            }

            if (isBubble()) loadBubble();
            else loadStandaloneIframe();
        };

        let _loadResources = () => {
            _embedCSS();
            _embedJS();
            console.log("All resources loaded!");
            const chatWrapper = _createEl({
                type: "div",
                id: "cogency-embed-1721331544",
                className: `cogency-embed-wrapper`,
            });

            d.body.appendChild(chatWrapper);
            _onChannelLinkLoaded();
        };

        _loadResources();

        let showChat = (event) => {
            event.preventDefault();

            createBubbleChatWrapper();

            let is_shown = $embed_wrapper.getAttribute("data-is-shown") == "true";

            $embed_wrapper.setAttribute("data-is-shown", !is_shown);
        };

        let createBubbleChatWrapper = () => {
            if ($chat_wrapper) return;

            $chat_wrapper = _createEl({
                type: "div",
                className: `app-cogency-chat-bubble-embed-wrapper`,
                attrs: {},
            });
            $embed_wrapper.appendChild($chat_wrapper);

            $chat_wrapper_header = _createEl({
                type: "div",
                className: `app-cogency-chat-bubble-embed-wrapper-header`,
                attrs: {},
            });
            $chat_wrapper_content = _createEl({
                type: "div",
                className: `app-cogency-chat-bubble-embed-wrapper-content`,
                attrs: {},
            });
            $chat_wrapper.appendChild($chat_wrapper_header);
            $chat_wrapper.appendChild($chat_wrapper_content);

            $iframe = createIframe(["is_bubble=true"]);
            $chat_wrapper_content.appendChild($iframe);

            $chat_wrapper_close_control = _createEl({
                type: "a",
                className: `app-cogency-chat-bubble-embed-wrapper-close-control`,
                attrs: {
                    href: "#",
                },
            });
            $chat_wrapper_header.appendChild($chat_wrapper_close_control);

            $chat_wrapper_close_control.addEventListener("click", showChat);
        };

        let createBubble = () => {
            let $bubble = _createEl({
                type: "div",
                className: "app-cogency-chat-embed-bubble",
                attrs: {},
            }),
                $icon = _createEl({
                    type: "div",
                    className: `bubble-icon`,
                    attrs: {},
                });

            $bubble.appendChild($icon);

            $bubble.addEventListener("click", showChat);

            return $bubble;
        };

        let createIframe = () => {
            let $iframe = _createEl({
                type: "iframe",
                className: "app-cogency-chat-embed-iframe",
                innerHTML: cogency_embed_data?.options?.text,
                attrs: {
                    src: public_url,
                    frameborder: 0,
                    allowfullscreen: "allowfullscreen",
                    scrolling: "no",
                },
            });

            $iframe.addEventListener("load", onIframeLoaded);
            $iframe.addEventListener("error", (event) => {
                console.error("Error loading iframe:", event);
            });

            return $iframe;
        };

        let iframeAutoResize = (height) => {
            if (height) {
                let h = ~~height + 30;
                $iframe.style.height = `${h}px`;
                $iframe.style.minHeight = `${h}px`;
            }
        };

        let isIframe = () => {
            return getType() === "iframe";
        };
    };
})(window, document);
