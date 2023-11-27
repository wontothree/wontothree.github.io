---
title: "blog"
layout: archive
permalink: /blog
---

{% include archive-single.html type=page.entries_layout %}
{% assign posts = site.categories.blog %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}