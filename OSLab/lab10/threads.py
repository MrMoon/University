from threading import Thread

def find(word, filename):
  counter = 0
  with open(filename, 'r') as file:
    for line in file:
      counter += line.lower().count(word.lower())  # assuming case-insensitive search :D
  return word, counter

def main():
  # assuming that words are spaced out
  words = input("Enter a list of words to search: ").split(' ')
  threads = []
  results = {}

  for word in words:
    thread = Thread(target=find, args=(word.strip(), "sample.txt"))
    thread.start()
    threads.append(thread)

  for thread in threads:
    thread.join()

  for thread in threads:
    word, count = thread.result()
    results[word] = count

  for word, count in results.items():
    print(f"Word '{word}' occurred {count} times")

if __name__ == "__main__":
  main()
