---
title: "Face Identification"
layout: archive
permalink: /faceidentification
sidebar:
    nav: "sidebar-category"
---

{% assign posts = site.categories.faceidentification %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
