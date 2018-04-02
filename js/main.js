"use strict";

//Esc Key 
$.fn.escape = function(callback) {
    return this.each(function() {
        jQuery(document).on("keydown", this, function(e) {
            var keycode = ((typeof e.keyCode != 'undefined' && e.keyCode) ? e.keyCode : e.which);
            if (keycode === 27) {
                callback.call(this, e);
            };
        });
    });
};

//Menu Navigation Hamburger
var navigationRight = jQuery('.menu-wrap');

function Navigation() {
    var bodyEl = document.body,
        content = document.querySelector('#close-button'),
        openbtn = document.getElementById('open-button'),
        closebtn = document.getElementById('close-button'),
        isOpen = false;

    function init() {
        initEvents();
    }

    function initEvents() {
        openbtn.addEventListener('click', toggleMenu);
        if (closebtn) {
            closebtn.addEventListener('click', toggleMenu);
        }

        // close the menu element if the target it´s not the menu element or one of its descendants..
        content.addEventListener('click', function(ev) {
            var target = ev.target;
            if (isOpen && target !== openbtn) {
                toggleMenu();
            }
        });
    }

    function toggleMenu() {
        if (isOpen) {
            classie.remove(bodyEl, 'show-menu');
        } else {
            classie.add(bodyEl, 'show-menu');
        }
        isOpen = !isOpen;
    }

    navigationRight.escape(function() {
        if (isOpen) {
            classie.remove(bodyEl, 'show-menu');
            classie.remove(openbtn, 'active')
        }
        isOpen = !isOpen;
    });

    init();
};

//Tabs
function Tabs() {
    [].slice.call(document.querySelectorAll('.ef-tabs')).forEach(function(el) {
        new CBPFWTabs(el);
    });
};

//Dribble 
function getDribbbleThumbs() {
    jQuery.jribbble.setToken(dribbbleToken);
    jQuery.jribbble.users(dribbbleName).shots({
        per_page: numberOfItems
    }).then(function(shots) {
        var html = [];
        shots.forEach(function(shot) {
            html.push('<div class="col-md-4 col-sm-4 col-xs-12 mix">');
            html.push('<div class="img dribbble-shot">');
            html.push('<img src="' + shot.images.normal + '">');
            html.push('<div class="overlay-thumb">');
            html.push('<div class="details">');
            html.push('<span class="title">' + shot.title + '</span>');
            html.push('</div>');
            html.push('<span class="btnBefore"></span><span class="btnAfter"></span>');
            html.push('<a class="main-portfolio-link" href="' + shot.html_url + '" target="_blank">');
            html.push('</div>');
            html.push('</div>');
            html.push('</div>');
        });
        jQuery('#work-grid').html(html.join(''));
    });
};

//Social Share Buttons
function getSocialButtons() {
    var socialButtonsEx = jQuery('.social-buttons');
    if (socialButtonsEx.length > 0) {
        jQuery('[data-social]').socialButtons();
    }
};

//Detect Mobile
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

//Parallax Scroll
function parallaxScroll() {
    var scrolledY = jQuery(window).scrollTop();
    var headerImage = jQuery('.ef-parallax-bg');
    headerImage.css('background-position', 'center -' + ((scrolledY * 0.4)) + 'px');
};

//History Slider
function historySlider() {
    //History Images slide
    var historyimages = jQuery('#history-images');
    if (historyimages.length > 0) {
        historyimages.owlCarousel({
            singleItem: true,
            pagination: false,
            autoPlay: 2000,
            slideSpeed: 300
        });
    }
};

//Like
function likeEf() {
    jQuery('.like-product').on('click',  function() {
        jQuery(this).find('i').toggleClass('press');
        jQuery(this).find('i').removeClass('ion-ios-heart-outline');
        jQuery(this).find('span.like-product').toggleClass('press');
        if (jQuery(this).find('i').hasClass('press') || jQuery(this).find('i').hasClass('ion-ios-heart-outline')) {
            jQuery(this).find('.output').html(function(i, val) {
                return val * 1 + 1
            });
            jQuery(this).find('i').addClass('ion-ios-heart');
            jQuery(this).find('i').removeClass('ion-ios-heart-outline');
        } else {
            jQuery(this).find('.output').html(function(i, val) {
                return val * 1 - 1
            });
            jQuery(this).find('i').removeClass('ion-ios-heart');
            jQuery(this).find('i').addClass('ion-ios-heart-outline');

        }
    });
};

