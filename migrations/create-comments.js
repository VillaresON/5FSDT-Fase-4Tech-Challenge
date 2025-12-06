module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Comments", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            content: Sequelize.TEXT,

            postId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Posts",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            authorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Teachers",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("Comments");
    },
};
