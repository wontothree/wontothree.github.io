---
title: "[Java] Class and Object"
excerpt: "천인국 - Power Java : Ch04, Ch05"
categories:
  - java
order: 3
---
## 1. 객체 지향 프로그래밍

다양한 기능을 하는 소프트웨어 객체들을 조합하여 기능을 구현하는 기법

### 객체

객체는 상태와 동작을 가지고 있고 소프트웨어에서 각각 필드와 메소드로 표현할 수 있다.

- 객체의 상태(state): 객체의 속성
- 객체의 동작(behavior): 객체가 취할 수 있는 동작(기능, 행동)
- 필드(field): 객체 안의 변수
- 메소드(method): 객체 안의 함수

### 절차 지향 프고그래밍과 객체 지향 프로그래밍

<프로그래밍 기법의 발전> 어셈블리 -> 절차 지향 -> 객체 지향 -> 함수형

|절차 지향 프로그래밍|객체 지향 프로그래밍|
|---|---|
|절차 지향에서 사용되는 방법으로 복잡한 문제를 점점 더 작은 문제로 분해하는 방법(하향식 설계, top down design)|데이터와 함수를 하나의 덩어리(객체)로 묶는 방법(캡슐화)|

절차 지향 프로그래밍은 데이터와 함수가 분리된다는 중요한 단점이 있다.

구현 방식에 관계 없이 기본적인 사양(인터페이스)을 만족하는 객체로 프로그램을 구성하자.(객체 지향이 나오게 된 동기)

연구가 진행될수록 관련 있는 함수와 데이터를 묶어서 생각해야 한다는 점이 맹백해졌다.

### 객체 지향 프로그래밍의 특징

### 정보 은닉

### 상속

### 다형성

### 추상화

## 2. 클래스와 객체 만들기

### 클래스란?

- 클래스: 객체에 대한 설계도(형틀(template) 또는 청사진(Blueprint))
- 인스턴스: 클래스로부터 만들어지는 각각의 객체
- 하나의 클래스로 여러 개의 인스컨스를 찍어내지만 인스턴스마다 속성의 값은 다르다.

### 클래스 작성

- 클래스의 멤버(member): 객체의 속성을 나타내는 필드와 객체의 동작을 나타내는 메소드
- 필드: 객체 안에 정의된 변수
- 메소드: 클래스 안에 정의된 함수
- 하나의 소스 파일에는 하나의 클래스만을 넣는 것이 원칙이다.
- 클래스의 또 다른 의미: 공통되는 것들을 묶어서 그 유형에 이름을 붙인 것(유형, 부류)

### 객체 생성

1. 참조 변수 선언한다.
2. new 연산자를 사용하여 객체를 생성하고 객체의 참조값을 참조 변수에 저장한다. new 연산자는 객체를 히프 메모리에 생성한 후 객체의 참조값을 반환한다.
3. 객체의 필드와 메소드를 사용한다. 점(.)을 사용하여 객체의 필드나 메소드에 접근한다.

```java
Circle obj;

obj = new Circle()
        
obj.radius = 100;
obj.color = "blue";
double are = obj.getArea();
```

### 참조 변수

- 자바에서는 변수를 기초 변수과 참조 변수로 나눌 수 있다.
- 기초 변수(primitive variable): int, float, char 등의 기초 자료형의 값을 저장하는 변수
- 참조 변수(reference variable): 객체를 참조할 때 사용되는 변수로서 객체의 참조값(객체의 주소)이 저장되는 변수

예제 4-1 DeskLamp 클래스 작성하고 객체 생성해보기

```java
public class DeskLamp {
    // 인스턴스 변수 정의
    private boolean isOn; // 켜짐이나 꺼짐과 같은 램프의 상태

    // 메소드 정의
    public void turnOn() { isOn = true; }
    public void turnOff() { isOn = false; }
    public String toString() {
        return "현재 상태는 " + (isOn == true ? "켜짐" : "꺼짐");
    }
}
```

````java
public class DeskLampTest {
    public static void main(String[] args) {
        Practice myLamp = new Practice();

        myLamp.turnOn();
        System.out.println(myLamp);
        myLamp.turnOff();
        System.out.println(myLamp);
    }
}

