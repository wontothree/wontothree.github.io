---
title: "LaTex"
layout: archive
permalink: /latex
---

{% assign posts = site.categories.latex %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
