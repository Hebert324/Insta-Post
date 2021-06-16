import { view } from "./view.js"
import { emitter } from "./emitter.js"

const timer = {
    time: 60 * 60,
    currentTime: 0,
    interval: null,

    timeToMinutes: time => Math.floor(time / 60),
    timeToSeconds: time => time % 60,

    formatTime: time => String(time).padStart(2, "0"),

    init(time) {
        emitter.emit("countdown-start")
        timer.time = time || timer.time
        timer.currentTime = timer.time
        timer.interval = setInterval(timer.countdown, 1000)
    },

    countdown() {
        timer.currentTime = timer.currentTime - 1

        const minutes = timer.formatTime(timer.timeToMinutes(timer.currentTime))
        const seconds = timer.formatTime(timer.timeToSeconds(timer.currentTime))

        view.render({
            minutes,
            seconds,
        })
        
        if(timer.currentTime === 0){
            clearInterval(timer.interval)
            emitter.emit("countdown-end")
            return
        }
    }
}

export { timer }