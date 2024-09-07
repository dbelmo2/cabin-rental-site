import './css/OutlinedDiv.css'
export default function OutlinedDiv({ children, outerDivClassName = '', innerDivClassName='' }) {
    return (
        <div className={`outer-div ${outerDivClassName}`}>
            <div className={`inner-div ${innerDivClassName}`}>
                {children}
            </div>
        </div>
    )
}