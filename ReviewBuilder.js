const fs = require("fs");
const { readFile, produceResult } = require("./helpers");

class ReviewBuilder {
  buildReviewsSync() {
    const products = JSON.parse(
      fs.readFileSync("./data/products.json", "utf-8")
    );
    const reviews = JSON.parse(fs.readFileSync("./data/reviews.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    return produceResult({ products, reviews, users });
  }

  buildReviewsCallbacks(cb) {
    fs.readFile("./data/products.json", "utf8", (err, products) => {
      if (err) throw err;
      fs.readFile("./data/reviews.json", "utf8", (err, reviews) => {
        if (err) throw err;
        fs.readFile("./data/users.json", "utf8", (err, users) => {
          if (err) throw err;
          products = JSON.parse(products);
          reviews = JSON.parse(reviews);
          users = JSON.parse(users);
          cb(produceResult({ products, reviews, users }));
        });
      });
    });
  }

  buildReviewsPromises() {
    return new Promise((resolve, reject) => {
      const data = {};
      fs.readFile("./data/products.json", "utf8", (err, products) => {
        if (err) throw err;
        fs.readFile("./data/reviews.json", "utf8", (err, reviews) => {
          if (err) throw err;
          fs.readFile("./data/users.json", "utf8", (err, users) => {
            if (err) throw err;
            data.products = JSON.parse(products);
            data.reviews = JSON.parse(reviews);
            data.users = JSON.parse(users);
            resolve(produceResult(data));
            reject((error) => error);
          });
        });
      });
    });
  }

  async buildReviewsAsyncAwait() {
    try {
      return await this.buildReviewsPromises();
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = ReviewBuilder;
