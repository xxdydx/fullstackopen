import { useSelector, useDispatch } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  if (notification === null) {
    return null
  }
  const success = {
    border: 'solid',
    color: 'green',
    padding: 10,
    borderWidth: 1
  }
  const error = {
    border: 'solid',
    color: 'red',
    padding: 10,
    borderWidth: 1
  }

  if (notification.type === 'success') {
    return (
      <div style={success}>
      {notification.message}
    </div>

    )
  }
  return (
    <div style={error}>
      {notification.message}
    </div>
  )
}

export default Notification