import csv, glob, json

files = glob.glob('*.csv')

jsonData = {}
jsonData['list'] = []
jsonData['map'] = {}

meetingGoals = []

plpId = 100

for file in files:
	with open(file, 'rU') as csvfile:
		csvreader = csv.reader(csvfile, delimiter=',', quotechar='"')
		rowNum = 0
		
		plpId += 1
		
		user = {}
		user['topData'] = []
		user['details'] = []
		
		userData = {}
		userData['isMeetingGoals'] = True
		userData['plpId'] = plpId
		
		for row in csvreader:
			rowNum += 1
			if row[0] == '':
				continue
			
			if rowNum == 1 or rowNum == 2:
				userData[row[0]] = row[2]
			if rowNum == 9:
				userData['userId'] = row[2]
			if rowNum <= 32:
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
	