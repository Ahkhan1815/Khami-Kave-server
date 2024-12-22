module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments",{
        commentBody: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [0, 1000],
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Comments;
}