/*
현재 상태는 켜짐
현재 상태는 꺼짐
*/
````

예제 4-2 Box 클래스 정의하고 객체 생성하기

````java
class Box {
    int width;
    int length;
    int height;
    double getVolume() {
        return (double) width * length * height;
    }

    public class BoxTest {
        public static void main(String[] args) {
            Box b;
            b = new Box();
            b.width = 20;
            b.length = 20;
            b.height = 30;

            System.out.println("상자의 가로, 세로, 높이는 " + b.width + b.length + b.height + "입니다.");
            System.out.println("상자의 부피는 " + b.getVolume() + "입니다.");
        }
    }
}
````

예제 4-3 Television 클래스 작성하고 생성해보기

````java
public class Television {
    int channel;
    int volume;
    boolean onOff;

    public static void main(String[] args) {
        Television myTv = new Television();
        myTv.channel = 7;
        myTv.volume = 10;
        myTv.onOff = true;

        Television yourTv = new Television();
        yourTv.channel = 9;
        yourTv.volume = 12;
        yourTv.onOff = true;

        System.out.println("나의 텔레비전 채널은 " + myTv.channel + "이고 불륨은 " + myTv.volume + "입니다.");
        System.out.println("너의 텔레비전 채널은 " + yourTv.channel + "이고 볼륨은 " + yourTv.volume + "입니다.");
    }
}
````

## 3. 생성자와 메소드 오버로딩

### 메소드 오버로딩

- 메소드 오버로딩(method overloading): 프로그래밍에서 동일한 이름의 메소드를 여러 개 정의하는 것
- 자바에서 메소드 오버로딩을 사용할 때는 매개 변수를 다르게 하여야 하며 매개변수로 메소드를 구분한다.

````java
public class MyMath {
    int add(int x, int y) { return x + y; }
    int add(int x, int y, int z) { return x + y + z; }
    int add(int x, int y, int z, int w) { return x + y + z + w; }

    public static void main(String[] args) {
        MyMath obj;
        obj = new MyMath();

        System.out.println(obj.add(10, 20));
        System.out.println(obj.add(10, 20, 30));
        System.out.println(obj.add(10, 20, 30, 40));
    }
}
````

### 생성자

- 생성자(constructor): 객체가 생성될 때 객체를 초기화하는 특수한 메소드

````java
class Pizza
{
    int size;
    String type;

    public Pizza() {
        size = 12;
        type = "슈퍼슈프림";
    }

    public Pizza(int s, String t) { // 셍성자도 오버로딩될 수 있다.
        size = s;
        type = t;
    }
}

public class PizzaTest {
    public static void main(String[] args) {
        Pizza obj1 = new Pizza();
        System.out.println("("+ obj1.type + " , " + obj1.size + ",)");

        Pizza obj2 = new Pizza(24, "포테이토");
        System.out.println("(" + obj2.type + " , " + obj2.size + ",)");
    }
}

/*
(슈퍼슈프림 , 12,)
(포테이토 , 24,)
 */
````

예제 4-4 생성자 만들어보기

```java

```

### 기본 생성자

### 기본 생성자가 추가되지 않는 경우

### this 참조 변수

- this: 객체 자신을 가리키는 참조 변수

### this()

### this 사용 시 주의 사항

## 4. 접근 제어

### 자바의 접근 제어 지정자

### 접근자와 설정자

### 접근자와 설정자를 사용하는 이유

## 5. 무엇을 클래스로 만들어야 할까?

### UML(Unified Modeling Language)

### 의존 관계

---

## 1. 객체의 생성과 소멸

### 참조 변수와 대입 연산

### 객체의 소멸과 가비지 컬렉션

- 가비지 컬렉션(garbage collection): 히프 메모리에서 필요 없는 객체를 찾아 지우는 자동 메모리 삭제 시스템
- 참조하는 변수가 없는 객체는 가비지 컬렉션의 후보다.

```java
Television tv1 = new Television();
Television tv2 = new Television();

tv2 = tv1;
```

### 가비지 컬렉션

모든 가비지 컬렉터의 기본 프로세스

