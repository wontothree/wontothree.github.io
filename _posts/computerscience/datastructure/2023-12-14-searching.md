---
title: "[Date Structure] 탐색"
excerpt: "두근두근 자료구조 : Ch14"
categories: 
  - datastructure
---
## 1. 탐색

테이블에서 원하는 레코드를 찾는 작업

- 테이블 : 나 이상의 필드로 구성되는 레코드의 집합
- 탐색키 : 레크드들을 서로 구별하여 인식할 수 있는 키
- 맵(또는 사전) : 자료를 저장하고 탐색키를 이용해 원하는 자료를 빠르게 찾을 수 있도록 하는 탐색을 위한 자료구조
- 키 : 레코드를 구분할 수 있는 탐색키
- 값 : 탐색키와 관련된 값

추상 자료형

```adt
데이터 : 키를 가진 레코드(엔트리)의 집합

연산
    - search(key) : 탐색키 key를 가진 레크드를 찾아 반환한다.
    - insert(entry) : 주어진 entry를 맵에 삽입한다.
    - delete(key) : 탐색키 key를 가진 레코드를 찾아 삭제한다.
```

## 2. 정렬되지 않은 배열에서의 탐색

### 순차 탐색

배열의 요소들을 처음부터 마지막까지 하나씩 검사하여 원하는 레코드를 찾는 방법

```c
int sequential_search(int list[], int key, int low, int high)
{
    int i;
    for (i = low; i <= high; i++)
        if (list[i] == key) return i;
    return -1;
}
```

순차 탐색의 시간 복잡도 : O(n)

## 3. 정렬된 배열에서의 탐색

### 이진 탐색

- 매 단계에서 검색해야 할 항목의 수가 반으로 줄어든다.
- 데이터의 삽입이나 삭제가 빈번한 응용에는 적합하지 않다.

순환 호출을 이용한 이진 탐색

```c
int binary_search (int list [], int key, int low, int high)
{
    int middle;
    if (low <= high)
    {
        middle = (low + high) / 2;
        if (key == middle) return middle;
        else if (key < list[middle]) return binary_search(list, key, low, middle - 1)
        else return binary_search(list, key, middle + 1, high)
    }
    return -1;
}
```

반복을 이용한 이진 탐색

```c
int binary_search(int list [], int key, int low, int high)
{
    int middle;
    while (low < high)
    {
        middle = (low + high) / 2;
        if (key == middle) return middle;
        else if (key > middle) low = middle + 1;
        else high = middle - 1;
    }
    return -1;
}
```

시간 복잡도 : $log_2 n$

### 색인 순차 탐색

- 인덱스 테이블을 사용하여 탐색의 효율을 높이는 방법
- 주 자료 리스트에서의 탐색 시간을 상당히 줄일 수 있으므로 파일 처리, 데이터베이스 등 응용 분야에서 많이 사용한다.
- 인덱스 테이블 : 주 자료 리스트에서 일정 간격으로 발췌한 자료를 가지고 있는 테이블
- 인덱스 테이블에 m개의 항목이 있고, 주 자료 리스트의 데이터 수가 n이면 각 인덱스 항목은 주 자료 리스트의 각 n/m 번째 데이터를 가지고 있다.
- 인덱스 테이블에서 index[i] <= key < index[i + 1]을 만족하는 항목을 찾는다.
- 해당 항목을 찾으면 주 자료 테이블에서 해당 범위에 대해서만 검색한다.