//Document Ready
jQuery(document).ready(function($) {
    
    //Navigation Sub Menu Triggering
    jQuery('.menu-item-has-children, .page_item_has_children').hover(function() {
        jQuery(this).children('.sub-menu').stop().slideDown(200);
    }, 
    function() {
        jQuery(this).children('.sub-menu').stop().slideUp(200);
    });

    //Mobile Menu Open/Close 
    jQuery('#open-mobile-menu').on('click', function() {
        var self = jQuery(this);
        var mobileMenu = jQuery('.menu-wrap-2');

        if (mobileMenu.hasClass('is-open')) {
            self.removeClass('active');
            mobileMenu.removeClass('is-open');
        } else {
            mobileMenu.addClass('is-open');
            self.addClass('active');
        }
    });

    //Dribbble
    if (jQuery('.dribble-grid').length > 0) {
        getDribbbleThumbs();
    };

    //Menu Right Side
    if (navigationRight.length > 0) {
        Navigation();
    };

    //Parallax Background on Desktop
    if (!isMobile.any()) {
        jQuery(window).on('scroll', function() {
            parallaxScroll();
        });
    };

    // Switch class on filter
    var showfilter = jQuery('.works-filter');
    jQuery('button.nav').on('click', function() {
        var self = jQuery(this);
        self.toggleClass('open');
        showfilter.toggleClass('open');
    });

    //Architecure Slider
    var archSlider = jQuery('#arch-slider');
    var prev = jQuery('.prev-slide');
    var next = jQuery('.next-slide');
    //Arch slider
    if (archSlider.length > 0) {
        archSlider.owlCarousel({
            singleItem: true,
            pagination: false,
            autoPlay: 5000,
            slideSpeed: 300,

        });
        prev.on('click', function() {
            archSlider.trigger('owl.prev');
        });
        next.on('click', function() {
            archSlider.trigger('owl.next');
        });
    };

    //Single Project Slider
    var singleProjectSlider = jQuery('.single-slider');
    if (singleProjectSlider.length > 0) {
        singleProjectSlider.owlCarousel({
            singleItem: true,
            pagination: false,
            autoPlay: 5000,
            slideSpeed: 300,

        });
        prev.on('click', function() {
            singleProjectSlider.trigger('owl.prev');
        });
        next.on('click', function() {
            singleProjectSlider.trigger('owl.next');
        });
    };

    //Team Slider
    var teamMembers = jQuery('.team');
    if (teamMembers.length > 0) {
        teamMembers.owlCarousel({
            pagination: true,
            items: 3,
            margin: 20,
            autoHeight: true,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [980, 2],
            itemsTablet: [768, 2],
            itemsMobile: [479, 1]
        });
    };

    //Tabs Slider
    var tabsSlider = jQuery('#tabs-slider');
    if (tabsSlider.length > 0) {
        tabsSlider.owlCarousel({
            singleItem: true,
            pagination: false,
            autoPlay: 3000,
            slideSpeed: 600,
        });
    };

    //Search
    var wrap = jQuery('.js-ui-search');
    var close = jQuery('.js-ui-close');
    var input = jQuery('.js-ui-text');
    close.on('click', function() {
        wrap.toggleClass('open');
    });
    input.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
        if (wrap.hasClass('open')) {
            input.focus();
        } else {
            return;
        }
    });

    //WOW Animation init 
    new WOW().init();

});

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD module
    define(factory);
  } else if (typeof exports === 'object') {
    // CommonJS-like environment (i.e. Node)
    module.exports = factory();
  } else {
    // Browser global
    root.transformicons = factory();
  }
}(this || window, function () {

  // ####################
  // MODULE TRANSFORMICON
  // ####################
  'use strict';

  var
    tcon = {}, // static class
    _transformClass = 'tcon-transform',

    // const
    DEFAULT_EVENTS = {
      transform : ['click'],
      revert : ['click']
    };

  // ##############
  // private methods
  // ##############

  /**
  * Normalize a selector string, a single DOM element or an array of elements into an array of DOM elements.
  * @private
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements
  * @returns {array} Array of DOM elements
  */
  var getElementList = function (elements) {
    if (typeof elements === 'string') {
      return Array.prototype.slice.call(document.querySelectorAll(elements));
    } else if (typeof elements === 'undefined' || elements instanceof Array) {
      return elements;
    } else {
      return [elements];
    }
  };

  /**
  * Normalize a string with eventnames separated by spaces or an array of eventnames into an array of eventnames.
  * @private
  *
  * @param {(string|array)} elements - String with eventnames separated by spaces or array of eventnames
  * @returns {array} Array of eventnames
  */
  var getEventList = function (events) {
    if (typeof events === 'string') {
      return events.toLowerCase().split(' ');
    } else {
      return events;
    }
  };

  /**
  * Attach or remove transformicon events to one or more elements.
  * @private
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be toggled
  * @param {object} [events] - An Object containing one or more special event definitions
  * @param {boolean} [remove=false] - Defines wether the listeners should be added (default) or removed.
  */
  var setListeners = function (elements, events, remove) {
    var
      method = (remove ? 'remove' : 'add') + 'EventListener',
      elementList = getElementList(elements),
      currentElement = elementList.length,
      eventLists = {};

    // get events or use defaults
    for (var prop in DEFAULT_EVENTS) {
      eventLists[prop] = (events && events[prop]) ? getEventList(events[prop]) : DEFAULT_EVENTS[prop];
    }
    
    // add or remove all events for all occasions to all elements
    while(currentElement--) {
      for (var occasion in eventLists) {
        var currentEvent = eventLists[occasion].length;
        while(currentEvent--) {
          elementList[currentElement][method](eventLists[occasion][currentEvent], handleEvent);
        }
      }
    }
  };

  /**
  * Event handler for transform events.
  * @private
  *
  * @param {object} event - event object
  */
  var handleEvent = function (event) {
    tcon.toggle(event.currentTarget);
  };

  // ##############
  // public methods
  // ##############

  /**
  * Add transformicon behavior to one or more elements.
  * @public
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be toggled
  * @param {object} [events] - An Object containing one or more special event definitions
  * @param {(string|array)} [events.transform] - One or more events that trigger the transform. Can be an Array or string with events seperated by space.
  * @param {(string|array)} [events.revert] - One or more events that trigger the reversion. Can be an Array or string with events seperated by space.
  * @returns {transformicon} transformicon instance for chaining
  */
  tcon.add = function (elements, events) {
    setListeners(elements, events);
    return tcon;
  };

  /**
  * Remove transformicon behavior from one or more elements.
  * @public
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be toggled
  * @param {object} [events] - An Object containing one or more special event definitions
  * @param {(string|array)} [events.transform] - One or more events that trigger the transform. Can be an Array or string with events seperated by space.
  * @param {(string|array)} [events.revert] - One or more events that trigger the reversion. Can be an Array or string with events seperated by space.
  * @returns {transformicon} transformicon instance for chaining
  */
  tcon.remove = function (elements, events) {
    setListeners(elements, events, true);
    return tcon;
  };

  /**
  * Put one or more elements in the transformed state.
  * @public
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be transformed
  * @returns {transformicon} transformicon instance for chaining
  */
  tcon.transform = function (elements) {
    getElementList(elements).forEach(function(element) {
      element.classList.add(_transformClass);
    });
    return tcon;
  };

  /**
  * Revert one or more elements to the original state.
  * @public
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be reverted
  * @returns {transformicon} transformicon instance for chaining
  */
  tcon.revert = function (elements) {
    getElementList(elements).forEach(function(element) {
      element.classList.remove(_transformClass);
    });
    return tcon;
  };
  
  /**
  * Toggles one or more elements between transformed and original state.
  * @public
  *
  * @param {(string|element|array)} elements - Selector, DOM element or Array of DOM elements to be toggled
  * @returns {transformicon} transformicon instance for chaining
  */
  tcon.toggle = function (elements) {
    getElementList(elements).forEach(function(element) {
      tcon[element.classList.contains(_transformClass) ? 'revert' : 'transform'](element);
    });
    return tcon;
  };

  return tcon;
}));

//Window Load
jQuery(window).load(function($) {
    
    /*Init Portfolio*/
    var container = jQuery("#work-grid");
    if (container.length > 0) {
        container.isotope({
            layoutMode: 'masonry',
            transitionDuration: '0.7s',
            columnWidth: 60
        });
    };

    //Filter Portfolio
    jQuery('a.filter').on('click', function() {
        var to_filter = jQuery(this).attr('data-filter');
        if (to_filter == 'all') {
            container.isotope({
                filter: '.mix'
            });
        } else {
            container.isotope({
                filter: '.' + to_filter
            });
        }
    });

    //Switch Classes portfolio
    jQuery('.filter').on('click', function() {
        jQuery('a.filter').removeClass('active');
        jQuery(this).addClass('active');
    });
    
    window.transformicons.add('.tcon');
});