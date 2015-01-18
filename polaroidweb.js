(function(window) {
    document = window.document;

    if (window.polaroidweb) {
        return window.polaroidweb;
    }

    var styles = 'body {background-color: #000} #polaroidweb_container{position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);overflow: hidden;border: 40px solid #fff; }#polaroid_iframe{background-color: #fff; border: 2px solid #000}.svgfilter{position: absolute;top: 0;left:0;width:100%;height:100%;pointer-events:none;}';
    var svgfilter = '<svg class="svgfilter" xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><filter id="f1" x="0%" y="0%" width="100%" height="100%"><feDiffuseLighting result = "diffOut" diffuseConstant = "1" lighting-color = "white"><feSpotLight id="spotlight" x="225" y="116" z="350" pointsAtX="0" pointsAtY="0" pointsAtZ="0" specularExponent="15" limitingConeAngle="0"/></feDiffuseLighting><feColorMatrix in="diffOut" result="alphaMap" type="luminanceToAlpha"/><feComponentTransfer in="alphaMap" result="invertlight"><feFuncA type="table" tableValues="1 0 0 0 0"/></feComponentTransfer><feComposite operator="xor" result="infocus" in2="SourceGraphic" in="invertlight"/><feColorMatrix type="matrix" in="SourceGraphic" result="highContrast" values="2 0 0 0 -1 0 2 0 0 -1 0 0 2 0 -1 0 0 0 1 0"/><feComposite operator="over" in="infocus" in2="highContrast"/></filter></defs><rect width="100%" height="100%" filter="url(#f1)" fill="none"/></svg>';
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
                        '"></iframe>' + svgfilter + '</div><style type="text/css">' +
                        styles + '</style>';

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

