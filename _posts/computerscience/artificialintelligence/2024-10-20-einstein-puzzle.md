---
title: "[AI] Einstein Puzzle"
categories:
  - artificialintelligence
---
# Introduction

[Einstein Puzzle](https://www.brainzilla.com/logic/zebra/einsteins-riddle/) is a famous logic puzzle attributed to Albert Einstein. The puzzle provides a set of clues, and the goal is to deduce the characteristics of each house based on those clues.

Here's the layout of the puzzle:

||House #1|House #2|House #3|House #4|House #5|
|---|---|---|---|---|---|
|Color||||||
|Nationality||||||
|Drink||||||
|Cigarette||||||
|Pet||||||

1. The Brit lives in the Red house.
2. The Swede keeps Dogs as pets.
3. The Dane drinks Tea.
4. The Green house is exactly to the left of the White house.
5. The owner of the Green house drinks Coffee.
6. The person who smokes Pall Mall rears Birds.
7. The owner of the Yellow house smokes Dunhill.
8. The man living in the centre house drinks Milk.
9. The Norwegian lives in the first house.
10. The man who smokes Blends lives next to the one who keeps Cats.
11. The man who keeps Horses lives next to the man who smokes Dunhill.
12. The man who smokes Blue Master drinks Beer.
13. The German smokes Prince.
14. The Norwegian lives next to the Blue house.
15. The man who smokes Blends has a neighbour who drinks Water.

# Constraint Satisfying Problem (CSP)

## Variables

We will define variables to represent the attributes of each house:

Color_blue, Color_green, Color_red, Color_white, Color_yellow, \
Nationality_Brit, Nationality_Dane, Nationality_German, Nationality_Norwegian, Nationality_Swede, \
Drink_beer, Drink_coffee, Drink_milk, Drink_tea, Drink_water, \
Cigarette_blends, Cigarette_bluemaster, Cigarette_dunhill, Cigarette_pallmall, Cigarette_prince, \
Pet_birds, Pet_cats, Pet_dogs, Pet_horses, Pet_fishes

## Domains

Each variable will have a domain of {1, 2, 3, 4, 5}, representing the house numbers.

## Constraints

Alldiff(Color_blue, Color_green, Color_red, Color_white, Color_yellow) \
Alldiff(Nationality_Brit, Nationality_Dane, Nationality_German, Nationality_Norwegian, Nationality_Swede) \
Alldiff(Drink_beer, Drink_coffee, Drink_milk, Drink_tea, Drink_water) \
Alldiff(Cigarette_blends, Cigarette_bluemaster, Cigarette_dunhill, Cigarette_pallmall, Cigarette_prince) \
Alldiff(Pet_birds, Pet_cats, Pet_dogs, Pet_horses, Pet_fishes)

1. Nationality_Brit = Color_red
2. Nationality_Swede = Pet_dogs
3. Nationality_Dane = Drink_tea
4. Color_green = Color_white - 1
5. Color_green = Drink_coffee
6. Cigarette_pallmall = Pet_birds
7. Color_yellow = Cigarette_dunhill
8. Drink_milk = 3
9. Nationality_Norwegian = 1
10. \|Cigarette_blends - Pet_cats\| = 1
11. \|Pet_horses - Cigarette_dunhill\| = 1
12. Cigarette_bluemaster = Drink_beer
13. Nationality_German = Cigarette_prince
14. \|Nationality_Norwegian - Color_blue\| = 1
15. \|Cigarette_blends - Drink_water\| = 1

# Solve

먼저 명시적으로 주어진 조건을 사용한다.

>Drink_milk = 3 \
>Nationality_Norwegian = 1

확정된 Nationality_Norwegian와 관련된 조건을 사용하면, 2번째 집이 파란색이라는 것을 알 수 있다.

>\|Nationality_Norwegian - Color_blue\| = 1

milk가 3번째 집에 해당하기 때문에 다음 조건에 의해 4, 5번째 집의 색이 각각 green, white라는 것을 알 수 있다. 또한 coffee가 4번째 집에 해당한다는 사실도 알 수 있다.

>Color_green = Color_white - 1 \
>Color_green = Drink_coffee

첫 번째 집의 거주자가 Norwegian이므로 3번째 집이 빨간색이고 거주자가 Brit이라는 것을 알 수 있다. 따라서 첫 번째 집은 노란색이다.

>Nationality_Brit = Color_red

첫 번째 집이 노란색이라는 것이 확정되었으니 다음 조건에 의해 dunhill이 첫 번째 집에 해당한다는 것을 확인할 수 있다.

>Color_yellow = Cigarette_dunhill

거주자가 dunhill을 하는 집이 확정되었으므로 다음 조건에 의해 말을 키우는 집도 확정할 수 있다.

>\|Pet_horses - Cigarette_dunhill\| = 1

tea와 beer 모두 첫 번째 집에 놓일 수 없으므로 첫 번째 집의 거주자는 water를 마신다.

>Nationality_Dane = Drink_tea \
>Cigarette_bluemaster = Drink_beer

water의 위치가 확정되었다니 다음 조건에 의해 blend의 위치를 2번째 집으로 확정할 수 있다.

>\|Cigarette_blends - Drink_water\| = 1

다음 조건에 의해 beer와 blue master가 5번째 집에 해당한다는 것을 확인할 수 있다. 자동으로 tea는 두 번째 집에 해당한다.

>Cigarette_bluemaster = Drink_beer

tea의 위치가 결정되었으므로 다음 조건에 의해 Dane의 위치를 결정할 수 있다.

>Nationality_Dane = Drink_tea

다음 조건에 의해 prince와 German이 4번째 집에 해당한다는 것을 알 수 있다. 자동으로 Swede가 5번째 집에 해당하고 Pall Mall이 3번째에 해당한다는 것을 확인할 수 있다.

>Nationality_German = Cigarette_prince

결정된 Swede에 대한 다음 조건에 의해 dog가 5번째 집에 해당한다는 것을 확인할 수 있다.

>Nationality_Swede = Pet_dogs

결정된 pall mall에 대한 다음 조건에 의해 birds가 세 번째 집에 해당한다는 것을 확인할 수 있다.

>Cigarette_pallmall = Pet_birds

다음 조건에 의해 cat의 위치가 1번째 집에 해당한다는 것을 확인할 수 있다.

>\|Cigarette_blends - Pet_cats\| = 1

# Conclusion

The puzzle is solved with the following assignments:

||House #1|House #2|House #3|House #4|House #5|
|---|---|---|---|---|---|
|Color|Yellow|Blue|Red|Green|White|
|Nationality|Norwegian|Dane|Brit|German|Swede|
|Drink|Water|Tea|Milk|Coffee|Beer|
|Cigarette|Dunhill|Blends|Pall Mall|Prince|Blue Master|
|Pet|Cats|Horses|Birds|Fishes|Dogs|
