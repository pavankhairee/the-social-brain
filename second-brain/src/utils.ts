

export function random(len: number) {
    let option = "qqwertyuiopasdfghjklzxcvbnm1234567890";
    let length = option.length;
    let ans = ""


    for (let i = 0; i < option.length; i++) {
        ans += option[Math.floor(Math.random() * length)]
    }
    return ans;
}