/**
 * @id games_validation
 */
function plugin() {

  return {

    validate: function () {
      console.log('Hi!. This is bad!');
    }

  };
}

module.exports = plugin();
