<!--崩溃欺骗-->
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="shortcut icon"]').attr('href', "/images/sao-16x16.png");
        document.title = '😰 w(ﾟДﾟ)w 不要走，求求你啦!  ';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="shortcut icon"]').attr('href', "/images/sao-16x16.png");
        document.title = '😏 ♪(^∇^*) 谢谢你，小弟膜拜膜拜模板泥~ ';
        titleTime = setTimeout(function () {
            document.title = '🤔 啊来来! 我来找找标题去哪了  ';
        }, 2000);
		
		titleTime = setTimeout(function () {
            document.title = '😮哦~! 我找到啦!  ';
        }, 4000);
		
		titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 6000);
    }
});
