
const postsBox = document.getElementById('postsBox')
const spinnerBox = document.getElementById('spinnerBox')
const loadBtn = document.getElementById('loadBnt')
const endBox = document.getElementById('endBox')

const postForm = document.getElementById('postForm')
const title = document.getElementById('id_title')
const body = document.getElementById('id_body')
const csrf = document.getElementsByName('csrfmiddlewaretoken')
const alertBox = document.getElementById('alertBox')

const url = window.location.href

const dropZone = document.getElementById('myDropZone')
const addBTN = document.getElementById('addBTN')
const closeBTN = [...document.getElementsByClassName('add-modal-close')]

let visible = 3

// using jQuery
const getCookie = (name)  =>{
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const deleted = localStorage.getItem('title')
if (deleted) {
    handleAlerts('danger', `"${deleted}" was deleted!`)
    localStorage.clear()

}

const likeUnlikePosts = () => {

    const likeUnlikeForms =  [...document.getElementsByClassName('like-unlike-forms')]
    likeUnlikeForms.forEach(form => form.addEventListener('submit', e=> {
        e.preventDefault()

        const clickedId = e.target.getAttribute('data-form-id')
        const clickedBtn = document.getElementById(`like-unlike-${clickedId}`)

        $.ajax({
            type: 'POST',
            url: "/like-unlike/",
            data: {
                'csrfmiddlewaretoken': csrftoken,
                'pk': clickedId,
            },
            success: function(response) {
                console.log(response)
                clickedBtn.textContent = response.liked ? `Unlike (${response.count})` : `Likes (${response.count})`
            },
            error: function(error) {
                console.log('Error:', error)
            }
        })

    }))
}

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
                    <div class="card mb-2 ">
    
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.content}</p>
                        </div>
    
                        <div class="card-footer">
                            <div class="row">
                                <div class="col-1 ">
                                    <a href="${url}${element.id}" class="btn btn-primary">Details</a>
                                </div>
                                <div class="col-1 ">
                                    <form class="like-unlike-forms" data-form-id="${element.id}">                                        
                                        <button id="like-unlike-${element.id}" class="btn btn-primary">${element.liked ? `Unlike (${element.count})`: `Likes (${element.count})`}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                   `
                });
                likeUnlikePosts()
            }, 100);


            console.log(response.size)
            if (response.size === 0) {
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

let newPostId = null
postForm.addEventListener('submit', e => {
    e.preventDefault()

    $.ajax({
        type: 'POST',
        url: '',
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'title': title.value,
            'body': body.value
        },
        success: function(response) {
            console.log(response)
            newPostId = response.id
            postsBox.insertAdjacentHTML('afterbegin',  `

                <div class="card mb-2 testBG">
            
                    <div class="card-body">
                        <h5 class="card-title">${response.title}</h5>
                        <p class="card-text">${response.content}</p>
                    </div>

                    <div class="card-footer">
                        <div class="row">
                            <div class="col-1 ">
                                <a href="${url}${response.id}" class="btn btn-primary">Details</a>
                            </div>
                            <div class="col-1 ">
                                <form class="like-unlike-forms" data-form-id="${response.id}">                                        
                                    <button id="like-unlike-${response.id}" class="btn btn-primary">Like (0)</button>
                                </form>
                            </div>
                        </div>
                    </div>            
                </div>
            `)
            likeUnlikePosts()
            // $('#addPostModal').modal('hide')
            handleAlerts('success', 'New post added!')
            // postForm.reset()
        },
        error: function(error) {
            console.log('error', error)
            handleAlerts('danger', 'Something went wrong...')
        }

    })
        
})


addBTN.addEventListener('click', () => {
   dropZone.classList.remove('not-visible')
})

closeBTN.forEach(btn => btn.addEventListener('click', () => {
    postForm.reset()
    if (!dropZone.classList.contains('not-visible')){
        dropZone.classList.add('not-visible')
    }
    const myDropZone = Dropzone.forElement('#myDropZone')
    myDropZone.removeAllFiles(true)
}))

Dropzone.autoDiscover = false
const myDropZone = new Dropzone('#myDropZone', {
    url: 'upload/',
    init: function() {
        this.on('sending', function(file, xhr, formData) {
            formData.append('csrfmiddlewaretoken', csrftoken)
            formData.append('new_post_id', newPostId)
        })
    },
    maxFiles: 5,
    maxFilesize: 4,
    acceptedFiles: '.png, .jpg, .jpeg'
} )

getData()
