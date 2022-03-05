module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-prettier",
  ],
  rules: {
    // https://stylelint.io/user-guide/rules/regex/#enforce-a-case
    // I use cass modules so for easier access in javascript to the class name I prefer to use lowerCamelCase instead of kebab-case
    "selector-class-pattern": "^[a-z][a-zA-Z0-9]+$",
  },
};
