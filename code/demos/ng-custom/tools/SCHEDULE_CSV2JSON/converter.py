import csv, glob, json, re

def addToArray(array, row):
	cellIndex = 0
	for cell in row[1:]:
		if cell == '':
			cellIndex += 1
			continue
		
		if row[0] != 'id' and row[0] != 'studentId' and row[0] != 'eventId' and row[0] != 'categoryId' and row[0] != 'day' and re.match('^\d+$', cell):
			cell = int(cell)
		elif cell == 'FALSE':
			cell = False
		elif cell == 'TRUE':
			cell = True
		
		if cellIndex >= len(array):
			obj = {}
			array.insert(cellIndex, obj)
		array[cellIndex][row[0]] = cell
		cellIndex += 1

file = "data.csv"

jsonData = {}
jsonData['schedule'] = {}
jsonData['events'] = {}

scheduleData = jsonData['schedule']
eventsData = jsonData['events']

students = []
eventStudents = []
events = []
categories = []
schedule = []

studentMap = {}
eventStudentMap = {}
categoryMap = {}

csvfile = open(file, 'rU')
csvreader = csv.reader(csvfile, delimiter=',', quotechar='"')
rowNum = 0
cellNum = 0
for row in csvreader:
	rowNum += 1
	if row[0] == '':
		continue
	
	if rowNum > 1 and rowNum < 8:
		addToArray(students, row)
	elif rowNum > 9 and rowNum < 31:
		addToArray(eventStudents, row)
	elif rowNum > 32 and rowNum < 38:
		addToArray(events, row)
	elif rowNum > 39 and rowNum < 43:
		addToArray(categories, row)
	elif rowNum > 44 and rowNum < 47:
		addToArray(schedule, row)
	'''
	elif rowNum == 9:
		userData['userId'] = row[2]
	elif rowNum <= 32:
		user['details'].append(row)
	elif rowNum <= 35:
		user[row[0]] = row[1]
	elif rowNum <= 40:
		user['topData'].append([row[1], row[2]])
	else:
		userData['isMeetingGoals'] = (row[1] == "TRUE")
		
tabFile = userData['userId'] + '.json'
print tabFile
tabData = open(tabFile, 'r').read()
user['tabData'] = json.loads(tabData)

if userData['isMeetingGoals']:
	meetingGoals.append(userData)
else:
	jsonData['list'].append(userData)

jsonData['map'][plpId] = user
	

jsonData['list'].extend(meetingGoals)	

f = open('plp.json', 'w')
f.write(json.dumps(jsonData))
	'''

for student in students:
	studentMap[student["id"]] = student

for category in categories:
	categoryMap[category["id"]] = category

for eventStudent in eventStudents:
	key = eventStudent["eventId"]
	if key not in eventStudentMap:
		eventStudentMap[key] = []
	student = studentMap[eventStudent["studentId"]]
	eventStudentMap[key].append(dict(eventStudent.items() + student.items()))
	

for event in events:
	eventData = dict(event.items())
	categoryIds  = eventData['categoryIds'].split(',')
	del eventData['categoryIds']
	eventData['categories'] = []
	for categoryId in categoryIds:
		key = categoryId
		if key not in categoryMap:
			continue
		eventData['categories'].append(categoryMap[key])
	eventData['users'] = []
	if eventData['id'] in eventStudentMap:
		eventData['users'] = eventStudentMap[eventData['id']]
	eventsData[eventData['id']] = eventData

for item in schedule:
	if 'eventIds' not in item or item['eventIds'] == '':
		continue
	scheduleData[item["day"]] = item['eventIds'].split(",");

f = open('schedule.json', 'w')
f.write(json.dumps(jsonData))