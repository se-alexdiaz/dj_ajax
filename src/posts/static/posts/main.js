
const postsBox = document.getElementById('postsBox')
const spinnerBox = document.getElementById('spinnerBox')
const loadBtn = document.getElementById('loadBnt')
const endBox = document.getElementById('endBox')

let visible = 3

const getData = () => {

    $.ajax({
        type: 'GET',
        url: `/data/${visible}/`,
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
                                    <a href="#" class="btn btn-primary">${element.liked ? `Unlike (${element.count}`: `Like (${element.count}`}</a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                   `
                });
            }, 100);

            console.log(response.size)
            if (response.size == 0) {
                endBox.textContent = 'No posts added yet...'
            }
            else if (response.size <= visible) {
                loadBtn.classList.add('not-visible')
                endBox.textContent = 'No more posts to load...'
            }
    
    
        },
        error: function(error) {
            console.log('error', error)
        }
    
    })
}

loadBtn.addEventListener('click', () => {
    spinnerBox.classList.remove('not-visible')
    visible += 3
    getData()

})

getData()
