---
title: "[Java] Java Programming Basic"
excerpt: "천인국 - Power Java : Ch02"
categories:
  - java
---
## 1, 자바 프로그램 구성 요소

### 클래스

### 메소드

### 자바 프로그램의 일반적인 구조

### 문장

### 주석

## 2 변수와 자료형

### 변수

### 식별자 만들기

### 자료형

### 기초형

- 자바 : 정수형, 실수형, 문자형, 논리형

|Data Type|Description|Size|Range|
|---|---|---|---|
|byte|부호 있는 정수|1byte(8bits)|-128 ~ 127|
|short|부호 있는 정수|2byte(16bits)|-32768 ~ 32767(= 2^16 -1)|
|int|부호 있는 정수|4byte(32bits)||
|long|부호 있는 정수|8byte(64bits)||
|float|부동소수점형|4byte(32bits)||
|double|부동소수점형|8byte(64bits)||
|char|문자형|2byte(16bits)||
|boolean|논리형|1bits||

- C Language : 정수형, 실수형, 문자형

C - 정수형

|Data Type|Description|Size|Range|
|---|---|---|---|
|short|부호 있는 정수|2byte(16bits)|-32768 ~ 32767|
|int|부호 있는 정수|4byte(32bits)||
|long|부호 있는 정수|4byte(32bits)||
|long long|부호 있는 정수|8byte(64bits)|0 ~ 65535|
|unsigned short|부호 없는 정수|2byte(16bits)||
|unsigned int|부호 없는 정수|4byte(32bits)||
|unsigned long|부호 없는 정수|4byte(32bits)|
|unsigned long long|부호 없는 정수|4byte(32bits)|

C - 실수형

|Data Type|Description|Size|Range|
|---|---|---|---|
|float|단일 정밀도(single-precision) 부동소수점|4byte(32bits)||
|double|두 배 정밀도(double-precision) 부동소수점|8byte(64bits)||
|long double|두 배 정밀도(double-precision) 부동소수점|8byte(64bits)||

C - 문자형

|Data Type|Description|Size|Range|
|---|---|---|---|
|char|부호 있는 문자|1byte(8bits)|-128 ~ 127|
|unsigned char|부호 없는 문자|1byte(8bits)|0 ~ 255|

### 문자형

### 리터럴

### 상수

- 상수: 프로그램이 실행되는 동안 값이 변하지 않는 수 또는 변경 불가능한 수
- 키워드 final

```java
final double PI = 3.141592;
```

### 변수 타입 추론 기능

- java 10부터 도입

```java
int age = 22;
String name = "Kim";
```

```java
var age = 22; // age는 int 타입으로 추론
var name = "Kim"; // name은 String 타입으로 추론
```

예제 2-1 1광년 계산하기

```java
public class Practice {
    public static void main(String[] args) {
        final double SPEED_OF_LIGHT = 300000000;
        double lightYear;

        lightYear = SPEED_OF_LIGHT * 365 * 24 * 60 * 60;

        System.out.println("빛이 1년 동안 가는 거리: " + lightYear + "km"); // 빛이 1년 동안 가는 거리: 9.4608E15km
    } 
}
```

예제 2-2 원의 면적 계산하기

```java
public class Practice {
    public static void main(String[] args) {
        final double PI = 3.141592;
        double radius, area;

        radius = 5;
        area = PI * radius * radius;
        System.out.println("반지름이 5인 원의 면적은 " + area); // 반지름이 5인 원의 면적은 78.5398
    }
}
```

### 문자열

- Java에는 내장된 문자열 자료형이 없다.
- String 클래스: 문자열을 나타내는 자료형

```java
String s1 = "Hello";
String s2 = "World¡";
```

### 형변환

형변환: 하나의 자료형을 다른 자료형으로 변환하는 것

- 자동적인 형변환

컴퓨터에서는 정수 계산 하드웨어와 실수 계산 하드웨어는 완전히 다르기 때문에 산술적인 연산을 하기 전에 피연산자의 타입을 통일해야 한다.
수식을 계산할 때 가장 범위가 넓은 피연산자의 타입으로 변환한다.
byte 수가 클수록 범위가 넓다. 정수 < 실수.
byte -> short, char -> int -> long -> float -> double

