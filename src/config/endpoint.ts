const RESOURCES = {
  auth: 'auth',
  admin: 'admin',
  user: 'user',
  product: 'product',
  category: 'category'
};

export const ENDPOINT = {
  auth: {
    index: `${RESOURCES.auth}`,
    adminSignUp: `${RESOURCES.auth}/signup/admin`,
    userSignUp: `${RESOURCES.auth}/signup/user`,
    adminSignIn: `${RESOURCES.auth}/signin/admin`,
    userSignIn: `${RESOURCES.auth}/signin/user`
  },
  product: {
    index: `${RESOURCES.product}`
  },
  manage: {
    createProduct: `manage/${RESOURCES.product}/create`
  },
  category: {
    index: `${RESOURCES.category}`
  }
};
