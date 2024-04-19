---
title: "Data Structure"
layout: archive
permalink: /datastructure
sidebar:
    nav: "sidebar-category"
---

{% assign posts = site.categories.datastructure %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
