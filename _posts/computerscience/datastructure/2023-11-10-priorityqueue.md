---
title: "[Date Structure] 우선순위 큐"
excerpt: "두근두근 자료구조 : Ch10"
categories: 
  - datastructure
---
## 1. 우선순위 큐

Priority queue : 모든 데이터가 우선순위를 가지고 있고, 들어온 순서와 상관없이 우선순위가 높은 데이터가 먼저 출력되는 자료구조

|data structure|삭제되는 요소|
|:---:|:---|
|stack|가장 나중에 들어온 data|
|queue|가장 먼저 들어온 data|
|priority queue|가장 우선순위가 높은 data|

우선순위 큐를 사용하여 stack과 queue를 구현할 수 있다. PQ는 array, linked list 등 여러 가지 방법으로 구현할 수 있지만 가장 효율적인 방법은 heap이다.

- Max priority queue : 우선순위가 가장 높은 요소가 먼저 삭제된다.
- Min priority queue : 우선순위가 가장 낮은 요소가 먼저 삭제된다.

### 추상 자료형

```adt
데이터 : 우선순위를 가진 요소들의 모음

연산
  - init() :우선순위 큐를 초기화 한다.
  - insert(item) :우선순위 큐에 항목 item을 추가한다.
  - delete() : 가장 우선순위가 높은 요소를 꺼내서 반환한다.
  - find() : 가장 우선순위가 높은 요소를 삭제하지 않고 반환한다.
  - is_empty() : 우선순위 큐가 공백상태인지 검사한다.
  - is_full() : 우선순위 큐가 포화상태인지 검사한다.
```

## 2. 우선순위 큐의 구현 방법

- 정렬되지 않은 배열을 사용하는 방법
- 정렬된 배열을 사용하는 방법
- 연결 리스트를 사용하는 방법
- 힙(우선순위 큐를 위해 만들어진 완전 이진 트리 자료구조)을 사용하는 방법

우선순위 큐를 구현하는 여러 가지 방법의 비교

|표현 방법|삽입 연산의 시간복잡도|삭제 연산의 시간복잡도|
|---|---|---|
|정렬 안 된 배열|O(1)|O(n)|
|정렬 안 된 연결 리스트|O(1)|O(n)|
|정렬된 배열|O(n)|O(1)|
|정렬된 연결 리스트|O(n)|O(1)|
|힙|O($log_2n)$|$O(log_2n)$|

## 3. 힙

<img src="..\..\img\post\ds\heap.png" />

여러 개의 값들 중에서 가장 큰 값이나 가장 작은 값을 빠르게 찾아내도록 만들어진 자료구조

- Heap : 부모 노드의 키 값이 자식 노드의 키 값보다 항상 큰(혹은 작은) 완전 이진트리
- Max heap : 부모 노드의 키 값이 자식 노드의 키 값보다 크거나 같은 완전 이진트리
- Min heap : 부모 노드의 키 값이 자식 노드의 키 값보다 작거나 같은 완전 이진트리
- 완전 이진 트리 : 루트 노드부터 시작하여 왼쪽 자식 노드, 오른족 자식 노드 순서로 데이터가 차례대로 삽입되는 이진트리

힙은 완전 이진 트리이므로 힙을 저장하는 효과적인 자료구조는 배열이다.

각 노드의 번호를 배열의 인덱스로 하여 배열에 힙의 노드들을 저장할 수 있다.

- 왼쪽 자식 노드의 인덱스 = 부모의 인덱스 x 2
- 오른쪽 자식 노드의 인덱스 = 부모의 인덱스 x 2 + 1
- 부모의 인덱스 = 자식의 인덱스 / 2

## 4. 구현

### 배열을 이용한 기본 틀

```c
#include <stdio.h>
#include <stdlib.h>
#define MAX_HEAP_NODE 200

void error(char str [])
{
    printf("%s\n", str);
    exit(1);
}

typedef int HNode;
#define Key(n) (n)

HNode heap[MAX_HEAP_NODE];

int heap_size;

#define Parent(i) (heap[i/2])
#define Left(i) (heap[i*2])
#define Right(i) (heap[i*2+1])

void init_heap() {heap_size = 0;}
int is_empty_heap() {return heap_size == 0;}
int is_full_heap() {return heap_size == MAX_HEAP_NODE - 1;}
HNode find_heap() {return heap[1];}
```

### 삽입

Up-heap : 새로운 요소를 마지막 노드의 다음 위치에 삽입한 후, 새로운 노드를 부모 노드들과 교환해서 힙의 성질을 만족시켜주는 과정