```java
double sum = 1.3 + 12; // 12는 12.0으로 변환된다. 
```

- 강제적인 형변환

변환하려는 값의 앞에 원하는 자료형을 적는다.

```java
int x =3;
double y = (double) x;
```

축소변환

```\
i = (int)12.5; // 12만 저장된다.
```

예제 2-3 형변환 실습하기

```java
// 다음 코드의 실행 결과를 예측하라.
public class Practice {
    public static void main(String[] args) {
        int i;
        double f;

        f = 1 / 5;
        System.out.println(f);

        f = (double)1 / 5;
        System.out.println(f);

        i = (int) 1.7 + (int) 1.8;
        System.out.println(i);
    }
}

/*
0.0
0.2
2
 */
```

## 3. 콘솔에서 입력받기

### 입력받기

- System.in은 키보드에서 바이트를 읽어서 우리에게 전달한다.
- Scanner 객체를 이용하여 바이트들을 정수나 실수, 문자열로 변환한다.
- nextInt()를 호출하여 키보드에서 받은 바이트들을 정수로 변환한다.

```java
import java.util.Scannar;
Scanner sc = new Scanner(System.in);

int x = sc.nextInt()
```

예제 2-4 사용자로부터 입력받은 두 수를 받아서 더하기

```java
import java.util.Scanner;

public class Practice {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x, y, sum;

        System.out.print("첫 번째 숫자를 입력하시오: ");
        x = sc.nextInt();

        System.out.print("두 번째 숫자를 입력하시오: ");
        y = sc.nextInt();

        sum = x + y;
        System.out.println(sum);
    }
}
```

### import 문장

- 자바에서 모든 클래스는 사용하기 전에 import 되어야 한다.

### Scanner 클래스

- Scanner 클래스: 자바 애플리케이션이 사용자로부터 쉽게 정수나 문자열을 받을 수 있도록 자바 패키지에서 제공하는 클래스
- Scanner 클래스는 키보드로부터 바이트 값을 받아서 분리자를 이용하여 각 바이트들을 token으로 분리한다. 특정한 지정('', '\n', '\t')가 없으면 공백문자이다.

Scanner 클래스는 다양한 입력 메소드를 제공한다.

```java
import java.util.Scanner;

public class Practice {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in); // Kim 23 84.0

        String name = sc.next(); // 한 단어(Token)을 "Kim"을 읽는다.
        int age = sc.nextInt(); // 문자열 "23"을 정수 23으로 변환한다.
        double weight = sc.nextDouble(); // 문자열 84.0을 실수 84.0으로 변환한하여 반환한다.
        String line = sc.nextLine();

        System.out.println(name); // Kim
        System.out.println(age); // 23
        System.out.println(weight); // 84.0
        System.out.println(line);
    }
}

// Q. 이 코드에서 nextLine 메소드가 실행되지 않는 이유
/*
이 코드에서 nextLine() 메소드가 실행되지 않는 이유는, 앞서 호출된 nextDouble() 메소드는 줄바꿈 문자(엔터키)를 버리지 않고 그대로 입력버퍼에 남겨둬서, nextLine() 메소드가 이전에 입력된 줄바꿈 문자를 그대로 읽어와서 아무것도 입력하지 않았음에도 불구하고 빈 문자열("")을 반환하기 때문입니다.

따라서 nextLine() 메소드가 실행되기 전에 sc.nextLine()를 추가하여 입력버퍼에 남아있는 줄바꿈 문자를 버리고 넘어갈 수 있도록 해주어야 합니다.
아래는 수정된 코드입니다.

import java.util.Scanner;

public class Practice {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in); // Kim 23 84.0

        String name = sc.next(); // 한 단어(Token)을 "Kim"을 읽는다.
        int age = sc.nextInt(); // 문자열 "23"을 정수 23으로 변환한다.
        double weight = sc.nextDouble(); // 문자열 84.0을 실수 84.0으로 변환한하여 반환한다.
        sc.nextLine(); // 입력 버퍼에 남아있는 줄바꿈 문자를 버린다.

        String line = sc.nextLine(); // 이제 올바르게 입력을 받을 수 있다.

        System.out.println(name); // Kim
        System.out.println(age); // 23
        System.out.println(weight); // 84.0
        System.out.println(line);
    }
}
 */
```

