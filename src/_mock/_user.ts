// assets
import { countries } from 'src/assets/data'
//
import { _mock } from './_mock'

// ----------------------------------------------------------------------

export const USER_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'banned', label: 'Banned' },
  { value: 'rejected', label: 'Rejected' }
]

export const USER_ROLES_OPTIONS = ['Admin','User']

export const _userAbout = {
  id: _mock.id(1),
  role: _mock.role(1),
  email: _mock.email(1),
  country: countries[1].label,
  school: _mock.companyName(2),
  company: _mock.companyName(1),
  coverUrl: _mock.image.cover(3),
  totalFollowers: _mock.number.nativeL(1),
  totalFollowing: _mock.number.nativeL(2),
  quote:
    'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
  socialLinks: {
    facebook: `https://www.facebook.com/caitlyn.kerluke`,
    instagram: `https://www.instagram.com/caitlyn.kerluke`,
    linkedin: `https://www.linkedin.com/in/caitlyn.kerluke`,
    twitter: `https://www.twitter.com/caitlyn.kerluke`,
  },
}

export const _userPayment = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  cardNumber: ['**** **** **** 1234', '**** **** **** 5678', '**** **** **** 7878'][index],
  cardType: ['mastercard', 'visa', 'visa'][index],
  primary: index === 1,
}));

export const _userAddressBook = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  primary: index === 0,
  name: _mock.fullName(index),
  phoneNumber: _mock.phoneNumber(index),
  fullAddress: _mock.fullAddress(index),
  addressType: (index === 0 && 'Home') || 'Office',
}));

export const _userInvoices = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  invoiceNumber: `INV-199${index}`,
  createdAt: _mock.time(index),
  price: _mock.number.price(index),
}));

export const _userPlans = [
  {
    subscription: 'basic',
    price: 0,
    primary: false,
  },
  {
    subscription: 'starter',
    price: 4.99,
    primary: true,
  },
  {
    subscription: 'premium',
    price: 9.99,
    primary: false,
  },
];

export const _userList = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  zipCode: '85807',
  state: 'Virginia',
  city: 'Rancho Cordova',
  role: _mock.role(index),
  email: _mock.email(index),
  address: '908 Jack Locks',
  name: _mock.fullName(index),
  isVerified: _mock.boolean(index),
  company: _mock.companyName(index),
  country: countries[index + 1].label,
  avatarUrl: _mock.image.avatar(index),
  phoneNumber: _mock.phoneNumber(index),
  status:
    (index % 2 && 'pending') || (index % 3 && 'banned') || (index % 4 && 'rejected') || 'active',
}));
