# wontothree.github.io

[Blog](https://wontothree.github.io/)

## Folder Tree

```md
    |- _data
      |- navigation.yml : navigation bar and side bar
      |- ui-text.yml :
    |- _include : html file들이 들어있다.
    |- _layout : page마다 design과 직접적으로 연관된 html file들이 들어있다. _include에 있는 html file들을 불러오는 경우가 많다.
      |- archive-taxonomy.html : 특정 분류(카테코리, 태그 등)의 아카이브 페이지를 위한 템플릿
      |- archive.html : 포스트나 컨텐츠의 아카이브 페이지를 위한 기본 템플릿
      |- categories.html : 카테고리 페이지 템플릿
      |- category.html : 특정 카테고리의 세부 페이지 템플릿
      |- collection.html : 컬렉션 페이지를 위한 템플릿
      |- compress.html : 특정 용도로 사용될 수 있는 템플릿, 예를 들어 페이지 압축을 위한 템플릿일 수 있음
      |- default.html : 기본 페이지 템플릿으로 다른 페이지 템플릿이 없는 경우 기본으로 사용될 수 있음
      |- home.html : 홈페이지 템플릿
      |- posts.html : 포스트 목록 페이지를 위한 템플릿
      |- search.html : 검색 결과 페이지 템플릿
      |- single.html : 단일 포스트나 페이지의 템플릿
      |- splash.html : 초기 화면 또는 스플래시 화면을 위한 템플릿
      |- tag.html : 특정 태그의 세부 페이지 템플릿
      |- tags.html : 태그 목록 페이지 템플릿
    |- _pages : main page에서 navigation bar category를 타고 들어갔을 때 나오는 페이지
    |- _posts : articles
    |- _sass : minimal-mistakes.scss에 import 할 수 있는 scss 파일들을 모아 둔 폴더이다. minimal-mistakes.scss는 최종적으로 _assets/css/main.scss에 import 된다. 블로그와 컴포넌트들을 시각적으로 디자인하는 스타일시트 파일들이다. css와 유사하다.
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
      |- minimal-mistakes.scss : minimal-mistakes 폴더에 있는 scss 파일들을 import한다.
    |- assets
      |- css
        |- main.scss
      |- js
        |- lunr
        |- plugins
        |- vendor
        |- _main.js
        |- main.min.js
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
```

_includes와 _layouts에는 html과 관련된 파일들이 있고, _sass와 _assets에는 css와 관련된 파일들 있다.

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
- scrollable latex 자동화하기
- 사진 크기 줄이기

노가다성

- optimization category에서 latex 문법 오류 고치기

### Complete

- 각 게시물에서 스크롤하면 contents nav bar가 따라가도록
- category 안에서도 sidebar가 뜨도록 하기
- 각 게시물의 제목에서 ch or 번호 지우기
- contents nav bar 제목 수정
- file name은 다 소문자로 통일
- _pages에서 카테고리 설정 더 편리하게 할 수 있도록 하기
- latex에 대해 scrollable 기능 만들기

## 참고할만한 블로그

https://mmistakes.github.io/minimal-mistakes/docs/configuration/

https://jekyllrb.com/docs/themes/

https://ansohxxn.github.io/blog/jekyll-directory-structure/

https://unknownpgr.com/

https://www.blossominkyung.com/

https://mmistakes.github.io/minimal-mistakes/docs/stylesheets/

```
minimal-mistakes
├── _sass
|  └── minimal-mistakes
|     ├── vendor               # vendor SCSS partials
|     |   ├── breakpoint       # media query mixins
|     |   ├── magnific-popup   # Magnific Popup lightbox
|     |   └── susy             # Susy grid system
|     ├── _animations.scss     # animations
|     ├── _archive.scss        # archives (list, grid, feature views)
|     ├── _base.scss           # base HTML elements
|     ├── _buttons.scss        # buttons
|     ├── _footer.scss         # footer
|     ├── _masthead.scss       # masthead
|     ├── _mixins.scss         # mixins (em function, clearfix)
|     ├── _navigation.scss     # nav links (breadcrumb, priority+, toc, pagination, etc.)
|     ├── _notices.scss        # notices
|     ├── _page.scss           # pages
|     ├── _print.scss          # print styles
|     ├── _reset.scss          # reset
|     ├── _sidebar.scss        # sidebar
|     ├── _syntax.scss         # syntax highlighting
|     ├── _tables.scss         # tables
|     ├── _utilities.scss      # utility classes (text/image alignment)
|     └── _variables.scss      # theme defaults (fonts, colors, etc.)
├── assets
|  ├── css
|  |  └── main.scss            # main stylesheet, loads SCSS partials in _sass
```
