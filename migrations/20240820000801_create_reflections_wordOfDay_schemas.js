/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable("wordOfDay", (table) => {
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
        })
        .createTable("reflections", (table) => {
            table.increments("id").primary();
            table.string("notes").notNullable();
            table
                .integer("word_id")
                .unsigned()
                .references("wordOfDay.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table
                .timestamp("updated_at")
                .defaultTo(
                    knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
                );
        });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("reflection").dropTable("wordOfDay");
}
