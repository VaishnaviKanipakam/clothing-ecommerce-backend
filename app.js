require("dotenv").config(); 
const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { request } = require("http");

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://clothing-ecommerce-frontend-eight.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

let db = null;
const initializeDbAndServer = async () => {
  try {
    db = mysql.createPool({
      host:  process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT || 3306),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`app listening at ${port}...`);
    });
   db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Database connected successfully!");
    connection.release();
  }
}); 
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

// Registation APLI
app.post("/registration", async (request, response) => {
  const userDetails = request.body;
  const { name, email, password, confirmPassword } = userDetails;
  const hashedPassword = await bcrypt.hash(password, 10);
  const create_registration_table = `
    CREATE TABLE IF NOT EXISTS  registration_table (
            user_id INTEGER NOT NULL AUTO_INCREMENT,
            name VARCHAR (1000),
            email VARCHAR (1000),
            password VARCHAR(255) NOT NULL,
            confirm_password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (user_id)
        );`;

  db.query(create_registration_table, (err, result) => {
    if (err) {
      response.status(500).json("Cannot Create User Table");
      return;
    }

    if (password !== confirmPassword) {
      response.status(400).json("Password shold be same");
      return;
    }

    const insert_user_details = `
          INSERT INTO 
            registration_table (name, email, password, confirm_password)
          VALUES (?, ?, ?, ?);`;
    db.query(
      insert_user_details,
      [name, email, hashedPassword, confirmPassword],
      (err, result) => {
        if (err) {
          response.status(500).json("Cannot Create Account");
          return;
        }
        response.status(200).json("User Created Successfully");
      }
    );
  });
});

// Login API
app.post("/login", (request, response) => {
  const loginDetails = request.body;
  const { password, email } = loginDetails;

  const get_login_details_query = `
        SELECT 
            *
        FROM 
            registration_table
        WHERE
             email = ? ;`;

  db.query(get_login_details_query, [email], async (err, result) => {
    if (err) {
      response.status(500).json("Cannot Get Details");
      return;
    }

    if (result.length == 0) {
      return response.status(400).json("Enter Valid Details");
    }

    const user = result[0];

    const isPasswordMatch = await bcrypt.compare(password, result[0].password);
    if (!isPasswordMatch) {
      return response.status(401).json("Incorrect password");
    } else if (
      result.length !== 0 &&
      result[0].email === email &&
      isPasswordMatch
    ) {
      const payload = {
        email: user.email,
      };
      const jwtToken = jwt.sign(payload, "msrhtoknmdhti");
      return response.status(200).json({ result, token: jwtToken });
    }
  });
});

//Authentication Middleware
const authenticationToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const jwtToken = authHeader && authHeader.split(" ")[1];

  if (!jwtToken) {
    return response.status(401).json("Invalid JWT Token");
  }
  try {
    const decoded = jwt.verify(jwtToken, "msrhtoknmdhti");
    request.user = decoded;
    next();
  } catch (err) {
    return response.status(403).json("Invalid JWT Token");
  }
};

// Product Table Creation and Inserrindg Product Data
app.post("/product_table", authenticationToken, (request, response) => {
  const products = require("./products");
  const values = products.map((p) => [
    p.product_name,
    p.product_description,
    p.product_price,
    p.product_image,
    p.product_category,
    p.product_size,
    p.product_stock,
  ]);
  const create_product_table_query = `
         CREATE TABLE IF NOT EXISTS  product_table (
            product_id INTEGER NOT NULL AUTO_INCREMENT,
            product_name VARCHAR(1000),
            product_description TEXT,
            product_price INTEGER,
            product_image TEXT,
            product_category ENUM('Men', 'Women', 'Kids') NOT NULL,
            product_size VARCHAR(100),
            product_stock VARCHAR(100),
            PRIMARY KEY (product_id)
);`;

  db.query(create_product_table_query, (err, result) => {
    if (err) {
      response.status(500).json("Cannot Create Table");
      return;
    }

    const insert_product_details_query = `
            INSERT INTO 
                product_table 
                     (product_name,  product_description,  product_price,  product_image,  product_category, product_size, product_stock)
                VALUES ? `;

    db.query(insert_product_details_query, [values], (err, result) => {
      if (err) {
        response.status(500).json("Cannot Insert Data");
        return;
      }
      response.status(200).json("Data Inserted Successfully");
    });
  });
});

