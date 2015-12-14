import rethinkdb as r
r.connect( "140.109.18.141", 28015).repl()

cursor ＝r.db("hackathon_DB").table("Air_Q").run()
for document in cursor:
    print(document)

# cursor = r.table("authors").run()
# for document in cursor:
#     print(document)
