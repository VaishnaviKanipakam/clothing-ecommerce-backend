const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { request } = require("http");

app.use(express.json());
app.use(cors());

let db = null;
const initializeDbAndServer = async () => {
  try {
    db = mysql.createConnection({
      host: "localhost",
      user: "vaishu",
      password: "Bharu@96",
      database: "clothing_ecommerce_backend",
      insecureAuth: true,
    });
    const port = 5000;
    app.listen(port, () => {
      console.log(`app listening at ${port}...`);
    });
    db.connect(function (err) {
      if (err) throw err;
      console.log("Conected!");
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
      console.log("54", err);
      return;
    }
    // response.status(200).json("User Table Created Successfully");
    // console.log("58", result);

    if (password !== confirmPassword) {
      response.status(400).json("Password shold be same");
      console.log("63err");
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
          console.log("77", err);
          return;
        }
        response.status(200).json("User Created Successfully");
        console.log("81", result);
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
      console.log("108", err);
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
      console.log("118", result);
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
app.post("/product_table", (request, response) => {
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
      console.log("19", err);
      return;
    }
    // response.status(200).json("Table Created Successfully");
    // console.log("23", result)

    const insert_product_details_query = `
            INSERT INTO 
                product_table 
                     (product_name,  product_description,  product_price,  product_image,  product_category, product_size, product_stock)
                VALUES ? `;

    db.query(insert_product_details_query, [values], (err, result) => {
      if (err) {
        response.status(500).json("Cannot Insert Data");
        console.log("453", err);
        return;
      }
      response.status(200).json("Data Inserted Successfully");
      console.log("457", result);
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
      response.status(C500).json("Cannot Get PRoduct Details");
      console.log("217"); 
      return;
    }
    response.status(200).json(result);
  });
});

//Get Single product endpoint
app.get("/product", authenticationToken,(request, response) => {
    const productId = request.query.product_id;
    const get_single_product_query = `
        SELECT
            *
        FROM
             product_table 
        WHERE
             product_id = ?`;
        db.query(get_single_product_query, [productId], (err, result) => {
            if(err){
                response.status(500).json("Cannot Get User Data");
                console.log("236", err);
                return
            }
            response.status(200).json(result)
            console.log("240", result)
        })
}) 
