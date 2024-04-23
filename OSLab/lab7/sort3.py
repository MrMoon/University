def sort3(data):
  divisible_by_three = [num for num in data if num % 3 == 0]
  not_divisible_by_three = [num for num in data if num % 3 ]

  divisible_by_three = list(set(divisible_by_three))
  divisible_by_three.sort();

  not_divisible_by_three = list(set(not_divisible_by_three))
  not_divisible_by_three.sort()
  
  return divisible_by_three + not_divisible_by_three

data = [1, 2, 3, 4, 5, 6, 7,7, 8, 9]
reordered_data = sort3(data)
print(reordered_data)

