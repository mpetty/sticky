/*!
 *	Sticky elements
 *
 *	@author		Mitchell Petty <https://github.com/mpetty/sticky>
 *	@version	v1.0.0
 */
(function($) {
"use strict";

	var Sticky = {

		init : function(el) {

			var self = this;

			if(!window.requestAnimationFrame) return false;

			this.el = this.getStickyEl(el);
			this.window = $(window);
			this.scrollingTimer = false;
			this.scrolling = false;
			this.lastKnownScrollTop = null;
			this.scrollTimeout = null;

			this.window.on('load resize scroll', function() {
				self.lastKnownScrollTop = self.window.scrollTop();

				if(!self.scrolling) {
					self.scrolling = true;
					self.doSticky();
				}

				clearTimeout(self.scrollingTimer);
				self.scrollingTimer = setTimeout($.proxy(self.onScrollEnd, self), 1000);
			});

		},

		onScrollEnd : function() {

			this.scrolling = false;

		},

		getStickyEl : function(el) {

			var stickEL = [];

			for (var i = 0; i < el.length; i++) {
				$(el[i]).addClass('active');

				stickEL.push({
					el : $(el[i]),
					links : $('a', $(el[i])),
					parent : $(el[i]).parent(),
					height : $(el[i]).outerHeight(),
					pHeight : $(el[i]).parent().outerHeight(),
					offset : $(el[i]).parent().offset().top
				});
			}

			return stickEL;

		},

		doSticky : function() {

			if(this.window.width() > 768) {
				$.each(this.el, $.proxy(this.stick, this));
				if(this.scrolling) window.requestAnimationFrame($.proxy(this.doSticky, this));
			}

		},

		stick : function(index, stickyObj) {

			if(stickyObj.el.is(':visible')) {

				var scroll = this.lastKnownScrollTop;

				// Sticky sticks to bottom
				if(stickyObj.el.data('sticky') === 'bottom') {
					scroll = scroll + (this.window.height() - stickyObj.el.height());

					if(scroll < stickyObj.offset || this.window.scrollTop() === 0) {
						stickyObj.el.addClass('hidden');
					} else {
						stickyObj.el.removeClass('hidden');
					}
				}

				// Stick element
				if(scroll > stickyObj.offset) {
					if(scroll >= (stickyObj.offset + (stickyObj.el.parent().height() - stickyObj.height))) {
						stickyObj.el.removeClass('fixed');
						stickyObj.el.css({'top':'auto', 'bottom': '0'});
					} else {
						stickyObj.el.removeAttr('style').addClass('fixed');
					}
				} else {
					stickyObj.el.removeAttr('style').removeClass('fixed');
				}

				// Highlight links within sticky
				if(stickyObj.links.length) {
					for (var ii = 0; ii < stickyObj.links.length; ii++) {
						if($(stickyObj.links[ii].getAttribute('href')).length) {
							if( (($(stickyObj.links[ii].getAttribute('href')).offset().top - scroll) / this.window.height()) * 100 <= 34) {
								$(stickyObj.links).parent().removeClass('active');
								$(stickyObj.links[ii]).parent().addClass('active');
							} else {
								$(stickyObj.links[ii]).parent().removeClass('active');
							}
						}
					}
				}

			}

		}

	};

	/**
	 *	Initialize Plugin
	 */
	$.fn.sticky = function(options) {
		var settings = $.extend(true, {}, $.fn.sticky.defaults, options);
		Sticky.init(this);
		return this;
	};

	/**
	 *	Plugin Defaults
	 */
	$.fn.sticky.defaults = {
	};

})(jQuery);