```c
void insert_heap(HNode n)
{
    int i;
    if (is_full_heap()) return;
    i = ++(heap_size);
    while( i != 1 && Key(n) > Key(Parent(i))) {
        heap[i] = Parent(i);
        i /= 2;
    }
    heap[i] = n;
}
```

### 삭제

Down-heap : 루트 노드를 삭제하고 마지막 노드를 루트 노드에 삽입한 후, 자식 노드들과 교환해서 힙의 성질을 만족시켜주는 과정

```c
HNode delete_heap()
{
    HNode hroot, last;
    int parent = 1, child = 2;
    if (is_empty_heap())
        error("힙 트리 공백 에러");

    hroot = heap[1];
    last = heap[heap_size--];

    while (child <= heap_size) {
        if (child < heap_size && Key(Left(parent)) < Key(Right(parent)))
            child++;
        if (Key(last) >= Key(heap[child]))
            break;
        heap[parent] = heap[child];
        parent = child;
        child *= 2;
    }

    heap[parent] = last;
    return hroot;
}
```

```c
void print_heap()
{
    int i, level;
    for (i = 1, level = 1; i < heap_size; i++) {
        if (i == level) {
            printf("\n");
            level *= 2;
        }
        printf("%d ", Key(heap[i]));
    }
    printf("\n해당 배열 : [0, ");
    for (int i = 1; i <heap_size - 1; i++) {
        printf("%d, ", heap[i]);
    }
    printf("%d]", heap[heap_size]);
    printf("\n--------------");
}

int main()
{
    init_heap();
    insert_heap(2);
    insert_heap(5);
    insert_heap(4);
    insert_heap(8);
    insert_heap(9);
    insert_heap(3);
    insert_heap(7);
    insert_heap(3);

    print_heap();

    delete_heap(); print_heap();
    delete_heap(); print_heap();
    printf("\n");
    return 0;
}

// 9 
// 8 7 
// 3 5 3 4 
// [0, 9, 8, 7, 3, 5, 3, 2]
// --------------
// 8 
// 5 7 
// 3 2 3 
// [0, 8, 5, 7, 3, 2, 4]
// --------------
// 7 
// 5 4 
// 3 2 
// [0, 7, 5, 4, 3, 3]
// --------------
```

|힙의 연산|최악의 시간 복잡도|
|---|:---:|
|삽입 연산|$O(log_xn)$|
|삭제 연산|$O(log_xn)$|

## 5. 응용 : 힙 정렬

- 힙 정렬 : 힙을 사용하는 정렬 알고리즘

1. n개의 요소를 하나씩 힙에 삽입한다.
2. 힙에서 n번에 걸쳐 하나씨 요소들을 삭제하고 출력한다.

힙은 삽입과 삭제 모두 $log_2n$만큼의 시간이 소요된다. 삽입 과정에서 n번 요소를 삽입하고 삭제 과정에서 n번 요소를 삭제하므로 정렬에 필요한 전체 시간은 $nlog_2n + nlog_2n = 2nlog_2n$에 비례한다.

|힙 정렬의 최악의 시간 복잡도|
|:---:|
|$nlog_2n$|

- 전체 자료를 정렬하는 것이 아니라 전체에서 가장 큰 값 몇 개만 필요할 때 힙 정렬이 유용하다.
- 정렬 알고리즘의 best는 $nlog_2n$이다.

## 기타

- 이진 탐색 트리 : 탐색을 위해 특화된 이진 트리
- Heap : 우선순위 큐를 위해 만들어진 완전 이진 트리

||이진 탐색 트리|힙 트리|
|---|---|---|
|설명|탐색에 특화된 이진트리|우선순위 큐를 위해 만들어진 완전이진트리|
|정의|모든 노드가 루트 키보다 작은 왼쪽 서브 트리와 루트 키보다 큰 오른쪽 서브 트리를 갖는 이진트리|부모의 키 값이 자식의 키 값보다 항상 큰(또는 작은) 완전이진트리|
|특징|어느 정도 정렬된 상태를 유지하고 있다.|큰 값이 상위 레벨에 있고 작은 값이 하위 레벨애 있는 정도의 느슨한 정렬 상태를 유지한다.|
||이진탐색트리를 중위순회하면 오름차순(또는 내림차순)으로 노드를 방문한다.|힙의 목적이 삭제 연산에서 가장 큰 값을 효율적으로 찾아내는 것이므로 전체를 정렬할 이유가 없다.|