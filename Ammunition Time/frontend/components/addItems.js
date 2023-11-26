import { getAllWeapons, getWeapon, createWeapon, deleteWeapon, updateWeapon } from "../requests/weapon.requests.js"


(function () {
    class Weapon {
        constructor(name, info, weight, dmgtype, price, img) {
            this.name = name
            this.info = info
            this.weight = weight
            this.dmgtype = dmgtype
            this.price = price
            this.img = img
        }
        newWeapon(id, name, info, weight, dmgtype, price, img) {
            this.id = id
            this.name = name
            this.info = info
            this.weight = weight
            this.dmgtype = dmgtype
            this.price = price
            this.img = img
        }
    }
    let button = document.getElementById('button-add-weapon')

    let weaponName = document.getElementById('weapon-name')
    let weaponInfo = document.getElementById('weapon-info')
    let weaponWeight = document.getElementById('weapon-weight')
    let weaponDmgType = document.getElementById('weapon-dmgType')
    let weaponPrice = document.getElementById('weapon-price')
    let weaponImg = document.getElementById('weapon-img')

    

    button.addEventListener('click', function(){
        let item = new Weapon(weaponName.value, weaponInfo.value, weaponWeight.value, weaponDmgType.value, weaponPrice.value, weaponImg.value)
        createWeapon(item)
    })
})()
