const postsBox = document.getElementById('postsBox')
const backBTN = document.getElementById('backBTN')
const updateBTN = document.getElementById('updateBTN')
const deleteBTN = document.getElementById('deleteBTN')
const alertBox = document.getElementById('alertBox')

const csrf = document.getElementsByName('csrfmiddlewaretoken')

const url = window.location.href + "data/"
const updateUrl = window.location.href + "update/"
const deleteUrl = window.location.href + "delete/"

const updateForm = document.getElementById('updateForm')
const deleteForm = document.getElementById('deleteForm')

const spinnerBox = document.getElementById('spinnerBox')

const titleInput = document.getElementById('id_title')
const bodyInput = document.getElementById('id_body')


backBTN.addEventListener('click', () => {
    history.back()
})

$.ajax({
    type: 'GET',
    url: url,
    success: function(response) {
      
        console.log(response)

        const data = response.data

        if (data.logged_in !== data.author) {
           
        }
        else {
            updateBTN.classList.remove('not-visible')
            deleteBTN.classList.remove('not-visible')
        }  
        
        const titleEl = document.createElement('h3')
        titleEl.setAttribute = ('class', 'mt-3')
        titleEl.setAttribute = ('id', 'title')

        const bodyEl  = document.createElement('p')
        bodyEl.setAttribute = ('class', 'mt-1')
        bodyEl.setAttribute = ('id', 'body')

        titleEl.textContent = data.title
        bodyEl.textContent = data.content

        postsBox.appendChild(titleEl)
        postsBox.appendChild(bodyEl)

        titleInput.value = data.title
        bodyInput.value = data.content

        spinnerBox.classList.add('not-visible')
    },
    error: function(error) {
        console.log('Error:', error)
    }
})

updateForm.addEventListener('submit', e => {
    e.preventDefault()

    const title = document.getElementById('title')
    const content = document.getElementById('body')

    $.ajax({
        type: 'POST',
        url: updateUrl,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'title': titleInput.value,
            'content': bodyInput.value
        },
        success: function(response) {
            console.log(response)
            handleAlerts('success', 'Post updated successfully!')
            title.textContent = response.title
            content.textContent = response.content
        },
        error: function(error) {
            console.log('Error:', error)
        }
    })
 
})

deleteForm.addEventListener('submit', e => {
    e.preventDefault()

    $.ajax({
        type: 'POST',
        url: deleteUrl,
        data: {
            'csrfmiddlewaretoken': csrf[0].value
        },
        success: function(response) {
            console.log(response)

            window.location.href = window.location.origin 
            localStorage.setItem('title', titleInput.value)

            // handleAlerts('danger', 'Post deleted successfully!')
            // setTimeout(() => {
            //     window.location.href = response.url
            // }, 1000)
        },
        error: function(error) {
            console.log('Error:', error)
        }
    })
})