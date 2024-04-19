---
title: "[Etc] Web Debugging"
excerpt:
categories: 
  - etc
share: false
---
## 1. 각 categroy page에서도 side navigation bar 보이도록 설정

Sol 1.

_pages/category-etc.md

```md
---
title: "Etc"
layout: archive
permalink: /etc
sidebar:
    nav: "sidebar-category"
---

{% assign posts = site.categories.etc %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
```
