import requests
import random
import time

for i in range(10):
    value = random.randint(0,99)
    requests.get("https://api.thingspeak.com/update?api_key=5YK9E6T8P6FKETZS&field2="+str(value))
    time.sleep(20)


