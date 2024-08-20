import words from "../seed-data/words.js";

export async function seed(knex) {
    await knex("words").del();
    await knex("wordOfDay").del();
    await knex("words").insert(words);
    await knex("wordOfDay").insert([words[0]]);
}
