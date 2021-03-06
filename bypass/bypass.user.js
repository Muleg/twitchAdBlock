// ==UserScript==
// @name         TwitchAdSolutions (bypass)
// @namespace    https://github.com/pixeltris/TwitchAdSolutions
// @version      1.1
// @updateURL    https://github.com/pixeltris/TwitchAdSolutions/raw/master/bypass/bypass.user.js
// @downloadURL  https://github.com/pixeltris/TwitchAdSolutions/raw/master/bypass/bypass.user.js
// @description  Multiple solutions for blocking Twitch ads (bypass)
// @author       pixeltris
// @match        *://*.twitch.tv/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    function hookFetch() {
        var realFetch = window.fetch;
        window.fetch = function(url, init, ...args) {
            if (typeof url === 'string' && url.includes('gql') && typeof init.body == 'string' && init.body.includes('PlaybackAccessToken') && !init.body.includes('"isVod":true')) {
                if (typeof init.headers['Authorization'] === 'string') {
                    init.headers['Authorization'] = '';
                }
                if (typeof init.headers['X-Device-Id'] === 'string') {
                    init.headers['X-Device-Id'] = 'twitch-web-wall-mason';
                }
                if (typeof init.headers['Device-ID'] === 'string') {
                    init.headers['Device-ID'] = 'twitch-web-wall-mason';
                }
            }
            return realFetch.apply(this, arguments);
        }
    }
    hookFetch();
})();
