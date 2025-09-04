export const userData = [
    {
      "id": "1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@gmail.com",
      "profilePicture": "https://randomuser.me/api/portraits/men/1.jpg",
      "phoneNumber": "+1-555-123-4567",
      "registrationDate": "2024-11-25T14:30:00Z",
      "status": "Active",
      "lastLogin": "2024-12-09T10:15:00Z",
      "location": "New York",
      "reviews": [
        {
          "title": "user 1 title1",
          "description": "user 1 description, The interface is very user-friendly and intuitive.",
          "created_at": "2024-12-20T10:00:00Z",
        },
      {
          "title": "user 1 title2",
          "description": "user 1 description, I found it easy to navigate and achieve my goals.",
          "created_at": "2024-12-21T10:00:00Z",
        },
      ],
      "transaction": [
        {
        "transaction_id": "TX001",
        "order_id": "OX001",
        "item_name": "Laptop",
        "description": "Brand new Dell XPS 13",
        "transaction_amount": "1200",
        "payment_status": "Paid",
        "type": "Credit",
        "transaction_date": "2024-12-01T14:30:00Z",
        "seller": {
          "name": "John Doe",
          "contact": "+1234567890",
          "profile": "https://example.com/profiles/johndoe.jpg"
        }
        },
        {
          "transaction_id": "TX002",
          "order_id": "OX002",
          "item_name": "Smartphone",
          "description": "iPhone 13, 128GB",
          "transaction_amount": "800",
          "payment_status": "Pending",
          "transaction_date": "2024-12-02T16:00:00Z",
          "type": "Credit",
          "seller": {
            "name": "Alice Smith",
            "contact": "+1987654321",
            "profile": "https://example.com/profiles/alicesmith.jpg"
          }
        },
      ],
      "products": [
        {
       "id": "0o02051402",
        "name": "Tasty Metal Shirt",
        "category": "Books",
        "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
        "sku": "52442",
        "stock": 0,
        "price": "410.00",
        "status": "Pending",
        "rating": [4, 5, 3, 2],
        "description": "A stylish and durable shirt, perfect for casual wear. Crafted with high-quality materials for long-lasting comfort.",
        "seller_info": {
            "name": "John Doe",
            "contact": "john.doe@example.com",
            "location": "New York, USA",
            "profile": "https://randomuser.me/api/portraits/men/1.jpg"
        },
        "created_at": "2024-12-20T10:00:00Z",
      }
      ],
      "sell_details": [
        {
          "id": "0o02051402",
          "order_id": "0o100212",
           "name": "Tasty Metal Shirt",
           "category": "Books",
           "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
           "sku": "52442",
           "stock": 0,
           "price": "410.00",
           "status": "Pending",
           "rating": [4, 5, 3, 2],
           "description": "A stylish and durable shirt, perfect for casual wear. Crafted with high-quality materials for long-lasting comfort.",
           "created_at": "2024-12-02T10:00:00Z",
           "seller_info": {
            "name": "Jane Smith",
            "contact": "jan.smith@example.com",
            "location": "New York, USA",
            "profile": "https://randomuser.me/api/portraits/women/2.jpg"
        }
         }
      ],
      "purchase_details": [
        {
          "id": "0o02051402",
          "order_id": "0o01212",
          "created_at": "2024-12-09T10:15:00Z",
           "name": "Tasty Metal Shirt",
           "category": "Books",
           "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
           "sku": "52442",
           "stock": 0,
           "price": "410.00",
           "status": "Pending",
           "rating": [4, 5, 3, 2],
           "description": "A stylish and durable shirt, perfect for casual wear. Crafted with high-quality materials for long-lasting comfort.",
           "seller_info": {
               "name": "Jane Smith",
               "contact": "jan.smith@example.com",
               "location": "New York, USA",
               "profile": "https://randomuser.me/api/portraits/women/2.jpg"
           }
         }
      ],
      "actions": ["view", "edit", "delete"]
    },
    {
      "id": "user2",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane@gmail.com",
      "profilePicture": "https://randomuser.me/api/portraits/women/2.jpg",
      "phoneNumber": "+1-555-234-5678",
      "registrationDate": "2024-11-20T11:20:00Z",
      "status": "Inactive",
      "lastLogin": "2024-12-05T09:10:00Z",
      "location": "Los Angeles",
      "reviews": [
        {
          title: "user 2 title",
          description: "user 2 description, I found it easy to navigate and achieve my goals.",
          created_at: "2024-12-05T09:10:00Z",
        }
      ],
      "transaction": [
        {
          "transaction_id": "TX0022",
          "order_id": ")X0022",
          "item_name": "Microwave",
          "description": "LG 30L Microwave Oven",
          "transaction_amount": "250",
          "payment_status": "Paid",
          "type": "Debit",
          "transaction_date": "2024-12-08T12:30:00Z",
          "seller": {
            "name": "Grace Harris",
            "contact": "+1666777888",
            "profile": "https://example.com/profiles/graceharris.jpg"
          }
        },
      ],
      "products": [
        {
          "id": "0o17477064",
          "name": "Modern Cotton Gloves",
          "category": "Kids",
          "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp",
          "sku": "98414",
          "stock": 0,
          "price": "342.00",
          "status": "Draft",
          "rating": [4, 5],
          "description": "Soft and comfortable cotton gloves designed for kids, offering excellent warmth and protection.",
          "seller_info": {
              "name": "John Deo",
              "contact": "johndeo@example.com",
              "location": "San Francisco, USA",
              "profile": "https://randomuser.me/api/portraits/men/1.jpg"
          },
          "created_at": "2024-12-19T15:30:00Z",
      },
      ],
      "sell_details": [
        {
          "id": "0o17477064",
          "name": "Modern Cotton Gloves",
          "created_at": "2024-12-05T09:10:00Z",
          "category": "Kids",
          "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp",
          "sku": "98414",
          "stock": 0,
          "price": "342.00",
          "status": "Draft",
          "rating": [4, 5],
          "description": "Soft and comfortable cotton gloves designed for kids, offering excellent warmth and protection.",
          "seller_info": {
            "name": "John Deo",
            "contact": "johndeo@example.com",
            "location": "San Francisco, USA",
            "profile": "https://randomuser.me/api/portraits/men/1.jpg"
        },
      },
      ],
      "purchase_details": [
        {
          "id": "0o17477064",
          "name": "Modern Cotton Gloves",
          "created_at": "2024-12-05T09:10:00Z",
          "category": "Kids",
          "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp",
          "sku": "98414",
          "stock": 0,
          "price": "342.00",
          "status": "Draft",
          "rating": [4, 5],
          "description": "Soft and comfortable cotton gloves designed for kids, offering excellent warmth and protection.",
          "seller_info": {
            "name": "John Deo",
            "contact": "johndeo@example.com",
            "location": "San Francisco, USA",
            "profile": "https://randomuser.me/api/portraits/men/1.jpg"
        },
      },
      ],
      "actions": ["view", "edit", "delete"]
    },
    {
      "id": "user3",
      "firstName": "Alice",
      "lastName": "Johnson",
      "email": "ali@gmail.com",
      "profilePicture": "https://randomuser.me/api/portraits/women/3.jpg",
      "phoneNumber": "+1-555-345-6789",
      "registrationDate": "2024-10-12T16:00:00Z",
      "status": "Active",
      "lastLogin": "2024-12-08T12:00:00Z",
      "location": "Chicago",
      "reviews": [
        {
          title: "user 3 title",
          description: "user 3 description, The loading time is too slow.",
          "created_at" : "2024-12-08T12:00:00Z",
        }
      ],
      "transaction": [
        {
          "transaction_id": "TX003",
          "order_id": "OX003",
          "item_name": "Bicycle",
          "description": "Mountain bike with gear",
          "transaction_amount": "400",
          "payment_status": "Paid",
          "type": "Credit",
          "transaction_date": "2024-12-03T09:15:00Z",
          "seller": {
            "name": "Bob Johnson",
            "contact": "+1122334455",
            "profile": "https://example.com/profiles/bobjohnson.jpg"
          }
        },
      ],
      "products": [
        {
          "id": "0o02374305",
          "name": "Rustic Steel Computer",
          "category": "Games",
          "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/1.webp",
          "sku": "78192",
          "stock": 0,
          "price": "948.00",
          "status": "Draft",
          "rating": [4, 5, 2, 5, 3],
          "description": "A robust gaming computer with a sleek design and powerful features for an ultimate gaming experience.",
          "seller_info": {
              "name": "Mike Johnson",
              "contact": "mike.johnson@example.com",
              "location": "Los Angeles, USA",
              "profile": "https://randomuser.me/api/portraits/men/2.jpg"
          },
          "created_at": "2024-12-18T09:45:00Z",
      },
      {
          "id": "0o02602714",
          "name": "Licensed Concrete Cheese",
          "category": "Electronics",
          "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/11.webp",
          "sku": "86229",
          "stock": 0,
          "price": "853.00",
          "status": "Pending",
          "rating": [3, 2],
          "description": "Unique and innovative electronic cheese slicer, perfect for modern kitchens.",
          "seller_info": {
              "name": "Emily Brown",
              "contact": "emily.brown@example.com",
              "location": "Chicago, USA",
              "profile": "https://randomuser.me/api/portraits/women/2.jpg"
          }
      },
      ],
      "sell_details": [
        {
          "id": "0o02374305",
          "name": "Rustic Steel Computer",
          "created_at" : "2024-12-08T12:00:00Z",
          "category": "Games",
          "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/1.webp",
          "sku": "78192",
          "stock": 0,
          "price": "948.00",
          "status": "Draft",
          "rating": [4, 5, 2, 5, 3],
          "description": "A robust gaming computer with a sleek design and powerful features for an ultimate gaming experience.",
          "seller_info": {
              "name": "Mike Johnson",
              "contact": "mike.johnson@example.com",
              "location": "Los Angeles, USA",
              "profile": "https://randomuser.me/api/portraits/men/2.jpg"
          }
      },
      {
          "id": "0o02602714",
          "name": "Licensed Concrete Cheese",
          "created_at" : "2024-12-09T12:00:00Z",
          "category": "Electronics",
          "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/11.webp",
          "sku": "86229",
          "stock": 0,
          "price": "853.00",
          "status": "Pending",
          "rating": [3, 2],
          "description": "Unique and innovative electronic cheese slicer, perfect for modern kitchens.",
          "seller_info": {
              "name": "Emily Brown",
              "contact": "emily.brown@example.com",
              "location": "Chicago, USA",
              "profile": "https://randomuser.me/api/portraits/women/2.jpg"
          }
      },
      ],
      "purchase_details": [],
      "actions": ["view", "edit", "delete"]
    },
    {
      "id": "user4",
      "firstName": "Bob",
      "lastName": "Brown",
      "email": "bob@gmail.com",
      "profilePicture": "https://randomuser.me/api/portraits/men/4.jpg",
      "phoneNumber": "+1-555-456-7890",
      "registrationDate": "2024-11-15T08:40:00Z",
      "status": "Active",
      "lastLogin": "2024-12-10T08:00:00Z",
      "location": "San Francisco",
      "reviews": [
        {
          title: "user 4 title1",
          description: "user 4 description, The loading time is too slow.",
          "created_at": "2024-12-10T08:00:00Z",
        },
        {
          title: "user 4 title2",
          description: "user 4 description, Please optimize the performance. It takes too long to load pages.",
          "created_at": "2024-12-11T08:00:00Z",
        }
      ],
      "transaction": [
        {
          "transaction_id": "TX003",
          "order_id": "OX003",
          "item_name": "Bicycle",
          "description": "Mountain bike with gear",
          "transaction_amount": "400",
          "payment_status": "Paid",
          "type" : "Debit",
          "transaction_date": "2024-12-03T09:15:00Z",
          "seller": {
            "name": "Bob Johnson",
            "contact": "+1122334455",
            "profile": "https://example.com/profiles/bobjohnson.jpg"
          }
        },
      ],
      "products": [
        {
          "id": "0o02051402",
          "name": "Tasty Metal Shirt",
          "category": "Books",
          "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
          "sku": "52442",
          "stock": 0,
          "price": "410.00",
          "status": "Pending",
          "rating": [4, 5, 3, 2],
          "description": "A stylish and durable shirt, perfect for casual wear. Crafted with high-quality materials for long-lasting comfort.",
          "seller_info": {
              "name": "John Doe",
              "contact": "john.doe@example.com",
              "location": "New York, USA",
              "profile": "https://randomuser.me/api/portraits/men/1.jpg"
          },
          "created_at": "2024-12-17T11:20:00Z"
      },
      {
          "id": "0o17477064",
          "name": "Modern Cotton Gloves",
          "category": "Kids",
          "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp",
          "sku": "98414",
          "stock": 0,
          "price": "342.00",
          "status": "Draft",
          "rating": [4, 5],
          "description": "Soft and comfortable cotton gloves designed for kids, offering excellent warmth and protection.",
          "seller_info": {
              "name": "Jane Smith",
              "contact": "jane.smith@example.com",
              "location": "San Francisco, USA",
              "profile": "https://randomuser.me/api/portraits/women/1.jpg"
          }
      },
      ],
      "sell_details":[],
      "purchase_details": [
        {
          "id": "0o02051402",
          "name": "Tasty Metal Shirt",
          "created_at": "2024-12-10T08:00:00Z",
          "category": "Books",
          "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
          "sku": "52442",
          "stock": 0,
          "price": "410.00",
          "status": "Pending",
          "rating": [4, 5, 3, 2],
          "description": "A stylish and durable shirt, perfect for casual wear. Crafted with high-quality materials for long-lasting comfort.",
          "seller_info": {
              "name": "John Doe",
              "contact": "john.doe@example.com",
              "location": "New York, USA",
              "profile": "https://randomuser.me/api/portraits/men/1.jpg"
          }
      },
      {
          "id": "0o17477064",
          "name": "Modern Cotton Gloves",
          "created_at": "2024-12-19T08:00:00Z",
          "category": "Kids",
          "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp",
          "sku": "98414",
          "stock": 0,
          "price": "342.00",
          "status": "Draft",
          "rating": [4, 5],
          "description": "Soft and comfortable cotton gloves designed for kids, offering excellent warmth and protection.",
          "seller_info": {
              "name": "Jane Smith",
              "contact": "jane.smith@example.com",
              "location": "San Francisco, USA",
              "profile": "https://randomuser.me/api/portraits/women/1.jpg"
          }
      },
      ],
      "actions": ["view", "edit", "delete"]
      },
    {
      "id": "5",
      "firstName": "Charlie",
      "lastName": "Davis",
      "email": "charli@gmail.com",
      "profilePicture": "https://randomuser.me/api/portraits/men/4.jpg",
      "phoneNumber": "+1-555-567-8901",
      "registrationDate": "2024-09-30T14:50:00Z",
      "status": "Inactive",
      "lastLogin": "2024-11-28T07:30:00Z",
      "location": "Miami",
      "reviews": [
        {
          title: "user 5 title",
          description: "user 5 description, It creates a great user experience but could use more contrast in some areas.",
          "created_at": "2024-11-11T08:00:00Z",
        }
      ],
      "transaction": [
        {
          "transaction_id": "TX004",
          "order_id": "OX004",
          "item_name": "Washing Machine",
          "description": "Samsung 8kg Front Load",
          "transaction_amount": "600",
          "payment_status": "Pending",
          "type": "Credit",
          "transaction_date": "2024-12-04T11:20:00Z",
          "seller": {
            "name": "Charlie Lee",
            "contact": "+1222333444",
            "profile": "https://example.com/profiles/charlielee.jpg"
          }
        },
      ],
      "products": [
        {
          "id": "0o02051402",
          "name": "Tasty Metal Shirt",
          "category": "Books",
          "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
          "sku": "52442",
          "stock": 0,
          "price": "410.00",
          "status": "Pending",
          "rating": [4, 5, 3, 2],
          "description": "A stylish and durable shirt, perfect for casual wear. Crafted with high-quality materials for long-lasting comfort.",
          "seller_info": {
              "name": "John Doe",
              "contact": "john.doe@example.com",
              "location": "New York, USA",
              "profile": "https://randomuser.me/api/portraits/men/1.jpg"
          },
          "created_at": "2024-12-16T08:50:00Z",
      },
      ],
      "sell_details": [],
      "purchase_details": [],
      "actions": ["view", "edit", "delete"]
    },

    {
      "id": "user6",
      "firstName": "Diana",
      "lastName": "Green",
      "email": "diana@gmail.com",
      "profilePicture": "https://randomuser.me/api/portraits/women/6.jpg",
      "phoneNumber": "+1-555-678-9012",
      "registrationDate": "2024-11-22T17:10:00Z",
      "status": "Active",
      "lastLogin": "2024-12-09T15:40:00Z",
      "location": "Dallas",
      "reviews": [
        {
          title: "user 6 title1",
          description: "user 6 description, The app crashes frequently on older devices.",
          "created_at": "2024-12-12T08:00:00Z",
        },
        {
          title: "user 6 title2",
          description: "user 6 description, It makes it hard to use the app. Please fix the stability issues.",
          "created_at": "2024-12-13T08:00:00Z",
        }
      ],
      "transaction": [
        {
          "transaction_id": "TX005",
          "order_id": "TX005",
          "item_name": "Headphones",
          "description": "Sony WH-1000XM5 Noise Cancelling",
          "transaction_amount": "350",
          "payment_status": "Paid",
          "type": "Debit",
          "transaction_date": "2024-12-05T18:45:00Z",
          "seller": {
            "name": "David Kim",
            "contact": "+1333444555",
            "profile": "https://example.com/profiles/davidkim.jpg"
          }
        },
        {
          "transaction_id": "TX006",
          "order_id": "OX006",
          "item_name": "Tablet",
          "description": "iPad Pro 11-inch",
          "transaction_amount": "900",
          "payment_status": "Paid",
          "type": "Credit",
          "transaction_date": "2024-12-06T13:00:00Z",
          "seller": {
            "name": "Emma Brown",
            "contact": "+1444555666",
            "profile": "https://example.com/profiles/emmabrown.jpg"
          }
        },
      ],
      "products": [
        {
          "id": "0o02051402",
          "name": "Tasty Metal Shirt",
          "category": "Books",
          "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
          "sku": "52442",
          "stock": 0,
          "price": "410.00",
          "status": "Pending",
          "rating": [4, 5, 3, 2],
          "description": "A stylish and durable shirt, perfect for casual wear. Crafted with high-quality materials for long-lasting comfort.",
          "seller_info": {
              "name": "John Doe",
              "contact": "john.doe@example.com",
              "location": "New York, USA",
              "profile": "https://randomuser.me/api/portraits/men/1.jpg"
          },
          "created_at": "2024-12-15T10:10:00Z"
      },
      ],
      "sell_details":[],
      "purchase_details": [
        {
          "id": "0o02051402",
          "name": "Tasty Metal Shirt",
          "created_at": "2024-12-18T08:00:00Z",
          "category": "Books",
          "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
          "sku": "52442",
          "stock": 0,
          "price": "410.00",
          "status": "Pending",
          "rating": [4, 5, 3, 2],
          "description": "A stylish and durable shirt, perfect for casual wear. Crafted with high-quality materials for long-lasting comfort.",
          "seller_info": {
              "name": "John Doe",
              "contact": "john.doe@example.com",
              "location": "New York, USA",
              "profile": "https://randomuser.me/api/portraits/men/1.jpg"
          }
      },
      ],
      "actions": ["view", "edit", "delete"]
    },
    {
      "id": "user7",
      "firstName": "Eve",
      "lastName": "White",
      "email": "eve@gmail.com",
      "profilePicture": "https://randomuser.me/api/portraits/women/7.jpg",
      "phoneNumber": "+1-555-789-0123",
      "registrationDate": "2024-11-18T10:30:00Z",
      "status": "Active",
      "lastLogin": "2024-12-07T11:05:00Z",
      "location": "Seattle",
      "reviews": [
        {
          title: "user 7 title",
          description: "user 7 description, It creates a great user experience but could use more contrast in some areas.",
          "created_at": "2024-12-07T08:00:00Z",
        }
      ],
      "transaction": [
        {
          "transaction_id": "TX005",
          "order_id": "OX005",
          "item_name": "Headphones",
          "description": "Sony WH-1000XM5 Noise Cancelling",
          "transaction_amount": "350",
          "payment_status": "Paid",
          "type": "Debit",
          "transaction_date": "2024-12-05T18:45:00Z",
          "seller": {
            "name": "David Kim",
            "contact": "+1333444555",
            "profile": "https://example.com/profiles/davidkim.jpg"
          }
        },
        {
          "transaction_id": "TX006",
          "order_id": "OX006",
          "item_name": "Tablet",
          "description": "iPad Pro 11-inch",
          "transaction_amount": "900",
          "payment_status": "Paid",
          "type": "Credit",
          "transaction_date": "2024-12-06T13:00:00Z",
          "seller": {
            "name": "Emma Brown",
            "contact": "+1444555666",
            "profile": "https://example.com/profiles/emmabrown.jpg"
          }
        },
      ],
      "products": [
        {
        "id": "0o17477064",
        "name": "Modern Cotton Gloves",
        "category": "Kids",
        "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp",
        "sku": "98414",
        "stock": 0,
        "price": "342.00",
        "status": "Draft",
        "rating": [4, 5],
        "description": "Soft and comfortable cotton gloves designed for kids, offering excellent warmth and protection.",
        "seller_info": {
            "name": "Jane Smith",
            "contact": "jane.smith@example.com",
            "location": "San Francisco, USA",
            "profile": "https://randomuser.me/api/portraits/women/1.jpg"
        },
        "created_at": "2024-12-14T17:25:00Z"
    },
    {
        "id": "0o02374305",
        "name": "Rustic Steel Computer",
        "category": "Games",
        "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/1.webp",
        "sku": "78192",
        "stock": 0,
        "price": "948.00",
        "status": "Draft",
        "rating": [4, 5, 2, 5, 3],
        "description": "A robust gaming computer with a sleek design and powerful features for an ultimate gaming experience.",
        "seller_info": {
            "name": "Mike Johnson",
            "contact": "mike.johnson@example.com",
            "location": "Los Angeles, USA",
            "profile": "https://randomuser.me/api/portraits/men/2.jpg"
        }
    },
      ],
      "sell_details":[],
      "purchase_details": [
        {
          "id": "0o17477064",
          "created_at": "2024-12-10T08:00:00Z",
          "name": "Modern Cotton Gloves",
          "category": "Kids",
          "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp",
          "sku": "98414",
          "stock": 0,
          "price": "342.00",
          "status": "Draft",
          "rating": [4, 5],
          "description": "Soft and comfortable cotton gloves designed for kids, offering excellent warmth and protection.",
          "seller_info": {
              "name": "Jane Smith",
              "contact": "jane.smith@example.com",
              "location": "San Francisco, USA",
              "profile": "https://randomuser.me/api/portraits/women/1.jpg"
          }
      },
      ],
      "actions": ["view", "edit", "delete"]
    },


    // {
    //   "id": "user8",
    //   "firstName": "Frank",
    //   "lastName": "Black",
    //   "email": "frankblack@example.com",
    //   "profilePicture": "https://randomuser.me/api/portraits/men/8.jpg",
    //   "phoneNumber": "+1-555-890-1234",
    //   "registrationDate": "2024-11-01T13:40:00Z",
    //   "status": "Inactive",
    //   "lastLogin": "2024-11-30T12:10:00Z",
    //   "location": "Boston",
    //   "reviews": [
    //     {
    //       title: "user 8 title",
    //       description: "user 8 description, It creates a great user experience but could use more contrast in some areas."
    //     }
    //   ],
    //   "transaction": [
    //     {
    //       "transaction_id": "TX007",
    //       "item_name": "Television",
    //       "description": "Samsung 55-inch 4K UHD",
    //       "transaction_amount": "700",
    //       "payment_status": "pending",
    //       "transaction_date": "2024-12-07T10:00:00Z",
    //       "seller": {
    //         "name": "Frank Wilson",
    //         "contact": "+1555666777",
    //         "profile": "https://example.com/profiles/frankwilson.jpg"
    //       }
    //     },
    //   ],
    //   "products": [
    //     {
    //       "id": "0o02602714",
    //       "name": "Licensed Concrete Cheese",
    //       "category": "Electronics",
    //       "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/11.webp",
    //       "sku": "86229",
    //       "stock": 0,
    //       "price": "853.00",
    //       "status": "Pending",
    //       "rating": [3, 2],
    //       "description": "Unique and innovative electronic cheese slicer, perfect for modern kitchens.",
    //       "seller_info": {
    //           "name": "Emily Brown",
    //           "contact": "emily.brown@example.com",
    //           "location": "Chicago, USA",
    //           "profile": "https://randomuser.me/api/portraits/women/2.jpg"
    //       },
    //       "created_at": "2024-12-13T12:35:00Z"
    //   },
    //   ],
    //   "sell_details": [
    //     {
    //       "id": "0o02602714",
    //       "name": "Licensed Concrete Cheese",
    //       "category": "Electronics",
    //       "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/11.webp",
    //       "sku": "86229",
    //       "stock": 0,
    //       "price": "853.00",
    //       "status": "Pending",
    //       "rating": [3, 2],
    //       "description": "Unique and innovative electronic cheese slicer, perfect for modern kitchens.",
    //       "seller_info": {
    //           "name": "Emily Brown",
    //           "contact": "emily.brown@example.com",
    //           "location": "Chicago, USA",
    //           "profile": "https://randomuser.me/api/portraits/women/2.jpg"
    //       }
    //   },
    //   ],
    //   "purchase_details":[
    //     {
    //       "id": "0o02602714",
    //       "name": "Licensed Concrete Cheese",
    //       "category": "Electronics",
    //       "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/11.webp",
    //       "sku": "86229",
    //       "stock": 0,
    //       "price": "853.00",
    //       "status": "Pending",
    //       "rating": [3, 2],
    //       "description": "Unique and innovative electronic cheese slicer, perfect for modern kitchens.",
    //       "seller_info": {
    //           "name": "Emily Brown",
    //           "contact": "emily.brown@example.com",
    //           "location": "Chicago, USA",
    //           "profile": "https://randomuser.me/api/portraits/women/2.jpg"
    //       }
    //   },
    //   ],
    //   "actions": ["view", "edit", "delete"]
    // },
    // {
    //   "id": "user9",
    //   "firstName": "Grace",
    //   "lastName": "Grey",
    //   "email": "gracegrey@example.com",
    //   "profilePicture": "https://randomuser.me/api/portraits/women/9.jpg",
    //   "phoneNumber": "+1-555-901-2345",
    //   "registrationDate": "2024-12-01T09:00:00Z",
    //   "status": "Active",
    //   "lastLogin": "2024-12-10T09:50:00Z",
    //   "location": "Austin",
    //   "reviews": [
    //     {
    //       title: "user title",
    //       description: "user description, It creates a great user experience but could use more contrast in some areas."
    //     }
    //   ],
    //   "transaction": [
    //     {
    //       "transaction_id": "TX009",
    //       "item_name": "Television",
    //       "description": "Samsung 55-inch 4K UHD",
    //       "transaction_amount": "700",
    //       "payment_status": "pending",
    //       "transaction_date": "2024-12-07T10:00:00Z",
    //       "seller": {
    //         "name": "Frank Wilson",
    //         "contact": "+1555666777",
    //         "profile": "https://example.com/profiles/frankwilson.jpg"
    //       }
    //     },
    //   ],
    //   "products": [
    //     {
    //       "id": "0o54011366",
    //       "name": "Electronic Rubber Table",
    //       "category": "Books",
    //       "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp",
    //       "sku": "89762",
    //       "stock": 18,
    //       "price": "881.00",
    //       "status": "Publish",
    //       "rating": [3, 4, 5],
    //       "description": "A sturdy and stylish rubber table, ideal for modern homes and offices.",
    //       "seller_info": {
    //           "name": "William Davis",
    //           "contact": "william.davis@example.com",
    //           "location": "Houston, USA",
    //           "profile": "https://randomuser.me/api/portraits/men/3.jpg"
    //       },
    //       "created_at": "2024-12-12T14:40:00Z"
    //   },
    //   ],
    //   "sell_details": [
    //     {
    //       "id": "0o54011366",
    //       "name": "Electronic Rubber Table",
    //       "category": "Books",
    //       "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp",
    //       "sku": "89762",
    //       "stock": 18,
    //       "price": "881.00",
    //       "status": "Publish",
    //       "rating": [3, 4, 5],
    //       "description": "A sturdy and stylish rubber table, ideal for modern homes and offices.",
    //       "seller_info": {
    //           "name": "William Davis",
    //           "contact": "william.davis@example.com",
    //           "location": "Houston, USA",
    //           "profile": "https://randomuser.me/api/portraits/men/3.jpg"
    //       }
    //   },
    //   ],
    //   "purchase_details":[],
    //   "actions": ["view", "edit", "delete"]
    // },
    // {
    //   "id": "user10",
    //   "firstName": "Henry",
    //   "lastName": "Blue",
    //   "email": "henryblue@example.com",
    //   "profilePicture": "https://randomuser.me/api/portraits/men/10.jpg",
    //   "phoneNumber": "+1-555-012-3456",
    //   "registrationDate": "2024-11-30T12:00:00Z",
    //   "status": "Active",
    //   "lastLogin": "2024-12-10T14:30:00Z",
    //   "location": "Denver",
    //   "reviews": [
    //     {
    //       title: "user title",
    //       description: "user description, It creates a great user experience but could use more contrast in some areas."
    //     }
    //   ],
    //   "transaction": [
    //     {
    //       "transaction_id": "TX0010",
    //       "item_name": "Television",
    //       "description": "Samsung 55-inch 4K UHD",
    //       "transaction_amount": "700",
    //       "payment_status": "pending",
    //       "transaction_date": "2024-12-07T10:00:00Z",
    //       "seller": {
    //         "name": "Frank Wilson",
    //         "contact": "+1555666777",
    //         "profile": "https://example.com/profiles/frankwilson.jpg"
    //       }
    //     },
    //   ],
    //   "products": [
    //     {
    //       "id": "0o02051402",
    //       "name": "Tasty Metal Shirt",
    //       "category": "Books",
    //       "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
    //       "sku": "52442",
    //       "stock": 0,
    //       "price": "410.00",
    //       "status": "Pending",
    //       "rating": [4, 5, 3, 2],
    //       "description": "A stylish and durable shirt, perfect for casual wear. Crafted with high-quality materials for long-lasting comfort.",
    //       "seller_info": {
    //           "name": "John Doe",
    //           "contact": "john.doe@example.com",
    //           "location": "New York, USA",
    //           "profile": "https://randomuser.me/api/portraits/men/1.jpg"
    //       },
    //       "created_at": "2024-12-11T16:15:00Z"
    //   },
    //   {
    //       "id": "0o17477064",
    //       "name": "Modern Cotton Gloves",
    //       "category": "Kids",
    //       "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp",
    //       "sku": "98414",
    //       "stock": 0,
    //       "price": "342.00",
    //       "status": "Draft",
    //       "rating": [4, 5],
    //       "description": "Soft and comfortable cotton gloves designed for kids, offering excellent warmth and protection.",
    //       "seller_info": {
    //           "name": "Jane Smith",
    //           "contact": "jane.smith@example.com",
    //           "location": "San Francisco, USA",
    //           "profile": "https://randomuser.me/api/portraits/women/1.jpg"
    //       },
    //       "created_at": "2024-12-30T16:15:00Z"
    //   },
    //   ],
    //   "sell_details": [
    //     {
    //       "id": "0o02051402",
    //       "name": "Tasty Metal Shirt",
    //       "category": "Books",
    //       "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
    //       "sku": "52442",
    //       "stock": 0,
    //       "price": "410.00",
    //       "status": "Pending",
    //       "rating": [4, 5, 3, 2],
    //       "description": "A stylish and durable shirt, perfect for casual wear. Crafted with high-quality materials for long-lasting comfort.",
    //       "seller_info": {
    //           "name": "John Doe",
    //           "contact": "john.doe@example.com",
    //           "location": "New York, USA",
    //           "profile": "https://randomuser.me/api/portraits/men/1.jpg"
    //       }
    //   },
    //   {
    //       "id": "0o17477064",
    //       "name": "Modern Cotton Gloves",
    //       "category": "Kids",
    //       "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp",
    //       "sku": "98414",
    //       "stock": 0,
    //       "price": "342.00",
    //       "status": "Draft",
    //       "rating": [4, 5],
    //       "description": "Soft and comfortable cotton gloves designed for kids, offering excellent warmth and protection.",
    //       "seller_info": {
    //           "name": "Jane Smith",
    //           "contact": "jane.smith@example.com",
    //           "location": "San Francisco, USA",
    //           "profile": "https://randomuser.me/api/portraits/women/1.jpg"
    //       }
    //   },
    //   ],
    //   "purchase_details": [
    //     {
    //       "id": "0o02051402",
    //       "name": "Tasty Metal Shirt",
    //       "category": "Books",
    //       "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
    //       "sku": "52442",
    //       "stock": 0,
    //       "price": "410.00",
    //       "status": "Pending",
    //       "rating": [4, 5, 3, 2],
    //       "description": "A stylish and durable shirt, perfect for casual wear. Crafted with high-quality materials for long-lasting comfort.",
    //       "seller_info": {
    //           "name": "John Doe",
    //           "contact": "john.doe@example.com",
    //           "location": "New York, USA",
    //           "profile": "https://randomuser.me/api/portraits/men/1.jpg"
    //       }
    //   },
    //   {
    //       "id": "0o17477064",
    //       "name": "Modern Cotton Gloves",
    //       "category": "Kids",
    //       "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp",
    //       "sku": "98414",
    //       "stock": 0,
    //       "price": "342.00",
    //       "status": "Draft",
    //       "rating": [4, 5],
    //       "description": "Soft and comfortable cotton gloves designed for kids, offering excellent warmth and protection.",
    //       "seller_info": {
    //           "name": "Jane Smith",
    //           "contact": "jane.smith@example.com",
    //           "location": "San Francisco, USA",
    //           "profile": "https://randomuser.me/api/portraits/women/1.jpg"
    //       }
    //   },
    //   ],
    //   "actions": ["view", "edit", "delete"]
    // }
  ];