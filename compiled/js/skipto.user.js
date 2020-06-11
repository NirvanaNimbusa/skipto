// -----------------------------------------------------
// Title: Skip to Options User script
// version: 2.1.1
// Date: 2020-06-11
// Author: PayPal Accessibility Team and University of Illinois
// Homepage: https://github.com/paypal/skipto
// Copyright (c) 2020 PayPal Accessibility Team and University of Illinois
// -----------------------------------------------------
//
// ==UserScript==
// @name skipto
// @namespace skipto
// @description This plugin provides a dynamically-generated drop-down menu that allows keyboard and screen reader users to quickly skip to the most important places on the webpage.
// @include *
// ==/UserScript==

/*! skipto - v2.1.1 - 2020-06-11
* https://github.com/paypal/skipto
* Copyright (c) 2020 PayPal Accessibility Team and University of Illinois; Licensed BSD */
 /*@cc_on @*/
/*@if (@_jscript_version >= 5.8) @*/

!function(){"use strict";var SkipTo={headingElementsArr:[],landmarkElementsArr:[],idElementsArr:[],domNode:null,buttonNode:null,menuNode:null,menuitemNodes:[],firstMenuitem:!1,lastMenuitem:!1,firstChars:[],config:{containerDivLabel:"Skip To Keyboard Navigation",containerDivRole:"complementary",buttonLabel:"Skip To ...",menuLabel:"Skip To and Page Outline",landmarksLabel:"Skip To",headingsLabel:"Page Outline",landmarks:'main, [role="main"], nav, [role="navigation"], [role="search"], aside',headings:"h1, h2, h3",accessKey:"0",enumerateElements:"true",attachElement:null,customClass:"",alwaysVisible:!1,backgroundColor:"purple",color:"blue",backgroundFocusColor:"red",focusColor:"green"},defaultCSS:".skipTo{position:absolute}.skipTo.offscreen{top:-30em;left:-3000em}.skipTo button{margin:0;padding:6px;position:relative;border-radius:5px;background-color:#eee;border-width:0;border-style:none;color:#000}.skipTo [role="menu"]{display:none;margin:0;padding:0}.skipTo [role="separator"]:first-child{border-radius:5px 5px 0 0}.skipTo [role="menuitem"]{margin:0;padding:4px;display:block;width:auto;background-color:#eee;border-width:0px;border-style:solid;color:#000}.skipTo [role="separator"]{margin:0;padding:4px;display:block;width:auto;font-weight:bold;text-align:center;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#000;background-color:#eee;color:#000}.skipTo [role="separator"]:first-child{border-radius:5px 5px 0 0}.skipTo [role="separator"].last{border-radius:0 0 5px 5px;border:none}.skipTo [role="menuitem"].h2 .name{padding-left:.5em}.skipTo [role="menuitem"].h3 .name{padding-left:1em}.skipTo [role="menuitem"].h4 .name{padding-left:1.5em}.skipTo [role="menuitem"].h5 name{padding-left:2em}.skipTo [role="menuitem"].h6 name{padding-left:2.5em}.skipTo.focus{display:block}.skipTo.focus button:focus,.skipTo.focus button:hover{padding:2px;border-width:2px;border-style:solid;border-color:#034575}.skipTo button[aria-expanded="true"],.skipTo [role="menuitem"]:focus{padding:2px;border-width:2px;border-style:solid;border-color:#034575;background-color:#034575;color:#fff;margin:0}",hasProperty:function(index,prop){var index1=this.defaultCSS.indexOf("}",index);return 0<=this.defaultCSS.substring(index,index1).indexOf(prop)},updateStyle:function(sel,prop,value){(prop+=":").indexOf("-")<0&&(prop=";"+prop);for(var index=this.defaultCSS.indexOf(sel);0<=index;){if(this.hasProperty(index,prop))if(0<=(index=this.defaultCSS.indexOf(prop,index))){if(0<=(index=this.defaultCSS.indexOf(":",index))){index+=1;var index1=this.defaultCSS.indexOf(";",index),index2=this.defaultCSS.indexOf("}",index);if(0<=index1||0<=index2)return 0<=index1&&0<=index2?index1=Math.min(index1,index2):0<=index2&&(index1=index2),void(this.defaultCSS=this.defaultCSS.substring(0,index)+value+this.defaultCSS.substring(index1));console.log("[updateStyle][ERROR]: "+sel+" "+prop+" "+value+" failed to find end of property")}}else console.log("[updateStyle][ERROR]: "+sel+" "+prop+" "+value+" failed to find property");index=this.defaultCSS.indexOf(sel,index+1)}},updateCSSWithCustomColors:function(){function isColor(color){return"string"==typeof color&&color.length}console.log("[updateCSSWithCustomColors]"),isColor(this.config.backgroundColor)&&(this.updateStyle(".skipTo button","background-color",this.config.backgroundColor),this.updateStyle('.skipTo [role="menuitem"]',"background-color",this.config.backgroundColor),this.updateStyle('.skipTo [role="separator"]',"background-color",this.config.backgroundColor)),isColor(this.config.color)&&(this.updateStyle(".skipTo button","color",this.config.color),this.updateStyle('.skipTo [role="menuitem"]',"color",this.config.color),this.updateStyle('.skipTo [role="separator"]',"color",this.config.color),this.updateStyle('.skipTo [role="separator"]',"border-bottom-color",this.config.color)),isColor(this.config.backgroundFocusColor)&&(this.updateStyle(".skipTo.focus button:focus","border-color",this.config.backgroundFocusColor),this.updateStyle('.skipTo [role="menuitem"]:focus',"border-color",this.config.backgroundFocusColor),this.updateStyle('.skipTo [role="menuitem"]:focus',"background-color",this.config.backgroundFocusColor)),isColor(this.config.focusColor)&&this.updateStyle('.skipTo [role="menuitem"]:focus',"color",this.config.focusColor)},init:function(config){var node,attachElement=document.body;this.updateCSSWithCustomColors(),this.addStyles(this.defaultCSS),config&&this.setUpConfig(config),this.domNode=document.createElement("div"),this.domNode.setAttribute("role",this.config.containerDivLabel),this.domNode.setAttribute("aria-label",this.config.containerDivLabel),this.config.customClass.length?this.domNode.classList.add(this.config.customClass):this.domNode.classList.add("skipTo"),"string"==typeof this.config.attachElement&&((node=document.querySelector(this.config.attachElement))||node.nodeType!==Node.ELEMENT_NODE||(attachElement=node)),attachElement.firstElementChild?attachElement.insertBefore(this.domNode,attachElement.firstElementChild):attachElement.appendChild(this.domNode),this.buttonNode=document.createElement("button"),this.buttonNode.textContent=this.config.buttonLabel,this.buttonNode.setAttribute("aria-haspopup","true"),this.buttonNode.setAttribute("aria-expanded","false"),this.buttonNode.setAttribute("accesskey",this.config.accessKey),this.domNode.appendChild(this.buttonNode),this.menuNode=document.createElement("div"),this.menuNode.setAttribute("role","menu"),this.domNode.appendChild(this.menuNode),this.buttonNode.addEventListener("keydown",this.handleButtonKeydown.bind(this)),this.buttonNode.addEventListener("click",this.handleButtonClick.bind(this)),this.domNode.addEventListener("focusin",this.handleFocusin.bind(this)),this.domNode.addEventListener("focusout",this.handleFocusout.bind(this)),window.addEventListener("mousedown",this.handleBackgroundMousedown.bind(this),!0)},setUpConfig:function(appConfig){var name,localConfig=this.config,appConfigSettings=void 0!==appConfig.settings?appConfig.settings.skipTo:{};for(name in appConfigSettings)localConfig.hasOwnProperty(name)&&(localConfig[name]=appConfigSettings[name])},addStyles:function(cssString){var styleNode=document.createElement("style"),headNode=document.getElementsByTagName("head")[0],css=document.createTextNode(cssString);styleNode.setAttribute("type","text/css"),styleNode.appendChild(css),headNode.appendChild(styleNode)},getFirstChar:function(text){var c="";return"string"==typeof text&&0<text.length&&(c=text[0].toLowerCase()),c},addEndOfMenuDiv:function(){var lastDiv=document.createElement("div");lastDiv.setAttribute("role","separator"),lastDiv.className="last",this.menuNode.appendChild(lastDiv)},addMenuitemGroup:function(title,menuitems,includeTagName){"boolean"!=typeof includeTagName&&(includeTagName=!1);var labelNode,groupNode,menuNode=this.menuNode;title&&((labelNode=document.createElement("div")).setAttribute("role","separator"),labelNode.textContent=title,menuNode.appendChild(labelNode),(groupNode=document.createElement("div")).setAttribute("role","group"),groupNode.setAttribute("aria-label",title),menuNode.appendChild(groupNode),menuNode=groupNode);for(var i=0,len=menuitems.length;i<len;i+=1){var mi=menuitems[i],tagNameNode=document.createElement("span");tagNameNode.className="tagName",tagNameNode.textContent=mi.tagName;var nameNode=document.createElement("span");nameNode.className="name",nameNode.textContent=mi.name;var menuitemNode=document.createElement("div");includeTagName&&menuitemNode.appendChild(tagNameNode),mi.name.length&&(includeTagName&&menuitemNode.appendChild(document.createTextNode(": ")),menuitemNode.appendChild(nameNode)),menuitemNode.setAttribute("role","menuitem"),menuitemNode.classList.add(mi.class),menuitemNode.classList.add(mi.tagName),menuitemNode.setAttribute("data-id",mi.id),menuitemNode.tabIndex=-1,menuNode.appendChild(menuitemNode),this.menuitemNodes.push(menuitemNode),this.firstChars.push(this.getFirstChar(mi.name)),menuitemNode.addEventListener("keydown",this.handleMenuitemKeydown.bind(this)),menuitemNode.addEventListener("click",this.handleMenuitemClick.bind(this)),menuitemNode.addEventListener("mouseover",this.handleMenuitemMouseover.bind(this)),this.firstMenuitem||(this.firstMenuitem=menuitemNode),this.lastMenuitem=menuitemNode}},updateMenuitems:function(){for(;this.menuNode.lastElementChild;)this.menuNode.removeChild(this.menuNode.lastElementChild);this.menuitemNodes=[],this.firstChars=[],this.firstMenuitem=!1,this.lastMenuitem=!1,this.getLandmarks(),this.addMenuitemGroup(this.config.landmarksLabel,this.landmarkElementsArr,!0),this.getHeadings(),this.addMenuitemGroup(this.config.headingsLabel,this.headingElementsArr),this.addEndOfMenuDiv()},setFocusToMenuitem:function(newMenuitem){console.log("[setFocusToMenuitem]: "+newMenuitem.textContent),newMenuitem&&newMenuitem.focus()},setFocusToFirstMenuitem:function(){this.setFocusToMenuitem(this.firstMenuitem)},setFocusToLastMenuitem:function(){this.setFocusToMenuitem(this.lastMenuitem)},setFocusToPreviousMenuitem:function(currentMenuitem){var index,newMenuitem=currentMenuitem===this.firstMenuitem?this.lastMenuitem:(index=this.menuitemNodes.indexOf(currentMenuitem),this.menuitemNodes[index-1]);return this.setFocusToMenuitem(newMenuitem),newMenuitem},setFocusToNextMenuitem:function(currentMenuitem){var index,newMenuitem=currentMenuitem===this.lastMenuitem?this.firstMenuitem:(index=this.menuitemNodes.indexOf(currentMenuitem),this.menuitemNodes[index+1]);return this.setFocusToMenuitem(newMenuitem),newMenuitem},setFocusByFirstCharacter:function(currentMenuitem,char){var start,index;1<char.length||(char=char.toLowerCase(),(start=this.menuitemNodes.indexOf(currentMenuitem)+1)>=this.menuitemNodes.length&&(start=0),-1===(index=this.firstChars.indexOf(char,start))&&(index=this.firstChars.indexOf(char,0)),-1<index&&this.setFocusToMenuitem(this.menuitemNodes[index]))},getIndexFirstChars:function(startIndex,char){for(var i=startIndex;i<this.firstChars.length;i+=1)if(char===this.firstChars[i])return i;return-1},openPopup:function(){this.menuNode.style.display="block",this.buttonNode.setAttribute("aria-expanded","true")},closePopup:function(){this.isOpen()&&(this.buttonNode.setAttribute("aria-expanded","false"),this.menuNode.style.display="none")},isOpen:function(){return"true"===this.buttonNode.getAttribute("aria-expanded")},handleFocusin:function(){this.domNode.classList.add("focus")},handleFocusout:function(){this.domNode.classList.remove("focus")},handleButtonKeydown:function(event){var flag=!1;switch(event.key){case" ":case"Enter":case"ArrowDown":case"Down":this.openPopup(),this.setFocusToFirstMenuitem(),flag=!0;break;case"Esc":case"Escape":this.closePopup(),this.buttonNode.focus(),flag=!0;break;case"Up":case"ArrowUp":this.openPopup(),this.setFocusToLastMenuitem(),flag=!0}flag&&(event.stopPropagation(),event.preventDefault())},handleButtonClick:function(event){this.isOpen()?(this.closePopup(),this.buttonNode.focus()):(this.openPopup(),this.setFocusToFirstMenuitem()),event.stopPropagation(),event.preventDefault()},handleMenuitemKeydown:function(event){var tgt=event.currentTarget,key=event.key,flag=!1;function isPrintableCharacter(str){return 1===str.length&&str.match(/\S/)}if(!(event.ctrlKey||event.altKey||event.metaKey)){if(event.shiftKey)isPrintableCharacter(key)&&(this.setFocusByFirstCharacter(tgt,key),flag=!0),"Tab"===event.key&&(this.buttonNode.focus(),this.closePopup(),flag=!0);else switch(key){case"Enter":case" ":this.closePopup();var node=document.getElementById(tgt.getAttribute("data-id"));node&&node.focus(),flag=!0;break;case"Esc":case"Escape":this.closePopup(),this.buttonNode.focus(),flag=!0;break;case"Up":case"ArrowUp":this.setFocusToPreviousMenuitem(tgt),flag=!0;break;case"ArrowDown":case"Down":this.setFocusToNextMenuitem(tgt),flag=!0;break;case"Home":case"PageUp":this.setFocusToFirstMenuitem(),flag=!0;break;case"End":case"PageDown":this.setFocusToLastMenuitem(),flag=!0;break;case"Tab":this.closePopup();break;default:isPrintableCharacter(key)&&(this.setFocusByFirstCharacter(tgt,key),flag=!0)}flag&&(event.stopPropagation(),event.preventDefault())}},handleMenuitemClick:function(event){var tgt=event.currentTarget;this.closePopup();var node=document.getElementById(tgt.getAttribute("data-id"));node&&node.focus(),event.stopPropagation(),event.preventDefault()},handleMenuitemMouseover:function(event){event.currentTarget.focus()},handleBackgroundMousedown:function(event){this.domNode.contains(event.target)||this.isOpen()&&(this.closePopup(),this.buttonNode.focus())},normalizeName:function(name){return"string"==typeof name?name.replace(/\w\S*/g,function(txt){return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase()}):""},getTextContent:function(elem){var str="Test",strings=[];return function getText(e,strings){if(e.nodeType===Node.TEXT_NODE)strings.push(e.data);else if(e.nodeType===Node.ELEMENT_NODE){var tagName=e.tagName.toLowerCase();if("img"===tagName||"area"===tagName)e.alt&&strings.push(e.alt);else for(var c=e.firstChild;c;)getText(c,strings),c=c.nextSibling}}(elem,strings),strings.length&&(str=strings.join(" ")),30<str.length&&(str=str.substring(0,27)+"..."),str},getAccessibleName:function(elem){var labelledbyIds=elem.getAttribute("aria-labelledby"),label=elem.getAttribute("aria-label"),title=elem.getAttribute("title"),name="";if(labelledbyIds&&labelledbyIds.length){var str,strings=[],ids=labelledbyIds.split(" ");ids.length||(ids=[labelledbyIds]);for(var i=0,l=ids.length;i<l;i+=1){var e=document.getElementById(ids[i]);e&&(str=this.getTextContent(e)),str.length&&strings.push(str)}name=strings.join(" ")}else label&&label.length?name=label:title&&title.length&&(name=title);return name},isVisible:function(element){return function isVisibleRec(el){if(9===el.nodeType)return!0;var display=document.defaultView.getComputedStyle(el,null).getPropertyValue("display"),visibility=document.defaultView.getComputedStyle(el,null).getPropertyValue("visibility"),hidden=el.getAttribute("hidden"),ariaHidden=el.getAttribute("aria-hidden"),clientRect=el.getBoundingClientRect();return!("none"===display||"hidden"===visibility||null!==hidden||"true"===ariaHidden||clientRect.height<4||clientRect.width<4)&&isVisibleRec(el.parentNode)}(element)},getHeadings:function(){var targets=this.config.headings;if("string"==typeof targets&&0!==targets.length)for(var headings=document.querySelectorAll(targets),i=0,j=0,len=headings.length;i<len;i+=1){var id,heading=headings[i],role=heading.getAttribute("role");"string"==typeof role&&"presentation"===role||this.isVisible(heading)&&(id=heading.id||heading.innerHTML.replace(/\s+/g,"_").toLowerCase().replace(/[&\/\\#,+()$~%.'"!:*?<>{}¹]/g,"")+"_"+i,heading.tabIndex="-1",heading.id=id,this.headingElementsArr[j]={},this.headingElementsArr[j].id=id,this.headingElementsArr[j].class="heading",this.headingElementsArr[j].name=this.getTextContent(heading),this.headingElementsArr[j].tagName=heading.tagName.toLowerCase(),this.headingElementsArr[j].role="heading",j+=1)}},getLandmarks:function(){for(var targets=this.config.landmarks,landmarks=document.querySelectorAll(targets),i=0,j=0,len=landmarks.length;i<len;i+=1){var id,name,landmark=landmarks[i],role=landmark.getAttribute("role"),tagName=landmark.tagName.toLowerCase();"string"==typeof role&&"presentation"===role||this.isVisible(landmark)&&(id=landmark.id||"ui-skip-"+Math.floor(100*Math.random()+1),landmark.tabIndex="-1",landmark.id=id,role=role||landmark.tagName.toLowerCase(),"string"!=typeof(name=this.getAccessibleName(landmark))&&(name=""),"banner"===role&&(tagName="header"),"contentinfo"===role&&(tagName="footer"),"main"===role&&(tagName="main"),"navigation"===role&&(tagName="nav"),"complementary"===role&&(tagName="aside"),this.landmarkElementsArr[j]={},this.landmarkElementsArr[j].id=id,this.landmarkElementsArr[j].class="landmark",this.landmarkElementsArr[j].name=name,this.landmarkElementsArr[j].role=role,this.landmarkElementsArr[j].tagName=tagName,j+=1)}},getIdElements:function(){for(var el,id,val,els="object"==typeof this.config.ids?this.config.ids:"string"==typeof this.config.ids?(els=this.config.ids.split(",")).map(function(el){return{id:el.trim()}}):[],i=0;i<els.length;i+=1)id=els[i].id.replace("#",""),null!==(el=document.getElementById(id))&&(30<(val=els[i].description||el.innerHTML.replace(/<\/?[^>]+>/gi,"").replace(/\s+/g," ").replace(/^\s+|\s+$/g,"")).length&&(val=val.replace(val,val.substr(0,30)+"...")),"false"===this.config.enumerateElements&&(val="id: "+val),this.idElementsArr[id]=val)}};window.addEventListener("load",function(){SkipTo.init(window.Drupal||window.Wordpress||window.SkipToConfig||{}),SkipTo.updateMenuitems(),console.log("Skipto loaded")})}();
//# sourceMappingURL=skipto.min.js.map/*@end @*/
