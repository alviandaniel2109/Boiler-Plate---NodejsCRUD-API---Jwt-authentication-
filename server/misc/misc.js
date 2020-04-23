/* eslint-disable no-underscore-dangle */
import db from '../../config/sequelize';

const Sequelize = require('sequelize');

module.exports.simpleOrdering = (req, columnIdName = 'id', orderArrangement = 'ASC') => {
    const ordering = {
        orderBy: columnIdName,
        orderType: orderArrangement,
    };
    if (req.query.order_by !== undefined) {
        ordering.orderBy = req.query.order_by;
    }
    if (req.query.order_type !== undefined) {
        ordering.orderType = req.query.order_type;
    }
    return ordering;
};

module.exports.simplePagination = (req) => {
    const pagination = {
        page: 0,
        row: 10,
    };

    if (req.query.row !== undefined) {
        pagination.row = req.query.row;
    }

    if (req.query.page !== undefined) {
        pagination.page = (req.query.page - 1) * pagination.row;
    }
    return pagination;
};

module.exports.logCreateActivity = (target, options) => {
    const message = `${options.decoded.name || options.decoded.username} created ${target._modelOptions.name.singular}(${target.dataValues.id})`;
    return db.Model.findOne({
        where: {
            name: {
                [Sequelize.Op.iLike]: target._modelOptions.name.singular,
            },
        },
    }).then((model) => db.Activity.create({
        user_id: options.decoded.user_id,
        target_id: target.dataValues.id,
        user_model_id: options.decoded.model_id,
        target_model_id: model.id,
        user_name: options.decoded.name || options.decoded.username,
        target_name: target.dataValues.name || target.dataValues.username,
        description: message,
    }));
};

module.exports.logDeleteActivity = (target, options) => {
    const message = `${options.decoded.name || options.decoded.username} deleted ${target._modelOptions.name.singular}(${target.dataValues.id})`;
    return db.Model.findOne({
        where: {
            name: {
                [Sequelize.Op.iLike]: target._modelOptions.name.singular,
            },
        },
    }).then((model) => db.Activity.create({
        user_id: options.decoded.user_id,
        target_id: target.dataValues.id,
        user_model_id: options.decoded.model_id,
        target_model_id: model.id,
        user_name: options.decoded.name || options.decoded.username,
        target_name: target.dataValues.name || target.dataValues.username,
        description: message,
    }));
};

module.exports.logUpdateActivity = (target, options) => {
    let message = `${options.decoded.name || options.decoded.username} changed ${target._modelOptions.name.singular}(${target.dataValues.id})'s `;
    const changed = [];
    Object.keys(target._changed).forEach((key) => {
        changed.push(`${key} from ${options.previous[key]} to ${options.newValue[key]}`);
    });
    changed.forEach((str, i) => {
        switch (i) {
        case 0:
            message = message.concat(`${str}`);
            break;
        case changed.length - 1:
            message = message.concat(` and ${str}.`);
            break;
        default:
            message = message.concat(`, ${str}`);
            break;
        }
    });
    return db.Model.findOne({
        where: {
            name: {
                [Sequelize.Op.iLike]: target._modelOptions.name.singular,
            },
        },
    }).then((model) => db.Activity.create({
        user_id: options.decoded.user_id,
        target_id: target.dataValues.id,
        user_model_id: options.decoded.model_id,
        target_model_id: model.id,
        user_name: options.decoded.name || options.decoded.username,
        target_name: target.dataValues.name || target.dataValues.username,
        description: message,
    }));
};
