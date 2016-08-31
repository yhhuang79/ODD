function getMethods(obj)
{
    var res = [];
    for(var m in obj) {
        if(typeof obj[m] == "function") {
            res.push(m)
        }
    }
    return res;
}


module.exports =
{
    BOT:function()
    {
        var SlackBot = require('slackbots');
        // create a bot
        var bot = new SlackBot({
            token: 'xoxb-74267961879-gTkTCFvd9ymja4BdID2Vt0hU', // Add a bot https://my.slack.com/services/new/bot and put the token
            name: 'ODD BOT'
        });
        var params = {
            icon_emoji: ':scream_cat:'
        };
        var member_list=null;
        bot.on('start', function()
        {
            member_list = bot.getUsers()['_value']['members'];
            console.log('members: ',bot.getUsers()['_value']['members']);
            //bot.postMessageToUser('tinjuiho', 'hahaha ODD initiated!!', params);
            //console.log(bot.getUserId('tinjuiho'));
            // more information about additional params https://api.slack.com/methods/chat.postMessage
        });


        bot.on('message', function (data)
        {
            // all ingoing events https://api.slack.com/rtm
            //console.log('data',data);

            if ( (data.text) == 'HIHI' )
            {
                console.log('data:',data);
                var id = data['user'];
                var name = null;
                var real_name = null ;
                for(var index in member_list)
                {
                    if(member_list[index]['id']==id)
                    {
                        name = member_list[index]['name'];
                        real_name = member_list[index]['real_name'];
                        break;
                    }
                }

                //console.log(name);

                //bot.postMessage(data['channel'], 'hi! ', params);

                //bot.postTo('tinjuiho','hi!');

                bot.postMessageToUser(name, 'Hi! '+ real_name , params,
                    function(data2)
                    {
                        console.log('data2',data2);

                    });
            }

        });
    }


}