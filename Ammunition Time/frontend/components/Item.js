export function createItem(name, info, price, dmgtype, weight, img){
    let item = document.createElement('div')
    let image = document.createElement('img')
    let divBody = document.createElement('div')
    let h5 = document.createElement('h5')

    let infoContainer = document.createElement('div')
    let pInfo = document.createElement('p')
    let infoTitle = document.createElement('p')
    let priceContainer = document.createElement('div')
    let pPrice = document.createElement('p')
    let priceTitle = document.createElement('p')
    let buttongroup = document.createElement('div')
    let btnDetail = document.createElement('button')
    let btnInBasket = document.createElement('button')

    item.classList.add('card')
    item.setAttribute('id', '_card')
    
    image.classList.add('card-image')
    image.src = img

    divBody.classList.add('card-body')

    h5.classList.add('card-title')
    h5.innerText = name


    infoContainer.classList.add('card-item-info-container')
    infoTitle.textContent = "Описание: "
    infoTitle.classList.add('card-info-title')

    pInfo.classList.add('card-db-info')
    pInfo.innerText = info
    if (info.length > 30){
        pInfo.style.whiteSpace = 'nowrap';
        pInfo.style.overflow = 'hidden';
        pInfo.style.textOverflow = 'ellipsis';
        pInfo.style.display = 'inline-block';
    }

    priceContainer.classList.add('card-item-info-container')
    priceTitle.textContent = "Цена :"
    priceTitle.classList.add('card-info-title')

    pPrice.classList.add('card-db-info')
    pPrice.innerText = price

    buttongroup.classList.add('btn-group')
    btnDetail.classList.add('card-button', 'btn-primary')
    btnDetail.textContent = "Подробнее"

    btnInBasket.classList.add('card-button', 'btn-primary')
    btnInBasket.textContent = "В корзину"
    
    priceContainer.append(priceTitle, pPrice)
    infoContainer.append(infoTitle, pInfo)
    buttongroup.append(btnDetail, btnInBasket)
    divBody.append(h5, infoContainer, priceContainer)

    item.append(image, divBody, buttongroup)

    return {item, btnDetail, btnInBasket}
}