export async function getAllWeapons(){
    const response = await fetch('http://localhost:8080/weapon', {
        method: 'GET'
    })
    const result = await response.json()
    console.log(result)
    return result
}
export async function getWeapon(id){
    const response = await fetch('http://localhost:8080/weapon/' + id, {
        method: 'GET'
    })
    const result = await response.json()
    console.log(result)
    return result
}
export async function createWeapon(weapon){
    await fetch('http://localhost:8080/weapon', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: weapon.name,
            info: weapon.info,
            price: weapon.price,
            dmgtype: weapon.dmgtype,
            weight: weapon.weight,
            img: weapon.img
        })
    })
}
export async function deleteWeapon(id){
    await fetch('http://localhost:8080/weapon/' + id, {
        method: 'DELETE'
    })
}
export async function updateWeapon(weapon){
    await fetch(`http://localhost:8080/weapon/${weapon.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: weapon.name,
            info: weapon.info,
            price: weapon.price,
            dmgtype: weapon.dmgtype,
            weight: weapon.weight,
            img: weapon.img
        })
    })
}