```c
int sequential_search(int list[], int key, int low, int high)
{
    int i;
    for (i = low; i <= high; i++)
        if (list[i] == key) return i;
    return -1;
}

// 인덱스 테이블 항목의 구조체
typedef struct Index {
    int key;
    int index;
} Index;

// 색인 순차 탐색 함수
int indexed_sea(int list [], int nList, Index *tbl, int nTbl, int key)
{
    int i;
    if (key < list[0] || key > list[nList-1]) return -1; // 키 값이 리스트 범위 밖
    for (i = 0; i < nTbl - 1; i++) {
        if (tbl[i].key <= key && tbl[i+1].key > key)
            return sequential_search(list, key, tbl[i].index, tbl[i+1].index);
    }
    return sequential_search(list, key, tbl[nTbl - 1].index, nList);
}

#include <stdio.h>
#define LIST_SIZE 9
#define INDEX_SIZE 3
int main()
{
    int list[LIST_SIZE] = {3, 9, 15, 22, 31, 55, 67, 88, 91};
    Index index[INDEX_SIZE] = {
                                {3, 0}, 
                                {15, 3}, 
                                {67, 6}
                            };

    int number, ret;
    printf("탐색할 숫자를 입력하시오: ");
    scanf("%d", &number);
    ret = indexed_sea(list, LIST_SIZE, index, INDEX_SIZE, number);

    if (ret >= 0) printf("탐색 성공 : 숫자(%d) 위치=%d\n", number, ret);
    else printf("숫자(%d) 탐색 실패\n", number);

    return 0;
}
```

- 인덱스 테이블의 크기를 줄이면 주 자료 리스트에서의 탐색 시간이 길어지고, 인덱스 테이블의 크기가 크면 인덱스 테이블에서의 탐색 시간이 길어진다.
- 인덱스 테이블의 크기 : m, 주자료 리스트의 크기 : n 일 때, 색인 순차 탐색의 시간 복잡도 : O(m + n/m)

### 보간 탐색

- 탐색키가 존재할 위치를 예측하여 탐색하는 방법
- 이진 탐색과 유사하나 리스트를 반으로 분할하지 않고 불균등하게 분할하여 탐색한다.

이진 탐색 탐색 위치 $=\dfrac{low + high}{2}$

보간 탐색 탐색 위치 $= \dfrac{(k - list[low])}{list[high]-list[low]} * (high - low) + low$

- 찾고자 하는 키 값 : k
- 탐색할 범위의 최소 인덱스 : low
- 탐색할 범위의 최대 인덱스 : high
- 탐색 값과 위치는 비례한다는 가정에서 탐색 위치를 결정할 때 찾고자 하는 키 값이 있는 곳에 근접하도록 가중치를 주는 방법
- 시간 복잡도 : $O(log_2n)$
- 보간 탐색은 이진 탐색과 같은 시간 복잡도를 갖지만 많은 데이터가 비교적 균등하게 분포되어 있는 자료의 경우 훨씬 효율적인 방법이다.

## 4.해싱을 이용한 탐색

- 해시 : 키와 값을 갖는 자료구조                      
- 키 값에 산술적인 연산을 적용하여 항목이 저장될 위치, 즉 인덱스를 직접 계산하는 방식
- 해시 함수 : 키값에서 항목의 위치를 계산하는 함수
- 해시 테이블 : 해시 함수에 의해 계산된 위치에 레코드를 저장한 표
- 충돌 : 서로 다른 키가 해시함수에 의해 같은 주소로 계산되는 상황
- 동의어 : 동일한 해시주소를 발생시키는 키
- 오버플로 : 충돌이 슬롯 수보다 더 많이 발생하는 상황

해시 테이블은 M개의 버킷으로 이루어지는 테이블이고, 하나의 버킷은 여러 개의 슬롯을 가지는데, 하나의 슬롯에 하나의 레코드가 저장된다.

키값이 입력되면 해시 함수로 연산한 결과가 해시 주소가 되며, 이를 인덱스로 사용하여 해시 테이블에 있는 항목에 접근한다.

## 5. 해시함수

좋은 해시 함수의 조건

1. 충돌이 적어야 한다.
2. 해시함수 값이 해시테이블의 주소 영역 내에서 고르게 분포되어야 한다.
3. 계산이 빨라야 한다.

탐색키가 정수라고 가정하고 해시 함수들을 살펴보자.

### 제산 함수

테이블 크기 : M, 탐색 키 : k일 때, 제산 해시 함수 : $h(k) = K mod M$

1과 자기 자신만을 약수로 가지는 소수는 $K mod M$은 0에서 M-1을 골고루 사용하는 값을 만들어낸다.

### 폴딩 함수

