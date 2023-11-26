import { getAllWeapons, getWeapon, createWeapon, deleteWeapon, updateWeapon } from "../requests/weapon.requests.js"
import { createItem } from "./Item.js"
import { getAllArmor } from "../requests/armor.requests.js"
import { createPopup } from "./popup.js"
import { createArmorPopup } from "./armorpopup.js"

const weaponlist = document.getElementById('all-weapon-list')
const armorlist = document.getElementById('all-armor-list')

async function generateAllWeaponElements(){
    const weapons = await getAllWeapons()
    
    for(let weapon of weapons){
        let listItem = createItem(weapon.name, weapon.info, weapon.price, weapon.dmgtype, weapon.weight, weapon.img)

        listItem.btnDetail.addEventListener('click', function () {
            createPopup(weapon, listItem)

        })
        listItem.btnInBasket.addEventListener('click', function () {
            console.log('ok')
        })

        weaponlist.append(listItem.item)
    }
}
async function generateAllArmorElements(){
    const armors = await getAllArmor()
    
    for(let armor of armors){
        let listItem = createItem(armor.name, armor.info, armor.price, null, armor.weight, armor.img)

        listItem.btnDetail.addEventListener('click', function () {
            createArmorPopup(armor, listItem)
        })
        listItem.btnInBasket.addEventListener('click', function () {
            console.log('ok')
        })

        armorlist.append(listItem.item)
    }
}
document.addEventListener('DOMContentLoaded', function () {
    let currentPage = window.location.pathname

    if(currentPage.includes('allWeapons.html')){
        generateAllWeaponElements()
    }
    else if(currentPage.includes('allArmor.html')){
        generateAllArmorElements()
    }

})