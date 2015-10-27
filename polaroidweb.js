(function(window) {
    document = window.document;

    if (window.polaroidweb) {
        return window.polaroidweb;
    }

    var styles = 'body {background-color: #000; min-height: 0; height: auto;} ' +
        '               #polaroidweb_container{position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);overflow: hidden;border: 40px solid #fff; -webkit-filter: contrast(1.5) brightness(.9);filter: contrast(1.5) brightness(.9);}' +
                    '#polaroid_iframe{background-color: #fff; border: 2px solid #000}';
    var filterStyles = '#polaroidweb_container:after {content: ""; display: block;height: 100%;width: 100%;top: 0;left: 0;position: absolute;background: -webkit-radial-gradient(circle,#804e0f,#3b003b);background: radial-gradient(circle,#804e0f,#3b003b);mix-blend-mode: screen;pointer-events: none}';
    var body = document.getElementsByTagName('body')[0];
    var container, iframe, svgSpotlight;

    function viewport()
    {
        var e = window,
            a = 'inner';

        if (!('innerWidth' in window))
        {
            a = 'client';
            e = document.documentElement || document.body;
        }

        return {
            width : e[ a+'Width' ] ,
            height : e[ a+'Height' ]
        };
    }

    function calculateSize() {
        var size = viewport(),
            psize = Math.round(Math.min(size.width, size.height));
        return psize * 0.6;
    }

    function setup() {
        var polaroidHtml = '<div id="polaroidweb_container"><iframe id="polaroid_iframe" width="100%" height="100%" src="' +
                        document.location +
                        '"></iframe></div><style type="text/css">' +
                        styles + filterStyles + '</style>';

        body.innerHTML = polaroidHtml;

        container = document.getElementById('polaroidweb_container');
        iframe = document.getElementById('polaroid_iframe');
        svgSpotlight = document.getElementById('spotlight');
    }




    window.polaroidweb = function() {
        var s = Math.floor(calculateSize());
        var iframeSize = (s - 4);
        var filterSize = Math.round(iframeSize/2);
        container.style.height = container.style.width = s + "px";
        iframe.style.height = iframe.style.width = iframeSize + "px";
        svgSpotlight.setAttribute("x", filterSize);
        svgSpotlight.setAttribute("y", filterSize);
        svgSpotlight.setAttribute("pointsAtY", filterSize);
        svgSpotlight.setAttribute('pointsAtX', filterSize);
    };

    window.onresize = window.polaroidweb;

    setup();

    return window.polaroidweb;

})(window)();

