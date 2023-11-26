export async function getAllArmor(){
    const response = await fetch('http://localhost:8080/armor', {
        method: 'GET'
    })
    const result = await response.json()
    console.log(result)
    return result
}
export async function getArmor(id){
    const response = await fetch('http://localhost:8080/armor/' + id, {
        method: 'GET'
    })
    const result = await response.json()
    console.log(result)
    return result
}
export async function createArmor(armor){
    await fetch('http://localhost:8080/armor', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: armor.name,
            info: armor.info,
            price: armor.price,
            weight: armor.weight,
            img: armor.img
        })
    })
}
export async function deleteArmor(id){
    await fetch('http://localhost:8080/armor/' + id, {
        method: 'DELETE'
    })
}
export async function updateArmor(armor){
    await fetch(`http://localhost:8080/armor/${armor.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: armor.name,
            info: armor.info,
            price: armor.price,
            weight: armor.weight,
            img: armor.img
        })
    })
}