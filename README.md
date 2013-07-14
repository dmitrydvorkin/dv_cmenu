Dv Cmenu
===========

Simple context menu mootools implementation.

[Demo](http://dv.tibbo.com/dv_cmenu/)

![Screenshot](http://dv.tibbo.com/dv_cmenu/dv_cmenu.png)

How to use
----------
In head:

	<link rel="stylesheet" type="text/css" href="dv_cmenu/dv_cmenu.css">
	<script type="text/javascript" language="javascript" src="dv_cmenu/dv_cmenu.js"></script>

In body:

	<script type="text/javascript">
	function show_cmenu( _void, _evt, _someid) {
	 var items = [];
	 items.push([ 'Create', function( _f){
	   alert( 'Do create');
	 }]);
	 items.push([ 'Edit', function( _f){
	   alert( 'Do edit');
	 }]);
	 items.push([ 'Delete', function( _f){
	   var r = confirm( 'Are you sure to delete ' + _someid + ' record?');
	   if ( !r) return;
	   alert( 'Do delete');
	 }]);
	 dv_cmenu.set_items( _void, items);
	 dv_cmenu.show( _void, _evt.page.x - 10, _evt.page.y - 10);
	}

	window.addEvent('domready', function(){
	 dv_cmenu = new dv_cmenuT( 'divCM');
	 $('elem').addEvent( 'click', function( _e){
	     if ( _e) _e.stop();
	     show_cmenu( 'void', _e, 'someid');
	   });
	 $('elem').addEvent( 'contextmenu', function( _e){
	     if ( _e) _e.stop();
	     show_cmenu( 'void', _e, 'someid');
	 });
	});
	</script>

	<div id='divCM'></div>

	<a href='' id='elem'>Click left or right mouse here</a>

