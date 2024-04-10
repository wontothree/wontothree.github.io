---
title: "Video"
layout: archive
permalink: /video
---

{% assign posts = site.categories.video %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
