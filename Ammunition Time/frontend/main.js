import { getAllArmor, getArmor, createArmor, deleteArmor, updateArmor } from "./requests/armor.requests.js"
import { getAllWeapons, getWeapon, createWeapon, deleteWeapon, updateWeapon } from "./requests/weapon.requests.js"
import { createItem } from "./components/Item.js"
import { createPopup } from "./components/popup.js"
import { createArmorPopup } from "./components/armorpopup.js"

const weaponlist = document.getElementById('weapon-list')
const armorlist = document.getElementById('armor-list')

export async function generateWeaponElements() {
    weaponlist.innerHTML = ''
    const weapons = await getAllWeapons()
    const randomIndexes = getRandomElements(weapons.length, 4)

    for (let index of randomIndexes) {
        let weapon = weapons[index]
        let listItem = createItem(weapon.name, weapon.info, weapon.price, weapon.dmgtype, weapon.weight, weapon.img)

        listItem.btnDetail.addEventListener('click', function () {
            createPopup(weapon, listItem)
        })
        listItem.btnInBasket.addEventListener('click', function () {
            console.log('fuck u')
        })
        weaponlist.append(listItem.item)
    }
}
export async function generateArmorElements() {
    armorlist.innerHTML = ''
    const armors = await getAllArmor()
    const randomIndexes = getRandomElements(armors.length, 4)

    for (let index of randomIndexes) {
        let armor = armors[index]
        let listItem = createItem(armor.name, armor.info, armor.price, null, armor.weight, armor.img)

        listItem.btnDetail.addEventListener('click', function () {
            createArmorPopup(armor, listItem)
        })
        listItem.btnInBasket.addEventListener('click', function(){
            console.log('fuck u')
        })
        armorlist.append(listItem.item)
    }
}

function getRandomElements(max, n) {
    const index = []
    if(max < 4){
        for (let i = 0; i < max; i++) {
            index.push(i);
        }
        return index
    } else {
        for (let i = 0; i < n; i++) {
            let newIndex
            do {
                newIndex = Math.floor(Math.random() * max)
            } while (index.includes(newIndex))
            index.push(newIndex)
        }
        return index
    }
}

(function () {
    document.addEventListener('DOMContentLoaded', function () {


        if(window.location != 'allWeapons.html'){

            generateWeaponElements()
            generateArmorElements()
        }

        addItems()
        allItems()

        function allItems(){
            const allWeapons = document.getElementById('weaponAllProducts')

            if(allWeapons){
                allWeapons.addEventListener('click', function(event){
                    event.preventDefault()
                    window.location.href = 'allWeapons.html'
                })
            }
        }
        function addItems() {

            const productsLink = document.getElementById('products-link')

            if (productsLink) {
                productsLink.addEventListener('click', function (event) {
                    event.preventDefault()

                    window.location.href = 'addItems.html'
                })
            }
        }
    })
})()