const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require("cors");
const app = express();
const port = 9000;
const { uuid } = require("uuidv4");

// setup middleware
app.use(bodyParser.json());
app.use(cors());

//
var _dishes = [
  {
    id: 1,
    name: "Penne Arrabbiata",
    description: "Penne pasta with spicy tomato sauce",
    price: 9.99,
    category: "main course",
    availability: {
      day: ["Weekends", "Weekdays"],
      time: ["Lunch", "Dinner"],
    },
    isActive: true,
    waitTime: 15,
  },
  {
    id: 2,
    name: "Caprese Salad",
    description: "Tomatoes, mozzarella, and basil with balsamic glaze",
    price: 7.99,
    category: "starter",
    availability: {
      day: ["Weekends", "Weekdays"],
      time: ["Breakfast", "Lunch", "Dinner"],
    },
    isActive: false,
    waitTime: 10,
  },
  {
    id: 3,
    name: "Beef Bourguignon",
    description: "Beef stewed in red wine with carrots, onions, and mushrooms",
    price: 18.99,
    category: "main course",
    availability: {
      day: ["Weekends", "Weekdays"],
      time: ["Dinner"],
    },
    isActive: true,
    waitTime: 25,
  },
  {
    id: 4,
    name: "Tiramisu",
    description: "Mascarpone cheese, ladyfingers, and espresso",
    price: 6.99,
    category: "dessert",
    availability: {
      day: ["Weekends"],
      time: ["Lunch", "Dinner"],
    },
    isActive: true,
    waitTime: 5,
  },
  {
    id: 5,
    name: "Espresso",
    description: "A single shot of espresso",
    price: 2.99,
    category: "beverage",
    availability: {
      day: ["Weekends", "Weekdays"],
      time: ["Breakfast", "Lunch", "Dinner"],
    },
    isActive: true,
    waitTime: 3,
  },
  {
    id: 6,
    name: "Chicken Alfredo",
    description:
      "Fettuccine pasta with creamy Alfredo sauce and grilled chicken",
    price: 14.99,
    category: "main course",
    availability: {
      day: ["Weekends", "Weekdays"],
      time: ["Lunch", "Dinner"],
    },
    isActive: true,
    waitTime: 20,
  },
  {
    id: 7,
    name: "Caesar Salad",
    description:
      "Romaine lettuce, croutons, Parmesan cheese, and Caesar dressing",
    price: 8.99,
    category: "starter",
    availability: {
      day: ["Weekends", "Weekdays"],
      time: ["Lunch", "Dinner"],
    },
    isActive: true,
    waitTime: 10,
  },
  {
    id: 8,
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream",
    price: 7.99,
    category: "dessert",
    availability: {
      day: ["Weekends", "Weekdays"],
      time: ["Dinner"],
    },
    isActive: true,
    waitTime: 15,
  },
  {
    id: 9,
    name: "Margarita Pizza",
    description:
      "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil",
    price: 11.99,
    category: "main course",
    availability: {
      day: ["Weekends", "Weekdays"],
      time: ["Lunch", "Dinner"],
    },
    isActive: true,
    waitTime: 18,
  },
  {
    id: 10,
    name: "Mojito",
    description:
      "A refreshing cocktail with rum, lime juice, mint leaves, and soda water",
    price: 9.99,
    category: "beverage",
    availability: {
      day: ["Weekends", "Weekdays"],
      time: ["Lunch", "Dinner"],
    },
    isActive: true,
    waitTime: 5,
  },
];

// get dishes
router.get("/dishes", (req, res) => {
  res.json({
    status: "OK",
    data: _dishes,
  });
});

// clear dishes
router.get("/dishes/clear", (req, res) => {
  _dishes = [];

  res.json({
    status: "OK",
  });
});

// get dish by id
router.get("/dishes/:id", (req, res) => {
  const dish = _dishes.find((x) => x.id == req.params.id);

  res.json({
    status: "OK",
    data: dish ? dish : null,
  });
});

// insert/update dish
router.put("/dishes", (req, res) => {
  if (req.body == null) {
    res.json({
      status: "Failed",
      message: "No content provided",
    });
  } else {
    let dish = req.body,
      status = "OK";

    if (!dish.id) {
      //
      dish.id = uuid();
      dish._Created = new Date();
      dish._Changed = null;

      //
      _dishes.push(dish);
    } else {
      //
      const dishIndex = _dishes.findIndex((x) => x.id == dish.id);

      //
      if (dishIndex >= 0) {
        //
        dish._Changed = new Date();

        //
        _dishes[dishIndex] = dish;
      } else {
        //
        status = `dish not found for _id ${dish.id}`;
      }
    }

    res.json({
      status: status,
      data: dish,
    });
  }
});

// delete dish
router.delete("/dishes/:id", (req, res) => {
  console.log(req.params.id);
  let dishIndex = _dishes.findIndex((x) => {
    return x.id == req.params.id;
  });
  if (dishIndex !== -1) {
    _dishes.splice(dishIndex, 1);
  }

  res.json({
    status: "OK",
    message: dishIndex !== -1 ? "Dish deleted" : "Dish not found",
  });
});

//
app.use(router);

//
app.listen(port, () => {
  console.log(`api is ready on http://localhost:${port}`);
});
