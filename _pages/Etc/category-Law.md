---
title: "Law"
layout: archive
permalink: /law
---

{% assign posts = site.categories.LOGIC %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}