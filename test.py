# a = range(5)
# print(*a)
# b = range(1,10)
# print(*b)
# c = range(1,10,2)
# print(*c)

# d = list([1,4,10,21])
# print(d[3])

# d = list([1,2,3,4])
# print(d[3])

# e = list('abcd')
# print(e)
    
# f = list("abcd")
# print(f)

# b = list('abcd')
# print(a==b)

# a = list([1,2,3,4])
# b = a[1:2]
# c = a[:3]
# d = a[1:]
# e = a[:]

# print(a,b,c,d,e)
# print(len(a))
# print(min(a))
# print(max(a))

# del a[2]
# print(*a)

# a = [[1,2,3,4],[5,6,7,8]]

# for i in a:
#     for j in i:
#         print(j)


# country = {'th':'Thailand','jp':'Japan','kr':'korea'}
# data = {'even':[2,4,6], 'odd':[3,5,7]}

# keys = country.keys()

# for key in country.keys():
# # for key in country():
#     print(country[key])

# print(country['th'])
# print(data['even'])

# import numpy as np
# a = np.array([2,4,6,8])
# print(a)


import numpy as np

a = np.array([2,4,6,8])
b = np.zeros(5)
c = np.full(5,8)
d = np.arange(0,10,2)
e = np.linspace(1,10,4)
f = np.random.uniform(1,101,5)
g = np.random.rand(10)


# #a = np.array([2,4,6,8,10,12])
# #idx = [0,2,5]

# #b = a[idx]
# # %%


# a = np.array([[1,2,3],[4,5,6],[7,8,9],[10,11,12]])
# #b = a[1:3,:3:2]
 
# #print(a[1,1])

# a1 = np.arange(1,11)
# ar = a1.reshape(2,5)     #เปลี่ยนรูปแบบตาราง จาก 1หลัก 10แถว -> 5หลัก 2แถว

# import pandas as pd

# from IPython.display import display

# data = [[10,50,80,567],
#        [5,25,75,432],
#        [15,30,60,777],
#        [10,40,70,555]]

# df = pd.DataFrame(data,
#                   index=list('ABCD'),
#                   columns=['One','Two','Three','Four'])