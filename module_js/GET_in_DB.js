var async = require('async');
var r = require('rethinkdb');
var rethinkdbHost = "140.109.18.136";
var connection1=null;

module.exports =
{
    storage_and_documents:function(database_name, table_name,callback)
    {

        async.waterfall
        (
            [
                function(callback_waterfall)
                {
                    r.connect( {host: rethinkdbHost, port: 28015}, function(err, conn) {

                        if (err) throw err;
                        callback_waterfall(null, conn );
                        //connection = conn;
                    });
                },
                function(conn, callback_waterfall)
                {
                    connection1=conn;

                    async.parallelLimit(
                        {
                            storage: function(callback_parallelLimit)
                            {
                                r.db('rethinkdb').table('stats').
                                filter(
                                    function(row){return row('id')(0).eq('table_server').and(row('table').eq(table_name))}
                                )
                                ('storage_engine')('disk')('space_usage')('data_bytes').sum().run(connection1,
                                    function(err, cursor) {
                                        if (err)
                                        {
                                            callback_parallelLimit(err);
                                        }
                                        else
                                        {
                                            //console.log(cursor);
                                            callback_parallelLimit(null, cursor);
                                        }
                                    });
                            },
                            documents: function(callback_parallelLimit)
                            {
                                r.db(database_name).table(table_name).count().run(connection1,
                                    function(err, cursor) {
                                        if (err)
                                        {
                                            callback_parallelLimit(err);
                                        }
                                        else
                                        {
                                            // console.log(cursor);
                                            callback_parallelLimit(null, cursor);
                                        }
                                    });
                            }
                        },1,
                        function(err, results)
                        {
                            //console.log(results);
                            callback(results); //output

                            callback_waterfall(null);
                            //process.exit();
                            // results is now equals to: {one: 1, two: 2}
                        }
                    );
                }
            ]
        ); //async.waterfall
    }


}