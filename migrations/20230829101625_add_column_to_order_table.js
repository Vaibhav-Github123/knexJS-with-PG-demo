/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('orders', table => {
        table.string('product_name', 128);
        table.string('customer_name', 128);
        table.string('quantity', 128);
        table.string('price', 128);
        table.string('total', 128);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