//GET all products by category endpoint
app.get("/products", authenticationToken, (request, response) => {
  const productCategory = request.query.product_category;
  const get_product_by_filters_query = `
        SELECT
            *
        FROM 
            product_table 
        WHERE
             product_category = ?`;

  db.query(get_product_by_filters_query, [productCategory], (err, result) => {
    if (err) {
      response.status(500).json("Cannot Get Product Details");
      return;
    }
    response.status(200).json(result);
  });
});

//Get Single product endpoint
app.get("/product", authenticationToken, (request, response) => {
  const productId = request.query.product_id;
  const get_single_product_query = `
        SELECT
            *
        FROM
             product_table 
        WHERE
             product_id = ?`;
  db.query(get_single_product_query, [productId], (err, result) => {
    if (err) {
      response.status(500).json("Cannot Get User Data");
      return;
    }
    response.status(200).json(result);
  });
});

// creating Cart table and Inserting Data into Cart Table
app.post("/cart", authenticationToken, (request, response) => {
  const {
    userId,
    productId,
    productCategory,
    productImage,
    productName,
    productPrice,
    selectedProductSize,
  } = request.body;

  const create_cart_table_query = `
        CREATE TABLE IF NOT EXISTS  cart_table (
            cart_id INTEGER NOT NULL AUTO_INCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER,
            product_category TEXT,
            product_image TEXT,
            product_name VARCHAR (1000),
            product_price INTEGER,
            product_size TEXT,
            product_quantity INT DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (cart_id),
            FOREIGN KEY (user_id) REFERENCES registration_table(user_id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES product_table(product_id) ON DELETE CASCADE
            )`;
  db.query(create_cart_table_query, (err, result) => {
    if (err) {
      response.status(500).json("Cannot Create Product Table");
      return;
    }

    const check_cart_item_present = `
    SELECT *
    FROM cart_table
    WHERE user_id = ? AND product_id = ? AND product_size = ?
  `;

    db.query(
      check_cart_item_present,
      [userId, productId, selectedProductSize],
      (err, rows) => {
        if (err) {
          return response.status(500).json("Database Error");
        }

        // If item exists → update quantity and RETURN
        if (rows.length > 0) {
          const update_quantity = `
          UPDATE cart_table
          SET 
            product_quantity = product_quantity + 1
          WHERE 
            user_id = ? 
            AND product_id = ? 
            AND product_size = ?
        `;

          return db.query(
            update_quantity,
            [userId, productId, selectedProductSize],
            (err) => {
              if (err) return response.status(500).json("Database error 2");
              return response.json("Quantity Increased");
            }
          );
        }

        // Otherwise INSERT new item
        const insert_query = `
        INSERT INTO cart_table 
        (user_id, product_id, product_category, product_image, product_name, product_price, product_size, product_quantity)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1)
      `;

        db.query(
          insert_query,
          [
            userId,
            productId,
            productCategory,
            productImage,
            productName,
            productPrice,
            selectedProductSize,
          ],
          (err) => {
            if (err) {
              return response.status(500).json("Cannot Add Product To Cart");
            }

            return response.json("Product Added To Cart Successfully");
          }
        );
      }
    );
  });
});

// Get all cart items belongs to user
app.get("/cart_items", authenticationToken, (request, response) => {
  const userId = request.query.user_id;
  const get_user_cart_items_query = `
    SELECT
      *
    FROM
      cart_table
    WHERE
      user_id = ?`;

  db.query(get_user_cart_items_query, [userId], (err, result) => {
    if (err) {
      response.status(500).json("Cannot Get Cart Items");
      return;
    }
    response.status(200).json(result);
    // }
  });
});

