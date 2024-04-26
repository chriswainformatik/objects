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


// save how far the content was moved when opening the sidebar
var contentMovedBy = 0

function hideSidebar(name) {
    var sidebar = document.getElementById('sidebar-' + name)
    sidebar.classList.remove('sidebar-show')
    sidebar.classList.add('sidebar-hide')
    var helper = document.getElementsByClassName('sidebar-move-helper')[0]
    helper.classList.remove('sidebar-move-helper')
    helper.style.transform = 'translate(0,0)'
    helper.classList.add('sidebar-move-reverse-helper')
}

function showSidebar(name) {
    // hide all open sidebars
    Array.from(document.getElementsByClassName('sidebar-show')).forEach(element => {
        element.classList.remove('sidebar-show')
    })
    // move content to the side
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    let contentDiv = document.getElementById('content')
    var contentWidth = contentDiv.offsetWidth
    let contentDivInner = contentDiv.children[0]
    contentDivInner.classList.add('sidebar-move-helper')
    var remainingSpace = (vw-contentWidth)/2
    var moveDist = 0
    var sidebarWidth = 480
    if (remainingSpace <= 150) {
        sidebarWidth = 300
        moveDist = remainingSpace
    } else if (remainingSpace >= 240) {
        remainingSpace = 240
        moveDist = sidebarWidth/2
    } else {
        sidebarWidth = remainingSpace*2
        moveDist = sidebarWidth-remainingSpace
    }
    sidebarMovedBy = moveDist
    contentDivInner.style.transform = 'translate(-' + moveDist + 'px,0)'

    // open just the one the user wants to see
    var sidebar = document.getElementById('sidebar-' + name)
    sidebar.classList.remove('sidebar-hide')
    sidebar.classList.add('sidebar-show')

    sidebar.style.width = sidebarWidth + 'px'
}