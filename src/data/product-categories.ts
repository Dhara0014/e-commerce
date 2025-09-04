export const categories = [
  {
    "id": "0o65741345",
    "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/categories/bags.webp",
    "name": "Bag",
    "slug": "bag",
    "description": "Practical Granite Chicken",
    "products": 19,
    "created_at": "2024-12-19T10:00:00Z",
    "status": "active"
  },
  {
    "id": "0o54036233",
    "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/categories/sunglass.webp",
    "name": "Sunglass",
    "slug": "sunglass",
    "description": "Oriental Plastic Gloves",
    "products": 19,
    "created_at": "2024-12-19T10:00:00Z",
    "status": "active"
  },
  {
    "id": "0o24372456",
    "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/categories/watch.webp",
    "name": "Watch",
    "slug": "watch",
    "description": "Recycled Frozen Gloves",
    "products": 5,
    "created_at": "2024-12-19T10:00:00Z",
    "status": "inactive"
  },
  {
    "id": "0o12046444",
    "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/categories/sneakers.webp",
    "name": "Sneakers",
    "slug": "sneakers",
    "description": "Luxurious Soft Shoes",
    "products": 12,
    "created_at": "2024-12-19T10:00:00Z",
    "status": "active"
  },
  {
    "id": "0o50474030",
    "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/categories/chair.webp",
    "name": "Chair",
    "slug": "chair",
    "description": "Fantastic Wooden Chairs",
    "products": 35,
    "created_at": "2024-12-19T10:00:00Z",
    "status": "inactive"
  },
  {
    "id": "0o33766113",
    "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/categories/tools.webp",
    "name": "Tools",
    "slug": "tools",
    "description": "Recycled Frozen Gloves",
    "products": 18,
    "created_at": "2024-12-19T10:00:00Z",
    "status": "active"
  },
  {
    "id": "0o54047661",
    "image": "https://isomorphic-furyroad.s3.amazonaws.com/public/categories/kids.webp",
    "name": "Kids",
    "slug": "kids",
    "description": "Recycled Frozen Gloves",
    "products": 15,
    "created_at": "2024-12-19T10:00:00Z",
    "status": "inactive"
  }
]


export const bannerList = [
  {
    "id": "banner1",
    "image": "https://picsum.photos/1024/512?random=1",
    "title": "End of Season Sale",
    "description": "Get up to 50% off on your favorite products. Limited time offer!",
    "created_at": "2024-12-19T10:00:00Z",
    "status": "active"
  },
  {
    "id": "banner2",
    "image": "https://picsum.photos/1024/512?random=2",
    "title": "New Arrivals",
    "description": "Check out the latest additions to our collection. Fresh styles for everyone!",
    "created_at": "2024-12-18T14:30:00Z",
    "status": "active"
  },
  {
    "id": "banner3",
    "image": "https://picsum.photos/1024/512?random=3",
    "title": "Tech Deals",
    "description": "Grab the best deals on electronics and gadgets this weekend!",
    "created_at": "2024-12-17T11:45:00Z",
    "status": "inactive"
  },
  {
    "id": "banner4",
    "image": "https://picsum.photos/1024/512?random=4",
    "title": "Home & Living",
    "description": "Upgrade your home with our exclusive furniture collection.",
    "created_at": "2024-12-16T09:00:00Z",
    "status": "active"
  },
  {
    "id": "banner5",
    "image": "https://picsum.photos/1024/512?random=5",
    "title": "Fitness Gear",
    "description": "Your fitness journey begins here. Special discounts on fitness equipment.",
    "created_at": "2024-12-15T16:20:00Z",
    "status": "inactive"
  },
  {
    "id": "banner6",
    "image": "https://picsum.photos/1024/512?random=6",
    "title": "Back to School",
    "description": "Everything you need for the new school year. Shop now!",
    "created_at": "2024-12-14T12:15:00Z",
    "status": "active"
  },
  {
    "id": "banner7",
    "image": "https://picsum.photos/1024/512?random=7",
    "title": "Luxury Watches",
    "description": "Timeless elegance. Discover our range of luxury watches.",
    "created_at": "2024-12-13T14:50:00Z",
    "status": "inactive"
  },
  {
    "id": "banner8",
    "image": "https://picsum.photos/1024/512?random=8",
    "title": "Outdoor Adventures",
    "description": "Gear up for your next adventure with our outdoor essentials.",
    "created_at": "2024-12-12T10:10:00Z",
    "status": "active"
  },
  {
    "id": "banner9",
    "image": "https://picsum.photos/1024/512?random=9",
    "title": "Kids' Favorites",
    "description": "Toys, games, and more for the little ones. Shop now!",
    "created_at": "2024-12-11T08:40:00Z",
    "status": "active"
  },
  {
    "id": "banner10",
    "image": "https://picsum.photos/1024/512?random=10",
    "title": "Holiday Specials",
    "description": "Celebrate the season with our exclusive holiday deals.",
    "created_at": "2024-12-10T18:30:00Z",
    "status": "inactive"
  }
]