//Get Cart Items count
app.get("/cart_items_count", authenticationToken, (request, response) => {
  const userId = request.query.user_id;
  const calculate_cart_items_count = `
    SELECT 
      COUNT (*) AS cart_items_count
    FROM 
      cart_table
    WHERE
      user_id = ?`;

  db.query(calculate_cart_items_count, [userId], (err, result) => {
    if (err) {
      return response.status(500).json("Cannot Get Cart Items Count");
    }
    response.status(200).json(result);
  });
});

//Update Cart Item beased on userId, productId, cartId
app.put("/update_cart_item", authenticationToken, (request, response) => {
  const { user_id, cart_id, product_id, product_category } = request.query;
  const cartUpdateDetails = request.body;
  const { productQuantityCount, productValue } = cartUpdateDetails;

  const update_cart_item_query = `
    UPDATE
      cart_table
    SET
      product_quantity = ?
    WHERE
      user_id = ?
      AND cart_id = ?
      AND product_id = ?
      AND product_category = ?

  `;
  db.query(
    update_cart_item_query,
    [
      productQuantityCount,
      Number(user_id),
      Number(cart_id),
      Number(product_id),
      product_category,
    ],
    (err, result) => {
      if (err) {
        return response.status(500).json("Cannot Upadate Cart Item");
      }
      response.status(200).json("Product Updated Successfully");
    }
  );
});

//Delete Cart Item belongs to the login user
app.delete("/delete_cart_item", authenticationToken, (request, response) => {
  const { user_id, cart_id, product_id, product_category } = request.query;
  const delete_cart_item_query = `
    DELETE FROM cart_table
    WHERE
      user_id = ?
      AND cart_id = ?
      AND product_id = ?
      AND product_category = ?
  `;

  db.query(
    delete_cart_item_query,
    [Number(user_id), Number(cart_id), Number(product_id), product_category],
    (err, result) => {
      if (err) {
        return response.status(500).json("Cannot Delete Cart Table");
      }
      response.status(200).json("Cart Item Deleted Successfully");
    }
  );
});

//Creating orders table and Insert Order Details into order table
app.post("/order", authenticationToken, (request, response) => {
  const userId = request.query.user_id;
  const orderDetails = request.body;
  const { cartItems, totalPrice, name, phoneNumber, address } = orderDetails;

  const create_order_table_query = `
    CREATE TABLE IF NOT EXISTS  order_table (
          order_id INTEGER NOT NULL AUTO_INCREMENT,
          user_id INTEGER NOT NULL,
          cart_items_json JSON,
          total_price DECIMAL(10,2),
          name VARCHAR(100),
          phone_number TEXT,
          address TEXT,
          order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          order_status VARCHAR(100),
          PRIMARY KEY (order_id),
          FOREIGN KEY (user_id) REFERENCES registration_table(user_id) ON DELETE CASCADE
)`;

  db.query(create_order_table_query, (err, result) => {
    if (err) {
      return response.status(500).json("Cannot Create Table");
    }

    const insert_order_details = `
    INSERT INTO
      order_table (user_id, cart_items_json, total_price, name, phone_number, address, order_status)
    VALUES (
        ?, ?, ?, ?, ?, ?, ?
    )
  `;
    db.query(
      insert_order_details,
      [
        userId,
        JSON.stringify(cartItems),
        totalPrice,
        name,
        phoneNumber,
        address,
        "Order Delivered",
      ],
      (err, result) => {
        if (err) {
          return response.status(500).json("Cannot Place Order");
        }
        response.status(200).json("Order Placed Successfully");
      }
    );
  });
});

//Get all orders belongs to user
app.get("/get_orders", authenticationToken,(request, response) => {
  const userId = request.query.user_id;

  const get_all_orders_query = `
    SELECT
      *
    FROM
      order_table
    WHERE
      user_id = ?
  `;
  db.query(get_all_orders_query, [userId], (err, result) => {
    if (err) {
      return response.status(500).json("Cannot Get Order Details");
    }
    response.status(200).json(result);
  });
});
