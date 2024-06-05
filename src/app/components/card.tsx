const cardStyle = {
    padding: '100px',
    margin: '10px',
    border: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const Card = ({children}: {children: React.ReactNode}) => {
    return <div style={cardStyle}>{children}</div>
}

export default Card;