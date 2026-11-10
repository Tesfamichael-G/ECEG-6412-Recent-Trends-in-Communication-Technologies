(function () {
  // Find this script's own <script> element, so we can derive the site base
  // URL from its src attribute. Works on localhost, GitHub Pages subpaths,
  // and custom domains — no hardcoding required.
  var scriptEl = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (/\/javascripts\/mathjax\.js/.test(scripts[i].src)) return scripts[i];
    }
    return null;
  })();

  var siteBase = '';
  if (scriptEl && scriptEl.src) {
    var m = scriptEl.src.match(/^(.*)\/javascripts\/mathjax\.js(?:[?#].*)?$/);
    if (m) siteBase = m[1];
  }

  window.MathJax = {
    tex: {
      inlineMath: [["\\(", "\\)"], ["$", "$"]],
      displayMath: [["\\[", "\\]"], ["$$", "$$"]],
      processEscapes: true,
      processEnvironments: true,
      packages: { '[+]': ['action'] }
    },
    chtml: {
      fontURL: siteBase + '/javascripts/output/chtml/fonts/woff-v2'//,
      // displayAlign: 'left',
      // displayIndent: '2em'      // left padding for display blocks
    },
    options: {
      ignoreHtmlClass: ".*|",
      processHtmlClass: "arithmatex"
    }
  };
})();