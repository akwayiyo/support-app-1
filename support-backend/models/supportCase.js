module.exports = (sequelize, DataTypes) => {
  const SupportCase = sequelize.define("SupportCase", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  SupportCase.associate = models => {
    SupportCase.belongsTo(models.User, { foreignKey: "userId" });
  };

  return SupportCase;
};
