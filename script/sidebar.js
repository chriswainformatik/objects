document.getElementById('btn-sidebar-settings-close').addEventListener('click', () => hideSidebar('settings'))
//document.getElementById('btn-sidebar-settings-save').addEventListener('click', () => hideSidebar('settings'))
document.getElementById('btn-sidebar-settings-cancel').addEventListener('click', () => hideSidebar('settings'))
document.getElementById('btn-sidebar-settings-show').addEventListener('click', () => showSidebar('settings'))

document.getElementById('btn-sidebar-settings-save').addEventListener('click', () => saveSettings())


document.getElementById('btn-sidebar-help-close').addEventListener('click', () => hideSidebar('help'))
document.getElementById('btn-sidebar-help-cancel').addEventListener('click', () => hideSidebar('help'))
document.getElementById('btn-sidebar-help-show').addEventListener('click', () => showSidebar('help'))

document.getElementById('class-card-method-listing-toggle').addEventListener('change', (e) => {
    var value = e.target.value
    if (value == 'listing') {
        Array.prototype.forEach.call(document.getElementsByClassName('method-listing-wrapper'), (el) => {
            el.style.display = 'block'
        })
        Array.prototype.forEach.call(document.getElementsByClassName('class-card-wrapper'), (el) => {
            el.style.display = 'none'
        })
    } else if (value == 'class-card') {
        Array.prototype.forEach.call(document.getElementsByClassName('method-listing-wrapper'), (el) => {
            el.style.display = 'none'
        })
        Array.prototype.forEach.call(document.getElementsByClassName('class-card-wrapper'), (el) => {
            el.style.display = 'block'
        })
    }
})

document.addEventListener('DOMContentLoaded', function () {
    // load settings from web storage
    var showObjectCards = localStorage.getItem('show-object-cards') == 'true';
    if (showObjectCards) {
        document.getElementById('check-show-object-cards').checked = true
    } else {
        document.getElementById('check-show-object-cards').checked = false
    }

    // Toggle object cards from settings
    const objectCardsWrapperCollapse = new bootstrap.Collapse('#object-cards-wrapper', {
        toggle: showObjectCards
    })
    document.getElementById('check-show-object-cards').addEventListener('change', (e) => toggleObjectCardsWrapper(e.target.checked))
    function toggleObjectCardsWrapper(show) {
        if (show) {
            objectCardsWrapperCollapse.show()
        } else {
            objectCardsWrapperCollapse.hide()
        }
    }

})

function saveSettings() {
    localStorage.setItem('methods-case-sensitive', document.getElementById('check-methods-case-sensitive').checked)
    localStorage.setItem('show-grid', document.getElementById('check-show-grid').checked)
    localStorage.setItem('show-grid-labels', document.getElementById('check-show-grid-labels').checked)
    localStorage.setItem('enable-autocomplete', document.getElementById('check-enable-autocomplete').checked)
    localStorage.setItem('show-object-cards', document.getElementById('check-show-object-cards').checked)
    document.getElementById('settings-saved-confirmation').classList.remove('d-none')
    document.getElementById('settings-saved-confirmation').classList.remove('fade')
    setTimeout(() => document.getElementById('settings-saved-confirmation').classList.add('fade'), 500)
}



function hideSidebar(name) {
    var sidebar = document.getElementById('sidebar-' + name)
    sidebar.classList.remove('sidebar-show')
    sidebar.classList.add('sidebar-hide')
}

function showSidebar(name) {
    // hide all open sidebars
    Array.from(document.getElementsByClassName('sidebar-show')).forEach(element => {
        element.classList.remove('sidebar-show')
    })
    // open just the one the user wants to see
    var sidebar = document.getElementById('sidebar-' + name)
    sidebar.classList.remove('sidebar-hide')
    sidebar.classList.add('sidebar-show')
}