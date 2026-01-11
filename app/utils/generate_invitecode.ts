

export const generateInviteCode = ()=>{
    const character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    let invitecode = ""

    for(let i=0 ; i<6 ; i++){
        const randomIndex = Math.floor(Math.random() * character.length)

        invitecode += character[randomIndex]
    }

    return invitecode
}