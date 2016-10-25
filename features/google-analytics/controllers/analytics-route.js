'use strict';

module.exports = [{
  url: '*',
  priority: 'max',

  enter: ['$next', function($next) {
    window.ga('set', 'page', document.location.href.replace(document.location.protocol + '//' + document.location.host, ''));
    window.ga('send', 'pageview');

    $next();
  }]
}];
