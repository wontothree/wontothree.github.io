---
title: "[C++] 클래스의 완성"
categories:
  - cpp
---
## 3. Constructor and Destructor

생성자를 이용하면 객체를 생성함과 동시에 초기화할 수 있다.

```cpp
class SimpleClass
{
private:
    int num;
public:
    SimpleClass(int n)
    {
        num = n;
    }
    int GetNum() const
    {
        return num;
    }
};
```

위 클래스에서 다음의 형태를 띠는 함수가 있다. (생성자 함수)

- 클래스의 이름과 함수의 이름이 동일하다.
- 반환형이 선언되어 있지 않으며, 실제로 반환하지 않는다.

생성자 함수는 객체 생성 시 딱 한 번 호출된다.