예제 2-5 사용자로부터 이름과 나이를 받는 프로그램

```java
import java.util.Scanner;

public class Practice {
    public static void main(String[] args) {
        String name;
        int age;

        Scanner sc = new Scanner(System.in);

        System.out.print("이름을 입력하시오: ");
        name = sc.nextLine();
        System.out.print("나이를 입력하시오: ");
        age = sc.nextInt();

        System.out.println(name + "님 안녕하새요! " + (age) + "세이시네요.");
    }
}
```

중간점검 Scanner 클래스를 이용하여 사용자가 입력한 3개의 부동소수점수의 합을 계산하여 출력하는 프로그램을 작성하라.

```java
import java.util.Scanner;

public class Practice {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        double a1 = sc.nextDouble();
        double a2 = sc.nextDouble();
        double a3 = sc.nextDouble();

        System.out.println(a1 + a2 + a3);
    }
}
```

## 4. 수식과 연산자

### 수식

- 수식: 프로그램에서 계산을 하기 위해 사용하는 것
- 수식은 피연산자(operand)와 연산자(operator)로 이루어진다.
- 연산자: 특정한 연산을 하는 기호
- 피연산자: 연산의 대상

### 연산자

- 수식이 계산될 때 우선순위가 높은 연산자가 먼저 계산된다.

연산자의 우선순위

- 표에서 위에 있을수록 우선순위가 높다.
- 하나의 수식 안에 우선순위가 같은 연산자가 여러 개 있다면 왼쪽에서 오른쪽으로 계산된다.

| operator   | 우선순위                     | 결합 규칙  |
|------------|--------------------------|--------|
| 단항(posfix) | ++, --                   | 오른쪽에서 왼쪽 |
| 단항(prefix) | ++, --, +, -, !, ~ (형변환) | 오른쪽에서 왼쪽 |
| 곱셈         | *, /, %                  | 왼쪽에서 오른쪽 |
| 덧셈         | +, -                     | 왼쪽에서 오른쪽 |
| 이동         | <<, >>>>, >>             | 왼쪽에서 오른쪽 |
| 관계         | <>, <=, >=               | 왼쪽에서 오른쪽 |
| 동등         | ==, !=                   | 왼쪽에서 오른쪽 |
| 비트별 AND    | &                        | 왼쪽에서 오른쪽 |
| 비트별 XOR    | ^                        | 왼쪽에서 오른쪽 |
| 비트별 OR     | .                        | 왼쪽에서 오른쪽 |
| 논리적 AND    | &&                       | 왼쪽에서 오른쪽 |
| 논리적 OR     | .                        | 왼쪽에서 오른쪽 |
| 조건         | ?:                       | 왼쪽에서 오른쪽 |
| 대입         | =, +=, -=, *=, /=, %=    | 왼쪽에서 오른쪽 |

### 산술 연산

| 연산자 |  기호   | 의미                | 예     |
|-----|:-----:|-------------------|-------|
| 덧셈  |   +   | x와 y를 더한다.        | x + y |
| 뺄셈  |   -   | x에서 y를 뺀다.        | x - y |
| 곱셈  |   *   | x와 y를 곱한다.        | x * y |
| 나눗셈 |   /   | x를 y로 나눈다.        | x / y |
| 나머지 |   %   | x에서 y로 나눌 때의 나머지값 | x % y |

- 나눗셈 연산자 주의 check
- 나머지 연산자의 의미 check

### 증감 연산자

### 복합 대입 연산자

### 관계 연산자

### 논리 연산자

### 비트 연산자

### 비트 이동 연산자

### 조건 연산자
