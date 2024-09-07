import './css/OutlinedDiv.css'



type Props = {
    children: React.ReactNode,
    outerDivClassName: string,
    innerDivClassName: string
}

export default function OutlinedDiv({ children, outerDivClassName = '', innerDivClassName='' }: Props) {
    return (
        <div className={`outer-div ${outerDivClassName}`}>
            <div className={`inner-div ${innerDivClassName}`}>
                {children}
            </div>
        </div>
    )
}