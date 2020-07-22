const cartoes = document.querySelectorAll('.card')


for (const card of cartoes) {
    card.addEventListener("click", function() {
        const recipeId = card.getAttribute('id')        
        window.location.href = `/details/${recipeId}`
    })
}

