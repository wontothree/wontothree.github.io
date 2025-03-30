---
title: "Marketing"
layout: archive
permalink: /marketing
sidebar:
    nav: "sidebar-category"
---

{% assign posts = site.categories.marketing%}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
