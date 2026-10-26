import { useNotificationMessage } from '../store'
import { useNotificationStatus } from '../store'

import { Alert } from '@mui/material'

const Notification = () => {
  const notificationMessage = useNotificationMessage()
  const notificationStatus = useNotificationStatus()

  if (!notificationMessage) {
    return null
  }

  if (notificationStatus === 'error') {
    return (
      <Alert severity="error">
        {notificationMessage}
      </Alert>
    )
  }

  return (
    <Alert severity="success">
      {notificationMessage}
    </Alert>
  )
}

export default Notification