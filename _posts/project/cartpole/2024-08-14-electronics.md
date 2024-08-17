---
title: "[Cart Pole] Electronics"
excerpt:
categories:
  - cartpole
---
Cart Pole을 위해 구입한 전자 부품들의 용도와 사용법을 정리한다.

# Electronic Material List

|Electronics|Utility|Name|Specification|
|---|---|---|---|
|1|동력 원천|Unipolar Stepping Motor||
|2|Unipolar Stepping Motor Driver|Stepping모터구동모듈 3A(AM-CS2P)|3A|
|3|Pole 회전 각도 측정 센서|Absolute Rotary Encoder||
|4|End stop|아두이노 포토 인터럽터 속도 센서 모듈||
|5||Arduino UNO R4 WiFi||
|6|전원 공급|Power Supply|12V, 5A|
|7|연선||12AWG|
|8|실리콘 전선||18AWG|
|9|Breadboard|||
|10|만능기판|||
|11|스트리퍼|||
|12|모터 드라이버 케이블|||
|13|점프와이어 수수선|||
|14|점프와이어 암수선|||
|15|점프와이어 암암선|||
|16|Molex|||
|17|용클램프|||
|18|6핀 케이블|||

# Arduino UNO

- 모터 제어
- 엔코더 통신
- 포토 센서 통신

# Motor Driver

모터를 제어해주는 모듈이나 회로

아두이노나 MCU의 경우 사용 가능한 전류는 최대 30-40mA밖에 안 된다.

수 A 이상의 모터를 동작시키고 싶다면 직접 연결하면 안 되고 중간에 전압과 전류를 증폭해줄 모듈이 필요하다.

또한 정회전, 역회전, 속도 제어까지 할 수 있는 모듈

모터의 종류와 동작에 따라 드라이버가 달라진다.

모터 드라이버 : 외부에서 공급받은 전원의 흐름을 조절한다.

아두이노에 있는 디지털 핀이나 아날로그 핀에서 나오는 전류는 매우 작기 때문에 모터를 구동할 수 없다. 간혹 모터가 타는 경우도 발생한다.

## Specification

- 라인트레이서용 스테핑 모터 구동 보드
- 스테핑 모터 2개 구동 각 3A
- 소프트웨어적으로 A, /A, B, /B 신호를 인가하여 제어 (1상, 2상, 1-2상 제어 방식으로 제어할 수 있다.)
- 10Pin Cable과 12V 전원 공급 커넥터 연결
- 가변저항을 이용하여 모터에 흐르는 전류량을 조절할 수 있다.
- 외관 크기 : 63.3 x 50.6 mm
