const addItemToCart = async (req, res) => {
    const userId = req.user.id;
    const { menu_item_id, quantity, restaurant_id } = req.body;

    try {
        const cartCheck = await pool.query(
            `SELECT cart_id, restaurant_id FROM carts WHERE user_id = $1`,
            [userId]
        );

        let cart_id;

        if (cartCheck.rows.length > 0) {
            if (cartCheck.rows[0].restaurant_id !== restaurant_id) {
                await pool.query(
                    `UPDATE carts SET restaurant_id = $1 WHERE user_id = $2`,
                    [restaurant_id, userId]
                );

                await pool.query(
                    `DELETE FROM cart_items WHERE cart_id = $1`,
                    [cartCheck.rows[0].cart_id]
                );
            }
            cart_id = cartCheck.rows[0].cart_id;
        } else {
            const cartResult = await pool.query(
                `INSERT INTO carts (user_id, restaurant_id) 
                 VALUES ($1, $2) 
                 RETURNING cart_id`,
                [userId, restaurant_id]
            );
            cart_id = cartResult.rows[0].cart_id;
        }

        const cartItemResult = await pool.query(
            `INSERT INTO cart_items (cart_id, menu_item_id, quantity) 
             VALUES ($1, $2, $3) 
             ON CONFLICT (cart_id, menu_item_id)
             DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
             RETURNING *`,
            [cart_id, menu_item_id, quantity]
        );

        res.status(201).json({
            success: true,
            cart_item: cartItemResult.rows[0]
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.stack
        });
    }
};

const getCartByUserId = async (req, res) => {
    const userId = req.user.id;

    try {
        const cartResult = await pool.query(
            `SELECT carts.cart_id, carts.restaurant_id, cart_items.cart_item_id, cart_items.menu_item_id, cart_items.quantity, menu_items.name, menu_items.price, menu_items.description, menu_items.image_url
             FROM carts
             INNER JOIN cart_items ON carts.cart_id = cart_items.cart_id
             INNER JOIN menu_items ON cart_items.menu_item_id = menu_items.menu_item_id
             WHERE carts.user_id = $1`,

            /*SELECT * FROM cart_items INNER JOIN carts ON cart_items.cart_id = carts.id 
            INNER JOIN menu_items ON  cart_items.menu_item_id = menu_items.id WHERE carts.user_id = 3
            */
            [userId]
        );

        if (cartResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Cart is empty'
            });
        }

        res.status(200).json({
            success: true,
            cart: cartResult.rows
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.stack
        });
    }
};
const updateCartItem = async (req, res) => {
    const { cartItem_id } = req.params;
    const { quantity } = req.body;

    try {
        const result = await pool.query(
            `UPDATE cart_items 
             SET quantity = $1 
             WHERE cart_item_id = $2 
             RETURNING *`,
            [quantity, cartItem_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        res.status(200).json({
            success: true,
            cart_item: result.rows[0]
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.stack
        });
    }
};
const removeCartItem = async (req, res) => {
    const { cartItem_id } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM cart_items 
             WHERE cart_item_id = $1 
             RETURNING *`,
            [cartItem_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cart item removed'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.stack
        });
    }
};

//checkout

const createOrder = async (req, res) => {
    const userId = req.user.id;
    const {delivery_address} = req.body
    try {

//hon get all carrt items from user id cart 
        const cartResult = await pool.query(
            `SELECT * FROM cart_items 
             INNER JOIN carts ON cart_items.cart_id = carts.cart_id 
             WHERE carts.user_id = $1`,
            [userId]
        );

        if (cartResult.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Your cart is empty'
            });
        }

        const cartItems = cartResult.rows;

        // Calculate total price of the order 
        const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Create a new order
        // momken to add paymentMethod hon 

        const orderResult = await pool.query(
            `INSERT INTO orders (user_id, restaurant_id, total_price, status, delivery_address) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [userId, cartItems[0].restaurant_id, totalPrice,'Pending',delivery_address ]
        );
        const orderId = orderResult.rows[0].order_id;

        // Move cart items to order items
        for (const item of cartItems) {
            await pool.query(
                `INSERT INTO order_items (order_id, menu_item_id, quantity, price) 
                 VALUES ($1, $2, $3, $4)`,
                [orderId, item.menu_item_id, item.quantity, item.price]
            );
        }

        // Clear the cart
        await pool.query(
            `DELETE FROM cart_items WHERE cart_id = $1`,
            [cartItems[0].cart_id]
        );

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order: orderResult.rows[0]
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.stack
        });
    }
};

// after having res from the above fun navigate to 



const getOrderById = async (req, res) => {
    const { order_id } = req.params;

    try {
        const orderResult = await pool.query(
            `SELECT * FROM orders WHERE order_id = $1`,
            [order_id]
        );

        if (orderResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        const order = orderResult.rows[0];

        const orderItemsResult = await pool.query(
            `SELECT order_items.*, menu_items.name, menu_items.description, menu_items.image_url 
             FROM order_items 
             INNER JOIN menu_items ON order_items.menu_item_id = menu_items.menu_item_id 
             WHERE order_id = $1`,
            [order_id]
        );

        order.items = orderItemsResult.rows;

        res.status(200).json({
            success: true,
            order: order
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.stack
        });
    }
};



const getRestaurantInfoById = async (req, res) => {
    const { id } = req.params;  
  
    try {
        const restaurantResult = await pool.query(
            `SELECT 
                r.restaurant_id,
                r.name,
                r.user_id,
                r.image_url,
                r.address,
                r.category,
                r.phone_number,
                r.created_at,
                r.updated_at,
                COALESCE(avg_reviews.average_rating, 0.00) AS average_rating,
                COALESCE(avg_reviews.rating_count, 0) AS rating_count
             FROM 
                restaurants r
             LEFT JOIN 
                (SELECT 
                    restaurant_id, 
                    AVG(rating) AS average_rating,
                    COUNT(rating) AS rating_count
                 FROM 
                    reviews
                 GROUP BY 
                    restaurant_id) AS avg_reviews
             ON 
                r.restaurant_id = avg_reviews.restaurant_id
             WHERE 
                r.restaurant_id = $1`,
            [id]
        );
  
        if (restaurantResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }
  
        const menuItemsResult = await pool.query(
            `SELECT 
                menu_item_id,
                name,
                description,
                price,
                sub_category,
                image_url,
                available,
                created_at,
                updated_at
             FROM 
                menu_items
             WHERE 
                restaurant_id = $1
             ORDER BY 
                created_at DESC`,
            [id]
        );
  
        // hon 3mlna include lal items b object wa7ad
        const restaurant = restaurantResult.rows[0];
        restaurant.menu_items = menuItemsResult.rows;
  
        res.status(200).json({
            success: true,
            restaurant: restaurant
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.stack
        });
    }
  }
  