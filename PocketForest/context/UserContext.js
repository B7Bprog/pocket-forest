let user;

exports.getCurrentUser = () => {
  return user;
};

exports.setCurrentUser = (newUser = {}) => {
  user = newUser;
  return user;
};