- 탐색키가 해시 테이블의 크기보다 더 큰 정수일 경우에 사용된다.
- 폴딩 : 탐색키를 몇 개의 부분으로 나누어 이를 더하거나 비트별로 XOR과 같은 부울 연산을 하는 방법
- 이동 폴딩 : 탐색키를 여러 부분으로 나눈 값들을 더하여 해시주소를 얻는 방법
- 경계 폴딩 : 이웃한 부분을 거꾸로 더해 해시 주소를 얻는 방법

### 중간 제곱 함수

- 탐색키를 제곱한 다음 중간의 몇 비트를 취해서 해시 주소를 생성한다.

### 비트 추출 방법

해시 테이블의 크기가 $M = 2^k$일 때 탐색키를 이진수로 간주하여 임의의 위치의 k개의 비트를 해시 주소로 사용하는 것

### 숫자 분석 방법

키의 각각의 위치에 있는 숫자 중에서 편중되지 않는 수들을 해시 테이블의 크기에 적합한 만큼 조합하여 해시 주소로 사용하는 방법

### 탐색키가 문자열인 경우

아스키 코드 값을 모두 더하는 방법

```c
// 해싱 테이블의 크기 13(소수)
#define TABLE_SIZE 13

// 문자열로 된 탐색키를 숫자로 변환 : 간단한 덧셈 방식
int transform(char *key)
{
    int number = 0;
    while (*key != '\0') number += (*key++);
    return number;
}

// 해싱 함수 : 제산 함수 사용
int hash_function(char *key)
{
    return transform(key) % TABLE_SIZE;
}
```

## 6. 해싱의 오버플로 처리 방법

### 선형 조사법

- 해싱 함수로 구한 버킷에 빈 슬롯이 없으면, 그 다음 버킷에서 빈 슬롯이 있늕지 찾는 방법
- 조사 : 비어 있는 공간을 찾는 것

1. 만약 ht[k]에서 충돌이 발생했다면, 다음 위치인 ht[k+1]부터 순서대로 비어 있는지 살핀다.
2. 비어 있는 공간이 나올 때까지 반복한다.
3. 만약 테이블의 끝에 도달하면, 테이블의 처음으로 돌아간다.
4. 만약 처음 충돌이 발생한 곳으로 돌아오면, 테이블이 가득 찬 상태로 판단한다.

군집화 : 한 번 충돌이 발생한 위치에서 항목들이 집중되는 현상

#### 선형 조사법의 구현 : 문자열 탐색키를 사용하는 레코드

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define TABLE_SIZE 13

int transform(char *key)
{
    int number = 0;
    while (*key != '\0') number += (*key++);
    return number;
}

int hash_function(char *key)
{
    return transform(key) % TABLE_SIZE;
}

typedef struct Record
{
    char key[128];
    char value[128];
} Record;
Record ht[TABLE_SIZE];

void init_map()
{
    int i;
    for (i = 0; i < TABLE_SIZE; i++)
        ht[i].key[0] = ht[i].value[0] = '\0';
}

void print_map()
{
    int i;
    for (i = 0; i < TABLE_SIZE; i++)
        printf("[%2d] %20s = %s\n", i, ht[i].key, ht[i].value);
}

void add_record(char* key, char* value)
{
    int i, hashValue;

    hashValue = i = hash_function(key);
    while (ht[i].key[0] != '\0') {
        if (strcmp(ht[i].key, key) == 0) {
            printf("[%8s] 탐색키가 중복되었습니다.\n", key);
            return;
        }

        i = (i + 1) % TABLE_SIZE;
        if (i == hashValue) {
            printf("[%8s] 테이블이 가득찼습니다.\n", key);
            return;
        }
    }
    strcpy(ht[i].key, key);
    strcpy(ht[i].value, value);
}

Record* search_record(char* key)
{
    int i, hashValue;

    hashValue = i = hash_function(key);
    while (ht[i].key[0] != '\0') {
        if (strcmp(ht[i].key, key) == 0) {
            printf("[%8s] 탐색 성공 ", key);
            printf("[%2d] %20s = %s\n", i, ht[i].key, ht[i].value);
            return ht + i;
        }

        i = (i + 1) % TABLE_SIZE;
        if (i == hashValue) break;
    }
    printf("[%8s] 탐색 실패 : 찾는 값이 테이블에 없음\n", key);
    return NULL;
}

