from threading import Thread

ans = {}

def play_coin_toss(name, choices):
  w = 0
  l = 0

  for choice in choices:
    computer_choice = random.choice(["head", "tail"])
    if choice.lower() == computer_choice:
      w += 1
    else:
      l += 1
  ans[name] = {"wins": w, "losses": l}

if __name__ == "__main__":

  p1c = ["head", "tail", "head"]
  p2c = ["tail", "head", "tail"]

  t1 = Thread(target=play_coin_toss, args=("Aysmeen", p1c))
  t2 = Thread(target=play_coin_toss, args=("Ali", p2c))

  t1.start()
  t2.start()

  t1.join()
  t2.join()

  for player, results in ans.items():
    print(f"Player: {player}")
    print(f"Wins: {results['wins']}")
    print(f"Losses: {results['losses']}")
    print("-" * 20)
