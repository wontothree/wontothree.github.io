---
title: "Cart Pole Desgin and Control - MPC vs RL"
layout: archive
permalink: /cartpole
sidebar:
    nav: "sidebar-category"
---

{% assign posts = site.categories.cartpole %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
