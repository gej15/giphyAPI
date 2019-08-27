
let animalArray = ['Deer', 'Bat', 'Panda', 'Goat', 'Salmon']
function buttonMaker() {
        $('#top').empty()
    for (let i = 0; i < animalArray.length; i++) {
        let a = $('<button>')
        a.addClass('buttons')
        a.text(animalArray[i])
        a.attr('data-name', animalArray[i])
        $('#top').append(a)
    }
}
$('#event').on('click', function() {
    event.preventDefault()
    let newAnimal = $('#animal').val().trim()
    animalArray.push(newAnimal)
    console.log('go')
    buttonMaker()
})

$(document).on("click", "button", think);

function think() {
    $('#display').empty()
    console.log('go')
    let grab = $(this).attr('data-name')
    
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + grab + "&api_key=SoYDduR6jflenTs3SIV5Jttlxz2mbKZe&limit=3&rating=g&rating=pg"
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .then(function(response){
            console.log(response)
            let results = response.data

            for (var i = 0; i < results.length; i++) {
                let gifDiv = $('<div>')
                gifDiv.addClass('inline')

                let rating = results[i].rating  

                let p = $('<p>').text('Rating:' + rating)

                let animalImage = $('<img>')

                animalImage.attr({
                    src: results[i].images.fixed_height_still.url, 
                    picStill: results[i].images.fixed_height_still.url, 
                    picAnimate: results[i].images.fixed_height.url,
                    picState: 'still',
                    class: "gif",})
                

                gifDiv.prepend(p)
                gifDiv.prepend(animalImage)

                $('#display').prepend(gifDiv)

            }
        })
}

$(document).on('click', '.gif', gifToggle)

function gifToggle(){
    console.log(this)
    let state = $(this).attr('picState')
    console.log("gifpress")

    if (state === "still") {
        $(this).attr('src', $(this).attr('picAnimate'))
        $(this).attr('picState', 'animate')
    } else {
        $(this).attr('src', $(this).attr('picStill'))
        $(this).attr('picState', 'still')
    }

}

buttonMaker()