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

## Reference

https://mmistakes.github.io/minimal-mistakes/docs/configuration/

https://jekyllrb.com/docs/themes/

https://ansohxxn.github.io/blog/jekyll-directory-structure/

## To do

- main page 그래프 지식 구조 시각화 개발하기
- 현 위치에 따라 sidebar 반응 개발하기
    ref : https://enidanny.github.io/book%20review/essay-S000000937818/
- 각 categroy page에서도 side navigation bar 보이도록 설정
- 각 게시물의 제목에서 ch or 번호 지우기
- 각 게시물에서 카테고리 눌렀을 때 category page로 이동하도록 설정하기
- 각 게시물에서 스크롤하면 contents nav bar가 따라가도록
- contents nav bar 제목 수정
- _pages에서 카테고리 설정 더 편리하게 할 수 있도록 하기
- category 안에서도 sidebar가 뜨도록 하기
- category를 눌렀을 때 category page가 나오도록 하기

## 참고할만한 블로그

https://unknownpgr.com/