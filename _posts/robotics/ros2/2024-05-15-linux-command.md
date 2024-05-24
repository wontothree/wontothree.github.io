---
title: "Linux Command"
excerpt:
categories: 
  - ros2
---
```bash
source [환경 설정 파일명]
```

- 스크립트 파일을 수정한 후에 재부팅하지 않고 수정된 내용을 바로 적용하기 위해 사용한다.

## bashrc

root 경로에서 bashrc 파일을 연다.

```bash
code .bashrc
```

- bashrc는 user 기반이기 때문에 루트에서만 실행되며, 그 루트에 속한 모든 환경에 영향을 미친다.
- 만약 bashrc 파일에 source 명령어를 추가한다면, 자동으로 실행된다.
- bashrc는 첫 번째로 실행되는 shell 파일이다.

## shell script

- Unix 커맨드 등을 나열해서 실행하는 것
- 언제 어떤 조건으로 어떤 명령을 실행할지, 파일을 컨텐츠로 읽어들일 것인지, 로그 파일을 어떻게 작성할 것인지 등을 설정할 수 있다.
- .sh 확장자를 사용한다.

https://engineer-mole.tistory.com/200