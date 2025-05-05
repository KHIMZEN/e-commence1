 const bodyParser = require('body-parser');
 const express = require('express');
 const { userInfo } = require('os');
 const bcrypt = require('bcrypt');[]
 const app= express();
 
 const path = require('path'); 
 //four databases to be used in this platform users,products,orders,
 const sqlite3 = require('sqlite3').verbose();

 app.use(express.static(path.join(__dirname,"public")));

 




    app.get("/dashboard",(req,res)=>
        { 
            res.sendFile(path.join(__dirname, "DASHBOARD.HTML") );
        })  

        app.get("/management",(req,res)=>
            { 
                res.sendFile(path.join(__dirname, "MANAGEMENT.HTML") );
            })

            app.get("/product",(req,res)=>
                { 
                    res.sendFile(path.join(__dirname, "PRODUCT.HTML") );
                })   

                app.get("/about",(req,res)=>
                    { 
                        res.sendFile(path.join(__dirname, "ABOUT.HTML") );
                    })

                    app.get("/contact",(req,res)=>
                        { 
                            res.sendFile(path.join(__dirname, "CONTACT.HTML") );
                        })

                        app.get("/signup",(req,res)=>
                            { 
                                res.sendFile(path.join(__dirname, "SIGNUP.HTML") );
                            })                 

app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.post("/signup",(req,res)=>{
     const { firstname,surname,email,password} = req.body;

     console.log(firstname);
    console.log (surname);
     console.log(email);
     console.log(password);
     
     console.log ("form submitted successfulley"); 
       const bcrypt = require('bcrypt');


     if (!firstname || !surname || !email || !password) {
        return res.status(400).send('All fields are required.');
     }

     // Check if the user already exists
      const checkQuery = `SELECT * FROM users WHERE email = ? AND firstname = ? AND surname = ?`;
      
      db.get(checkQuery, [email, firstname, surname], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error checking user.');
        }

        if (row) {
            // User already exists
            return res.status(400).send('User already exists. Please use the login form to proceed.');
            
        }
     
   


  // inserting the new users data into the users database
       const query = `INSERT INTO users (firstname, surname, email, password) VALUES (?, ?, ?, ?)`;
      db.run(query, [firstname, surname, email, password], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error adding user.');
        }
        res.status(200).send({ message: 'User added successfully!', userId: this.lastID });
         });
    });

});











app.use(express.urlencoded({ extended: true })); 
app.get("/login",(req,res)=>
    { 
        res.sendFile(path.join(__dirname, "LOGIN.HTML") );
    })
  
    app.post("/login",(req,res)=>{
        const { firstname,surname,email,password,checkbox} = req.body;
   
        console.log(firstname);                  
       console.log (surname);                   
         console.log(password);  
         console.log(email);    
        console.log(checkbox);
        
       
    // Check if all fields are provided
    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }
  


    // Check if user exists in the database
    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    db.get(query, [email, password], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error logging in.');
        }

         

        if (!row) {
            // User not found
            return res.status(400).send('No account found with these credentials. Please sign up first.');
        }

        // Successful login
        res.status(200).send({ message: 'Login successful!'});



        
      });


   })
   
   



   

   // Connect to SQLite database
   const db = new sqlite3.Database('./ecommerce.sqlite', (err) => {
       if (err) {
           return console.error('Error opening database:', err.message);
       }
       console.log('Connected to the SQLite database.');
   });
   
   
   
   
    // Query the 'users' table
    db.all('SELECT * FROM users', [], (err) => {
        if (err) {
            return console.error('Error running query:', err.message);
        }
        console.log("users table created");
    });
    
   
   










    // Query the 'orders' table
    db.all('SELECT * FROM orders', [], (err) => {
        if (err) {
            return console.error('Error running query:', err.message);
        }
        console.log(" orders table created");
    });
   
   
   



   
   // Query the 'products' table
   db.all('SELECT * FROM products', [], (err) => {
    if (err) {
        return console.error('Error running query:', err.message);
    }
    console.log("products table created");
});






   // Query the 'orderitems' table
   db.all('SELECT * FROM orderitems', [], (err) => {
    if (err) {
        return console.error('Error running query:', err.message);
    }
    console.log("orderitems table created");
});



/* 
app.use(express.json());

// Endpoint to receive Buy button details
app.post('/purchase', (req, res) => {
    // Backend example (Node.js with Express)
const { buttonId, productId, productName, price, userId } = req.body;

console.log(buttonId);
console.log(productId);
console.log(productName);
console.log(price);
console.log(userId);

console.log("Product details sent successfully!");


// Insert into orders table
const query = `
INSERT INTO orders (userId, productId, productname, price, orderdate)
VALUES (?, ?, ?, ?, datetime('now'))
`;

db.run(query, [userId, productId, productName, price], function (err) {
if (err) {
    console.error("Error inserting into orders table:", err.message);
    res.status(500).send("Error processing purchase.");
} else {
    console.log("Order successfully inserted:", {
        orderId: this.lastID,
        userId,
        productId,
        productName,
        price,
    });
    res.status(200).send("Order processed successfully.");
}
});
});





  

app.post('/purchase', (req, res) => {
    const { productId, productName, price, userId } = req.body;

    const query = `
        INSERT INTO orders (userId, productId, productname, price, orderdate)
        VALUES (?, ?, ?, ?, datetime('now'))
    `;

    db.run(query, [userId, productId, productName, price], function (err) {
        if (err) {
            console.error("Error inserting into orders table:", err.message);
            res.status(500).send("Error processing purchase.");
        } else {
            res.status(200).send({ message: "Order processed successfully." });
        }
    });
});

*/













































































const WebSocket = require("ws");
const http = require("http");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let managementClients = [];

wss.on("connection", (ws) => {
    console.log("New WebSocket client connected");

    ws.on("message", async (message) => {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.action === "new_order") {
            const orderDetails = parsedMessage.data;

            // Insert into Order Table (Assume database insert function)
            await insertIntoOrderTable(orderDetails);

                 // Notify management clients only if they are still connected
managementClients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) { // Ensure client connection is open
        try {
            client.send(JSON.stringify({ action: "update_management", data: orderDetails }));
            console.log("Management client notified:", orderDetails);
        } catch (error) {
            console.error("Error sending update to management client:", error);
        }
    }
});

            console.log("Order stored in DB & sent to management");
        }
    });

    // Store management page connection
    managementClients.push(ws);

    ws.on("close", () => {
        managementClients = managementClients.filter(client => client !== ws);
    });
});

// Start the server
server.listen(5000, () => {
    console.log("WebSocket server running on port 5000 ");
});

// Example function to insert data into the database (adjust for actual DB logic)

// Insert function for Order Table
async function insertIntoOrderTable(orderDetails) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO orders (userId, productId, productname, price, orderdate) VALUES (?, ?, ?, ?, datetime('now'))`,
            [orderDetails.userId, orderDetails.productId, orderDetails.productName, orderDetails.price],
            function (err) {
                if (err) {
                    console.error("Error inserting order into database:", err.message);
                    reject(err);
                } else {
                    console.log("Order inserted with ID:", this.lastID);
                    resolve(this.lastID);
                }
            }
        );
    });
}












   
   
  

app.listen (5000,() => 
    {console.log("server is running at port 5000")}
    )
    
 /* Close the database connection (optional but recommended)
 db.close((err) => {
    if (err) {
        return console.error('Error closing database:', err.message);
    }
    console.log('Database connection closed.');
});*/
