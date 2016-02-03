var id = 0;

module.exports = function(name) {
  return (name || '__var') + (id++);
};
