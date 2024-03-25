
const postsBox = document.getElementById('postsBox')
const spinnerBox = document.getElementById('spinnerBox')

$.ajax({
    type: 'GET',
    url: 'data/',
    success: function(response) {
        console.log(response)
        const data = response.data

        setTimeout(() => {
            spinnerBox.classList.add('not-visible')

            data.forEach(element => {
               postsBox.innerHTML += ` 
               ${element.title} - <b> ${element.author} </b> <br> ${element.content} <br> <br>`
            });
        }, 100);


    },
    error: function(error) {
        console.log('error', error)
    }

})