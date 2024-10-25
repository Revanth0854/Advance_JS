let container = document.querySelector(".dynamic")
let burger = document.querySelector(".burger")
let links = document.querySelector(".nav-links")
let sortBtn = document.querySelector(".sort")
let filterBtn = document.querySelector(".filter")
let links1 = document.querySelector(".sort-links")
let links2 = document.querySelector(".category")
let priceLowToHigh = document.querySelector(".priceLowToHigh")
let priceHighToLow = document.querySelector(".priceHighToLow")
let rating = document.querySelector(".rating")
let starter = document.querySelector(".starter")
let main = document.querySelector(".main")
let veg = document.querySelector(".veg")
let nonveg = document.querySelector(".nonveg")


// =======================      Hamburger       =============

burger.addEventListener("click", () => {
    links.style.classList.toggle("nav-active")
})


// ===============    Sort buttons    ==============

sortBtn.addEventListener("click", () => {
    links1.classList.toggle("new")
    links2.classList.remove("newC")
})

filterBtn.addEventListener("click", () => {
    links2.classList.toggle("newC")
    links1.classList.remove("new")
})



let getRestaurant = async () => {

    let response = await fetch("./new.json");
    let data = await response.json();

    let restaurant = (restaurantData) => {
        container.innerHTML = "";
        restaurantData.map((index) => {
            let div = document.createElement("div");
            div.classList.add("card")
            let img = document.createElement("img")
            let item = document.createElement("h2")
            let price = document.createElement("h3")
            let rating = document.createElement("h3")
            let vegOrNonveg = document.createElement("h3")
            let starters = document.createElement("h3")
            container.appendChild(div)
            img.src = index.image;
            div.appendChild(img)
            item.innerHTML = `${index.itemName}`
            item.classList.add("cardhead");
            div.appendChild(item)
            item.classList.add("title")
            price.innerHTML = `Price : ${index.price} Rs`
            div.appendChild(price)
            rating.innerHTML = `Rating : ${index.rating} / 5`
            div.appendChild(rating)
            vegOrNonveg.innerHTML = `Veg or Non-veg : ${index.vegOrNonveg}`
            div.appendChild(vegOrNonveg)
            starters.innerHTML = `Starters or Main-Course : ${index.starters}`
            div.appendChild(starters)
            return;
        })
    }
    restaurant(data)


    priceLowToHigh.addEventListener("click", () => {
        let sorted = [...data].sort((a, b) => a.price - b.price)
        restaurant(sorted)

    })

    priceHighToLow.addEventListener("click", () => {
        let sorted = [...data].sort((a, b) => b.price - a.price)
        restaurant(sorted)
    })

    rating.addEventListener("click", () => {
        let sorted = [...data].sort((a, b) => b.rating - a.rating)
        restaurant(sorted)
    })

    starter.addEventListener("click", () => {
        let filter = [...data].filter((item)=>{
                return item.starters === "starter"
            
        })
        restaurant(filter)
    })

    main.addEventListener("click",()=>{
        let filter = [...data].filter((item)=>{
            return item.starters === "main-course"
        
    })
    restaurant(filter)
    })
    veg.addEventListener("click",()=>{
        let filter = [...data].filter((item)=>{
            return item.vegOrNonveg === "veg"
        
    })
    restaurant(filter)
    })
    nonveg.addEventListener("click",()=>{
        let filter = [...data].filter((item)=>{
            return item.vegOrNonveg === "non-veg"
        
    })
    restaurant(filter)
    })


}

getRestaurant()