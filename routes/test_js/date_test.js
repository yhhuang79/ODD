var d = new Date();
var x = new Date();
console.log('d:',d);
console.log('Today is: ' + d.toLocaleString());

d.setDate(d.getDate() - 5);

console.log('5 days ago was: ' + d.toLocaleString());
console.log('5 days ago was: ' + (d.getTime()/1000)/(x.getTime()/1000) );