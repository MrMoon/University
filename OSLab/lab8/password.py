import re

def isValid(password):
    if len(password) < 7 or len(password) > 39:
        return False, "Password must be between 6 and 40 characters long."

    if not re.search(r"[a-z]", password):
        return False, "Password must contain at least one lowercase letter."
    if not re.search(r"[A-Z]", password):
        return False, "Password must contain at least one uppercase letter."
    if not re.search(r"\d", password):
        return False, "Password must contain at least one digit."
    if not re.search(r"[!@#$%^&*-_]", password):
        return False, "Password must contain at least one special character: !@#$%^&*-_"
    if re.search(r"\s", password):
        return False, "Password cannot contain spaces."

    return True, "Password is Good!" 

password = input("Enter your password: ")
valid, message = isValid(password)

if valid:
    print(message)
else:
    print(message, "Please try again.")