int main()
{
    init_map();
    add_record("do", "반복");
    add_record("for", "반복");
    add_record("if", "분기");
    add_record("case", "분기");
    add_record("else", "분기");
    add_record("return", "반환");
    add_record("function", "함수");
    print_map();
    search_record("return");
    search_record("function");
    search_record("class");

    return 0;
}
```

#### 선형 조사법의 삭제 연산

선형 조서법의 문제

- 선형 조사법은 오버플로가 자주 발생하면 군집화 현상에 따라 탐색의 효율이 크게 저하될 수 있다.
- 선형 조사법에서 항목이 삭제되면 탐색이 불가능해질 수 있다.

해결

- 한 번도 사용되지 않은 버킷, 사용되었지만 현재는 비어있는 버킷, 현재 사용 중인 버킷

### 이차 조사법

- 충돌 발생 시 다음에 조사할 위치를 다음 식에 의하여 결정한다.
                            
(h(k) + i x i) mod M for i = 0, 1, ..., M-1

조사되는 위치

h(k), h(k) + 1, h(k) + 4, h(k) + 9, ... , mod M

- 군집화 현상을 크게 완화할 수 있다.

#### 이중 해상법(재해싱)

오버플로가 발생함에 따라 항목을 저장할 다음 위치를 결정할 때, 원래 해시 함수와 다른 별개의 해시 함수를 이용하는 방법

- 선형 조사법과 이차 조사법은 충돌이 발생했을 경우에 해시 함수 값에 어떤 값을 더해서 다음 위치를 얻는다. 선형 조사법에서는 더하는 값이 1이고 이차 조사법에서는 $j^2$이다.
- 이중 해싱법에서는 탐색 키를 참조하여 더해지는 값을 결정한다.

### 체이닝

하나의 버킷에 여러 개의 레코드를 저장할 수 있도록 해시 테이블의 구조를 변경하여 체이닝을 해결하는 방법

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define TABLE_SIZE 13

int transform(char* key)
{
    int number = 0;
    while (*key != '\0') number += (*key++);
    return number;
}

int hash_function(char *key)
{
    return transform(key) % TABLE_SIZE;
}

typedef struct RecordNode {
    char key[128];
    char value[128];
    struct RecordNode* link;
} Node;

Node* ht[TABLE_SIZE];

void init_map()
{
    int i;
    for (i = 0; i < TABLE_SIZE; i++) {
        ht[i] = NULL;
    }
}

void print_map()
{
    int i;
    Node* p;
    for (i = 0; i < TABLE_SIZE; i++) {
        printf("[%2d] ", i);
        for (p = ht[i]; p != NULL; p = p -> link)
            printf("%10s", p -> key);
        printf("\n");
    }
}

void add_record(char* key, char* val)
{
    Node* p;

    int hashValue = hash_function(key);
    for (p = ht[hashValue]; p != NULL; p = p -> link)
    {
        if (strcmp(p -> key, key) == 0) {
            printf("이미 탐색 키가 저장되어 있음\n");
            return;
        }
    }
    p = (Node*) malloc(sizeof(Node));
    strcpy(p -> key, key);
    strcpy(p -> value, val);
    p -> link = ht[hashValue];
    ht[hashValue] = p;
}

void search_record(char *key)
{
    Node* p;

    int hashValue = hash_function(key);
    for (p = ht[hashValue]; p != NULL; p = p -> link) {
        if (strcmp(p -> key, key) == 0) {
            printf("[%8s] 탐색 성공", key);
            printf("[%2d] %20s = %s\n", hashValue, p -> key, p -> value);
            return;
        }
    }
    printf("[%8s] 탐색 실패 : 찾는 값이 테이블에 없음\n", key);
}

int main()
{
    init_map();
    add_record("do", "반복");
    add_record("for", "반복");
    add_record("if", "분기");
    add_record("case", "분기");
    add_record("else", "분기");
    add_record("return", "반환");
    add_record("function", "함수");
    print_map();
    search_record("return");
    search_record("function");
    search_record("class");

    return 0;
}
```
