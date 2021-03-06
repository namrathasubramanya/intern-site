/**
 * On scroll, set active menu item.
 */
(function ($) {
  "use strict";
  Drupal.behaviors.Scrollspy = {
    attach: function (context, settings) {
      // Set first menu item active on page load.
      $(drupalSettings.singlePage.menuClass + ' li:nth-child(1) a').addClass('active');

      $('.single-page-wrapper').each(function (i) {
        var position = $(this).position();
        $(this).scrollspy({
          min: position.top,
          max: position.top + $(this).height(),
          onEnter: function (element, position) {
            var id = element.id;
            $(drupalSettings.singlePage.menuClass + ' li a[data-active-item="' + id + '"]').addClass('active');
            // Set history state.
            if (drupalSettings.singlePage.updateHash !== 0) {
              var stateData = {
                path: window.location.href,
                scrollTop: $(window).scrollTop()
              };
              // window.history.replaceState(stateData, '', '#' + id);
              window.history.pushState(stateData, '', '#' + id);
            }
          },
          onLeave: function (element, position) {
            var id = element.id;
            $(drupalSettings.singlePage.menuClass + ' li a[data-active-item="' + id + '"]').removeClass('active');
          }
        });
      });
    }
  };
})(jQuery);
