---
title: "[Machine Learning] 이진 분류 문제와 단일 퍼셉트론"
excerpt:
categories:
  - machinelearning
---
## 1. Binary Classification Problem and Dicision function

Classification problems are divided into two categories: binary classification, and multiple classification, which is classified into three or more categories. In this article, we will discuss logistic regression, the most representative algorithm for solving linearly distinguishable binary classification problems.

Essensially, Binary classification is a problem that find a decision function to separate the classes. In order to determine the categroy of new input data, we should obtain the linear decision function. So we just need coefficient of the function.

>$$
w_0 + w_1 x_1 + w_2 x_2 =
    \begin{bmatrix}
    w_{1} & w_{2} & w_{3}
    \end{bmatrix}
    \begin{bmatrix}
    1 \\
    x_{1} \\
    x_{2} \\
    \end{bmatrix}
$$

![classification](https://github.com/williamkevin/williamkevin.github.io/assets/99346062/7b925b4f-707b-49e9-9779-35b0977d4532)

## 2. Logistic Regression and Logistic Loss Function

Logistic regression is a supervised learning algorithm that obtains probability values for input data to fall into a certain category and binarizes them.

The logistic loss function mimics the Cross Entropy Loss Function, a loss function for multiple classifications. Differentiating the logistic loss function for wi yields the same result as differentiating the square error.

$$
L = -\displaystyle\sum_{i=1}^{n} y_i \log p_i + (1 - y_i) \log (1 - p_i)
    = -\sum_{i=1}^{n} y_i \log\left(\frac{1}{1 + e^{-(w_0 + w_1 x_{1i} + w_2 x_{2i})}}\right) - (1 - y_i) \log\left(1 - \frac{1}{1 + e^{-(w_0 + w_1 x_{1i} + w_2 x_{2i})}}\right)
$$

Since this function is covex, we can use this function as loss function and this function must have minimum point. Our final goal is to minimize the function.

<img src="../../../../assets/images/logistic_loss_function_y=0.jpg">
<img src="../../../../assets/images/logistic_loss_function_y=1.jpg">

## 3. Ouput

<img src="../../../../assets/images/perceptron.png">

>$$
a = w_0 + w_1 x_1 + w_2 x_2 =
    \begin{bmatrix}
    w_{1} & w_{2} & w_{3}
    \end{bmatrix}
    \begin{bmatrix}
    x_{0} \\
    x_{1} \\
    x_{2} \\
    \end{bmatrix}
$$

```py
# Activate value
a = np.dot(X_cl, weight)
```

## 4. Sigmoid Function

<img src="../../../../assets/images/sigmoid.jpg">

A sigmoid function is a nonlinear function that transforms a number in the real number range into a probability value between 0 and 1. Logistic regression models that solve binary classification problems return a combination of inputs and weights as probabilities.

>$$p_i = \frac{1}{1+e^{-a_i}}$$

```py
def sigmoid ( x ):
    f = 1.0 / ( 1.0 + np.exp ( - x ) )
    return f

...

# Probability of Activation Value
p = sigmoid(a)
```

## 5. Gradient Descent and Backpropagation

$$\frac{\partial L}{\partial p_i} = -\sum_{i=1}^{n}\{\frac{y_i}{p_i} + (1 - y_i)\frac{(-1)}{1 - p_i}\} 
= - \sum_{i=1}^{n}\frac{y_i (1 - p_i) - p_i (1 - y_i)}{p_i (1 - p_i)}
= - \sum_{i=1}^{n}\frac{y_i - p_i}{p_i (1-p_i)}
$$

$$\frac{\partial p_i}{\partial a_i} 
= - \frac{-e^{-a_i}}{1 + e^{-a_i}} 
= \frac{1}{1 + e^{-a}} \cdot(1 - \frac{1}{1 + e^{-a}}) 
= p_i (1 - p_i)$$

$$\frac{\partial a_i}{\partial w_i} = x_i$$

$$\frac{\partial L}{\partial w_i} = \frac{\partial L}{\partial p_i} \cdot \frac{\partial p_i}{\partial a_i} \cdot \frac{\partial a_i}{\partial w_i} 
= - \sum_{i=1}^{n}\frac{y_i - p_i}{p_i (1-p_i)}\cdot p_i (1 - p_i) \cdot x_i 
= - \sum_{i=1}^{n} x_i(y_i - p_i)
= \textbf{x}^T \textbf{e}
$$

```py
# Error = (Real Value) - (Predication Value)
e = y_binary - p
# Gradient Descent
g = -np.dot(X_cl.T, e)
# Weight Update
w -= eta * g
```

## Full Code

![classification](https://github.com/williamkevin/williamkevin.github.io/assets/99346062/7b925b4f-707b-49e9-9779-35b0977d4532)

```py
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Data
X_pls = [[29.78496537791149, 1.0302119366754376], [26.786635354170148, 1.7878352257432417], [1.8317769970938553, 0.9616764742214289], [-14.808647664467793, 1.8610562381731708], [-0.6292987611603497, 0.44524103262830805], [23.346246940810662, 1.6123967840673492], [25.09821970282512, 1.7613381411484954], [24.874386381192046, 1.5011081680935234], [-0.56019170550253, 1.4437810955141346], [-18.789215887215533, 1.1478860352173998], [17.35268662482227, 1.2737242902701698], [-2.8327907605331277, 0.1008979810156459], [-15.184916813296095, 0.32101913239730484], [23.443035974499445, 0.5484119772008724], [-2.6913579085118418, 0.33399940947032514], [22.777477018898356, 1.7486882365032637], [3.2390527938818834, 0.013479447698555191], [-6.064075025238351, 1.1093633214101224], [14.727552591346878, 0.3173532694559882], [3.383648185399231, 1.0898538438302112], [23.870520679848486, -2.235086350107883], [23.87079859375568, -2.115161785406152], [26.435905938378806, -2.0817903884949067], [26.029024086565645, -1.2743737380923013], [27.72724983714293, -2.248233947688541], [13.938008402761985, -2.247919177969493], [16.858051791235596, -0.9178590049437738], [17.172220173770743, -0.8495464094681286], [15.308120004626364, -1.006616198914295], [-22.373115455557105, -1.424604282613199], [-3.145012183886201, -1.134496218620869], [-32.388060520211695, -0.41432052251600693], [-21.515819604994242, -1.2868056792452065], [-23.764804907105916, -0.6007868522199344], [-48.78245706766416, -0.45244412037450754], [-51.04558056568145, 0.07475129660745683], [-30.387122813850013, -0.4823620257735617], [-32.46442753033612, 0.014092635398237796], [-42.653617808545164, 0.2970841002806832], [-37.775070467179965, -0.022843370572643185]]
y_binary = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
X_cl = np.c_[np.ones((len(X_pls), 1)), X_pls]  

def sigmoid ( x ):
    f = 1.0 / ( 1.0 + np.exp ( - x ) )
    return f

# weight initialization
w = np.random.random(size=np.array(X_cl).shape[1])  
# Learning Rate
eta = 0.01
# repetitation
iteration = 500
for l in range(iteration):  
    # activation value
    a = np.dot(X_cl, w)
    # probability of activation value
    p = sigmoid(a)
    # error = real value - prediction value
    e = y_binary - p
    # Gradient Descent
    g = -np.dot(X_cl.T, e)
    # weight update
    w -= eta * g

    # 출력
    if l % 50 == 0:
        xx, yy = np.meshgrid(np.linspace(X_cl[:, 1].min(), X_cl[:, 1].max(), 50),
                            np.linspace(X_cl[:, 2].min(), X_cl[:, 2].max(), 50))
        Z = sigmoid(np.dot(np.c_[np.ones_like(xx.ravel()), xx.ravel(), yy.ravel()], w))
        Z = Z.reshape(xx.shape)

        labplot = ["100/0 ratio", "90/10 ratio"]
        unique = list(set(y_binary))
        colors = [plt.cm.jet(float(i)/max(unique)) for i in unique]

        with plt.style.context(('ggplot')):
            plt.figure(figsize=(10, 8))
            for i, u in enumerate(unique):
                col = np.expand_dims(np.array(colors[i]), axis=0)
                xi = [X_pls[j][0] for j in range(len(X_pls)) if y_binary[j] == u]
                yi = [X_pls[j][1] for j in range(len(X_pls)) if y_binary[j] == u]
                plt.scatter(xi, yi, c=col, s=100, edgecolors='k', label=str(u))

            plt.contour(xx, yy, Z, colors='k', alpha=0.75, levels=[0.5], linestyles=['-'])      
            plt.xlabel('x 1')
            plt.ylabel('x 2')
            plt.legend(labplot, loc='lower left')
            plt.title('Binary Classification by Logistic Regression')
            plt.show()
    print(l, "번째", w)
```
