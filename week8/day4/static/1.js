var btn = document.getElementById('btn');
btn.onclick = function () {
    var h1 = document.querySelector('h1')
    h1.style.background = 'blue';
    fetch('http://localhost:8080/add',{
        method:'post',
        credentials:'include',
        body:JSON.stringify({a:[100,200,300]})
    }).then(data => data.json()).then(data => {
        console.log(data);
        
    })
}
btn2.onclick=function(){
    fetch('http://localhost:8080/list?type=cookie',{
        // method:'post',
        // credentials:'include',
        // body:JSON.stringify({a:[100,200,300]})
    }).then(data => data.json()).then(data => {
        console.log(data);
        
    })
}