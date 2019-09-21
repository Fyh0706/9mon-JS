function createDiv() {
    const li = document.createElement("li");
    const p1 = document.createElement("p");
    const a = document.createElement("a");
    const img = document.createElement("img");
    const p2 = document.createElement("p");
    const a2 = document.createElement("a");
    const span = document.createElement("span");
    const span2 = document.createElement("span");
    const p3 = document.createElement("p");
    const b = document.createElement("b");
    const div = document.createElement("div");
    const table = document.createElement("table");
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    const a3 = document.createElement("a");
    const span3 = document.createElement("span");
    const td2 = document.createElement("td");
    const a4 = document.createElement("a");
    const span4 = document.createElement("span");
     
    p1.className = "p-img";
    p2.className = "p-name";
    p3.className = "p-price";
    div.className = "p-button";
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    li.appendChild(div);
    p1.appendChild(a);
    p1.appendChild(img)
    p2.appendChild(a2);
    p2.appendChild(span);
    p2.appendChild(span2)
    p3.appendChild(b);
    div.appendChild(table);
    table.appendChild(tr);
    tr.appendChild(td);
    tr.appendChild(td2)
    td.appendChild(a3);
    td.appendChild(span3)
    td2.appendChild(a4)
    td2.appendChild(span4)
    return li;

    const body = document.querySelector(".body");
}
for(let i=0;i<5;i++){
    body.appendChild(createDiv());
}








