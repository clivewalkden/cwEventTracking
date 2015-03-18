/*!
* cw-event-tracking - for jQuery 1.7+
* https://github.com/clivewalkden/cw-event-tracking
*
* Copyright 2015, Clive Walkden (http://clivewalkden.co.uk)
*
* @package CW Event Tracking
* @author Clive Walkden (https://github.com/clivewalkden)
* @version 0.1.2
* @copyright Copyright (c) 2015 Clive Walkden (https://github.com/clivewalkden)
* @date: 2015-03-18
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
			isActive	: function(){},
			isInactive	: function(){},
			isClicked	: function(){},
		};

		// Merge default and user settings
		var settings = $.extend({}, defaults, custom);

		var methods = {
			analyticsCheck: function() {
				methods.debug('Check Analytics is loaded.');

				if (typeof _gaq === 'undefined') {
					methods.debug('Analytics is not running');
					settings.isInactive.call($(this));
				}else{
					settings.isActive.call($(this));
					settings.active = true;
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
				_gaq.push(['_trackEvent', text, event, link]);
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