'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Drop foreign key constraints first
    await queryInterface.removeConstraint('forwarding_events', 'forwarding_events_subscription_id_fkey');
    
    // Drop the existing table
    await queryInterface.dropTable('subscriptions');
    
    // Create new table with correct schema
    await queryInterface.createTable('subscriptions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      service: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      screen_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      available_screens: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      status: {
        type: Sequelize.ENUM('pending_verification', 'verified', 'suspended'),
        defaultValue: 'pending_verification',
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Re-add the foreign key constraint
    await queryInterface.addConstraint('forwarding_events', {
      fields: ['subscription_id'],
      type: 'foreign key',
      name: 'forwarding_events_subscription_id_fkey',
      references: {
        table: 'subscriptions',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop foreign key constraint first
    await queryInterface.removeConstraint('forwarding_events', 'forwarding_events_subscription_id_fkey');
    
    // Drop the table
    await queryInterface.dropTable('subscriptions');
  }
};
