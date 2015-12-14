#!/usr/bin/python
# import cgi
import rethinkdb as r

print "go !"

#how much time before now
t = 60*60*24


#connect to rethinkDB and query
host= "140.109.18.141"
port = 28015

###################
## connect to DB ##
###################
r.connect( host, port).repl()

feed = r.db('hackathon_DB').table("Error_log").changes().run()
for document in feed:
###########
## query ##
###########
    query = r.db('hackathon_DB').table("Error_log").filter(r.row["start_time"].ge(r.now().to_epoch_time()-t)).order_by("start_time").run()

    ####################
    ## make data type ##
    ####################
    data = []
    for i in range(len(query)):
        x = int(query[i]['start_time'].encode('UTF-8'))
        y = float(query[i]['success'].encode('UTF-8'))
        data.append([x, y])

    print data

    data1 = str(data)
    filename = 'error_data'
    with open(filename, 'w') as f:
        f.write(data1)
