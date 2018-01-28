---
layout: post
title: "createEvent"
date: 2018-1-20
description: "Document.createEvent()"
tag: js-DOM
comments: true
---

### Syntax
`var event = document.createEvent(type);`

`event` is the created Event object.

`type` is a string that represents the type of event to be created. Possible event types include "UIEvents", "MouseEvents", "MutationEvents", and "HTMLEvents". See Notes section for details.

### example

    //create the event
    var event = document.createEvent('Event');
    //define that the event name
    event.initEvent('build',true,true);
    //listen for the event
    elem.addEventListener('build',function() {},false);
    //target can be any element or other EventTarget
    elem.dispatchEvent(event);

### Notes

Event type strings suitable for passing to createEvent() are listed in the [DOM standard — see the table in step 2](https://dom.spec.whatwg.org/#dom-document-createevent). Bear in mind that most event objects now have constructors, which are the modern recommended way to create event object instances.
