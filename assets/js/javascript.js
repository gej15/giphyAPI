
let animalArray = ['Deer', 'Bat', 'Panda', 'Goat', 'Salmon', 'Husky', 'Australian Shepherd', 'Corgi', 'Dog', 'Corgi Fail',]
let offset = 0
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
    let newAnimal = $('#animal').val().trim()
    animalArray.push(newAnimal)
    console.log('go')
    buttonMaker()
})

$(document).on("click", ".buttons", think);

function think() {
    $('#display').empty()
    console.log('go')
    let grab = $(this).attr('data-name')
    console.log(offset)
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + grab + "&api_key=SoYDduR6jflenTs3SIV5Jttlxz2mbKZe&limit=10&rating=g&rating=pg&offset=" + offset
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

                let p = $('<p>').text('Rating: ' + rating)
                p.attr('class', 'ratingTag')

                let save = $('<button>').text('save')
                save.attr({
                    class: 'save',
                    src: results[i].images.fixed_height_still.url, 
                    picStill: results[i].images.fixed_height_still.url, 
                    picAnimate: results[i].images.fixed_height.url,
                    picState: 'still',
                })


                let animalImage = $('<img>')
                animalImage.attr({
                    src: results[i].images.fixed_height_still.url, 
                    picStill: results[i].images.fixed_height_still.url, 
                    picAnimate: results[i].images.fixed_height.url,
                    picState: 'still',
                    class: "gif",})
                
                gifDiv.prepend(save)
                gifDiv.prepend(p)
                gifDiv.prepend(animalImage)
                offset = offset + 10
                $('#display').prepend(gifDiv)

            }
        })
}

$(document).on('click', '.save', save)


function save() {
    localStorage.clear()
    let saved = $('<img>')
    
    saved.attr({
        src: $(this).attr('src'),
        picStill: $(this).attr('picStill'),
        picAnimate: $(this).attr('picAnimate'),
        picState: $(this).attr('picState',),
        class: 'fav',
    })

    let remove = $('<button>')
    remove.text('remove')
    remove.attr({
        class: 'remove'
    })



    // console.log({
    //     src: $(this).attr('src'),
    //     picStill: $(this).attr('picStill'),
    //     picAnimate: $(this).attr('picAnimate'),
    //     picState: $(this).attr('picState',),
    //     class: 'fav',
    // })

    list.push({ 
        src: $(this).attr('src'),
        picStill: $(this).attr('picStill'),
        picAnimate: $(this).attr('picAnimate'),
        picState: $(this).attr('picState',),
        class: 'fav',
    })

    $('.saved').html('') 

    localStorage.setItem('favPic', JSON.stringify(list))
    startList()
}



$(document).on('click', '.gif', gifToggle)
$(document).on('click', '.fav', gifToggle)

function gifToggle(){
    console.log(this)
    console.log(this.picAnimate)
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

let list = JSON.parse(localStorage.getItem('favPic'))
console.log(list)



function startList() {
    list  = JSON.parse(localStorage.getItem('favPic'))
        if (!Array.isArray(list)) {
             list = [];
         }
    
    for (let i = 0; i < list.length; i++){
            console.log('go')
               
            let saved = $('<img>')
            saved.attr({
                src: list[i].src,
                picStill: list[i].picStill,
                picAnimate: list[i].picAnimate,
                picState: list[i].picState,
                class: 'fav',
                number: i,
            })
            
            let remove = $('<button>')
            remove.text('remove')
            remove.attr({
            class: 'remove',
            number: i,
            })

            let downloadLink =$('<button>').text('download link')
            downloadLink.attr({
                class: 'download',
                href: list[i].picAnimate,
                download: 'gif',
                
            })

            $('.saved').prepend(downloadLink)
            $('.saved').prepend(remove)
            $('.saved').prepend(saved)    
    }

$(document).on('click', '.remove', remove)
        
    function remove() {
        localStorage.clear()

        let number = $(this).attr('number')
        console.log(number)

        list.splice(number, 1)

        console.log(list)

        $('.saved').html('') 

        localStorage.setItem('favPic', JSON.stringify(list))

        startList(list)
    }
}

$(document).on('click', '.download', download)

    function download(){
    //         filename = 'panda.gif'
    //         img = $(this).attr('href')
    //         var element = document.createElement('a');
    //         element.setAttribute('href', img)
    //         element.setAttribute('download', filename);
          
    //         element.style.display = 'none';
    //         document.body.appendChild(element);
          
    //         element.click();
          
    //         document.body.removeChild(element);
        
    // }
        var x=new XMLHttpRequest();
            x.open("GET",  $(this).attr('href'), true);
            x.responseType = 'blob';
            x.onload=function(e){download(x.response, "animal.gif", "image/gif" ); }
            x.send();
            }
startList()
buttonMaker()