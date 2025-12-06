module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Posts", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: Sequelize.STRING,
            content: Sequelize.TEXT,
            excerpt: Sequelize.TEXT,

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
        await queryInterface.dropTable("Posts");
    },
};
