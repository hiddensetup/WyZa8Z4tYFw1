"use strict";var sb_push_link,sb_push_conversation_id,sb_push_user_conversation_id;const SB_CACHE_NAME="sb-3-5-4",SB_OFFLINE="resources/pwa/offline.html";importScripts("https://js.pusher.com/beams/service-worker.js?pusherBeamsWebSDKVersion=1.0.3"),self.addEventListener("install",i=>{i.waitUntil((async()=>{let i=await caches.open(SB_CACHE_NAME);await i.add(new Request(SB_OFFLINE,{cache:"reload"}))})())}),self.addEventListener("activate",i=>{i.waitUntil((async()=>{"navigationPreload"in self.registration&&await self.registration.navigationPreload.enable()})()),self.clients.claim()}),self.addEventListener("fetch",i=>{"navigate"===i.request.mode&&i.respondWith((async()=>{try{let t=await i.preloadResponse;if(t)return t;let n=await fetch(i.request);return n}catch(e){let a=await caches.open(SB_CACHE_NAME),s=await a.match(SB_OFFLINE);return s}})())}),PusherPushNotifications.onNotificationReceived=({pushEvent:i,payload:t})=>{sb_push_link=t.notification.deep_link,sb_push_conversation_id=t.data.conversation_id,sb_push_user_conversation_id=t.data.user_id,i.waitUntil(self.registration.showNotification(t.notification.title,{body:t.notification.body,image:t.data.image,icon:t.notification.icon,data:t.data}))},self.addEventListener("notificationclick",function(i){i.notification.close(),i.waitUntil(clients.matchAll({type:"window",includeUncontrolled:!0}).then(i=>{for(var t=0;t<i.length;t++)if(i[t].url.split("?")[0]==sb_push_link)return i[t].postMessage({conversation_id:sb_push_conversation_id,user_id:sb_push_user_conversation_id}),i[t].focus();if(sb_push_link&&clients.openWindow)return clients.openWindow(sb_push_link+"?conversation="+sb_push_conversation_id)}))});