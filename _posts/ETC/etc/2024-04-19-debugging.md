---
title: "[Etc] Web Debugging"
excerpt:
categories: 
  - etc
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

각 category page에 다음 코드를 추가한다.

```md
sidebar:
    nav: "sidebar-category"
```

## 2. 모든 파일 이름을 영소문자로 통일하기

```2023-11-01-[Date Structure] 자료구조와 알고리즘.md```

파일 이름을 위와 같이 설정하면 페이지의 링크가 다음과 같이 생성된다.

```https://wontothree.github.io/datastructure/Date-Structure-자료구조와-알고리즘/```

## 3. posting에서 속성 단순화

```md
---
title: "[ROS2] Robotics"
excerpt: 
categories: 
---
```

_config.yml 파일에서 다음 부분을 수정하였다.

```yml
# Defaults for posting
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      author_profile: true
      read_time: true
      related: true
      toc: true
      toc_sticky: true
      toc_icon: star
      toc_label: "Contents"
      share: false
      use_math: true
      comments: # true
      sidebar:
        nav: "sidebar-category"
  # _pages
  - scope:
      path: "_pages"
      type: pages
    values:
      layout: single
      author_profile: true 
```
