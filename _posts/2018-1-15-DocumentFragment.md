---
layout: post
title: "DocumentFragment"
date: 2018-1-15
description: "DocumentFragment"
tag: web-component
comments: true
---
DocumentFragment 接口表示一个没有父级文件的最小文档对象。它被当做一个轻量版的 Document 使用，用于存储已排好版的或尚未打理好格式的XML片段。最大的区别是因为DocumentFragment不是真实DOM树的一部分，它的变化不会引起DOM树的重新渲染的操作(reflow) ，且不会导致性能等问题。

最常用的方法是使用文档片段（DocumentFragment）作为参数（例如，任何 Node 接口类似 Node.appendChild 和 Node.insertBefore) 的方法），这种情况下被添加(append)或被插入(inserted)的是片段的所有子节点, 而非片段本身。因为所有的节点会被一次插入到文档中，而这个操作仅发生一个重渲染的操作，而不是每个节点分别被插入到文档中，因为后者会发生多次重渲染的操作。

该接口在Web组件中也非常有用: 模板 元素在其 HTMLTemplateElement.content 属性中包含了一个 DocumentFragment 。

可以使用document.createDocumentFragment 方法或者构造函数来创建一个空的 DocumentFragment.

例子

此示例创建主要Web浏览器的列表。

HTML

	<ul data-uid="ul">
	</ul>

JavaScript

	// assuming it exists (ul element)
	let ul = document.querySelector(`[data-uid="ul"]`),
	    docfrag = document.createDocumentFragment();

	const browserList = [
	    "Internet Explorer", 
	    "Mozilla Firefox", 
	    "Safari", 
	    "Chrome", 
	    "Opera"
	];

	browserList.forEach((e) => {
	    let li = document.createElement("li");
	    li.textContent = e;
	    docfrag.appendChild(li);
	});

	ul.appendChild(docfrag);

描述

DocumentFragments 是DOM节点。它们不是主DOM树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到DOM树。在DOM树中，文档片段被其所有的子元素所代替。

因为文档片段存在于内存中，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面回流(reflow)(对元素位置和几何上的计算)。因此，使用文档片段document fragments 通常会起到优化性能的作用(better performance)。

documentFragment 被所有主流浏览器支持。所以，没有理由不用。

