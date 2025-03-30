---
title: "[Java] Multi-threading"
excerpt: "천인국 - Power Java : Ch16"
categories:
  - java
---
## 1 Multitasking

### 멀티 태스킹이란?

- Multi-tasking : 여러 개의 작업을 동시에 실행하는 기법
- 단일 코어 CPU에서도 멀티태스킹이 가능하다. 운영체계가 CPU의 시간을 쪼개서 작업들에 기산을 할당하기 때문에 작업들이 동시에 수행되는 것처럼 보인다.
- Muli-threading : 하나의 애플리케이션 안에서 여러 가지 작업(Thread : 실행 흐름(실))을 동시에 하는 기법.

### 프로세스와 스레드

- 컴퓨터의 기본적인 실행 단위 2가지 : process, thread

|Process|Thread|
|---|---|
|자신만의 데이터를 갖는다.|스레드들은 모두 동일한 데이터를 공유한다.|

### Multi-threading을 사용하는 이유

- 빠른 실행
- 최근의 CPU는 속도가 매우 빠르며 여러 개의 코어가 포함되어 있기 때문에 하나의 스레드로는 모든 코어를 이용할 수 없다.
- 멀티스레딩을 사용하면 여러 코어를 최대한 활용할 수 있다.
- 마우스와 키보드에서 입력을 받고 네트워크에 무언가 업로드하는 동시에 화면도 그려야 하는 게임에서도 사용된다.

### 멀티스레딩의 문제점

- 동기화 문제 : 여러 스레드들이 같은 데이터를 공유하게 되면서 발생한다.

## 2. Threading 생성과 실행

- 자바에서 스레드를 생성하여 작업을 실행하는 2가지 방법
- Thread Class 상속
- Runnable Interface 구현

### Thread Class

- Thread Class : Thread를 나타내는 클래스

|Method of Thread Class|Description|
|---|---|
|Thread()|매개 변수가 없는 기본 생성자|
|Thread(String name)|이름이 name인 Thread 객체를 생성한다.|
|static int activeCount()|현재 활동 중인 스레드의 개수를 반환한다.|
|String getName()|스레드의 이름을 반환한다.|
|int getPriority()|스레드의 우선순위를 반환한다.|
|void|interrupt()|현재의 스레드를 중단한다.|
|boolean isInterrupted()|현재의 스레드가 중단될 수 있는지를 검사한다.|
|void setPriority(int priority)|스레드의 우선순위를 지정한다.|
|void setName(String name)|스레드의 이름을 지정한다.|
|static void sleep(int milliseconds)|현재의 스레드를 지정된 시간만큼 재운다.|
|void run()|스레드가 해야 하는 작업을 이 메소드 안에 위치시킨다. 스레드가 시작될 때 호출된다.|
|void start()|스레드를 시작한다.|
|static void yield()|현재 스레드를 다른 스레드에 양보하게 만든다.|

#### Thread Class를 상속하여 스레드 생성하기

- 첫 번째 방법은 Thread Class를 상속받아 자식 클래스를 만들고 run() 메소드를 재정의하는 방법이다.
- run() 메소드에는 스레드가 수행하여야 할 작업 내용이 들어간다.
- 자식 클래스의 인스턴스를 생성하고 start() 메소드를 호출하면 스레드가 실행된다.

```java
class MyThread extends Thread {
    public void run() {
        for (int i = 0; i <= 10; i++) {
            System.out.print(i + " ");
        }
    }
}

public class MyThreadTest {
    public static void main(String [] args) {
        Thread t = new MyThread();
        t.start();
    }
}
// 0 1 2 3 4 5 6 7 8 9 10
```

예제 16-1

```java
class MyThread implements Runnable {
    String myName;
    public MyThread(String myName) {
        this.myName = myName;
    }

    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.print(myName + i + " ");
        }
    }
}

public class TestThread {
    public static void main(String [] args) {
        Thread t1 = new Thread(new MyThread("A"));
        Thread t2 = new Thread(new MyThread("B"));

        t1.start();
        t2.start();
    }
}
// B0 B1 A0 A1 A2 A3 A4 A5 B2 B3 B4 B5 B6 B7 B8 A6 A7 A8 A9 B9
```

## 3. Thread Scheduling

### 스레드 상태

- Thread는 5가지 상태 중 하나다.
- 자바에서 Thread의 상태는 자바 가상 머신에 의해 제어된다.

|Thread 상태|Description|
|---|---|
|New|Thread Class의 인스턴스는 생성되었지만 start() 메소드를 호출하기 전 스레드 상태|
|Runnable|start() 메소드가 호출되기 전 스레드 상태. 아직 스레드 스케줄러가 선택하지 않았으므로 실행 상태는 아니다.|
|Running|스레드 스케줄러가 스레드를 선택할 때 스레드의 상태|
|Blocking|스레드가 살아 있지만 여러 가지 이유로 실행할 수 없는 상태|
|Terminated|스레드가 종료된 상태. 스레드의 run() 메소드가 종료되면 스레드도 종료된다.|

- 선점형 스케줄링 : 우선순위에 기반을 둔 스케줄링

### 스레드 우선 순위

- 각 스레드는 우선 순위가 있다.
- 우선 순위는 1에서 10 사이의 숫자로 표시된다.
- 스레드는 생성될 때자신을 생성한 스레드로부터 우선 순위를 상속받는다.
- 실행 도중에 다음의 메소드를 이용하여 스레드의 우선 순위를 얻거나 변경하는 것이 가능하다.
- void setPriority(int newPriority): 현재 스레드의 우선 순위를 변경한다.
- getPriority() : 현재 스레드의 우선 순위를 반환한다.

### sleep()

- sleep() : Thread Class의 sleep() 메소드는 지정된 시간 동안 스레드를 재우기 위하여 사용된다.

### join()

- join() : 스레드가 종료될 때까지 기다리는 메소드

### 인터럽트(interrupt)와 yield()

- 인터럽트(interrput) : 하나의 스레드가 실행되고 있는 작업을 중지하도록 하는 메커니즘

## 16.4 동기화

- 스레드는 동일한 데이터를 공유하기 때문에 효율적이다.
- 하지만 스레드 간섭, 메모리 불일치 오류

- 동기화 : 공유된 자원 중에서 동시에 사용하면 안 되는 자원을 보호하기 위해 한 번에 한 스레드만 공유 자원에 접근하도록 하는 것
- 임계 영역 : 한 사용자가 사용하고 있으면 다른 사용자는 사용이 끝날 때까지 기다려야 하는 부분

### 동기화 메소드 사용 예제

- synchronized 키워드를 메소드 앞에 붙여준다.

### 동기화 블록 사용 예제

## 16.5 Thread 간의 조정
