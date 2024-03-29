const avatarBox = document.getElementById('avatarBox')
const alertBox = document.getElementById('alertBox')
const profileForm = document.getElementById('profileForm')
const csrf = document.getElementsByName('csrfmiddlewaretoken')

const bioInput = document.getElementById('id_bio')
const avatarInput = document.getElementById('id_avatar')

profileForm.addEventListener('submit', function(e){

    e.preventDefault()

    const formData = new FormData()
    formData.append('csrfmiddlewaretoken', csrf[0].value)
    formData.append('bio', bioInput.value)
    formData.append('avatar', avatarInput.files[0])

    $.ajax({
        type: 'POST',
        url: '',
        enctype: 'multipart/form-data',
        data: formData,
        success: function(response){
            console.log(response)
            avatarBox.innerHTML = `
            <img src="${response.avatar}" class="rounded" height="200px" width="auto" alt="${response.user}">
            `
            bioInput.value = response.bio
            handleAlerts('success', 'Profile updated successfully!')
        },
        error: function(error){
            console.log(error)
        
        },
        processData: false,
        contentType: false,
        cache: false,
    })
})