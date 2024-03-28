const backBTN = document.getElementById('backBTN')
const updateBTN = document.getElementById('updateBTN')
const deleteBTN = document.getElementById('deleteBTN')

const url = window.location.href + "data"
const spinnerBox = document.getElementById('spinnerBox')

backBTN.addEventListener('click', () => {
    history.back()
})

$.ajax({
    type: 'GET',
    url: url,
    success: function(response) {
        spinnerBox.classList.add('not-visible')
        console.log(response)

        const data = response.data

        if (data.logged_in !== data.author) {
           
        }
        else {
            updateBTN.classList.remove('not-visible')
            deleteBTN.classList.remove('not-visible')
        }
    },
    error: function(error) {
        console.log('Error:', error)
    }
})