document.getElementById('btn-sidebar-settings-close').addEventListener('click', () => hideSidebar('settings'))
//document.getElementById('btn-sidebar-settings-save').addEventListener('click', () => hideSidebar('settings'))
document.getElementById('btn-sidebar-settings-cancel').addEventListener('click', () => hideSidebar('settings'))
document.getElementById('btn-sidebar-settings-show').addEventListener('click', () => showSidebar('settings'))

document.getElementById('btn-sidebar-help-close').addEventListener('click', () => hideSidebar('help'))
document.getElementById('btn-sidebar-help-cancel').addEventListener('click', () => hideSidebar('help'))
document.getElementById('btn-sidebar-help-show').addEventListener('click', () => showSidebar('help'))


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