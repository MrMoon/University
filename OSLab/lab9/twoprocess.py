from multiprocessing import Process, Queue

def get():
  queue = Queue()
  for i in range(1, 6):
    path = input(f"Enter directory {i} > ")
    queue.put(path)
  return queue

def validate(queue):
  while not queue.empty():
    path = queue.get()
    if os.path.exists(path):
      print(f"this path \"{path}\" exists")

q = Queue()

p = Process(target=get, args=(q,))
p.start()

p1 = Process(target=validate, args=(q,))
p1.start()

p.join()
p1.join()

print("DONE")
