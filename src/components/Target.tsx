import './Target.css'
import { useRef, useEffect, useState } from 'react'

interface TargetProps {
    id: number;
    onClick: Function;
    speed: number;
    status: string;
}

function Target({ id, onClick, speed, status }: TargetProps) {
    const ref = useRef<HTMLDivElement | null>(null)
    const animation = useRef<null | Animation>(null)
    const position = useRef<string>(randomNum(10, 90).toString() + '%')
    const styleNum = useRef<string>(randomNum(1, 10).toString())
    const size = useRef<string>(randomNum(10, 100).toString() + 'px')
    const [prevSpeed, setPrevSpeed] = useState<number>(speed)

    const handleClick = () => {
        onClick(id)
    }

    function randomNum(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    useEffect(() => {
        const element = ref.current
        if (!element) return
        if (animation.current) return
        animation.current = element.animate(
            [
                { top: 0 },
                { top: '100vh'},
            ],
            {
                duration: 10000 / speed
            },
        )
        animation.current.play()
        animation.current.onfinish = function() {
            element.remove()
        }
        return () => {
            animation.current?.cancel()
        }
    }, [ref, speed, prevSpeed])

    useEffect(() => {
        if (speed !== prevSpeed && animation.current) {
            animation.current.playbackRate = speed / prevSpeed
            animation.current.play()
            setPrevSpeed(speed)
        }
    }, [speed, prevSpeed])

    useEffect(() => {
        if (status === 'paused') {
            animation.current?.pause()
        }
        if (status === 'active') {
            animation.current?.play()
        }
    }, [status])

    return (
        <div
            ref={ref}
            style={{
                backgroundImage: `url('./style-${styleNum.current}.png')`,
                height: size.current,
                left: position.current,
                width: size.current
            }}
            onClick={handleClick}
            className="target"
        />
    )
}

export default Target