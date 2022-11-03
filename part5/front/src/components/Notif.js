const Notif = ({ message, type }) => {
    if (message === null) {
      return null
    }
    else if (type === 'error') {
      return (
        <div className='error'>
        {message}
      
      </div>
      )
    }
  
    return (
      <div className='notif'>
        {message}
      
      </div>

      
    )
  }

  export default Notif