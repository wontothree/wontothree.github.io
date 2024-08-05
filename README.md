# wontothree.github.io

[Technical Blog](https://wontothree.github.io/)

## Folder Tree

    |- _data
      |- navigation.yml : navigation bar and side bar
      |- ui-text.yml :
    |- _include : html file들이 들어있다.
    |- _layout : page마다 design과 직접적으로 연관된 html file들이 들어있다. _include에 있는 html file들을 불러오는 경우가 많다.
    |- _pages : main page에서 navigation bar category를 타고 들어갔을 때 나오는 페이지
    |- _posts : articles
    |- _sass : minimal-mistakes.scss에 import 할 수 있는 scss 파일들을 모아 둔 폴더이다. minimal-mistakes.scss는 최종적으로 📁_assets/css/main.scss에 import 된다. 블로그와 컴포넌트들을 시각적으로 디자인하는 스타일시트 파일들이다. css와 유사하다.
      |- minimal-mistakes
        |- skins
        |- vendor
        |- _animations.scss
        |- _archive.scss
        |- _base.scss
        |- _buttons.scss
        |- _footer.scss
        |- _forms.scss
        |- _masthead.scss
        |- _mixins.scss
        |- _navigation.scss
        |- _notices.scss
        |- _pages.scss
        |- _print.scss
        |- _reset.scss
        |- _search.scss
        |- _sidebar.scss
        |- _syntax.scss
        |- _tables.scss
        |- _utilities.scss
        |- _variables.scss
      |- minimal-mistakes.scss
    |- assets
    |- img : pictures in articles
    |- _config.yml : 전체적인 설정
    |- .travis.yml
    |- banner.js
    |- Gemfile
    |- index.html : 블로그 첫 페이지
    |- minimal-mistakes-jekyll.gemspec
    |- package-lock.json
    |- package.json
    |- Rakefile
    |- staticman.yml

## 이해

```md
---
title: "[Electronic Circuit] Diodes"
excerpt: "Sedra - Microelectronic Circuits : Ch03"
categories:
  - electroniccircuit
toc: true
toc_icon: star
share: false
use_math: true
---
```

index.html

```html
---
layout: home
author_profile: true
sidebar:
    nav: "sidebar-category"
---
```

_layouts/home.html

```html
---
layout: archive
---

{{ content }}

<h3 class="archive__subtitle">{{ site.data.ui-text[site.locale].recent_posts | default: "Recent Posts" }}</h3>

{% if paginator %}
  {% assign posts = paginator.posts %}
{% else %}
  {% assign posts = site.posts %}
{% endif %}

{% assign entries_layout = page.entries_layout | default: 'list' %}
<div class="entries-{{ entries_layout }}">
  {% for post in posts %}
    {% include archive-single.html type=entries_layout %}
  {% endfor %}
</div>

{% include paginator.html %}
```

---------

_pages/category-etc.md

```md
---
title: "ETC"
layout: archive
permalink: /etc
---

{% assign posts = site.categories.etc %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
```

_layouts/archive

```html
---
layout: default
---

{% if page.header.overlay_color or page.header.overlay_image or page.header.image %}
  {% include page__hero.html %}
{% elsif page.header.video.id and page.header.video.provider %}
  {% include page__hero_video.html %}
{% endif %}

{% if page.url != "/" and site.breadcrumbs %}
  {% unless paginator %}
    {% include breadcrumbs.html %}
  {% endunless %}
{% endif %}

<div id="main" role="main">
  {% include sidebar.html %}

  <div class="archive">
    {% unless page.header.overlay_color or page.header.overlay_image %}
      <h1 id="page-title" class="page__title">{{ page.title }}</h1>
    {% endunless %}
    {{ content }}
  </div>
</div>
```

_layouts/default

```md
---
author: Anthony
---

<!doctype html>

<html lang="{{ site.locale | slice: 0,2 | default: "en" }}" class="no-js">
  <head>
    {% include head.html %}
    {% include head/custom.html %}

    {% if page.use_math %}
      {% include mathjax_support.html %}
    {% endif %}
  </head>

  <body class="layout--{{ page.layout | default: layout.layout }}{% if page.classes or layout.classes %}{{ page.classes | default: layout.classes | join: ' ' | prepend: ' ' }}{% endif %}">
    {% include_cached skip-links.html %}
    {% include_cached masthead.html %}

    <div class="initial-content">
      {{ content }}
    </div>

    {% if site.search == true %}
      <div class="search-content">
        {% include_cached search/search_form.html %}
      </div>
    {% endif %}

    <div id="footer" class="page__footer">
      <footer>
        {% include footer/custom.html %}
        {% include_cached footer.html %}
      </footer>
    </div>

    {% include scripts.html %}

  </body>
</html>
```

## To do

- main page 그래프 지식 구조 시각화 개발하기
- 각 게시물에서 카테고리 눌렀을 때 category page로 이동하도록 설정하기

노가다성

- optimization category에서 latex 문법 오류 고치기

### Complete

- 각 게시물에서 스크롤하면 contents nav bar가 따라가도록
- category 안에서도 sidebar가 뜨도록 하기
- 각 게시물의 제목에서 ch or 번호 지우기
- contents nav bar 제목 수정
- file name은 다 소문자로 통일
- _pages에서 카테고리 설정 더 편리하게 할 수 있도록 하기

## 참고할만한 블로그

https://mmistakes.github.io/minimal-mistakes/docs/configuration/

https://jekyllrb.com/docs/themes/

https://ansohxxn.github.io/blog/jekyll-directory-structure/

https://unknownpgr.com/

https://www.blossominkyung.com/
