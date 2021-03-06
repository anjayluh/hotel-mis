
let snackbarMessages;
export default snackbarMessages = {
  'default': {
    'success': 'Operation successful',
    'fail': 'Operation failed'
  },
  'Login': {
    'NetworkError': 'Connection error. Contact Systems Administrator',
    'inValidAccount': 'User authentication failed. Invalid account. Please contact the systems administrator',
  },
  'participant': {
    'new': 'New participant has been created',
    'updated': 'Participant information has been updated',
  },
  'contact': {
    'new': 'A new Contact has been added to the participant',
    'updated': 'Contact information has been updated',
    'deleted': 'Contact has been deleted'
  },
  'subscription': {
    'new': 'New subscription has been added',
    'activated': 'Subscription has been activated',
    'deactivate': 'Subscription has been deactivated'
  },
  'payment': {
    'new': 'A new payment has been added'
  },
  'Billing': {
    'emailBills': 'Bills will be emailed to participants shortly'
  },
  'serviceCategories': {
    'new': 'A new service category has been added',
    'updated': 'service category information has been updated',
  },
  'NiraApiNotification': {
    'offline': 'We can not reach the NIRA services at the moment. Please try again later.',
    'online': 'We can successfully reach the NIRA services.',
  },
  'NinVerification': {
    'new': 'New verification request has been made',
  },
  'NiraCredentials': {
    'new': 'Nira Credentials have been updated'
  }
}
