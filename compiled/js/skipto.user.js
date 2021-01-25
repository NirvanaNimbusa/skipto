// -----------------------------------------------------
// Title: Skip to Options User script
// version: 4.0.2
// Date: 2021-01-21
// Author: PayPal Accessibility Team and University of Illinois
// Homepage: https://github.com/paypal/skipto
// Copyright (c) 2021 PayPal Accessibility Team and University of Illinois
// -----------------------------------------------------
//
// ==UserScript==
// @name skipto
// @namespace skipto
// @description This plugin provides a dynamically-generated drop-down menu that allows keyboard and screen reader users to quickly skip to the most important places on the webpage.
// @include *
// ==/UserScript==

/*! skipto - v4.0.2 - 2021-01-21
* https://github.com/paypal/skipto
* Copyright (c) 2021 PayPal Accessibility Team and University of Illinois; Licensed BSD */
 /*@cc_on @*/
/*@if (@_jscript_version >= 5.8) @*/

!function(){"use strict";var SkipTo={skipToId:"is-skip-to-js-4",domNode:null,buttonNode:null,menuNode:null,menuitemNodes:[],firstMenuitem:!1,lastMenuitem:!1,firstChars:[],headingLevels:[],skipToIdIndex:1,contentSelector:"h1, h2, h3, h4, h5, h6, p, li, img, input, select, textarea",showAllLandmarksSelector:"main, [role=main], [role=search], nav, [role=navigation], section[aria-label], section[aria-labelledby], section[title], [role=region][aria-label], [role=region][aria-labelledby], [role=region][title], form[aria-label], form[aria-labelledby], aside, [role=complementary], body > header, [role=banner], body > footer, [role=contentinfo]",showAllHeadingsSelector:"h1, h2, h3, h4, h5, h6",config:{enableActions:!0,enableHeadingLevelShortcuts:!0,enableHelp:!0,accesskey:"0",attachElement:"header",displayOption:"static",containerElement:"div",containerRole:"",customClass:"",accesskeyNotSupported:" is not supported on this browser.",buttonTitle:"Keyboard Navigation",buttonTitleWithAccesskey:'Keyboard Navigation\nAccesskey is "$key"',buttonLabel:"Skip To Content",menuLabel:"Landmarks and Headings",landmarkGroupLabel:"Landmarks",headingGroupLabel:"Headings",mofnGroupLabel:" ($m of $n)",headingLevelLabel:"Heading level",mainLabel:"main",searchLabel:"search",navLabel:"navigation",regionLabel:"region",asideLabel:"aside",footerLabel:"footer",headerLabel:"header",formLabel:"form",msgNoLandmarksFound:"No landmarks found",msgNoHeadingsFound:"No headings found",actionGroupLabel:"Actions",actionShowHeadingsHelp:'Toggles between showing "All" and "Selected" Headings.',actionShowSelectedHeadingsLabel:"Show Selected Headings ($num)",actionShowAllHeadingsLabel:"Show All Headings ($num)",actionShowLandmarksHelp:'Toggles between showing "All" and "Selected" Landmarks.',actionShowSelectedLandmarksLabel:"Show Selected Landmarks ($num)",actionShowAllLandmarksLabel:"Show All Landmarks ($num)",actionShowSelectedHeadingsAriaLabel:"Show $num selected headings",actionShowAllHeadingsAriaLabel:"Show all $num headings",actionShowSelectedLandmarksAriaLabel:"Show $num selected landmarks",actionShowAllLandmarksAriaLabel:"Show all $num landmarks",landmarks:'main, [role="main"], [role="search"], nav, [role="navigation"], aside, [role="complementary"]',headings:'main h1, [role="main"] h1, main h2, [role="main"] h2',colorTheme:"",positionLeft:"",menuTextColor:"",menuBackgroundColor:"",menuitemFocusTextColor:"",menuitemFocusBackgroundColor:"",focusBorderColor:"",buttonTextColor:"",buttonBackgroundColor:""},colorThemes:{default:{positionLeft:"46%",menuTextColor:"#1a1a1a",menuBackgroundColor:"#dcdcdc",menuitemFocusTextColor:"#eeeeee",menuitemFocusBackgroundColor:"#1a1a1a",focusBorderColor:"#1a1a1a",buttonTextColor:"#1a1a1a",buttonBackgroundColor:"#eeeeee"},illinois:{positionLeft:"46%",menuTextColor:"#00132c",menuBackgroundColor:"#cad9ef",menuitemFocusTextColor:"#eeeeee",menuitemFocusBackgroundColor:"#00132c",focusBorderColor:"#ff552e",buttonTextColor:"#444444",buttonBackgroundColor:"#dddede"},aria:{positionLeft:"",menuTextColor:"#000",menuBackgroundColor:"#def",menuitemFocusTextColor:"#fff",menuitemFocusBackgroundColor:"#005a9c",focusBorderColor:"#005a9c",buttonTextColor:"#005a9c",buttonBackgroundColor:"#ddd"}},defaultCSS:".skip-to.popup{position:absolute;top:-30em;left:-3000em}.skip-to,.skip-to.popup.focus{position:absolute;top:0;left:$positionLeft}.skip-to.fixed{position:fixed}.skip-to button{position:relative;margin:0;padding:6px 8px 6px 8px;border-width:0 1px 1px 1px;border-style:solid;border-radius:0 0 6px 6px;border-color:$buttonBackgroundColor;color:$menuTextColor;background-color:$buttonBackgroundColor;z-index:1000}.skip-to [role=menu]{position:absolute;min-width:17em;display:none;margin:0;padding:.25rem;background-color:$menuBackgroundColor;border-width:2px;border-style:solid;border-color:$focusBorderColor;border-radius:5px;z-index:1000}.skip-to [role=group]{display:grid;grid-auto-rows:min-content;grid-row-gap:1px}.skip-to [role=separator]:first-child{border-radius:5px 5px 0 0}.skip-to [role=menuitem]{padding:3px;display:block;width:auto;border-width:0;border-style:solid;color:$menuitemTextColor;background-color:$menuBackgroundColor;z-index:1000;display:grid;overflow-y:auto;grid-template-columns:repeat(6,1.2rem) 1fr;grid-column-gap:2px;font-size:1em}.skip-to [role=menuitem] .label:first-letter,.skip-to [role=menuitem] .level:first-letter{text-decoration:underline;text-transform:uppercase}.skip-to [role=menuitem] .level{text-align:right;padding-right:4px}.skip-to [role=menuitem] .label{margin:0;padding:0;display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.skip-to [role=menuitem].skip-to-h1 .level{grid-column:1}.skip-to [role=menuitem].skip-to-h2 .level{grid-column:2}.skip-to [role=menuitem].skip-to-h3 .level{grid-column:3}.skip-to [role=menuitem].skip-to-h4 .level{grid-column:4}.skip-to [role=menuitem].skip-to-h5 .level{grid-column:5}.skip-to [role=menuitem].skip-to-h6 .level{grid-column:8}.skip-to [role=menuitem].skip-to-h1 .label{grid-column:2/8}.skip-to [role=menuitem].skip-to-h2 .label{grid-column:3/8}.skip-to [role=menuitem].skip-to-h3 .label{grid-column:4/8}.skip-to [role=menuitem].skip-to-h4 .label{grid-column:5/8}.skip-to [role=menuitem].skip-to-h5 .label{grid-column:6/8}.skip-to [role=menuitem].skip-to-h6 .label{grid-column:7/8}.skip-to [role=menuitem].skip-to-h1.no-level .label{grid-column:1/8}.skip-to [role=menuitem].skip-to-h2.no-level .label{grid-column:2/8}.skip-to [role=menuitem].skip-to-h3.no-level .label{grid-column:3/8}.skip-to [role=menuitem].skip-to-h4.no-level .label{grid-column:4/8}.skip-to [role=menuitem].skip-to-h5.no-level .label{grid-column:5/8}.skip-to [role=menuitem].skip-to-h6.no-level .label{grid-column:6/8}.skip-to [role=menuitem].skip-to-nesting-level-1 .nesting{grid-column:1}.skip-to [role=menuitem].skip-to-nesting-level-2 .nesting{grid-column:2}.skip-to [role=menuitem].skip-to-nesting-level-3 .nesting{grid-column:3}.skip-to [role=menuitem].skip-to-nesting-level-0 .label{grid-column:1/8}.skip-to [role=menuitem].skip-to-nesting-level-1 .label{grid-column:2/8}.skip-to [role=menuitem].skip-to-nesting-level-2 .label{grid-column:3/8}.skip-to [role=menuitem].skip-to-nesting-level-3 .label{grid-column:4/8}.skip-to [role=menuitem].action .label,.skip-to [role=menuitem].no-items .label{grid-column:1/8}.skip-to [role=separator]{margin:1px 0 1px 0;padding:3px;display:block;width:auto;font-weight:700;text-align:left;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:$menuTextColor;background-color:$menuBackgroundColor;color:$menuTextColor;z-index:1000}.skip-to [role=separator] .mofn{font-weight:400;font-size:85%}.skip-to [role=separator]:first-child{border-radius:5px 5px 0 0}.skip-to [role=menuitem].last{border-radius:0 0 5px 5px}.skip-to.focus{display:block}.skip-to button:focus,.skip-to button:hover{background-color:$menuBackgroundColor;color:$menuTextColor;outline:0}.skip-to button:focus{padding:6px 7px 5px 7px;border-width:0 2px 2px 2px;border-color:$focusBorderColor}.skip-to [role=menuitem]:focus{padding:1px;border-width:2px;border-style:solid;border-color:$focusBorderColor;background-color:$menuitemFocusBackgroundColor;color:$menuitemFocusTextColor;outline:0}",init:function(config){if(!document.querySelector("style#"+this.skipToId)){var node,attachElement=document.body;config&&this.setUpConfig(config),"string"!=typeof this.config.attachElement||(node=document.querySelector(this.config.attachElement))&&node.nodeType===Node.ELEMENT_NODE&&(attachElement=node),this.addCSSColors(),this.renderStyleElement(this.defaultCSS),this.domNode=document.createElement(this.config.containerElement),this.domNode.classList.add("skip-to"),this.isNotEmptyString(this.config.customClass)&&this.domNode.classList.add(this.config.customClass),this.isNotEmptyString(this.config.containerRole)&&this.domNode.setAttribute("role",this.config.containerRole);var title,displayOption=this.config.displayOption;if("string"==typeof displayOption&&(displayOption=displayOption.trim().toLowerCase()).length)switch(this.config.displayOption){case"fixed":this.domNode.classList.add("fixed");break;case"onfocus":case"popup":this.domNode.classList.add("popup")}attachElement.firstElementChild?attachElement.insertBefore(this.domNode,attachElement.firstElementChild):attachElement.appendChild(this.domNode),this.buttonNode=document.createElement("button"),this.buttonNode.textContent=this.config.buttonLabel,this.buttonNode.setAttribute("aria-haspopup","true"),this.buttonNode.setAttribute("aria-expanded","false"),this.buttonNode.setAttribute("accesskey",this.config.accesskey),this.isNotEmptyString(this.config.buttonTitleWithAccesskey)&&1===this.config.accesskey.length?(title=this.config.buttonTitleWithAccesskey.replace("$key",this.getBrowserSpecificAccesskey(this.config.accesskey)),this.buttonNode.setAttribute("title",title)):this.isNotEmptyString(this.config.buttonTitle)&&this.buttonNode.setAttribute("title",this.config.buttonTitle),this.domNode.appendChild(this.buttonNode),this.menuNode=document.createElement("div"),this.menuNode.setAttribute("role","menu"),this.domNode.appendChild(this.menuNode),this.buttonNode.addEventListener("keydown",this.handleButtonKeydown.bind(this)),this.buttonNode.addEventListener("click",this.handleButtonClick.bind(this)),this.domNode.addEventListener("focusin",this.handleFocusin.bind(this)),this.domNode.addEventListener("focusout",this.handleFocusout.bind(this)),window.addEventListener("mousedown",this.handleBackgroundMousedown.bind(this),!0)}},updateStyle:function(stylePlaceholder,value,defaultValue){"string"==typeof value&&0!==value.length||(value=defaultValue);for(var index1=this.defaultCSS.indexOf(stylePlaceholder),index2=index1+stylePlaceholder.length;0<=index1&&index2<this.defaultCSS.length;)this.defaultCSS=this.defaultCSS.substring(0,index1)+value+this.defaultCSS.substring(index2),index2=(index1=this.defaultCSS.indexOf(stylePlaceholder,index2))+stylePlaceholder.length},addCSSColors:function(){var theme=this.colorThemes.default;"object"==typeof this.colorThemes[this.config.colorTheme]&&(theme=this.colorThemes[this.config.colorTheme]),this.updateStyle("$positionLeft",this.config.positionLeft,theme.positionLeft),this.updateStyle("$menuTextColor",this.config.menuTextColor,theme.menuTextColor),this.updateStyle("$menuBackgroundColor",this.config.menuBackgroundColor,theme.menuBackgroundColor),this.updateStyle("$menuitemFocusTextColor",this.config.menuitemFocusTextColor,theme.menuitemFocusTextColor),this.updateStyle("$menuitemFocusBackgroundColor",this.config.menuitemFocusBackgroundColor,theme.menuitemFocusBackgroundColor),this.updateStyle("$focusBorderColor",this.config.focusBorderColor,theme.focusBorderColor),this.updateStyle("$buttonTextColor",this.config.buttonTextColor,theme.buttonTextColor),this.updateStyle("$buttonBackgroundColor",this.config.buttonBackgroundColor,theme.buttonBackgroundColor)},isNotEmptyString:function(str){return"string"==typeof str&&str.length},getBrowserSpecificAccesskey:function(accesskey){var userAgent=navigator.userAgent.toLowerCase(),platform=navigator.platform.toLowerCase(),hasWin=0<=platform.indexOf("win"),hasMac=0<=platform.indexOf("mac"),hasLinux=0<=platform.indexOf("linux")||0<=platform.indexOf("bsd"),hasFirefox=0<=userAgent.indexOf("firefox"),hasChrome=0<=userAgent.indexOf("chrome"),hasOpera=0<=userAgent.indexOf("opr");if(hasWin||hasLinux){if(hasFirefox)return"Shift+Alt+"+accesskey;if(hasChrome||hasOpera)return"Alt+"+accesskey}return hasMac?"Control+Option+"+accesskey:accesskey+this.config.accesskeyNotSupported},setUpConfig:function(appConfig){var name,localConfig=this.config,appConfigSettings=void 0!==appConfig.settings?appConfig.settings.skipTo:{};for(name in appConfigSettings)void 0!==localConfig[name]&&("string"==typeof appConfigSettings[name]&&0<appConfigSettings[name].length||"boolean"==typeof appConfigSettings[name])?localConfig[name]=appConfigSettings[name]:console.log('** SkipTo Problem with user configuration option "'+name+'".')},renderStyleElement:function(cssString){var styleNode=document.createElement("style"),headNode=document.getElementsByTagName("head")[0],css=document.createTextNode(cssString);styleNode.setAttribute("type","text/css"),styleNode.id=this.skipToId,styleNode.appendChild(css),headNode.appendChild(styleNode)},getFirstChar:function(menuitem){var c="",label=menuitem.querySelector(".label");return label&&label.textContent.length&&(c=label.textContent.trim()[0].toLowerCase()),c},getHeadingLevelFromAttribute:function(menuitem){var level="";return menuitem.hasAttribute("data-level")&&(level=menuitem.getAttribute("data-level")),level},updateKeyboardShortCuts:function(){var mi;this.firstChars=[],this.headingLevels=[];for(var i=0;i<this.menuitemNodes.length;i+=1)mi=this.menuitemNodes[i],this.firstChars.push(this.getFirstChar(mi)),this.headingLevels.push(this.getHeadingLevelFromAttribute(mi))},updateMenuitems:function(){var menuitemNodes=this.menuNode.querySelectorAll("[role=menuitem");this.menuitemNodes=[];for(var i=0;i<menuitemNodes.length;i+=1)this.menuitemNodes.push(menuitemNodes[i]);this.firstMenuitem=this.menuitemNodes[0],this.lastMenuitem=this.menuitemNodes[this.menuitemNodes.length-1],this.lastMenuitem.classList.add("last"),this.updateKeyboardShortCuts()},renderMenuitemToGroup:function(groupNode,mi){var tagNode,tagNodeChild,labelNode,nestingNode,menuitemNode=document.createElement("div");return menuitemNode.setAttribute("role","menuitem"),menuitemNode.classList.add(mi.class),mi.tagName&&mi.tagName.length&&menuitemNode.classList.add("skip-to-"+mi.tagName),menuitemNode.setAttribute("data-id",mi.dataId),menuitemNode.tabIndex=-1,mi.ariaLabel&&menuitemNode.setAttribute("aria-label",mi.ariaLabel),menuitemNode.addEventListener("keydown",this.handleMenuitemKeydown.bind(this)),menuitemNode.addEventListener("click",this.handleMenuitemClick.bind(this)),menuitemNode.addEventListener("mouseover",this.handleMenuitemMouseover.bind(this)),groupNode.appendChild(menuitemNode),mi.class.includes("heading")&&(this.config.enableHeadingLevelShortcuts?(tagNode=document.createElement("span"),(tagNodeChild=document.createElement("span")).appendChild(document.createTextNode(mi.level)),tagNode.append(tagNodeChild),tagNode.appendChild(document.createTextNode(")")),tagNode.classList.add("level"),menuitemNode.append(tagNode)):menuitemNode.classList.add("no-level"),menuitemNode.setAttribute("data-level",mi.level),mi.tagName&&mi.tagName.length&&menuitemNode.classList.add("skip-to-"+mi.tagName)),mi.class.includes("landmark")&&(menuitemNode.setAttribute("data-nesting",mi.nestingLevel),menuitemNode.classList.add("skip-to-nesting-level-"+mi.nestingLevel),0<mi.nestingLevel&&mi.nestingLevel>this.lastNestingLevel&&((nestingNode=document.createElement("span")).classList.add("nesting"),menuitemNode.append(nestingNode)),this.lastNestingLevel=mi.nestingLevel),(labelNode=document.createElement("span")).appendChild(document.createTextNode(mi.name)),labelNode.classList.add("label"),menuitemNode.append(labelNode),menuitemNode},renderGroupLabel:function(groupLabelId,title,m,n){var s,groupLabelNode=document.getElementById(groupLabelId),titleNode=groupLabelNode.querySelector(".title"),mofnNode=groupLabelNode.querySelector(".mofn");titleNode.textContent=title,"number"==typeof m&&"number"==typeof n&&(s=(s=(s=this.config.mofnGroupLabel).replace("$m",m)).replace("$n",n),mofnNode.textContent=s)},renderMenuitemGroup:function(groupId,title){var labelNode,groupNode,spanNode,menuNode=this.menuNode;return title&&((labelNode=document.createElement("div")).id=groupId+"-label",labelNode.setAttribute("role","separator"),menuNode.appendChild(labelNode),(spanNode=document.createElement("span")).classList.add("title"),spanNode.textContent=title,labelNode.append(spanNode),(spanNode=document.createElement("span")).classList.add("mofn"),labelNode.append(spanNode),(groupNode=document.createElement("div")).setAttribute("role","group"),groupNode.setAttribute("aria-labelledby",labelNode.id),groupNode.id=groupId,menuNode.appendChild(groupNode),menuNode=groupNode),groupNode},removeMenuitemGroup:function(groupId){var node=document.getElementById(groupId);this.menuNode.removeChild(node),node=document.getElementById(groupId+"-label"),this.menuNode.removeChild(node)},renderMenuitemsToGroup:function(groupNode,menuitems,msgNoItemsFound){if(groupNode.innerHTML="",(this.lastNestingLevel=0)===menuitems.length){var item={};item.name=msgNoItemsFound,item.tagName="",item.class="no-items",item.dataId="",this.renderMenuitemToGroup(groupNode,item)}else for(var i=0;i<menuitems.length;i+=1)this.renderMenuitemToGroup(groupNode,menuitems[i])},getShowMoreHeadingsSelector:function(option){return"all"===option?this.showAllHeadingsSelector:this.config.headings},getShowMoreHeadingsLabel:function(option,n){var label=this.config.actionShowSelectedHeadingsLabel;return"all"===option&&(label=this.config.actionShowAllHeadingsLabel),label.replace("$num",n)},getShowMoreHeadingsAriaLabel:function(option,n){var label=this.config.actionShowSelectedHeadingsAriaLabel;return"all"===option&&(label=this.config.actionShowAllHeadingsAriaLabel),label.replace("$num",n)},renderActionMoreHeadings:function(groupNode){var item,menuitemNode,selectedHeadingsLen=this.getHeadings(this.getShowMoreHeadingsSelector("selected")).length,allHeadingsLen=this.getHeadings(this.getShowMoreHeadingsSelector("all")).length,noAction=selectedHeadingsLen===allHeadingsLen,headingsLen=allHeadingsLen;return noAction||((item={tagName:"action",role:"menuitem",class:"action",dataId:"skip-to-more-headings"}).name=this.getShowMoreHeadingsLabel("all",headingsLen),item.ariaLabel=this.getShowMoreHeadingsAriaLabel("all",headingsLen),(menuitemNode=this.renderMenuitemToGroup(groupNode,item)).setAttribute("data-show-heading-option","all"),menuitemNode.title=this.config.actionShowHeadingsHelp),noAction},updateHeadingGroupMenuitems:function(option){var headingsLen,groupNode,selectedHeadings=this.getHeadings(this.getShowMoreHeadingsSelector("selected")),selectedHeadingsLen=selectedHeadings.length,allHeadings=this.getHeadings(this.getShowMoreHeadingsSelector("all")),allHeadingsLen=allHeadings.length,headings="all"===option?allHeadings:selectedHeadings;this.renderGroupLabel("id-skip-to-group-headings-label",this.config.headingGroupLabel,headings.length,allHeadings.length),groupNode=document.getElementById("id-skip-to-group-headings"),this.renderMenuitemsToGroup(groupNode,headings,this.config.msgNoHeadingsFound),this.updateMenuitems(),groupNode.firstElementChild&&groupNode.firstElementChild.focus(),headingsLen="all"===option?(option="selected",selectedHeadingsLen):(option="all",allHeadingsLen);var menuitemNode=this.menuNode.querySelector("[data-id=skip-to-more-headings]");menuitemNode.setAttribute("data-show-heading-option",option),menuitemNode.setAttribute("aria-label",this.getShowMoreHeadingsAriaLabel(option,headingsLen)),menuitemNode.querySelector("span.label").textContent=this.getShowMoreHeadingsLabel(option,headingsLen)},getShowMoreLandmarksSelector:function(option){return"all"===option?this.showAllLandmarksSelector:this.config.landmarks},getShowMoreLandmarksLabel:function(option,n){var label=this.config.actionShowSelectedLandmarksLabel;return"all"===option&&(label=this.config.actionShowAllLandmarksLabel),label.replace("$num",n)},getShowMoreLandmarksAriaLabel:function(option,n){var label=this.config.actionShowSelectedLandmarksAriaLabel;return"all"===option&&(label=this.config.actionShowAllLandmarksAriaLabel),label.replace("$num",n)},renderActionMoreLandmarks:function(groupNode){var item,menuitemNode,selectedLandmarksLen=this.getLandmarks(this.getShowMoreLandmarksSelector("selected")).length,allLandmarksLen=this.getLandmarks(this.getShowMoreLandmarksSelector("all")).length,noAction=selectedLandmarksLen===allLandmarksLen,landmarksLen=allLandmarksLen;return noAction||((item={tagName:"action",role:"menuitem",class:"action",dataId:"skip-to-more-landmarks"}).name=this.getShowMoreLandmarksLabel("all",landmarksLen),item.ariaLabel=this.getShowMoreLandmarksAriaLabel("all",landmarksLen),(menuitemNode=this.renderMenuitemToGroup(groupNode,item)).setAttribute("data-show-landmark-option","all"),menuitemNode.title=this.config.actionShowLandmarksHelp),noAction},updateLandmarksGroupMenuitems:function(option){var landmarksLen,groupNode,selectedLandmarks=this.getLandmarks(this.getShowMoreLandmarksSelector("selected")),selectedLandmarksLen=selectedLandmarks.length,allLandmarks=this.getLandmarks(this.getShowMoreLandmarksSelector("all"),!0),allLandmarksLen=allLandmarks.length,landmarks="all"===option?allLandmarks:selectedLandmarks;this.renderGroupLabel("id-skip-to-group-landmarks-label",this.config.landmarkGroupLabel,landmarks.length,allLandmarks.length),groupNode=document.getElementById("id-skip-to-group-landmarks"),this.renderMenuitemsToGroup(groupNode,landmarks,this.config.msgNoLandmarksFound),this.updateMenuitems(),groupNode.firstElementChild&&groupNode.firstElementChild.focus(),landmarksLen="all"===option?(option="selected",selectedLandmarksLen):(option="all",allLandmarksLen);var menuitemNode=this.menuNode.querySelector("[data-id=skip-to-more-landmarks]");menuitemNode.setAttribute("data-show-landmark-option",option),menuitemNode.setAttribute("aria-label",this.getShowMoreLandmarksAriaLabel(option,landmarksLen)),menuitemNode.querySelector("span.label").textContent=this.getShowMoreLandmarksLabel(option,landmarksLen)},renderMenu:function(){for(var groupNode,allLandmarks,landmarkElements,allHeadings,headingElements,selector,hasNoAction1,hasNoAction2;this.menuNode.lastElementChild;)this.menuNode.removeChild(this.menuNode.lastElementChild);selector=this.getShowMoreLandmarksSelector("all"),allLandmarks=this.getLandmarks(selector,!0),selector=this.getShowMoreLandmarksSelector("selected"),landmarkElements=this.getLandmarks(selector),groupNode=this.renderMenuitemGroup("id-skip-to-group-landmarks",this.config.landmarkGroupLabel),this.renderMenuitemsToGroup(groupNode,landmarkElements,this.config.msgNoLandmarksFound),this.renderGroupLabel("id-skip-to-group-landmarks-label",this.config.landmarkGroupLabel,landmarkElements.length,allLandmarks.length),selector=this.getShowMoreHeadingsSelector("all"),allHeadings=this.getHeadings(selector),selector=this.getShowMoreHeadingsSelector("selected"),headingElements=this.getHeadings(selector),groupNode=this.renderMenuitemGroup("id-skip-to-group-headings",this.config.headingGroupLabel),this.renderMenuitemsToGroup(groupNode,headingElements,this.config.msgNoHeadingsFound),this.renderGroupLabel("id-skip-to-group-headings-label",this.config.headingGroupLabel,headingElements.length,allHeadings.length),this.config.enableActions&&(groupNode=this.renderMenuitemGroup("id-skip-to-group-actions",this.config.actionGroupLabel),hasNoAction1=this.renderActionMoreLandmarks(groupNode),hasNoAction2=this.renderActionMoreHeadings(groupNode),hasNoAction1&&hasNoAction2&&this.removeMenuitemGroup("id-skip-to-group-actions")),this.updateMenuitems()},setFocusToMenuitem:function(menuitem){menuitem&&menuitem.focus()},setFocusToFirstMenuitem:function(){this.setFocusToMenuitem(this.firstMenuitem)},setFocusToLastMenuitem:function(){this.setFocusToMenuitem(this.lastMenuitem)},setFocusToPreviousMenuitem:function(menuitem){var index,newMenuitem=menuitem===this.firstMenuitem?this.lastMenuitem:(index=this.menuitemNodes.indexOf(menuitem),this.menuitemNodes[index-1]);return this.setFocusToMenuitem(newMenuitem),newMenuitem},setFocusToNextMenuitem:function(menuitem){var index,newMenuitem=menuitem===this.lastMenuitem?this.firstMenuitem:(index=this.menuitemNodes.indexOf(menuitem),this.menuitemNodes[index+1]);return this.setFocusToMenuitem(newMenuitem),newMenuitem},setFocusByFirstCharacter:function(menuitem,char){var start,index;1<char.length||(char=char.toLowerCase(),(start=this.menuitemNodes.indexOf(menuitem)+1)>=this.menuitemNodes.length&&(start=0),-1===(index=this.firstChars.indexOf(char,start))&&(index=this.headingLevels.indexOf(char,start)),-1===index&&(index=this.firstChars.indexOf(char,0)),-1===index&&(index=this.headingLevels.indexOf(char,0)),-1<index&&this.setFocusToMenuitem(this.menuitemNodes[index]))},getIndexFirstChars:function(startIndex,char){for(var i=startIndex;i<this.firstChars.length;i+=1)if(char===this.firstChars[i])return i;return-1},openPopup:function(){this.renderMenu(),this.menuNode.style.display="block",this.buttonNode.setAttribute("aria-expanded","true")},closePopup:function(){this.isOpen()&&(this.buttonNode.setAttribute("aria-expanded","false"),this.menuNode.style.display="none")},isOpen:function(){return"true"===this.buttonNode.getAttribute("aria-expanded")},handleFocusin:function(){this.domNode.classList.add("focus")},handleFocusout:function(){this.domNode.classList.remove("focus")},handleButtonKeydown:function(event){var flag=!1;switch(event.key){case" ":case"Enter":case"ArrowDown":case"Down":this.openPopup(),this.setFocusToFirstMenuitem(),flag=!0;break;case"Esc":case"Escape":this.closePopup(),this.buttonNode.focus(),flag=!0;break;case"Up":case"ArrowUp":this.openPopup(),this.setFocusToLastMenuitem(),flag=!0}flag&&(event.stopPropagation(),event.preventDefault())},handleButtonClick:function(event){this.isOpen()?(this.closePopup(),this.buttonNode.focus()):(this.openPopup(),this.setFocusToFirstMenuitem()),event.stopPropagation(),event.preventDefault()},skipToElement:function(menuitem){var focusNode=!1,scrollNode=!1,isLandmark=menuitem.classList.contains("landmark"),isSearch=menuitem.classList.contains("skip-to-search"),isNav=menuitem.classList.contains("skip-to-nav"),node=document.querySelector('[data-skip-to-id="'+menuitem.getAttribute("data-id")+'"]');node&&(isSearch&&(focusNode=node.querySelector("input")),isNav&&(focusNode=node.querySelector("a")),focusNode&&this.isVisible(focusNode)?(focusNode.focus(),focusNode.scrollIntoView({block:"nearest"})):(isLandmark&&(scrollNode=node.querySelector(this.contentSelector))&&(node=scrollNode),node.tabIndex=-1,node.focus(),node.scrollIntoView({block:"center"})))},handleMenuitemAction:function(tgt){var option;switch(tgt.getAttribute("data-id")){case"":break;case"skip-to-more-headings":option=tgt.getAttribute("data-show-heading-option"),this.updateHeadingGroupMenuitems(option);break;case"skip-to-more-landmarks":option=tgt.getAttribute("data-show-landmark-option"),this.updateLandmarksGroupMenuitems(option);break;default:this.closePopup(),this.skipToElement(tgt)}},handleMenuitemKeydown:function(event){var tgt=event.currentTarget,key=event.key,flag=!1;function isPrintableCharacter(str){return 1===str.length&&str.match(/\S/)}if(!(event.ctrlKey||event.altKey||event.metaKey)){if(event.shiftKey)isPrintableCharacter(key)&&(this.setFocusByFirstCharacter(tgt,key),flag=!0),"Tab"===event.key&&(this.buttonNode.focus(),this.closePopup(),flag=!0);else switch(key){case"Enter":case" ":this.handleMenuitemAction(tgt),flag=!0;break;case"Esc":case"Escape":this.closePopup(),this.buttonNode.focus(),flag=!0;break;case"Up":case"ArrowUp":this.setFocusToPreviousMenuitem(tgt),flag=!0;break;case"ArrowDown":case"Down":this.setFocusToNextMenuitem(tgt),flag=!0;break;case"Home":case"PageUp":this.setFocusToFirstMenuitem(),flag=!0;break;case"End":case"PageDown":this.setFocusToLastMenuitem(),flag=!0;break;case"Tab":this.closePopup();break;default:isPrintableCharacter(key)&&(this.setFocusByFirstCharacter(tgt,key),flag=!0)}flag&&(event.stopPropagation(),event.preventDefault())}},handleMenuitemClick:function(event){this.handleMenuitemAction(event.currentTarget),event.stopPropagation(),event.preventDefault()},handleMenuitemMouseover:function(event){event.currentTarget.focus()},handleBackgroundMousedown:function(event){this.domNode.contains(event.target)||this.isOpen()&&(this.closePopup(),this.buttonNode.focus())},normalizeName:function(name){return"string"==typeof name?name.replace(/\w\S*/g,function(txt){return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase()}):""},getTextContent:function(elem){var str="Test",strings=[];return function getText(e,strings){if(e.nodeType===Node.TEXT_NODE)strings.push(e.data);else if(e.nodeType===Node.ELEMENT_NODE){var tagName=e.tagName.toLowerCase();if("img"===tagName||"area"===tagName)e.alt&&strings.push(e.alt);else for(var c=e.firstChild;c;)getText(c,strings),c=c.nextSibling}}(elem,strings),strings.length&&(str=strings.join(" ")),str},getAccessibleName:function(elem){var labelledbyIds=elem.getAttribute("aria-labelledby"),label=elem.getAttribute("aria-label"),title=elem.getAttribute("title"),name="";if(labelledbyIds&&labelledbyIds.length){var str,strings=[],ids=labelledbyIds.split(" ");ids.length||(ids=[labelledbyIds]);for(var i=0,l=ids.length;i<l;i+=1){var e=document.getElementById(ids[i]);e&&(str=this.getTextContent(e)),str&&str.length&&strings.push(str)}name=strings.join(" ")}else label&&label.length?name=label:title&&title.length&&(name=title);return name},isVisible:function(element){return function isVisibleRec(el){if(9===el.nodeType)return!0;var computedStyle=window.getComputedStyle(el),display=computedStyle.getPropertyValue("display"),visibility=computedStyle.getPropertyValue("visibility"),hidden=el.getAttribute("hidden");return"none"!==display&&"hidden"!==visibility&&null===hidden&&isVisibleRec(el.parentNode)}(element)},getHeadings:function(targets){var dataId,level;"string"!=typeof targets&&(targets=this.config.headings);var headingElementsArr=[];if("string"==typeof targets&&0!==targets.length){for(var headings=document.querySelectorAll(targets),i=0,len=headings.length;i<len;i+=1){var headingItem,heading=headings[i],role=heading.getAttribute("role");"string"==typeof role&&"presentation"===role||this.isVisible(heading)&&(dataId=heading.hasAttribute("data-skip-to-id")?heading.getAttribute("data-skip-to-id"):(heading.setAttribute("data-skip-to-id",this.skipToIdIndex),this.skipToIdIndex),level=heading.tagName.substring(1),(headingItem={}).dataId=dataId.toString(),headingItem.class="heading",headingItem.name=this.getTextContent(heading),headingItem.ariaLabel=headingItem.name+", ",headingItem.ariaLabel+=this.config.headingLevelLabel+" "+level,headingItem.tagName=heading.tagName.toLowerCase(),headingItem.role="heading",headingItem.level=level,headingElementsArr.push(headingItem),this.skipToIdIndex+=1)}return headingElementsArr}},getLocalizedLandmarkName:function(tagName,name){var n;switch(tagName){case"aside":n=this.config.asideLabel;break;case"footer":n=this.config.footerLabel;break;case"form":n=this.config.formLabel;break;case"header":n=this.config.headerLabel;break;case"main":n=this.config.mainLabel;break;case"nav":n=this.config.navLabel;break;case"region":n=this.config.regionLabel;break;case"search":n=this.config.searchLabel;break;default:n=tagName}return this.isNotEmptyString(name)&&(n+=": "+name),n},getNestingLevel:function(landmark,landmarks){for(var nestingLevel=0,parentNode=landmark.parentNode;parentNode;){for(var i=0;i<landmarks.length;i+=1)if(landmarks[i]===parentNode&&3===(nestingLevel+=1))return 3;parentNode=parentNode.parentNode}return nestingLevel},getLandmarks:function(targets,allFlag){"boolean"!=typeof allFlag&&(allFlag=!1),"string"!=typeof targets&&(targets=this.config.landmarks);for(var landmarks=document.querySelectorAll(targets),mainElements=[],searchElements=[],navElements=[],asideElements=[],footerElements=[],regionElements=[],otherElements=[],allLandmarks=[],dataId="",i=0,len=landmarks.length;i<len;i+=1){var landmark=landmarks[i];if(landmark!==this.domNode){var role=landmark.getAttribute("role"),tagName=landmark.tagName.toLowerCase();if(("string"!=typeof role||"presentation"!==role)&&this.isVisible(landmark)){role=role||tagName;var name=this.getAccessibleName(landmark);switch("string"!=typeof name&&(name=""),role){case"banner":tagName="header";break;case"complementary":tagName="aside";break;case"contentinfo":tagName="footer";break;case"form":tagName="form";break;case"main":tagName="main";break;case"navigation":tagName="nav";break;case"section":tagName="region";break;case"search":tagName="search"}["aside","footer","form","header","main","nav","region","search"].indexOf(tagName)<0&&(tagName="main"),landmark.hasAttribute("aria-roledescription")&&(tagName=landmark.getAttribute("aria-roledescription")),dataId=landmark.hasAttribute("data-skip-to-id")?landmark.getAttribute("data-skip-to-id"):(landmark.setAttribute("data-skip-to-id",this.skipToIdIndex),this.skipToIdIndex);var landmarkItem={};switch(landmarkItem.dataId=dataId.toString(),landmarkItem.class="landmark",landmarkItem.name=this.getLocalizedLandmarkName(tagName,name),landmarkItem.tagName=tagName,landmarkItem.nestingLevel=0,allFlag&&(landmarkItem.nestingLevel=this.getNestingLevel(landmark,landmarks)),this.skipToIdIndex+=1,allLandmarks.push(landmarkItem),tagName){case"main":mainElements.push(landmarkItem);break;case"search":searchElements.push(landmarkItem);break;case"nav":navElements.push(landmarkItem);break;case"aside":asideElements.push(landmarkItem);break;case"footer":footerElements.push(landmarkItem);break;case"region":regionElements.push(landmarkItem);break;default:otherElements.push(landmarkItem)}}}}return allFlag?allLandmarks:[].concat(mainElements,regionElements,searchElements,navElements,asideElements,footerElements,otherElements)}};window.addEventListener("load",function(){SkipTo.init(window.SkipToConfig||window.Wordpress||("object"==typeof window.Joomla&&"function"==typeof window.Joomla.getOptions?window.Joomla.getOptions("skipto-settings",{}):{})),console.log("SkipTo loaded...")})}();
//# sourceMappingURL=skipto.min.js.map/*@end @*/
