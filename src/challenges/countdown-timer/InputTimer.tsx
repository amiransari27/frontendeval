import { FormEvent } from "react"

interface IProps{
    handleInput: (e: FormEvent<HTMLInputElement>) => void
    hangleStart: () => void
} 

export default function InputTimer({handleInput, hangleStart}: IProps) {
    return (
        <div className='input-container'>
            <div className='input-box'>
                <input onChange={handleInput} id="hours" placeholder='HH' />
                <input onChange={handleInput} id="minutes" placeholder='MM' />
                <input onChange={handleInput} id="seconds" placeholder='SS' />
            </div>
            <button
                onClick={hangleStart}
                className='timer-button'
            >Start</button>
        </div>
    )
}