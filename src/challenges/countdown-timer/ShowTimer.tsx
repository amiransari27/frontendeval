

interface IProps {
    hours: number
    minutes: number
    seconds: number
    isPause : boolean
    handlePause: () => void
    handleResume: () => void
    handleReset: () => void
}

export default function ShowTimer({ 
    hours, minutes, seconds,isPause, 
    handlePause, handleResume,  handleReset
}: IProps) {
    return (
        <div className='show-container'>
            <div className='timer-box'>
                <div>{hours < 10 ? `0${hours}` : hours}</div>
                <span>:</span>
                <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
                <span>:</span>
                <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
            </div>
            <div className='action-box'>
                {
                    !isPause && <button
                        onClick={handlePause}
                        className='timer-button'>Pause</button>
                }
                {
                    isPause && <button
                        onClick={handleResume}
                        className='timer-button'>Resume</button>
                }
                <button
                    className='timer-button'
                    onClick={handleReset}
                >Reset</button>
            </div>
        </div>
    )
}