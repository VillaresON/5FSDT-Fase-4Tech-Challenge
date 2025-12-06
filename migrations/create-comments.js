'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Comments', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },

            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },

            postId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Posts',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },

            teacherId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Teachers',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },

            studentId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Students',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },

            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('Comments');
    },
};
