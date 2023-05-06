let list = document.querySelector("#list")
let fruits = ["Apple", "Orange", "Banana", "Melon"]

let fragment = new DocumentFragment()

fruits.forEach(function(fruit){
    let li = document.createElement("li")
    li.innerHTML = fruit
    fragment.appendChild(li)
})

list.appendChild(fragment)