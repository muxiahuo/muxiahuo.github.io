/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/06/05/fenjing/index.html","ad0e26c32aefd0c4269cf1bf2c8dbb57"],["/2024/06/06/tplmap/index.html","a60d35a98ce2dea47202e1cd44d86189"],["/2024/06/11/md5/index.html","17c1f357404717fd395d99b2a98e20e8"],["/2024/06/12/preg-match/index.html","8521d20b3e9301fa5cc0b604f5b3b8cc"],["/2024/07/12/intval/index.html","6d68a69fb9748318be801e1662f1e24b"],["/2024/07/12/preg-replace/index.html","afa99f862b8d01952ae33baf73d36b1d"],["/2024/07/13/hackbar/index.html","5b6b388baf790d0e2e4b72763215f78f"],["/2024/07/13/in-array/index.html","80a28a019e9f5629798cbc0d508cf6f7"],["/2024/07/13/is-numberic/index.html","d2fb4c5c94c1b3b4898ae590d2936d48"],["/2024/07/13/print-print-r/index.html","0380e8360a88b98568f42481515ac2f4"],["/2024/07/13/文件包含/index.html","7e6518381abf3617d78707db35454d7c"],["/2024/07/14/php-filter-chain-generator/index.html","d579cea8dd50a5c64f5029f31378eaa0"],["/2024/07/14/php入门/index.html","d351107e2e4c42b951b488953bc435dd"],["/2024/07/16/命令执行/index.html","698d5bc96b50b0f13858786fff8a4319"],["/2024/07/17/eregi/index.html","3ebbc8782c30a297fe17bf1925af849a"],["/2024/07/18/信息收集（CTF基础篇）/index.html","2cd778a6ac8264bb5178b4270cfc182c"],["/2024/07/21/文件上传/index.html","26948aa79aa9e6d9625daf5433cebf03"],["/2024/07/23/dirsearch/index.html","1a32d0ab2cdbf6faf4f3d228ab78348d"],["/2024/07/24/Wappalyzer/index.html","1c56ab4216569ff6727ed09f5e5447d5"],["/2024/07/25/BurpSuite/index.html","ad5bfa16fee06afa52d4f33d16190d4f"],["/2024/07/27/sql注入/index.html","d8fae4c1de0e155fb0e1690e503287e9"],["/2024/08/03/GitHack/index.html","2f42a22f7d150b6bb3319889771de1dc"],["/2024/08/03/sqlmap/index.html","7db2200b6c0ca346a31a0902e9772f10"],["/2024/08/03/蚁剑/index.html","b1d4e918b2d077745c431fb8f6d80449"],["/2024/08/08/SSTI注入/index.html","918c8ce1b4848a84251ba7e2b3ab5c62"],["/2024/09/19/php反序列化/index.html","240854ce9c6d15b629e43ef929c46032"],["/2024/09/26/CVE-2003-0352-135-RPC/index.html","ce422cbf5676e664c51e2d812b96ba6d"],["/2024/09/26/CVE-2008-4250-445-RPC/index.html","b850bafdd1e5539fb3ec9596cadd937d"],["/about/index.html","764a0e3882bc38f9a1cc17bf33b84d50"],["/archives/2024/06/index.html","70532d724262d94d877f9886c2411b75"],["/archives/2024/07/index.html","954c1d1db92a8e78e242145a5467b313"],["/archives/2024/07/page/2/index.html","3ea8c01a345c4895e993da487b0fb1d4"],["/archives/2024/08/index.html","96bd06a9977c10ddf312a32ddbd27b2d"],["/archives/2024/09/index.html","8bd13bc6c505c71b6f071231a43baf59"],["/archives/2024/index.html","4e5c536a54fbb68e1052ff0c27a4aa75"],["/archives/2024/page/2/index.html","637521da01792d19613900452d050b63"],["/archives/2024/page/3/index.html","a7aec6c5feeafd308a3da5fe01300f6c"],["/archives/index.html","18334041f2b2248ef110df2650041668"],["/archives/page/2/index.html","ffcd32bd7777f93d72c2e8c41c1a4f55"],["/archives/page/3/index.html","c5a00d8f7229dc6521748bc07fc17c18"],["/categories/PHP/index.html","443e42af18992933cf076e1ce68024b1"],["/categories/PHP/page/2/index.html","b42b26e68e90e51332d98840f235b800"],["/categories/SSTI/index.html","604a9ae6e8bec82b6aebc1afc26cb4ab"],["/categories/WEB/index.html","d829759b2cc7a714c8ad5050ff69548c"],["/categories/index.html","4696b593d039a87b6049fe2ed9f1f747"],["/categories/渗透/index.html","6cc1bbe637903b53b5989e58a01847f9"],["/css/main.css","a0bcb213c47da7bafa402c0c15ad272e"],["/css/noscript.css","2be0f545683395bf734bfdd37fb5f3e2"],["/images/GIF木马.png","c9994446f6ab118c0a1ec9a7e0a0404d"],["/images/PATH.png","6119c8158e19584c476bf86cf8ad4c3b"],["/images/SSTI.png","2ff019073427dff4aa65a33359e059db"],["/images/access.log.png","2e1930540b0d51d72cfe9dc47c60d442"],["/images/avatar.jpg","900f795a616c71e3d8f7d2eee05e4515"],["/images/background.jpg","22fc123aa05330a4f68c998766f43e94"],["/images/background1.jpg","e34d71abb9465452177c42400f0fef4e"],["/images/ciscn.png","fa3ff261293b07d09cce091d69e51075"],["/images/grep.png","4c7b30270dd631aa97704db35d64f03a"],["/images/in_array()函数缺陷.png","d675feb68ece4e88844b310e8a3175bc"],["/images/php_filter.png","6ac8d2a863efb482dd4c2d7c14b9a1bb"],["/images/php_filter2.png","34c742a2c270caa192a65a15fb0c2c4c"],["/images/pop1.png","c4582000b2a58aafb845b697358fb39c"],["/images/pop2.png","550132fa091986eb8ff5fb1f2568e5e7"],["/images/sql/and1=1.png","88d7d62cbdffef1462861c705c7ea2c2"],["/images/sql/and1=2.png","faaedc36a392333d30c1a6ba86b299a0"],["/images/sql/orderby.png","c56f4cd8d87b123551bb62b643109636"],["/images/sql/select.png","eabfc9c625179e461ed87d783718cf62"],["/images/sql/sql1-1.png","55475547b9c3e48b30d9a176a207589b"],["/images/sql/sql1-2-1.png","e8d44c4631e838b5ffba264453be901c"],["/images/sql/sql1-2.png","6ee165c87e0155b8ef90207770652239"],["/images/sql/sql1-爆列.png","0fde8229ef107f98831421b34f83abcb"],["/images/sql/sql1-爆字段.png","33d580df717d2ac975ec16e08b94fc77"],["/images/sql/sql1-爆库.png","b06bed4c3f0bdba6f10d04282e04a384"],["/images/sql/sql1-爆表1.png","bf5fd7fa673f7e99de7888caa0011d39"],["/images/sql/sql1-爆表2.png","18e223a6f6dce473a78652e805b97c30"],["/images/sql/sql11-1.png","3003d4a8dbb90563131790db3b69fe9f"],["/images/sql/sql11-2.png","054a55295fa66a64118c79d73f834947"],["/images/sql/sql11-post.png","8a6ee9b4470eef868c304584eddc34c5"],["/images/sql/sql13-post.png","e756e9077149a101aab66ef63deeb7c6"],["/images/sql/sql5-column.png","772fe6a1ccd4a02e1de6b4b26ec91164"],["/images/sql/sql5-id.png","c2bb08d5fdb3c245acf0e375768a2de1"],["/images/sql/sql5-length.png","bae86dfeaf23974831a644cca1dbb515"],["/images/sql/sql9-time1.png","0611ccdaa2f309657d3e78e1123de24e"],["/images/sql/sql9-time2.png","62b01578d4e9b4d0b8c6f5a98d771bc5"],["/images/sql/字符闭合.png","84491f08f4cad4bb0ab97ef27537f7bf"],["/images/sql/数值闭合.png","f06b688ae34506eb3dadaaa0e5607009"],["/images/sqlmap.png","d69e8abb18793cddcefbdfeaeb61a154"],["/images/tplmap.png","03df6875bb77d6774862087fd639d703"],["/images/xxd.png","cc29349ad8e4c8cf2020db3b2eb6fdd7"],["/images/单引号绕过.png","b5bb9ea4f050f03bbbcccf51ff912ed2"],["/images/反引号.png","5b81252f9738f6b0fb160d042b4f186c"],["/images/大杂烩.png","8eb2ef95d7d5462fde7bfaada7652ee3"],["/images/字符串类型&进制绕过.png","a38c5b43e987cca7f00748a527c53990"],["/index.html","4648b379a59b7b51c804f4da4e536ed5"],["/js/bookmark.js","9bc1c13085300d86541c0d9532235e6a"],["/js/comments-buttons.js","8560bdca22fa8d7f041a2a37efd99de7"],["/js/comments.js","d6996a202a9ad8176a0e39343a974b26"],["/js/config.js","9c844f6ccdb39fdc03e2f53711e2b282"],["/js/motion.js","72ab9e537db623cb9aff0363888c6e07"],["/js/next-boot.js","9c8fd5d43294fa7845ffb736074f4461"],["/js/pjax.js","a22012de7c9dc4da10656a9670ad5331"],["/js/schedule.js","507e6f1e1632e9bad069753226e09dd4"],["/js/sidebar.js","d8853b489d4477a041bf8855772b48fc"],["/js/third-party/addtoany.js","e5bf63f47c0191250fe6e6d0a2425c04"],["/js/third-party/analytics/baidu-analytics.js","59db45f5e16951a2a1f7b8eccfab736a"],["/js/third-party/analytics/google-analytics.js","b24820abff8cf93d384de49f65ebd3ff"],["/js/third-party/analytics/growingio.js","c44a6eadf9abf811c289ff7d7747e1a9"],["/js/third-party/analytics/matomo.js","41e11502744876fd591016942813ea25"],["/js/third-party/chat/chatra.js","603bc9cb6545ddb3ca4d36b2b54337a4"],["/js/third-party/chat/tidio.js","f936b8dfee140067fc309dda016eb9b7"],["/js/third-party/comments/changyan.js","f5fbb8a709a43ecacc16b4a0137ac1f2"],["/js/third-party/comments/disqus.js","4f34047198ffa9f61d66b14efe7902f4"],["/js/third-party/comments/disqusjs.js","97c689e310229572e4b76df3b6460d79"],["/js/third-party/comments/gitalk.js","74661bde26a34220dc1d5b6e756eddfd"],["/js/third-party/comments/isso.js","d2787e760fd00d3b50cca616b00ea014"],["/js/third-party/comments/livere.js","b9c27e555137cca40c0b2e43b313d132"],["/js/third-party/comments/utterances.js","11c7a9b95aa7bfc55ffcdc2ba54ab0ef"],["/js/third-party/fancybox.js","e4b430abc20e42ff96e68a1a51601403"],["/js/third-party/math/katex.js","2c097169dc8ceb6ca0f1abdb901c49ff"],["/js/third-party/math/mathjax.js","30144af9ee076034740074520e80ecc3"],["/js/third-party/pace.js","4527c8f8b76bdf14e83f7e6ecb620ea1"],["/js/third-party/quicklink.js","9cfc8ba484f5ae03b5902f42c15d623c"],["/js/third-party/search/algolia-search.js","b1d5198deb9c2e0f673543edc95e0c26"],["/js/third-party/search/local-search.js","4a9c4fb009f90bd987207300aa52fda5"],["/js/third-party/statistics/firestore.js","cb92e73324e84cfea0bbc0fa80e48b70"],["/js/third-party/statistics/lean-analytics.js","d276bd1cdb9c7479523172b5c336bb2a"],["/js/third-party/tags/mermaid.js","9b80f1516561b619b62c21527426f66f"],["/js/third-party/tags/pdf.js","5f1e4126a5c9ebebdb55c94b159b0c07"],["/js/third-party/tags/wavedrom.js","0bddd6d5f1641c97cadb4d52e6ab8d28"],["/js/utils.js","df0932f6a7b2acd1bab599b27ecea396"],["/lib/canvas-nest/README.html","e390e575d4f48c0d12b46b71e2b8e6b4"],["/lib/canvas-nest/canvas-nest-nomobile.min.js","876c47c6a2edc066781c264adf33aec2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/pace/README.html","73215b7249695a641fccb6a7fa5358e9"],["/lib/pace/pace-theme-barber-shop.min.css","e8dc66cf2d88abc25fbc89b8a0529abb"],["/lib/pace/pace-theme-big-counter.min.css","db2b8fe31e60f19021545277d2f6e05e"],["/lib/pace/pace-theme-bounce.min.css","ad954aa0bace4b213eeb19d6e89a0bda"],["/lib/pace/pace-theme-center-atom.min.css","8f6bc803acefc6f93afc98fb38201456"],["/lib/pace/pace-theme-center-circle.min.css","93c72298781226a80a9c66b27b21a57d"],["/lib/pace/pace-theme-center-radar.min.css","f0099bdd1cd42e9476bd7abc417c0328"],["/lib/pace/pace-theme-center-simple.min.css","eddff4756dbf21dbbff1c543bd894dde"],["/lib/pace/pace-theme-corner-indicator.min.css","776826157cb28ac1ee5e78771292b9ba"],["/lib/pace/pace-theme-fill-left.min.css","965859b39001da08e1e92327fe3d8e12"],["/lib/pace/pace-theme-flash.min.css","aab39b436e1fa0fdc51df06f2d53c38a"],["/lib/pace/pace-theme-flat-top.min.css","8f55d5d3e9b4e2aba049efb6dd4e861c"],["/lib/pace/pace-theme-loading-bar.min.css","4e05877f1f9efb9c1e7dd75cb78c764f"],["/lib/pace/pace-theme-mac-osx.min.css","29ae030ceaa8158352c5472218375b91"],["/lib/pace/pace-theme-material.min.css","13d3271ff84c55fad0427b586e574a44"],["/lib/pace/pace-theme-minimal.min.css","f48f04d370993b55a2745e548cc82743"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/reading_progress/README.html","fd569321df54b6d2c21f1ecddc7d4216"],["/lib/reading_progress/reading_progress.js","4532bad6f74d2abbad00ae166ced99a5"],["/lib/reading_progress/reading_progress.min.js","abbebb6c477b3a170cb6aea8fc2915e9"],["/live2dw/lib/L2Dwidget.0.min.js","32973883fcac0a9ae6cc79c0ea25fda2"],["/live2dw/lib/L2Dwidget.min.js","094cbace49a39548bed64abff5988b05"],["/page/2/index.html","715016744985a437c929fb45a2e1ac99"],["/page/3/index.html","6bc79dfc7facda2f112461064c54037e"],["/sw-register.js","208f0acd51e31936d67ffe597c9d1805"],["/tags/CVE/index.html","5128481a22ba3c53df3ad405de762c84"],["/tags/SSTI注入/index.html","988dd5f6fd78c74531cbf1faac778cf4"],["/tags/index.html","b09c47fdca47b86a0bd9b54a8dae83e3"],["/tags/sql注入/index.html","8d62f2374867f0834389cbb46b4c6bca"],["/tags/信息收集/index.html","d7872e0da5d9f05cca8bb1d9654e2da1"],["/tags/函数绕过/index.html","2ed84f353e7d94f94bd6e98075dfa945"],["/tags/区别/index.html","b5ab4ce1689770f51ea8c8e8b7a0953f"],["/tags/反序列化/index.html","750ce01750b39b631afb0db1d0c88bcd"],["/tags/命令执行/index.html","4790da1d67780ff6e2e6aae8aa3c7617"],["/tags/基础/index.html","6ca8cd9b7b13dc41d0c91ad9871000b6"],["/tags/工具-脚本-利用/index.html","2b332ec847920f287b92fcde2593490b"],["/tags/文件上传/index.html","c834527173b5049d63682ccc7b0a8ccc"],["/tags/文件包含/index.html","944cd203d4ece9d14cb4b192fdf659fd"],["/tags/注入/index.html","b9b7f585e01480c958c4421197d92a42"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