1. 참조되지 않은 객체를 식별한다.
2. 표시된 객체를 삭제한다.
3. 새 객체에 메모리를 순차적으로 할당하기 위해 히프 메모리를 압축한다.

### 가비지 컬렉션 요청

## 2. 인수 전달 방법

- 값에 의한 호출(call by value): 메소드로 인수가 전달되는 방법

### 기초형 값이 전달되는 경우

- 전달하는 인수가 기초형 변수면 호출자가 전달하는 인수의 값이 매개 변수로 전달된다.

### 객체가 전달되는 경우

- 객체를 메소드로 전달하면 객체의 참조값이 전달된다.

예제 5-1

```java
class Pizza {
    int radius;

    Pizza(int r) {
        radius = r;
    }

    Pizza whosLargest(Pizza p1, Pizza p2) {
        return p1.radius > p2.radius ? p1 : p2;
    }
}

class PizzaTest {
    public static void main(String[] args) {
        Pizza obj1 = new Pizza(20);
        Pizza obj2 = new Pizza(18);

        Pizza largest = obj1.whosLargest(obj1, obj2);
        System.out.println(largest.radius + "인치 피자가 더 큼.");

    }
}
```

### 배열이 전달되는 경우

- 배열도 객체이므로 배열을 메소드의 인자로 전달하면 참조값이 복사된다.

예제 5-2

```java
import java.lang.reflect.Array;

public class PizzaTest {
    public static double minArray (double[] list) {
        double min = list[0];

        for (int i = 1; i < list.length; i++) {
            if (list[i] < min)
                min = list[i];
        }

        return min;
    }

    public static void main(String args[]) {
        double[] a = {1.1, 2.2, 3.3, 4.4, 0.1, 0.2};
        double[] b = {-2.0, 3.0, -9.0, 2.9, 1.5};

        double min;

        min = minArray(a);
        System.out.println(min);

        min = minArray(b);
        System.out.println(min);
    }
}
```

## 3. 정적 멤버

### 정적 멤버

- 정적 멤버(static member 또는 클래스 멤버(class member)): 여러 객체가 공유하는 하나의 변수
- 필드를 정의할 때 앞에 static 키워드를 붙이면 정적 멤버가 된다.

### 인스턴스 멤버 vs 정적 멤버

- 클래스의 멤버는 인스턴스 멤버와 정적 멤버로 나뉜다.

|인스턴스 멤버|정적 멤버|
|---|---|
|객체마다 별도록 생성하고 독립된 기억 공간을 갖어 서로 다른 값을 갖는 변수|동일한 클래스로 생성된 모든 객체들이 공유하는 하나의 멤버|

|객체 유무|접근 방법|
|---|---|
|객체가 없는 경우|정적 변수는 객체 없이도 접근할 수 있다. 정적 변수는 객체가 없다면 클래스 이름 뒤에 점 연산자(.)를 붙여 접근한다.|
|객체가 있는 경우|정적 변수가 정의된 클래스의 어떤 객체를 통해서도 정적 변수에 접근할 수 있다. 객체가 있다면 객체의 있다면 객체 뒤에 점 연산자를 붙여 접근한다.|

- 정적 변수는 클래스당 하나만 생성할 수 있다.

### 정적 변수의 생성 시기

- 인스턴스 변수는 객체와 함께 생성되고 소멸된다.
- 정적 변수는 자바 가상 기계가 적재되는 순간 생성되며 프로그램이 종료되는 순간 소멸된다.

예제 5-3

```java
class Pizza {
    private String topping;
    public static int count = 0;

    public Pizza(String topping) {
        this.topping = topping;
        count++;
    }
}

public class PizzaTest {
    public static void main(String args[]) {
        Pizza pz1 = new Pizza("Cheese");
        Pizza pz2 = new Pizza("Pepperoni");
        Pizza pz3 = new Pizza("Super supreme");

        System.out.println("판매된 피자 수: " + Pizza.count);
        System.out.println("판매된 피자 수: " + pz2.count);
    }
}

/*
판매된 피자 수: 3
판매된 피자 수: 3
*/
```

### 정적 메소드

### 정적 변수의 활용

### final 키워드

### 정적 블록

## 4. 객체 배열
