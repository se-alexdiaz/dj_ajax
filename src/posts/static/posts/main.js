
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
                <div class="card mb-2">

                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.content}</p>
                    </div>

                    <div class="card-footer">
                        <div class="row">
                            <div class="col-1">
                                <a href="#" class="btn btn-primary">Details</a>
                            </div>
                            <div class="col-2">
                                <a href="#" class="btn btn-primary">Likes</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
               `
            });
        }, 100);


    },
    error: function(error) {
        console.log('error', error)
    }

})