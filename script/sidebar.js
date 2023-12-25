document.getElementById('btn-sidebar-settings-close').addEventListener('click', () => hideSidebar('settings'))
//document.getElementById('btn-sidebar-settings-save').addEventListener('click', () => hideSidebar('settings'))
document.getElementById('btn-sidebar-settings-cancel').addEventListener('click', () => hideSidebar('settings'))
document.getElementById('btn-sidebar-settings-show').addEventListener('click', () => showSidebar('settings'))

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

/**
 * Toggle object cards from settings
 */
document.addEventListener('DOMContentLoaded', function () {
    const objectCardsWrapperCollapse = new bootstrap.Collapse('#object-cards-wrapper', {
        toggle: false
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

function hideSidebar(name) {
    var sidebar = document.getElementById('sidebar-' + name)
    sidebar.classList.remove('sidebar-show')
    sidebar.classList.add('sidebar-hide')
}

function showSidebar(name) {
    var sidebar = document.getElementById('sidebar-' + name)
    sidebar.classList.remove('sidebar-hide')
    sidebar.classList.add('sidebar-show')
}