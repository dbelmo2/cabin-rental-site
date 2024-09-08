import { Button } from "@mui/material";


type Props = {
    children: React.ReactNode,
    className?: string,
    id?: string,
    disabled?: boolean
}





export default function PillButton({children, className, id, disabled}: Props) {
    return (
        <Button 
            className={className}
            disabled={disabled}
            id={id}
            sx={{ 
                backgroundColor: 'none',
                color: 'white',
                borderStyle: 'solid', 
                borderWidth: '1px',
                borderColor: '#fff',
                width: 'fit-content',
                padding: '19px 25px',
                transition: 'all 1s ease',
                fontFamily: '"Quattrocento Sans", sans-serif',
                borderRadius: '100px',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }
            }}>
            {children}
        </Button>
    )
}
