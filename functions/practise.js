function eliminateDuplicates(arr) {
var i;
var len=arr.length;
var out=[];
var obj={};

for (i=0;i<len;i++) {
obj[arr[i]]=0;
}
for (i in obj) {
out.push(i);
}
return out;
}
