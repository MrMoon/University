def main():
  departments = {}

  for i in range(1, 4):
    department_id = int(input(f"Enter department ID for department {i}: "))
    while True:
      try:
        title = input(f"Enter department title for department {i}: ")
        sales = float(input(f"Enter total sales for department {i}: "))
        expenses = float(input(f"Enter total expenses for department {i}: "))
        if sales <= 0 or expenses < 0:
          raise ValueError("Sales must be positive and expenses cannot be negative.")
        break
      except ValueError as e:
        print(f"Error: {e}. Please enter valid data.")

    if sales > 0:
      profit_margin = (sales - expenses) / sales
    else:
      profit_margin = 0 
    departments[department_id] = {'title': title, 'sales': sales, 'expenses': expenses, 'profit_margin': profit_margin}

  most_profitable_id = None
  highest_profit_margin = 0
  for department_id, details in departments.items():
    if details['profit_margin'] > highest_profit_margin:
      highest_profit_margin = details['profit_margin']
      most_profitable_id = department_id

  print(f"\nThe most profitable department is {most_profitable_id} ({departments[most_profitable_id]['title']})")
  print(f"Profit Margin: {highest_profit_margin:.2f}") 

if __name__ == "__main__":
  main()
