import { FormEvent, useEffect, useState } from 'react';
import './countdown.css';
import InputTimer from './InputTimer';
import ShowTimer from './ShowTimer';

export default function Countdown() {
    const [isStarted, setStart] = useState(false)
    const [isPause, setPause] = useState(false)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [timeId, setTimeId] = useState<NodeJS.Timeout>()

    const hangleStart = () => {
        setStart(true)
    }
    const handleReset = () => {
        setStart(false)
        resetTimer()
    }
    const handlePause = () => {
        setPause(true)
        clearInterval(timeId)
    }
    const handleResume = () => {
        setPause(false)
        runTimer(hours, minutes, seconds, timeId)
    }
    const handleInput = (e: FormEvent<HTMLInputElement>) => {

        switch (e.currentTarget.id) {
            case "hours":
                setHours(+e.currentTarget.value)
                break
            case "minutes":
                setMinutes(+e.currentTarget.value)
                break

            case "seconds":
                setSeconds(+e.currentTarget.value)
                break

        }
    }

    const runTimer = (
        hr: number, min: number, sec: number, tid: NodeJS.Timeout | undefined
    ) => {
        if (sec > 0) {
            setSeconds(sec - 1)
        } else if (sec === 0 && min > 0) {
            setMinutes(min - 1)
            setSeconds(59)
        } else {
            setHours(hr - 1)
            setMinutes(59)
            setSeconds(59)
        }
        if (seconds === 0 && min === 0 && sec === 0) {
            resetTimer()
            clearInterval(tid) // this is imp
        }
    }

    const resetTimer = () => {
        setHours(0)
        setMinutes(0)
        setSeconds(0)
        clearInterval(timeId)
    }

    useEffect(() => {
        let tid: NodeJS.Timeout
        if (isStarted) {
            tid = setInterval(() => {
                runTimer(hours, minutes, seconds, tid)
            }, 1000)
            setTimeId(tid)
        }

        return () => {
            clearInterval(tid)
        }

    }, [isStarted, hours, minutes, seconds])

    console.log(hours, minutes, seconds)
    return (
        <>

            <h1>Countdown Timer</h1>
            {
                !isStarted &&
                <InputTimer handleInput={handleInput} hangleStart={hangleStart} />

            }

            {
                isStarted &&
                <ShowTimer
                    hours={hours}
                    minutes={minutes}
                    seconds={seconds}
                    isPause={isPause}
                    handlePause={handlePause}
                    handleReset={handleReset}
                    handleResume={handleResume} />

            }


        </>
    );
}