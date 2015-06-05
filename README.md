# CW Event Tracking

[![Join the chat at https://gitter.im/clivewalkden/cwEventTracking](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/clivewalkden/cwEventTracking?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A jQuery plugin to automatically add Google Analytics tracking to certain links

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/clivewalkden/jquery-cw-event-tracking/master/dist/jquery.cw-event-tracking.min.js
[max]: https://raw.github.com/clivewalkden/jquery-cw-event-tracking/master/dist/jquery.cw-event-tracking.js

In your web page:

```html
<script src="/path/to/jquery.js"></script>
<script>
var _gaq=[['_setAccount','UA-Your Tracking Code Here'],['_trackPageview']];
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

Or if you are running Universal Analytics:

```html
<script src="/path/to/jquery.js"></script>
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-Your Tracking Code Here', 'auto');
ga('send', 'pageview');

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
#### 0.2.0
 * Added support for Universal analytics (with thanks to Jon Catmull)

#### 0.1.2
 * Updated bower config again to remove lib folder

#### 0.1.1
 * Updated bower config

#### 0.1.0
 * Initial release
