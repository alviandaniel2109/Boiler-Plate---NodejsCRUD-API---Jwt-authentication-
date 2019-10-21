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
