---
title: "[Date Structure] 이진탐색트리"
excerpt: "두근두근 자료구조 : Ch09"
categories: 
  - datastructure
---
## 1. 이진 탐색 트리

- 이진 탐색 트리 : 탐색을 위해 특화된 이진 트리
- 탐색 : record(레코드)의 집합에서 특정한 key를 가진 record를 찾아내는 작업
- Record : 하나 이상의 field(필드)로 구성된다.
- Key : record를 서로 구별하기 위해 필드들 중에 서로 중복되지 않는 고유한 값을 가지는 field

>Binary search tree(BST, 이진탐색트리)
>
>- 모든 노드는 유일한 키를 갖는다.
>- 왼쪽 서브 트리 키들은 루트 키보다 작다.
>- 오른쪽 서브 트리의 키들은 루트의 키보다 크다.
>- 왼쪽과 오른쪽 서브 트리도 이진탐색트리이다.

이진 탐색 트리를 중위 순회하면 노드를 숫자의 오름차순으로 정렬할 수 있다.

<img src="..\..\img\post\ds\bst.png" />

## 2. 연산

트리에서는 삽입이나 삭제를 위해 노드의 위치를 정하는 것이 쉽지 않지만 이진탐색트리에서는 삽입, 삭제, 탐색 연산을 구체화할 수 있다.

### 탐색

이진탐색트리에서 찾고자 하는 key를 키 값으로 가진 노드를 탐색한다.

탐색은 항상 루트노드에서 시작하는데, 루트노드와의 비교 결과는 다음 세 가지 중 하나이다. 루트 아래 노드에서도 같은 과정을 반복한다.

1. 키가 루트의 키 값과과 같으면, 찾는 노드는 루트이다. 탐색은 완료된다.
2. 키가 루트의 키 값보다 작으면, 찾는 노드는 왼쪽 서브 트리에 있다. 루트의 왼쪽 자식을 기준으로 탐색을 재개한다.
3. 키가 루트의 키 값보다 크면, 찾는 노든 오른쪽 서브 트리에 있다. 루트의 오른쪽 자식을 기준으로 탐색을 재개한다.

```c
// 이진탐색트리의 순환적인 탐색함수
TNode* search(TNode* n, key)
{
  if (n == NULL) return NULL;
  else if (key == n -> data) return n;
  else if (key < n -> data) return search(n -> left, key);
  else return search(n -> right, key);
}

// 이진탐색트리의 반복적인 탐색함수
TNode* search_iter(TNode *m, int key)
{
    while (n != NULL) {
        if (key == n -> data) return n;
        else if (key < n -> data) n = node -> left;
        else n = node -> right;
    }
    return NULL;
}
```

### 삽입

1. 삽입하고자 하는 값이 탐색에 성공하면, 삽입이 불가능하다. 이진 탐색 트리에서 모든 노드들은 유일한 키 값을 가져야 하기 때문이다.
2. 삽입하고자 하는 값이 트리 안에 없으면, 탐색이 실패로 끝난 위치에 삽입하고자 하는 값을 삽입한다.

```c
int insert(TNode* r, TNode* n)
{
  if (n -> data == r -> data) return 0;
  else if (n -> data < r -> data) {
    if (r -> left == NULL) r -> left = n;
    else insert(r -> left, n);
  }
  else {
    if (r -> right == NULL) n -> right = n;
    else insert(r -> right, n);
  }
  return 1;
}
```

### 삭제

Case 1 : 단말 노드를 삭제하는 경우

해당하는 부모의 링크 필드를 NULL로 변경한다. 또한 동적으로 해제한다.

Case 2 : 자식이 하나인 노드를 삭제하는 경우

저신을 삭제하고 유일한 자식을 부모 노드에 연결한다.

Case 3 : 두 개의 자식을 모두 갖고 있는 경우

1. 삭제하는 노드의 왼쪽 서브트리에서 가장 큰 값이나 오른쪽 서브트리에서 가장 작은 값을 후계자 노드로 선택한다.
2. 후계자 노드로 삭제 노드를 대체한다.
3. 후계자로 사용한 노드를 삭제한다. 

```c
void delete (TNode* r, TNode$ n)
{
  TNode *child, *succ, *succp;

  // case 1
  if ((n -> left == NULL && n -> right == NULL)) {
    if (parent == NULL) root == NULL;
    else {
      if (parent -> left == n)
        parent -> left = NULL;
      else parent -> right = NULL;
    }
  }

  // case 2
  else if (n -> left == NULL || n -> right == NULL) {
    child = (n -> left != NULL) ? n -> left : node -> right;
    if (n == root) root = child;
    else {
      if (parent -> left == n)
        parent -> left = child;
      else parent -> right = child;
    }
  }

  // case 3
  else {
    succp = n;
    succ = n -> right;
    while (succ -> left != NULL) {
      succp = succ;
      succ = succ -> left;
    }
    if (succp -> left == succ)
      succp -> left = succ -> right;
    else succp -> right = succ -> data;

    n -> data = succ -> data;
    n = succ;
  }
  free(n);
}
```

크기가 n인 이진 탐색 트리에서 탐색 연산, 삽입 연산, 삭제 연산의 시간 복잡도

|이진탐색트리의 연산|평균 시간 복잡도|최악의 시간 복잡도|
|---|---|---|
|탐색 연산|$O(log_2n)$|O(n)|
|삽입 연산|$O(log_2n)$|O(n)|
|삭제 연산|$O(log_2n)$|O(n)|
