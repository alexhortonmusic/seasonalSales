# seasonalSales
Your job is to build a web page that lists all of the products, the name of the department it's in, and the price. Additionally, put a `<select>` element at the top of the page that contains all possible values of the `season_discount` key in the categories file. As soon as you select one of the seasons, all prices on the page should immediately be discounted by the corresponding percentage.

For example, when _Spring_ is chosen, all products in the corresponding Household category should have their prices updated with a 15% discount off the base price.

The two JSON representations above should be in two files: `products.json`, and `categories.json`. You should load both file via XHRs and store the contents in two different JavaScript variables in your code.
