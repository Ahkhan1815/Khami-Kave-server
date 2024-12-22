module.exports = (sequelize, DataTypes) => {

    const GamesPosts = sequelize.define("GamesPosts",{
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    GamesPosts.associate = (models) => {
        GamesPosts.hasMany(models.Comments, {
            foreignKey: 'GamesPostId',
            onDelete: "cascade",
        });
    };
    return GamesPosts;
}