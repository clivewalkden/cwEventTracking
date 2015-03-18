# CW Event Tracking

A jQuery plugin to automatically add Google Analytics tracking to certain links

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/clivewalkden/jquery-cw-event-tracking/master/dist/jquery.cw-event-tracking.min.js
[max]: https://raw.github.com/clivewalkden/jquery-cw-event-tracking/master/dist/jquery.cw-event-tracking.js

In your web page:

```html
<script src="/path/to/jquery.js"></script>
<script>
var _gaq=[['_setAccount','Your Tracking Code Here'],['_trackPageview']];
(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
s.parentNode.insertBefore(g,s)}(document,'script'));
</script>
<script src="dist/jquery.cw-event-tracking.min.js"></script>
<script>
jQuery(function($) {
	$('a').CWEventTracking();
});
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
#### 0.1.0
 * Initial release
