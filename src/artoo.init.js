;(function(undefined) {
  'use strict';

  /**
   * artoo initialization
   * =====================
   *
   * Launch artoo's init hooks.
   */

  // Initialization hook
  function main() {

    // Welcoming user
    this.log.welcome();

    // Indicating we are injecting artoo from the chrome extension
    if (artoo.chromeExtension)
      artoo.log.verbose('artoo has automatically been injected ' +
                        'by the chrome extension.');

    // Injecting jQuery
    this.jquery.inject(function() {
      artoo.log.info('artoo is now good to go!');

      // Applying jQuery plugins
      artoo.jquery.plugins.map(function(p) {
        p(artoo.$);
      });

      // Loading extra script?
      if (artoo.nextScript)
        artoo.injectScript(artoo.nextScript);


      // Triggering ready
      if (typeof artoo.ready === 'function')
        artoo.ready();
    });

    // Updating artoo state
    this.loaded = true;
  }

  // Placing the hook at first position
  artoo.hooks.init.unshift(main);

  // Init?
  if (!artoo.loaded)
    artoo.hooks.init.map(function(h) {
      h.apply(artoo);
    });
}).call(this);
