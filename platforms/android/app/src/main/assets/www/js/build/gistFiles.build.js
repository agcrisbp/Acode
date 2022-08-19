"use strict";(self.webpackChunkcom_foxdebug_acode=self.webpackChunkcom_foxdebug_acode||[]).push([[145],{70488:function(e,t,n){n.r(t),n.d(t,{default:function(){return y}});var r=n(72050),i=n(89184),a=n.n(i),s=n(30011),o=n(71530),c=n(37519),l=n(93101),d=n(44596),f=n(96691),u=n(6700),p=n(59661),g=n(64413),m=n(38972);function v(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,o=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){o=!0,a=e},f:function(){try{s||null==n.return||n.return()}finally{if(o)throw a}}}}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var y=function(e){var t=Object.keys(e.files),n=(0,o.Z)(t[0]||"Gist:"+e.id),i={files:function(){var t=[];return Object.values(e.files).map((function(e){t.push({filename:e.filename,type:c.Z.getIconForFile(e.filename)})})),t},msg:strings["empty folder message"]},h=a().parse(s.Z.render("<div id='gistFiles' empty-msg='{{msg}}' class='main list'>{{#files}}\r\n    <div class='list-item' action='file' filename='{{filename}}'>\r\n      <span class='icon {{type}}'></span>\r\n      <div class='container'>\r\n        <div class='text'>\r\n          <span>{{filename}}</span>\r\n        </div>\r\n      </div>\r\n      <span class='icon delete' action='delete-file'></span>\r\n    </div>\r\n  {{/files}}</div>",i)),y=(0,m.Z)("more_vert","toggle-menu"),b=(0,l.Z)(s.Z.render("<li action='create'>\r\n  <span class='text'>{{new file}}</span>\r\n  <span class='icon file-control document-add'></span>\r\n</li>\r\n<li action='delete-gist'>\r\n  <span class='text'>Delete gist</span>\r\n  <span class='icon delete'></span>\r\n</li>",strings),{top:"8px",right:"8px",toggle:y,transformOrigin:"top right"}),k=a()("span",{className:"icon search",attr:{action:"search"}});function Z(t){var n,i=t.target,a=i.getAttribute("action");if(a)switch(["create","delete-gist"].includes(a)&&b.hide(),a){case"file":n=i.getAttribute("filename"),editorManager.addNewFile(n,{type:"gist",text:e.files[n].content,isUnsaved:!1,record:e,render:!0}),actionStack.pop(),actionStack.pop(),actionStack.pop();break;case"share":i.parentElement.getAttribute("filename");break;case"create":d.Z.prompt(strings["enter file name"],strings["new file"],"text",{match:p.Z.FILE_NAME_REGEX,required:!0}).then((function(t){e.addFile(t),editorManager.addNewFile(t,{type:"gist",filename:t,isUnsaved:!1,record:e,render:!0}),actionStack.pop(),actionStack.pop(),actionStack.pop()}));break;case"delete-gist":d.Z.confirm(strings.warning,strings["delete {name}"].replace("{name}","Gist: "+e.id)).then((function(){var t=u.Z.GitHub().getGist(e.id);d.Z.loader.create("",strings.loading+"..."),t.delete().then((function(t){if(204===t.status){var n,i=v(editorManager.files);try{for(i.s();!(n=i.n()).done;){var a=n.value;"gist"===a.type&&a.record.id===e.id&&editorManager.removeFile(a,!0)}}catch(e){i.e(e)}finally{i.f()}toast(strings.success),actionStack.pop(),actionStack.pop(),(0,f.Z)((function(t){var n,i,a=v(t.entries());try{for(a.s();!(i=a.n()).done;){var s=(0,r.Z)(i.value,2),o=s[0];if(s[1].id===e.id){n=o;break}}}catch(e){a.e(e)}finally{a.f()}return void 0!==n&&t.splice(n,1),t}))}})).catch((function(e){e&&(console.error(e),d.Z.alert(strings.error,e.toString()))})).finally((function(){d.Z.loader.destroy()}))}));break;case"delete-file":!function(){var t=i.parentElement.getAttribute("filename");d.Z.confirm(strings.warning,strings["delete {name}"].replace("{name}",t)).then((function(){t&&(d.Z.loader.create(t,strings.loading+"..."),e.removeFile(t).then((function(){i.parentElement.remove(),toast(strings.success)})).catch((function(e){e&&d.Z.alert(strings.error,e.toString())})).finally((function(){d.Z.loader.destroy()})))}))}()}}h.addEventListener("click",Z),b.addEventListener("click",Z),n.body=h,n.header.append(k,y),k.onclick=function(){return(0,g.Z)(n.querySelector(".list"))},app.appendChild(n),c.Z.showAd(),actionStack.push({id:"gistFiles",action:function(){c.Z.hideAd(),n.hide()}})}}}]);