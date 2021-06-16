import { notifyer } from "./notifyer.js"
import { timer } from "./timer.js"
import { emitter } from "./emitter.js"

const messages = [
    "Postar foto do meu setup",
    "Postar uma frase motivacional",
    "Ensinar algo que aprendi hoje ou ontem",
    "Crie algum conteúdo para ajudar a comunidade"
]

const notify = () => {

    const randomIndex = Math.floor(Math.random() * messages.length)

    const notification = notifyer.notify({
    title:"Hora do Post",
    body: messages[randomIndex]
})
notification()
}

const app = {
    async start() {
        try{
        await notifyer.init()

        emitter.on("countdown-start", notify)

        emitter.on("countdown-end", timer.init)

        timer.init(60 * 60)
        } 
        catch (err) {
            console.log(err.message)
        }
        if (!('serviceWorker' in navigator)) {  
            return; 
          }
          
        if (!('PushManager' in window)) {
        return; 
        }
    }
}
export { app }