import { updateWeapon, deleteWeapon, getWeapon } from "../requests/weapon.requests.js"
import { generateWeaponElements } from "../main.js"
import { createItem } from "./Item.js"

const weaponlist = document.getElementById('weapon-list')
const allweaponlist = document.getElementById('all-weapon-list')

export async function createPopup(weapon, listItem) {

    const updWeapon = await getWeapon(weapon.id)


    let popup = document.createElement('div')
    popup.classList.add('popup')

    let popupContainer = document.createElement('div')
    popupContainer.classList.add('popup-container')

    let popupContent = document.createElement('div')
    popupContent.classList.add('popup-content')

    let popupImg = document.createElement('img')
    popupImg.src = updWeapon.img;


    let popupInfo = document.createElement('div')

    let weaponNameContainer = document.createElement('div')
    let weaponPriceContainer = document.createElement('div')
    let weaponInfoContainer = document.createElement('div')
    let weaponDmgTypeContainer = document.createElement('div')
    let weaponWeightContainer = document.createElement('div')
    let weaponImgContainer = document.createElement('div')
    weaponNameContainer.classList.add('info-container')
    weaponPriceContainer.classList.add('info-container')
    weaponInfoContainer.classList.add('info-container')
    weaponDmgTypeContainer.classList.add('info-container')
    weaponWeightContainer.classList.add('info-container')
    weaponImgContainer.classList.add('info-container')

    let weaponNameTitle = document.createElement('span')
    weaponNameTitle.classList.add('span-text')
    weaponNameTitle.textContent = "Название: "

    let weaponPriceTitle = document.createElement('span')
    weaponPriceTitle.textContent = "Цена: "
    weaponPriceTitle.classList.add('span-text')

    let weaponDmgTypeTitle = document.createElement('span')
    weaponDmgTypeTitle.textContent = "Тип урона: "
    weaponDmgTypeTitle.classList.add('span-text')

    let weaponWeightTitle = document.createElement('span')
    weaponWeightTitle.textContent = "Вес: "
    weaponWeightTitle.classList.add('span-text')

    let weaponInfoTitle = document.createElement('span')
    weaponInfoTitle.classList.add('span-text')
    weaponInfoTitle.innerHTML = "Информация: <br>"

    let weaponURLTitle = document.createElement('span')
    weaponURLTitle.classList.add('span-text')
    weaponURLTitle.textContent = "URL: "

    let weaponName = document.createElement('span')
    weaponName.textContent = updWeapon.name

    let weaponPrice = document.createElement('span')
    weaponPrice.textContent = updWeapon.price

    let weaponDmgType = document.createElement('span')
    weaponDmgType.textContent = updWeapon.dmgtype

    let weaponWeight = document.createElement('span')
    weaponWeight.textContent = updWeapon.weight

    let weaponInfo = document.createElement('span')
    weaponInfo.innerHTML = updWeapon.info

    let weaponImgURL = document.createElement('input')
    weaponImgURL.classList.add('form-style')
    weaponImgURL.setAttribute('id', 'editImg')

    weaponNameContainer.append(weaponNameTitle, weaponName)
    weaponPriceContainer.append(weaponPriceTitle, weaponPrice)
    weaponDmgTypeContainer.append(weaponDmgTypeTitle, weaponDmgType)
    weaponWeightContainer.append(weaponWeightTitle, weaponWeight)
    weaponInfoContainer.append(weaponInfoTitle, weaponInfo)
    weaponImgContainer.append(weaponURLTitle, weaponImgURL)
    weaponImgContainer.style.display = 'none'

    popupInfo.append(weaponNameContainer, weaponPriceContainer, weaponDmgTypeContainer, weaponWeightContainer, weaponInfoContainer, weaponImgContainer)

    let btnContainer = document.createElement('div')
    btnContainer.classList.add('btn-container')

    let btnEdit = document.createElement('button')
    btnEdit.classList.add('btn-popup')
    btnEdit.textContent = 'Редактировать'

    let btnCancel = document.createElement('button')
    btnCancel.classList.add('btn-popup')
    btnCancel.textContent = 'Отмена'
    btnCancel.style.display = 'none'

    let btnSave = document.createElement('button')
    btnSave.classList.add('btn-popup')
    btnSave.textContent = 'Сохранить'
    btnSave.style.display = 'none'

    let btnDelete = document.createElement('button')
    btnDelete.classList.add('btn-popup')
    btnDelete.textContent = 'Удалить'

    btnDelete.addEventListener('click', function(){
        
        if(confirm(`Вы уверены что хотите удалить ${updWeapon.name}?`)){

            
            listItem.item.remove()
            generateWeaponElements()
            deleteWeapon(updWeapon.id)

            popup.remove()
            overlay.remove()
        }
    })

    btnCancel.addEventListener('click', function(){
        popup.remove()
        overlay.remove()
    })

    document.addEventListener('keydown', function(event){
        if(event.key === 'Enter'){
            Save()
        }
    })

    btnEdit.addEventListener('click', function () {

        weaponName.innerHTML = `<input type="text" class="form-style" value="${updWeapon.name}" id="editName">`
        weaponPrice.innerHTML = `<input type="text" class="form-style" value="${updWeapon.price}" id="editPrice">`
        weaponDmgType.innerHTML = `<input type="text" class="form-style" value="${updWeapon.dmgtype}" id="editDmgType">`
        weaponWeight.innerHTML = `<input type="text" class="form-style" value="${updWeapon.weight}" id="editWeight">`
        weaponInfo.innerHTML = `<input class="form-style" value="${updWeapon.info}" id="editInfo">`
        weaponImgContainer.style.display = "block"


        weaponImgURL.value = updWeapon.img

        btnCancel.style.display = "inline-block"
        btnSave.style.display = "inline-block"
        btnEdit.style.display = 'none'
    })
    btnSave.addEventListener('click', async function () {
        Save()
    })

    async function Save(){
        let editedName = document.getElementById('editName').value
        let editedPrice = document.getElementById('editPrice').value
        let editedDmgType = document.getElementById('editDmgType').value
        let editedWeight = document.getElementById('editWeight').value
        let editedInfo = document.getElementById('editInfo').value
        let editedImg = document.getElementById('editImg').value

        await updateWeapon({
            id: weapon.id,
            name: editedName,
            info: editedInfo,
            price: editedPrice,
            dmgtype: editedDmgType,
            weight: editedWeight,
            img: editedImg
        })

        listItem.item.remove()
        // generateWeaponElements()
        await generateUpdatedElement()
        popup.remove()
        overlay.remove()
    }

    async function generateUpdatedElement(){
        
        const updweapon = await getWeapon(weapon.id)

        let listItem = createItem(updweapon.name, updweapon.info, updweapon.price, updweapon.dmgtype, updweapon.weight, updweapon.img)

        listItem.btnDetail.addEventListener('click', function () {
            createPopup(weapon, listItem)
            
        })
        listItem.btnInBasket.addEventListener('click', function () {
            console.log('ok')
        })

        if(window.location == 'allWeapons.html'){
            allweaponlist.append(listItem.item)
        } else {
            weaponlist.append(listItem.item)
        }
    }

    btnContainer.append(btnEdit, btnDelete, btnSave, btnCancel)

    popupContent.append(popupImg, popupInfo)
    popupContainer.append(popupContent)
    popup.append(popupContainer, btnContainer)

    let overlay = document.createElement('div')
    overlay.classList.add('overlay')
    document.body.appendChild(overlay)


    overlay.addEventListener('click', function () {
        popup.remove()
        overlay.remove()
    })
    listItem.item.append(popup)
}