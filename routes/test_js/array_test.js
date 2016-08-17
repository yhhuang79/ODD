var s = [
    {"test":1}
    ];

s[0]["test2"]=2;
s[0]["test3"]=333;

s[0]["test5566"]=[];
console.log(s[0]["test5566"].length);

if(s[0]["test5566"]==undefined)
{
    console.log("YE");
}


// s[0]["test5566"].unshift(1);
// s[0]["test5566"].unshift(2);
// console.log(s);
// for(var x in s[0])
// {console.log(x)}
// console.log(s[0])
//console.log((new Date()).getTime());

// var num = 123456.789;
// num=num.toFixed(0);
// console.log(num);