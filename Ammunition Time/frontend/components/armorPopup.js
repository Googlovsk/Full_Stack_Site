import { updateArmor, deleteArmor, getArmor } from "../requests/armor.requests.js"
import { createItem } from "./Item.js"
import { generateArmorElements } from "../main.js"

const armorlist = document.getElementById('armor-list')
const allarmorlist = document.getElementById('all-armor-list')

export async function createArmorPopup(armor, listItem) {

    const updArmor = await getArmor(armor.id)

    let popup = document.createElement('div')
    popup.classList.add('popup')

    let popupContainer = document.createElement('div')
    popupContainer.classList.add('popup-container')

    let popupContent = document.createElement('div')
    popupContent.classList.add('popup-content')

    let popupImg = document.createElement('img')
    popupImg.src = updArmor.img;


    let popupInfo = document.createElement('div')

    let armorNameContainer = document.createElement('div')
    let armorPriceContainer = document.createElement('div')
    let armorInfoContainer = document.createElement('div')
    let armorWeightContainer = document.createElement('div')
    let armorImgContainer = document.createElement('div')
    armorNameContainer.classList.add('info-container')
    armorPriceContainer.classList.add('info-container')
    armorInfoContainer.classList.add('info-container')
    armorWeightContainer.classList.add('info-container')
    armorImgContainer.classList.add('info-container')

    let armorNameTitle = document.createElement('span')
    armorNameTitle.classList.add('span-text')
    armorNameTitle.textContent = "Название: "

    let armorPriceTitle = document.createElement('span')
    armorPriceTitle.textContent = "Цена: "
    armorPriceTitle.classList.add('span-text')

    let armorWeightTitle = document.createElement('span')
    armorWeightTitle.textContent = "Вес: "
    armorWeightTitle.classList.add('span-text')

    let armorInfoTitle = document.createElement('span')
    armorInfoTitle.classList.add('span-text')
    armorInfoTitle.innerHTML = "Информация: <br>"

    let armorURLTitle = document.createElement('span')
    armorURLTitle.classList.add('span-text')
    armorURLTitle.textContent = "URL: "

    let armorName = document.createElement('span')
    armorName.textContent = updArmor.name

    let armorPrice = document.createElement('span')
    armorPrice.textContent = updArmor.price

    let armorWeight = document.createElement('span')
    armorWeight.textContent = updArmor.weight

    let armorInfo = document.createElement('span')
    armorInfo.innerHTML = updArmor.info

    let armorImgURL = document.createElement('input')
    armorImgURL.classList.add('form-style')
    armorImgURL.setAttribute('id', 'editImg')

    armorNameContainer.append(armorNameTitle, armorName)
    armorPriceContainer.append(armorPriceTitle, armorPrice)
    armorWeightContainer.append(armorWeightTitle, armorWeight)
    armorInfoContainer.append(armorInfoTitle, armorInfo)
    armorImgContainer.append(armorURLTitle, armorImgURL)
    armorImgContainer.style.display = 'none'

    popupInfo.append(armorNameContainer, armorPriceContainer, armorWeightContainer, armorInfoContainer, armorImgContainer)

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
        if(confirm(`Вы уверены что хотите удалить ${updArmor.name}?`)){
            listItem.item.remove()
            generateArmorElements()
            deleteArmor(updArmor.id)
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

        armorName.innerHTML = `<input type="text" class="form-style" value="${updArmor.name}" id="editName">`
        armorPrice.innerHTML = `<input type="text" class="form-style" value="${updArmor.price}" id="editPrice">`
        armorWeight.innerHTML = `<input type="text" class="form-style" value="${updArmor.weight}" id="editWeight">`
        armorInfo.innerHTML = `<input class="form-style" value="${updArmor.info}" id="editInfo">`
        armorImgContainer.style.display = "block"


        armorImgURL.value = updArmor.img

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
        let editedWeight = document.getElementById('editWeight').value
        let editedInfo = document.getElementById('editInfo').value
        let editedImg = document.getElementById('editImg').value

        await updateArmor({
            id: armor.id,
            name: editedName,
            info: editedInfo,
            price: editedPrice,
            weight: editedWeight,
            img: editedImg
        });

        listItem.item.remove()
        // generateArmorElements()
        await generateUpdatedElement()
        popup.remove()
        overlay.remove()
    }

    async function generateUpdatedElement(){
        
        const updarmor = await getArmor(armor.id)

        let listItem = createItem(updarmor.name, updarmor.info, updarmor.price, null, updarmor.weight, updarmor.img)

        listItem.btnDetail.addEventListener('click', function () {
            createArmorPopup(armor, listItem)
            
        })
        listItem.btnInBasket.addEventListener('click', function () {
            console.log('ok')
        })

        if(window.location == 'allArmor.html'){
            allarmorlist.append(listItem.item)
        } else {
            armorlist.append(listItem.item)
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