module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["Feat", "Fix", "Refactor", "Chore", "Design"]],
  },
};
