processes = {}

for i in range(4):
  process_id = int(input(f"Enter process ID for process {i + 1}: "))
  while True:
    try:
      output = float(input(f"Enter output for process {process_id}: "))
      input_value = float(input(f"Enter input for process {process_id}: "))

      if output <= 0 or input_value <= 0:
        raise ValueError("Output and input must be positive values.")
      break;
    except ValueError as e:
      print(f"Error: {e}. Please enter positive values.")

  processes[process_id] = {'output': output, 'input': input_value};


for process_id, details in processes.items():
  details['productivity'] = details['output']/details['input']


most_productive_id = None
highest_productivity = 0

for process_id, details in processes.items():
  if details['productivity'] > highest_productivity:
    highest_productivity = details['productivity']
    most_productive_id = process_id

print(f"The most productive process is process {most_productive_id} with a productivity of {highest_productivity:.2f}")