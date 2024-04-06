const handleAlerts = (type, msg) => {
    const alertBox = document.getElementById('alertBox')
    alertBox.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${msg}
        </div>
    `

}
