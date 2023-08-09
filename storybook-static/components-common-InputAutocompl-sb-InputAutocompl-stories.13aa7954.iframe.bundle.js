/*! For license information please see components-common-InputAutocompl-sb-InputAutocompl-stories.13aa7954.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkmovies=self.webpackChunkmovies||[]).push([[197],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}__webpack_require__.d(__webpack_exports__,{Z:()=>_defineProperty})},"./node_modules/@babel/runtime/helpers/esm/extends.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}__webpack_require__.d(__webpack_exports__,{Z:()=>_extends})},"./src/components/common/InputAutocompl/sb/InputAutocompl.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,default:()=>InputAutocompl_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),sha1=__webpack_require__("./node_modules/js-sha1/src/sha1.js"),sha1_default=__webpack_require__.n(sha1),__jsx=react.createElement;function InputAutocompl(props){var value=props.value,autocompl=props.autocompl,onFocus=props.onFocus,onChange=props.onChange,onSelect=props.onSelect,css=props.css,elemId=(0,react.useId)(),_useState=(0,react.useState)(!1),isOpen=_useState[0],setIsOpen=_useState[1];return __jsx("div",{id:elemId,className:[css.body,isOpen?css["--open"]:css["--closed"]].join(" ")},__jsx("div",{className:css["input-wrapper"]},__jsx("input",{type:"text",style:{paddingRight:"1.8em"},className:css.input,value,onChange:function inputOnChange(ev){var value=ev.currentTarget.value;onChange(value),setIsOpen(!0)},onFocus:function inputOnFocus(){onFocus(),setIsOpen(!0)},onBlur:function inputOnBlur(ev){var _ev$relatedTarget;null!==(_ev$relatedTarget=ev.relatedTarget)&&void 0!==_ev$relatedTarget&&_ev$relatedTarget.closest("#"+elemId.replace(/:/g,"\\:"))||setIsOpen(!1)}}),""!==value&&__jsx("div",{className:css["input-clear"],onClick:function inputClearOnClick(){onSelect(""),setIsOpen(!1)}})),__jsx("div",{className:css["list-wrapper"]},autocompl.length>0&&__jsx("ul",{className:css.list,tabIndex:0},autocompl.map((function(item){return __jsx("li",{key:sha1_default()(item),onClick:function onClick(){return function itemOnClick(value){onSelect(value),setIsOpen(!1)}(item)}},item)})))))}InputAutocompl.displayName="InputAutocompl",InputAutocompl.__docgenInfo={description:"",methods:[],displayName:"InputAutocompl",props:{value:{required:!0,tsType:{name:"string"},description:""},autocompl:{required:!0,tsType:{name:"Autocompl"},description:""},onFocus:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{name:"value",type:{name:"string"}}],return:{name:"void"}}},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{name:"value",type:{name:"string"}}],return:{name:"void"}}},description:""},css:{required:!0,tsType:{name:"signature",type:"object",raw:"{readonly [key: string]: string}",signature:{properties:[{key:{name:"string"},value:{name:"string",required:!0}}]}},description:""}}};try{InputAutocompl.displayName="InputAutocompl",InputAutocompl.__docgenInfo={description:"",displayName:"InputAutocompl",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}},autocompl:{defaultValue:null,description:"",name:"autocompl",required:!0,type:{name:"Autocompl"}},onFocus:{defaultValue:null,description:"",name:"onFocus",required:!0,type:{name:"() => void"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(value: string) => void"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!0,type:{name:"(value: string) => void"}},css:{defaultValue:null,description:"",name:"css",required:!0,type:{name:"{ readonly [key: string]: string; }"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/InputAutocompl/InputAutocompl.tsx#InputAutocompl"]={docgenInfo:InputAutocompl.__docgenInfo,name:"InputAutocompl",path:"src/components/common/InputAutocompl/InputAutocompl.tsx#InputAutocompl"})}catch(__react_docgen_typescript_loader_error){}var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),InputAutocompl_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/@storybook/nextjs/node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[4]!./src/components/common/InputAutocompl/sb/InputAutocompl.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(InputAutocompl_module.Z,options);const sb_InputAutocompl_module=InputAutocompl_module.Z&&InputAutocompl_module.Z.locals?InputAutocompl_module.Z.locals:void 0;var _Default$parameters,_Default$parameters2,_Default$parameters2$,InputAutocompl_stories_jsx=react.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const InputAutocompl_stories={title:"InputAutocompl",component:InputAutocompl,decorators:[function(Story){return InputAutocompl_stories_jsx("div",{style:{width:"12rem"}},InputAutocompl_stories_jsx(Story,null))}]};var InputAutocomplWrapped=function InputAutocomplWrapped(props){var _useState=(0,react.useState)(props.value),value=_useState[0],setValue=_useState[1],_useState2=(0,react.useState)(props.autocompl),autocompl=_useState2[0],setAutocompl=_useState2[1],onChange=function onChange(value){setValue(value);var autocompl=""!==value?[1,2,3,4].map((function(i){return value+"-"+i.toString()})):[];setAutocompl(autocompl)};return InputAutocompl_stories_jsx(InputAutocompl,(0,esm_extends.Z)({},props,{value,autocompl,onFocus:function onFocus(){var value=props.value;setValue(value);var autocompl=""!==value?[1,2,3,4].map((function(i){return value+"-"+i.toString()})):[];setAutocompl(autocompl)},onChange,onSelect:onChange}))};InputAutocomplWrapped.displayName="InputAutocomplWrapped";var Default={args:{value:"",autocompl:[],onFocus:function onFocus(){},onChange:function onChange(){},onSelect:function onSelect(){},css:sb_InputAutocompl_module},render:function render(args){return InputAutocompl_stories_jsx(InputAutocomplWrapped,args)}};Default.parameters=_objectSpread(_objectSpread({},Default.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Default$parameters=Default.parameters)||void 0===_Default$parameters?void 0:_Default$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    value: '',\n    autocompl: [],\n    onFocus: () => {},\n    onChange: () => {},\n    onSelect: () => {},\n    css: InputAutocomplCss\n  },\n  render: args => <InputAutocomplWrapped {...args} />\n}"},null===(_Default$parameters2=Default.parameters)||void 0===_Default$parameters2||null===(_Default$parameters2$=_Default$parameters2.docs)||void 0===_Default$parameters2$?void 0:_Default$parameters2$.source)})})},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/@storybook/nextjs/node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[4]!./src/components/common/InputAutocompl/sb/InputAutocompl.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,'.InputAutocompl_body__BZpu2{display:inline-block;width:100%;font-size:1rem}.InputAutocompl_input-wrapper__KgILQ{position:relative}.InputAutocompl_input__rpHz7{width:100%;padding:.3rem;font-size:1rem;border:1px solid #aab8c2;outline:none;box-shadow:none}.InputAutocompl_input__rpHz7:focus{background-color:#f5f8fa;border:1px solid #1da1f2}.InputAutocompl_input-clear__uFQTc{position:absolute;display:flex;right:.5em;top:calc(50% - .7em);justify-content:center;cursor:pointer}.InputAutocompl_input-clear__uFQTc::after{align-self:center;content:"✖"}.InputAutocompl_list-wrapper__GCzgZ{position:relative}.InputAutocompl_list__ID22q{position:absolute;top:1px;margin:0;max-height:16em;overflow:auto;padding:0;background-color:#fff;border:1px solid #aab8c2;cursor:default}.InputAutocompl_list__ID22q li{list-style-type:none;padding:.3em;white-space:nowrap}.InputAutocompl_list__ID22q li:hover{color:#fff;background-color:#1da1f2}.InputAutocompl_--closed__0Oz6P .InputAutocompl_list__ID22q{height:0;border:none}',"",{version:3,sources:["webpack://./src/components/common/InputAutocompl/sb/InputAutocompl.module.scss","webpack://./src/components/common/InputAutocompl/InputAutocompl.scss"],names:[],mappings:"AAAA,4BCCA,oBACE,CAAA,UDDM,CAAA,cCGN,CAAA,qCAGF,iBACE,CAAA,6BAGF,UACE,CAAA,aDVQ,CAAA,cCYR,CAAA,wBACA,CAAA,YACA,CAAA,eACA,CAAA,mCAEA,wBDde,CAAA,wBCgBb,CAAA,mCAIJ,iBACE,CAAA,YACA,CAAA,UACA,CAAA,oBACA,CAAA,sBACA,CAAA,cACA,CAAA,0CAEA,iBACE,CAAA,WACA,CAAA,oCAIJ,iBACE,CAAA,4BAGF,iBACE,CAAA,OACA,CAAA,QACA,CAAA,eDtCgB,CAAA,aCwChB,CAAA,SACA,CAAA,qBD7CS,CAAA,wBC+CT,CAAA,cACA,CAAA,+BAEA,oBACE,CAAA,YD9CW,CAAA,kBCgDX,CAAA,qCAEA,UDjDe,CAAA,wBACG,CAAA,4DCuDtB,QACE,CAAA,WACA",sourcesContent:["\r\n$width: 100%;\r\n$padding: 0.3rem;\r\n$color: black;\r\n$bg-color: white;\r\n$bg-color-focus: #F5F8FA;\r\n$brd-color: #AAB8C2;\r\n$brd-color-focus: #1DA1F2;\r\n$list-max-height: 16em;\r\n$item-padding: 0.3em;\r\n$item-color-hover: white;\r\n$item-bg-color-hover: #1DA1F2;\r\n\r\n@import '../InputAutocompl.scss';","\r\n.body {\r\n  display: inline-block;\r\n  width: $width;\r\n  font-size: 1rem;\r\n}\r\n\r\n.input-wrapper {\r\n  position: relative;\r\n}\r\n\r\n.input {\r\n  width: 100%;\r\n  padding: $padding;\r\n  font-size: 1rem;\r\n  border: 1px solid $brd-color;\r\n  outline: none;\r\n  box-shadow: none; \r\n\r\n  &:focus {\r\n    background-color: $bg-color-focus;\r\n    border: 1px solid $brd-color-focus;\r\n  }\r\n}\r\n\r\n.input-clear {\r\n  position: absolute;\r\n  display: flex;\r\n  right: 0.5em;\r\n  top: calc(50% - 0.7em);\r\n  justify-content: center;\r\n  cursor: pointer;\r\n\r\n  &::after {\r\n    align-self: center;\r\n    content: '✖';\r\n  }\r\n}\r\n\r\n.list-wrapper {\r\n  position: relative;\r\n}\r\n\r\n.list {\r\n  position: absolute;\r\n  top: 1px;\r\n  margin: 0;\r\n  max-height: $list-max-height;\r\n  overflow: auto;\r\n  padding: 0;\r\n  background-color: $bg-color;\r\n  border: 1px solid $brd-color;\r\n  cursor: default;\r\n\r\n  & li {\r\n    list-style-type: none;\r\n    padding: $item-padding;\r\n    white-space: nowrap;\r\n\r\n    &:hover {\r\n      color: $item-color-hover;\r\n      background-color: $item-bg-color-hover;\r\n    }\r\n  }\r\n}\r\n\r\n.--closed .list {\r\n  height: 0;\r\n  border: none;\r\n}\r\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={body:"InputAutocompl_body__BZpu2","input-wrapper":"InputAutocompl_input-wrapper__KgILQ",input:"InputAutocompl_input__rpHz7","input-clear":"InputAutocompl_input-clear__uFQTc","list-wrapper":"InputAutocompl_list-wrapper__GCzgZ",list:"InputAutocompl_list__ID22q","--closed":"InputAutocompl_--closed__0Oz6P"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/js-sha1/src/sha1.js":(module,exports,__webpack_require__)=>{var process=__webpack_require__("./node_modules/process/browser.js"),__WEBPACK_AMD_DEFINE_RESULT__;(function(){"use strict";var root="object"==typeof window?window:{},NODE_JS=!root.JS_SHA1_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;NODE_JS&&(root=__webpack_require__.g);var COMMON_JS=!root.JS_SHA1_NO_COMMON_JS&&module.exports,AMD=__webpack_require__.amdO,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[-2147483648,8388608,32768,128],SHIFT=[24,16,8,0],OUTPUT_TYPES=["hex","array","digest","arrayBuffer"],blocks=[],createOutputMethod=function(outputType){return function(message){return new Sha1(!0).update(message)[outputType]()}},createMethod=function(){var method=createOutputMethod("hex");NODE_JS&&(method=nodeWrap(method)),method.create=function(){return new Sha1},method.update=function(message){return method.create().update(message)};for(var i=0;i<OUTPUT_TYPES.length;++i){var type=OUTPUT_TYPES[i];method[type]=createOutputMethod(type)}return method},nodeWrap=function(method){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),nodeMethod=function(message){if("string"==typeof message)return crypto.createHash("sha1").update(message,"utf8").digest("hex");if(message.constructor===ArrayBuffer)message=new Uint8Array(message);else if(void 0===message.length)return method(message);return crypto.createHash("sha1").update(new Buffer(message)).digest("hex")};return nodeMethod};function Sha1(sharedMemory){sharedMemory?(blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.h0=1732584193,this.h1=4023233417,this.h2=2562383102,this.h3=271733878,this.h4=3285377520,this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}Sha1.prototype.update=function(message){if(!this.finalized){var notString="string"!=typeof message;notString&&message.constructor===root.ArrayBuffer&&(message=new Uint8Array(message));for(var code,i,index=0,length=message.length||0,blocks=this.blocks;index<length;){if(this.hashed&&(this.hashed=!1,blocks[0]=this.block,blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0),notString)for(i=this.start;index<length&&i<64;++index)blocks[i>>2]|=message[index]<<SHIFT[3&i++];else for(i=this.start;index<length&&i<64;++index)(code=message.charCodeAt(index))<128?blocks[i>>2]|=code<<SHIFT[3&i++]:code<2048?(blocks[i>>2]|=(192|code>>6)<<SHIFT[3&i++],blocks[i>>2]|=(128|63&code)<<SHIFT[3&i++]):code<55296||code>=57344?(blocks[i>>2]|=(224|code>>12)<<SHIFT[3&i++],blocks[i>>2]|=(128|code>>6&63)<<SHIFT[3&i++],blocks[i>>2]|=(128|63&code)<<SHIFT[3&i++]):(code=65536+((1023&code)<<10|1023&message.charCodeAt(++index)),blocks[i>>2]|=(240|code>>18)<<SHIFT[3&i++],blocks[i>>2]|=(128|code>>12&63)<<SHIFT[3&i++],blocks[i>>2]|=(128|code>>6&63)<<SHIFT[3&i++],blocks[i>>2]|=(128|63&code)<<SHIFT[3&i++]);this.lastByteIndex=i,this.bytes+=i-this.start,i>=64?(this.block=blocks[16],this.start=i-64,this.hash(),this.hashed=!0):this.start=i}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Sha1.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var blocks=this.blocks,i=this.lastByteIndex;blocks[16]=this.block,blocks[i>>2]|=EXTRA[3&i],this.block=blocks[16],i>=56&&(this.hashed||this.hash(),blocks[0]=this.block,blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0),blocks[14]=this.hBytes<<3|this.bytes>>>29,blocks[15]=this.bytes<<3,this.hash()}},Sha1.prototype.hash=function(){var j,t,a=this.h0,b=this.h1,c=this.h2,d=this.h3,e=this.h4,blocks=this.blocks;for(j=16;j<80;++j)t=blocks[j-3]^blocks[j-8]^blocks[j-14]^blocks[j-16],blocks[j]=t<<1|t>>>31;for(j=0;j<20;j+=5)a=(t=(b=(t=(c=(t=(d=(t=(e=(t=a<<5|a>>>27)+(b&c|~b&d)+e+1518500249+blocks[j]<<0)<<5|e>>>27)+(a&(b=b<<30|b>>>2)|~a&c)+d+1518500249+blocks[j+1]<<0)<<5|d>>>27)+(e&(a=a<<30|a>>>2)|~e&b)+c+1518500249+blocks[j+2]<<0)<<5|c>>>27)+(d&(e=e<<30|e>>>2)|~d&a)+b+1518500249+blocks[j+3]<<0)<<5|b>>>27)+(c&(d=d<<30|d>>>2)|~c&e)+a+1518500249+blocks[j+4]<<0,c=c<<30|c>>>2;for(;j<40;j+=5)a=(t=(b=(t=(c=(t=(d=(t=(e=(t=a<<5|a>>>27)+(b^c^d)+e+1859775393+blocks[j]<<0)<<5|e>>>27)+(a^(b=b<<30|b>>>2)^c)+d+1859775393+blocks[j+1]<<0)<<5|d>>>27)+(e^(a=a<<30|a>>>2)^b)+c+1859775393+blocks[j+2]<<0)<<5|c>>>27)+(d^(e=e<<30|e>>>2)^a)+b+1859775393+blocks[j+3]<<0)<<5|b>>>27)+(c^(d=d<<30|d>>>2)^e)+a+1859775393+blocks[j+4]<<0,c=c<<30|c>>>2;for(;j<60;j+=5)a=(t=(b=(t=(c=(t=(d=(t=(e=(t=a<<5|a>>>27)+(b&c|b&d|c&d)+e-1894007588+blocks[j]<<0)<<5|e>>>27)+(a&(b=b<<30|b>>>2)|a&c|b&c)+d-1894007588+blocks[j+1]<<0)<<5|d>>>27)+(e&(a=a<<30|a>>>2)|e&b|a&b)+c-1894007588+blocks[j+2]<<0)<<5|c>>>27)+(d&(e=e<<30|e>>>2)|d&a|e&a)+b-1894007588+blocks[j+3]<<0)<<5|b>>>27)+(c&(d=d<<30|d>>>2)|c&e|d&e)+a-1894007588+blocks[j+4]<<0,c=c<<30|c>>>2;for(;j<80;j+=5)a=(t=(b=(t=(c=(t=(d=(t=(e=(t=a<<5|a>>>27)+(b^c^d)+e-899497514+blocks[j]<<0)<<5|e>>>27)+(a^(b=b<<30|b>>>2)^c)+d-899497514+blocks[j+1]<<0)<<5|d>>>27)+(e^(a=a<<30|a>>>2)^b)+c-899497514+blocks[j+2]<<0)<<5|c>>>27)+(d^(e=e<<30|e>>>2)^a)+b-899497514+blocks[j+3]<<0)<<5|b>>>27)+(c^(d=d<<30|d>>>2)^e)+a-899497514+blocks[j+4]<<0,c=c<<30|c>>>2;this.h0=this.h0+a<<0,this.h1=this.h1+b<<0,this.h2=this.h2+c<<0,this.h3=this.h3+d<<0,this.h4=this.h4+e<<0},Sha1.prototype.hex=function(){this.finalize();var h0=this.h0,h1=this.h1,h2=this.h2,h3=this.h3,h4=this.h4;return HEX_CHARS[h0>>28&15]+HEX_CHARS[h0>>24&15]+HEX_CHARS[h0>>20&15]+HEX_CHARS[h0>>16&15]+HEX_CHARS[h0>>12&15]+HEX_CHARS[h0>>8&15]+HEX_CHARS[h0>>4&15]+HEX_CHARS[15&h0]+HEX_CHARS[h1>>28&15]+HEX_CHARS[h1>>24&15]+HEX_CHARS[h1>>20&15]+HEX_CHARS[h1>>16&15]+HEX_CHARS[h1>>12&15]+HEX_CHARS[h1>>8&15]+HEX_CHARS[h1>>4&15]+HEX_CHARS[15&h1]+HEX_CHARS[h2>>28&15]+HEX_CHARS[h2>>24&15]+HEX_CHARS[h2>>20&15]+HEX_CHARS[h2>>16&15]+HEX_CHARS[h2>>12&15]+HEX_CHARS[h2>>8&15]+HEX_CHARS[h2>>4&15]+HEX_CHARS[15&h2]+HEX_CHARS[h3>>28&15]+HEX_CHARS[h3>>24&15]+HEX_CHARS[h3>>20&15]+HEX_CHARS[h3>>16&15]+HEX_CHARS[h3>>12&15]+HEX_CHARS[h3>>8&15]+HEX_CHARS[h3>>4&15]+HEX_CHARS[15&h3]+HEX_CHARS[h4>>28&15]+HEX_CHARS[h4>>24&15]+HEX_CHARS[h4>>20&15]+HEX_CHARS[h4>>16&15]+HEX_CHARS[h4>>12&15]+HEX_CHARS[h4>>8&15]+HEX_CHARS[h4>>4&15]+HEX_CHARS[15&h4]},Sha1.prototype.toString=Sha1.prototype.hex,Sha1.prototype.digest=function(){this.finalize();var h0=this.h0,h1=this.h1,h2=this.h2,h3=this.h3,h4=this.h4;return[h0>>24&255,h0>>16&255,h0>>8&255,255&h0,h1>>24&255,h1>>16&255,h1>>8&255,255&h1,h2>>24&255,h2>>16&255,h2>>8&255,255&h2,h3>>24&255,h3>>16&255,h3>>8&255,255&h3,h4>>24&255,h4>>16&255,h4>>8&255,255&h4]},Sha1.prototype.array=Sha1.prototype.digest,Sha1.prototype.arrayBuffer=function(){this.finalize();var buffer=new ArrayBuffer(20),dataView=new DataView(buffer);return dataView.setUint32(0,this.h0),dataView.setUint32(4,this.h1),dataView.setUint32(8,this.h2),dataView.setUint32(12,this.h3),dataView.setUint32(16,this.h4),buffer};var exports=createMethod();COMMON_JS?module.exports=exports:(root.sha1=exports,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return exports}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))})()}}]);