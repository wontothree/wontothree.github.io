---
title: "Java"
layout: archive
permalink: /java
sidebar:
    nav: "sidebar-category"
---

{% assign posts = site.categories.java %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
