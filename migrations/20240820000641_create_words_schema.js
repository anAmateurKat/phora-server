/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("words", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("definition").notNullable();
        table.string("phonetic").notNullable();
        table.string("type").notNullable();
        table.string("origin").notNullable();
        table.string("use").notNullable();
        table.string("funFact").notNullable();
        table.string("fetched_at").notNullable().defaultTo("");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("words");
}