export const withdrawRequestList = [
  {
    "request_id": "REQ1001",
    "user_id": "1001",
    "user_details": {
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "id": "USR1001",
      "image": "https://example.com/images/alice.jpg"
    },
    "withdrawal_amount": 500,
    "payment_method": {
      "type": "bank_transfer",
      "details": {
        "bank_name": "ABC Bank",
        "account_number": "1234567890",
        "ifsc_code": "ABC001",
        "account_holder_name": "Alice Johnson"
      }
    },
    "request_date": "2024-12-19T10:00:00Z",
    "transaction_reference": null,
    "status": "pending"
  },
  {
    "request_id": "REQ1002",
    "user_id": "1002",
    "user_details": {
      "name": "Bob Smith",
      "email": "bob@example.com",
      "id": "USR1002",
      "image": "https://example.com/images/bob.jpg"
    },
    "withdrawal_amount": 1000,
    "payment_method": {
      "type": "UPI",
      "details": {
        "upi_id": "bob@upi"
      }
    },
    "request_date": "2024-12-19T11:00:00Z",
    "transaction_reference": "TXN1002",
    "status": "completed"
  },
  {
    "request_id": "REQ1003",
    "user_id": "1003",
    "user_details": {
      "name": "Carol Davis",
      "email": "carol@example.com",
      "id": "USR1003",
      "image": "https://example.com/images/carol.jpg"
    },
    "withdrawal_amount": 750,
    "payment_method": {
      "type": "paypal",
      "details": {
        "paypal_email": "carol@example.com"
      }
    },
    "request_date": "2024-12-18T15:30:00Z",
    "transaction_reference": null,
    "status": "pending"
  },
  {
    "request_id": "REQ1004",
    "user_id": "1004",
    "user_details": {
      "name": "David Smith",
      "email": "david@example.com",
      "id": "USR1004",
      "image": "https://example.com/images/david.jpg"
    },
    "withdrawal_amount": 300,
    "payment_method": {
      "type": "bank_transfer",
      "details": {
        "bank_name": "XYZ Bank",
        "account_number": "9876543210",
        "ifsc_code": "XYZ123",
        "account_holder_name": "David Smith"
      }
    },
    "request_date": "2024-12-17T09:00:00Z",
    "transaction_reference": "TXN1004",
    "status": "failed"
  },
  {
    "request_id": "REQ1005",
    "user_id": "1005",
    "user_details": {
      "name": "Eva Brown",
      "email": "eva@example.com",
      "id": "USR1005",
      "image": "https://example.com/images/eva.jpg"
    },
    "withdrawal_amount": 1500,
    "payment_method": {
      "type": "UPI",
      "details": {
        "upi_id": "eva@upi"
      }
    },
    "request_date": "2024-12-19T14:00:00Z",
    "transaction_reference": "TXN1005",
    "status": "completed"
  },
  {
    "request_id": "REQ1006",
    "user_id": "1006",
    "user_details": {
      "name": "Frank Taylor",
      "email": "frank@example.com",
      "id": "USR1006",
      "image": "https://example.com/images/frank.jpg"
    },
    "withdrawal_amount": 200,
    "payment_method": {
      "type": "bank_transfer",
      "details": {
        "bank_name": "DEF Bank",
        "account_number": "4567891230",
        "ifsc_code": "DEF456",
        "account_holder_name": "Frank Taylor"
      }
    },
    "request_date": "2024-12-18T12:45:00Z",
    "transaction_reference": null,
    "status": "pending"
  },
  {
    "request_id": "REQ1007",
    "user_id": "1007",
    "user_details": {
      "name": "Grace Wilson",
      "email": "grace@example.com",
      "id": "USR1007",
      "image": "https://example.com/images/grace.jpg"
    },
    "withdrawal_amount": 1200,
    "payment_method": {
      "type": "paypal",
      "details": {
        "paypal_email": "grace@example.com"
      }
    },
    "request_date": "2024-12-19T16:00:00Z",
    "transaction_reference": "TXN1007",
    "status": "completed"
  },
  {
    "request_id": "REQ1008",
    "user_id": "1008",
    "user_details": {
      "name": "Harry Moore",
      "email": "harry@example.com",
      "id": "USR1008",
      "image": "https://example.com/images/harry.jpg"
    },
    "withdrawal_amount": 800,
    "payment_method": {
      "type": "UPI",
      "details": {
        "upi_id": "harry@upi"
      }
    },
    "request_date": "2024-12-17T18:20:00Z",
    "transaction_reference": "TXN1008",
    "status": "failed"
  },
  {
    "request_id": "REQ1009",
    "user_id": "1009",
    "user_details": {
      "name": "Ivy Martinez",
      "email": "ivy@example.com",
      "id": "USR1009",
      "image": "https://example.com/images/ivy.jpg"
    },
    "withdrawal_amount": 250,
    "payment_method": {
      "type": "bank_transfer",
      "details": {
        "bank_name": "GHI Bank",
        "account_number": "3216549870",
        "ifsc_code": "GHI789",
        "account_holder_name": "Ivy Martinez"
      }
    },
    "request_date": "2024-12-19T08:30:00Z",
    "transaction_reference": null,
    "status": "pending"
  },
  {
    "request_id": "REQ1010",
    "user_id": "1010",
    "user_details": {
      "name": "Jack Thompson",
      "email": "jack@example.com",
      "id": "USR1010",
      "image": "https://example.com/images/jack.jpg"
    },
    "withdrawal_amount": 900,
    "payment_method": {
      "type": "paypal",
      "details": {
        "paypal_email": "jack@example.com"
      }
    },
    "request_date": "2024-12-19T19:00:00Z",
    "transaction_reference": "TXN1010",
    "status": "completed"
  }
]



