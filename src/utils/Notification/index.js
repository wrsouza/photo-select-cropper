import Swal from 'sweetalert2';
import Messages from './messages.json';

const showNotification = (type, params) => {
  const { notification } = params;

  switch (type) {
    case 'dashboard':
      if (notification.dashboard) {
        Swal.fire(Messages.dashboard);
        notification.dashboard = false;
      }
      break;
    case 'selectFiles':
      if (notification.selectFiles) {
        Swal.fire(Messages.selectFiles);
        notification.selectFiles = false;
      }
      break;
    default:
      break;
  }
};

export default showNotification;
