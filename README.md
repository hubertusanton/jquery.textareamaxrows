jquery.textareamaxrows
======================

Description
--------------
Jquery plugin to limit rows of a textarea, with wordwrap also counting as rows.

Maintainer Contacts
-------------------
[Dertig Media](http://www.30.nl)
*  Bart van Irsel (<bart@30.nl>)

Requirements
------------
* Jquery 1.7.2

Documentation
-------------
examples of usage:
$('#idoftextarea').textareamaxrows();
$('#idoftextarea').textareamaxrows({alert:true});
$('#idoftextarea').textareamaxrows({alert:true, alertmessage : 'hey too long!', maxrows : 4, maxcharsinrow : 12});

Plugin now stops accepting new chars when limits are reached. Pasting in a textarea can mess this up,
solution for this can be placing onpaste="return false" in the html of the textarea, in the next version we will try
to place this as an option in the plugin.

