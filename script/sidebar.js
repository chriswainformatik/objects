document.getElementById('btn-sidebar-settings-close').addEventListener('click', () => hideSidebar('settings'))
document.getElementById('btn-sidebar-settings-show').addEventListener('click', () => showSidebar('settings'))
document.getElementById('sidebar-underlay').addEventListener('click', () => hideSidebar('settings'))

document.getElementById('btn-sidebar-help-close').addEventListener('click', () => hideSidebar('help'))
document.getElementById('btn-sidebar-help-show').addEventListener('click', () => showSidebar('help'))
document.getElementById('sidebar-underlay').addEventListener('click', () => hideSidebar('help'))


function hideSidebar(name) {
    var sidebar = document.getElementById('sidebar-' + name)
    sidebar.classList.remove('sidebar-show')
    sidebar.classList.add('sidebar-hide')
    document.getElementById('sidebar-underlay').classList.remove('sidebar-underlay-show')
}

function showSidebar(name) {
    var sidebar = document.getElementById('sidebar-' + name)
    sidebar.classList.remove('sidebar-hide')
    sidebar.classList.add('sidebar-show')
    document.getElementById('sidebar-underlay').classList.add('sidebar-underlay-show')
}