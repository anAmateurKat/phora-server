import words from "../seed-data/words.js";

export async function seed(knex) {
    await knex("words").del();
    await knex("words").insert(words);
}
