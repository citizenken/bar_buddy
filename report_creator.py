import requests
import sys
import time
from random import randint
import copy
import json

report = {
    "composition": {
        "value": None,
        "label": "testing"
    },
    "count": {
        "value": None,
        "label": "Testing"
    },
    "location": None,
    "reporter": None
}

reporters = ['chonel', 'jorden', 'ken', 'nicole', 'jeff', 'ian', 'matt', 'cameron']

locations = [
{
  "address": "1430 Commonwealth Avenue, Brighton, MA 02135, United States",
  "name": "Harry's Bar & Grill",
  "lat": 42.348356,
  "lon": -71.139925
},
{
  "address": "1612 Commonwealth Avenue, Brighton, MA 02135, United States",
  "name": "Tasca",
  "lat": 42.343333,
  "lon": -71.14268600000003
},
{
  "address": "903 Boylston Street, Boston, MA 02115, United States",
  "name": "Lir",
  "lat": 42.34843,
  "lon": -71.08417199999997
},
{
  "address": "113 Dartmouth Street, Boston, MA 02116, United States",
  "name": "Clerys",
  "lat": 42.346131,
  "lon": -71.075197
},
{
  "address": "1648 Beacon Street, Brookline, MA 02445, United States",
  "name": "The Publick House",
  "lat": 42.339359,
  "lon": -71.136664
},
]

def generate_reports():

  if len(sys.argv) < 2:
    print "No total reports passed in"
    sys.exit()

  total_reports = sys.argv[1]
  iterator = 0
  url = "http://black-wave-71-193261.use1.nitrousbox.com:1337/report"

  while (iterator < int(total_reports)):
    r = copy.deepcopy(report)
    r["composition"]["value"] = randint(0,15)
    r["count"]["value"] = randint(0,15)
    r["location"] = locations[randint(0,4)]
    r["reporter"] = reporters[randint(0,7)]
    r_json = json.dumps(r)

    requests.post(url, data=r_json)
    print "Submitting report " + str(iterator) + "/" + total_reports
    time.sleep(2)
    iterator = iterator + 1

generate_reports()

# if __name__ == "__main__":
    # generate_reports()


