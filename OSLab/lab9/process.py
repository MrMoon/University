from multiprocessing import Process

def isValid(ip_address):
  try:
    ABCD = ip_address.split(".")
    if len(ABCD) != 4:
      return False
    for x in ABCD:
      try:
        x_value = int(x)
        if not (0 <= x_value <= 255):
          return False
        if len(x) > 1 and x.startswith("0"):
          return False
      except ValueError:
        return False
    return True
  except ValueError:
    return False

def validate_process():
  while True:
    ip_address = input("Enter a valid IP address (example: 192.168.1.1 is valid, while 01.10.12.12 isn't valid) > ")
    if isValid(ip_address):
      print("The IP ", ip_address, "is valid.")
      break
    else:
      print("Invalid IP. Please try again.")

p = Process(target=validate_process)
p.start()
p.join()
print("DONE")
