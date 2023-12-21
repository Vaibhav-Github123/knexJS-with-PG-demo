/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("orders", (table) => {
        table.increments("id").primary();
        table.string("product_name").notNullable();
        table.string("customer_name").notNullable();
        table.string("quantity").notNullable();
        table.string("price").notNullable();
        table.string("total").notNullable();
        table
        .integer("product_id")
        // .unsigned()
        .references("id")
        .inTable("products")
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("orders");
};
