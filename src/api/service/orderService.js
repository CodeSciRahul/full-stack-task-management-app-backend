import Menu from "../model/menu.js"
import Order from "../model/order.js"

export const createOrder = async(req, res) => {
    const { items } = req.body;
    const {userId } = req.user

    try {
        if (!items || items.length === 0) {
            return res.status(400).send({ message: "Order must contain at least one item" });
        }

        let totalAmount = 0;

        for (const item of items) {
            const menuItem = await Menu.findById(item.menuItemId);
            if (!menuItem || !menuItem.availability) {
                return res.status(400).send({ message: `Menu item ${item.menuItemId} is not available` });
            }
            totalAmount += menuItem.price * item.quantity;
        }

        // Create a new order
        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            status: "completed"
        });

        const savedOrder = await newOrder.save();

        return res.status(200).send(savedOrder);
    } catch (error) {
        return res.status(500).send({ message: error?.message || "Internal Server Error" });
    }
};

export const orders = async(req, res) => {
    try {
        const {userId} = req.user
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Calculate the starting index
        const skip = (page - 1) * limit;

        // Fetch paginated orders and total count
        const [orders, totalOrders] = await Promise.all([
            Order.find({ userId })
                .populate('items.menuItemId')
                .skip(skip)
                .limit(limit),
            Order.countDocuments({ userId})
        ]);

        const totalPages = Math.ceil(totalOrders / limit);
        const previousPage = page - 1 === 0 ? null : page - 1;
        const nextPage = page >= totalPages ? null : page + 1
        return res.status(200).send({
            data: orders,
            meta: {
                totalOrders,
                totalPages,
                currentPage: page,
                itemsPerPage: limit,
                previousPage,
                nextPage
            }
        });
    } catch (error) {
        return res.status(500).send({ message: error?.message || "Internal Server Error" });
    }
};