from multiprocessing import Pool
import os

def search(filename, word):
  if not os.path.isfile(filename):
    return f"Error > File '{filename}' doesn't exist."

  count = 0
  try:
    with open(filename, 'r') as f:
      for line in f:
        count += line.count(word)

  except FileNotFoundError:
    return f"Error > File '{filename}' isn't found."

  except PermissionError:
    return f"Error > Permission denied for '{filename}'"

  if count > 0:
    return f"The word \"'{word}'\" is found {count} times in the file '{filename}'"

  return f"'{word}' doesn't appear any number of times in '{filename}'"

p = Pool(processes=2)

while True:
  filename = input("Enter a filename with its path (or 'q' to quit) > ")
  if filename.lower() == 'q':
    break
  word = input("Enter a word to search > ")

  result = p.starmap(search_file, [(filename, word)])
  print(result[0])

p.close()
p.join()
