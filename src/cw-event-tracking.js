/*
 * cw_event_tracking
 * https://github.com/clivewalkden/cwHideReveal
 *
 * Copyright (c) 2013 Clive Walkden
 * Licensed under the MIT license.
 */

(function ($) {
	$.fn.CWEventTracking = function (custom) {

		// Default plugin settings
		var defaults = {
			filetypes	: /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i,
			mailtypes	: /^(mailto|gospam)\:/i,
			teltypes	: /^tel\:/i,
			baseHref	: '',
			debug		: false,
			active		: false,
			version		: 'ga',
			isActive	: function(){},
			isInactive	: function(){},
			isClicked	: function(){},
		};

		// Merge default and user settings
		var settings = $.extend({}, defaults, custom);

		var methods = {
			analyticsCheck: function() {
				methods.debug('Check Analytics is loaded.');

				if (typeof  ga != 'undefined') {
					methods.debug('Universal Analytics is running');
					settings.active = true;
					settings.version = 'ga';
					settings.isActive.call($(this));
				}
				else if (typeof  _gaq != 'undefined') {
					methods.debug('Analytics is running');
					settings.active = true;
					settings.version = '_gaq';
					settings.isActive.call($(this));
				}
				else {
					methods.debug('Analytics is not running');
					settings.isInactive.call($(this));
				}
			},
			handleExternal: function(href) {
				var extLink = href.replace(/^https?\:\/\//i, '');
				methods.track('External','Click',extLink);
				if ($(this).attr('target') !== undefined && $(this).attr('target').toLowerCase() !== '_blank') {
					setTimeout(function() { location.href = href; }, 200);
					return false;
				}
			},
			handleMail: function(href) {
				var mailLink = href.replace(settings.mailtypes, '');
				// Added support for Processwire Email Obfuscator
				if(href.match(/^gospam\:/i)) {
					mailLink = mailLink.split("").reverse().join("");
				}
				methods.track('Email','Click',mailLink);
			},
			handleTelephone: function(href) {
				var telLink = href.replace(settings.teltypes, '');
				methods.track('Telephone','Click',telLink);
			},
			handleFile: function(href) {
				var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
				var filePath = href;
				methods.track('Download','Click-' + extension,filePath);
				if ($(this).attr('target') !== undefined && $(this).attr('target').toLowerCase() !== '_blank') {
					setTimeout(function() { location.href = settings.baseHref + href; }, 200);
					return false;
				}
			},
			track : function(text, event, link) {
				if (settings.version === 'ga') {
					ga('send', 'event', text, event, link);
				}else{
					_gaq.push(['_trackEvent', text, event, link]);
				}
			},
			debug: function(message) {
				if (settings.debug && typeof console !== 'undefined' && typeof console.debug !== 'undefined') {
					console.debug(message);
				}
			}
		};

		methods.analyticsCheck();

		return this.each(function(){
			if (!settings.active){
				return false;
			}

			var href = $(this).attr('href');

			if (href && (href.match(/^https?\:/i)) && (!href.match(document.domain))) {
				$(this).on('click',function() {
					settings.isClicked.call($(this));
					methods.debug('External Link clicked.');
					methods.handleExternal(href);
				});
			}
			else if (href && href.match(settings.mailtypes)) {
				$(this).on('click',function() {
					settings.isClicked.call($(this));
					methods.debug('Email Link clicked.');
					methods.handleMail(href);
				});
			}
			else if (href && href.match(settings.teltypes)) {
				$(this).attr('href',href.replace(' ',''));
				$(this).on('click',function() {
					settings.isClicked.call($(this));
					methods.debug('Telephone Link clicked.');
					methods.handleTelephone(href);
				});
			}
			else if (href && href.match(settings.filetypes)) {
				$(this).on('click',function() {
					settings.isClicked.call($(this));
					methods.debug('File Link clicked.');
					methods.handleFile(href);
				});
			}
		});
	};
})(jQuery);