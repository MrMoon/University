import random

def random_num_func():
  x = random.randint(1, 100)
  y = random.randint(1, 100)

  if x == y:
    return f"Both numbers are the same, the number is {x}"
  
  return ""

n = int(input("Enter the number of times to run the random number check: "))

for _ in range(n):
  print(random_num_func())