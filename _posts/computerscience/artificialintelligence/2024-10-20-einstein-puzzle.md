---
title: "[Artificial Intelligence] Einstein Puzzle"
categories:
  - artificialintelligence
---
# Introduction

[Einstein Puzzle](https://www.brainzilla.com/logic/zebra/einsteins-riddle/)

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

Color_blue, Color_green, Color_red, Color_white, Color_yellow
Nationality_Brit, Nationality_Dane, Nationality_German, Nationality_Norwegian, Nationality_Swede
Drink_beer, Drink_coffee, Drink_milk, Drink_tea, Drink_water
Cigarette_blends, Cigarette_bluemaster, Cigarette_dunhill, Cigarette_pallmall, Cigarette_prince
Pet_birds, Pet_cats, Pet_dogs, Pet_horses, Pet_fishes

## Domains

$$
\{ 1, 2, 3, 4, 5 \}
$$

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
10. |Cigarette_blends - Pet_cats| = 1
11. |Pet_horses - Cigarette_dunhill| = 1
12. Cigarette_bluemaster = Drink_beer
13. Nationality_German = Cigarette_prince
14. |Nationality_Norwegian - Color_blue| = 1
15. |Cigarette_blends - Drink_water| = 1

# Solve