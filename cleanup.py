#!/usr/local/bin/python3
import json
import os

try:
	plugin = os.environ['KMVAR_BCEName']
	folder = os.environ['KMVAR_BCEFolderLocation']
except:
	print ('Error getting environment vars, exiting')
else:
	# get json
	with open(folder + '/plugin_db.json', 'r') as f:
		db = json.loads(f.read())

	found = False
	for target in db:
		if target['plugin'] == plugin:
			found = True
			# increase rank
			target['rank'] += 1
			print (target['plugin'] + ' new rank is ' + str(target['rank']))
			# write back to json file
			with open(folder + '/plugin_db.json', 'w') as f:
				json.dump(db, f)
			break
	print ('Data dump: ')
	print (json.dumps(db, indent=4))