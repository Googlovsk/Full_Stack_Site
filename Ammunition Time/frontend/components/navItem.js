function createItem() {
    const createNavItem = (text, isDropdown = false, links = [], id = null) => {
        const element = isDropdown ? document.createElement('div') : document.createElement('a')
        element.classList.add('nav_link')
        element.textContent = text

        if (id) {
            element.setAttribute('id', id);
        }
        if (isDropdown) {
            element.classList.add('dropdown');
            const dropContent = document.createElement('div')
            dropContent.classList.add('dropdown-content')
            links.forEach(linkText => {
                const droplink = document.createElement('a')
                droplink.textContent = linkText
                dropContent.appendChild(droplink)
            })
            element.appendChild(dropContent)

            element.addEventListener('click', (event) => {
                event.stopPropagation()
                dropContent.style.display = (dropContent.style.display === 'block') ? 'none' : 'block'
            })

            let allWeapons = dropContent.querySelector(':nth-child(1)')
            let allArmor = dropContent.querySelector(':nth-child(2)')

            allWeapons.addEventListener('click', function(){
                window.location.href = 'allWeapons.html'
            })
            
            allArmor.addEventListener('click', function(){
                window.location.href = 'allArmor.html'
            })

        } else {
            element.setAttribute('href', '#')
        }
        return element
    }

    const nav = document.createElement('nav')
    nav.classList.add('nav')
    nav.append(
        createNavItem('Каталог', true, ['Оружие', 'Снаряжение']),
        createNavItem('Товары', false, [], 'products-link'),
        createNavItem('О нас'),
        createNavItem('Контакты')
    )
    document.addEventListener('click', (event) => {
        const dropdowns = document.querySelectorAll('.dropdown-content')
        dropdowns.forEach(dropContent => {
            dropContent.style.display = 'none'
        })
    })
    return nav;
}
document.getElementById('nav-target').append(createItem())
