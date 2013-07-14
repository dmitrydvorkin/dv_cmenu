/*
---
description: Simple context menu with mootools API.

license: GPL

authors:
 - Dmitry Dvorkin

provides: [dv_cmenu]

requires:
 - core/1.4.5
 - more/1.4.0.1 Hash
...
*/

 var dv_cmenuT = new Class({
   // must be called ondomready
   initialize: function( _id) {
     this.is_over = false;
     this.items_callbacks = new Hash();
     this.obj_id = _id;
     e = $(_id);
     if ( !e) e = new Element( 'div', {id: _id});
     e.removeEvents();
     var scope_obj = this;
     e.addEvent( 'mouseover', function( _e) {  scope_obj.set_over( true);   });
     e.addEvent( 'mouseout',  function( _e) {  scope_obj.set_over( false);  });
//console.log( 'init');
   },

 // 
 set_over: function( _fl) {
   this.is_over = _fl;
   if ( _fl == false) this.hide();
 },

 // context menu over
 over: function( _e, _evt) {
//console.log( '-over');
   if ( !$(this.obj_id)) return;
   $(this.obj_id).setStyle( 'display', 'block');
 },

 // show context menu onclick
 show: function( _elid, _x, _y) {
   if ( !$(this.obj_id)) return;
   var e = $(this.obj_id);
   var d = e.getStyle( 'display');
   e.setStyle( 'display', 'none');
//console.log( '-show:'+d);
   if ( d != 'none') return;
   e.setStyle( 'left', _x + 'px');
   e.setStyle( 'top', _y + 'px');
   e.setStyle( 'zIndex',  1);
   e.setStyle( 'display', 'block');
 },

 // context menu hide
 hide: function() {
   var scope_obj = this;
   setTimeout( function() {
//console.log( '-hide0');
     if ( scope_obj.is_over) return;
//console.log( '-hide1');
     if ( !$(scope_obj.obj_id)) return;
     $(scope_obj.obj_id).empty();
     $(scope_obj.obj_id).setStyle( 'display', 'none');
   }, 300);
 },

 set_items: function( _elid, _items) {
   if ( !$(this.obj_id)) return;
   $(this.obj_id).empty();
   this.set_WxH( '', '');
   ul = new Element( 'ul', { 'class': 'cmenu' });
   $(this.obj_id).adopt( ul);
   this.items_callbacks.empty();
   var lis = [];
   var scope_obj = this;
   for ( var i = 0; i < _items.length; i++) {
     var e_t = new String( 'item_'+i).concat();
     var e_f = _items[i][1];
     this.items_callbacks.include( e_t, e_f);
     var li = new Element( 'li', {
       id: e_t,
       html: _items[i][0],
       events: {
         click: function( _e) {
           if ( _e) _e.stop();
           var e_f = scope_obj.items_callbacks.get( this.id);
           if ( !e_f) {  alert( 'Bug: CM handler not found.');  return;  }
           e_f( _elid);  },
         mouseover: function( _e) {
           if ( _e) _e.stop();
           scope_obj.set_over( true);  return( false);
         },
       },
     });
     lis.push( li);
   }
   ul.adopt( lis);
 },

 set_html: function( _html) {
   if ( !$(this.obj_id)) return;
   $(this.obj_id).empty();
   var scope_obj = this;
   div = new Element( 'div', {
     'class': 'tooltip',
     events: {
       click: function ( _e) {  $(scope_obj.obj_id).setStyle( 'display', 'none');  }
     }
   });
   $(this.obj_id).adopt( div);
   div.set( 'html', _html);
 },

 set_WxH: function( _w, _h) {
   if ( !$(this.obj_id)) return;
   $(this.obj_id).setStyle( 'width', _w);
   $(this.obj_id).setStyle( 'height', _h);
 },

 move_to_fit: function() {
   if ( !$(this.obj_id)) return;
   var e = $(this.obj_id);
   var e_pz = e.getPosition();
   var x_diff = ( Window.getSize().x - ( e.getPosition().x + e.getSize().x));
   var y_diff = ( Window.getSize().y - ( e.getPosition().y + e.getSize().y));
   if ( x_diff >= 0 && y_diff >= 0) return;
   if ( x_diff <= 0) e_pz.x += x_diff;
   if ( y_diff <= 0) e_pz.y += y_diff;
   e.setPosition( e_pz);
  },

});
