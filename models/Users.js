module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users",{
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        verification:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        verificationToken:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    /*
    Users.associate = (models) => {
        Users.hasMany(models.GamesPosts, {
            onDelete: "cascade",
        });
    };
    */
    return Users;
}