import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

function getTodaysDate() {
    return new Date(Date.now()).toDateString();
}

async function fetchNewWord() {
    try {
        const wordIds = await knex("words").pluck("id");

        while (wordIds) {
            const randomWordId = Math.floor(
                Math.random() * (wordIds.length - 1 + 1) + 1
            );

            const randomWord = await knex
                .select(
                    "id",
                    "name",
                    "definition",
                    "phonetic",
                    "type",
                    "origin",
                    "use",
                    "funFact",
                    "fetched_at"
                )
                .from("words")
                .where({ id: randomWordId })
                .first();

            if (randomWord.fetched_at.length === 0) {
                randomWord.fetched_at = getTodaysDate();

                const rowsChanged = await knex("words")
                    .where({ id: randomWord.id })
                    .update(randomWord);

                const newWord = await knex("words")
                    .where({ id: randomWord.id })
                    .first();

                const rowsDeleted = await knex("wordOfDay").del();

                const result = await knex("wordOfDay").insert(newWord);

                const newWordOfDay = await knex("wordOfDay")
                    .select("*")
                    .first();

                return newWordOfDay;
            }
        }
        return;
    } catch (error) {
        console.error(error);
    }
}

async function getWordOfDay(req, res) {
    try {
        const date = getTodaysDate();
        const wordOfDay = await knex("wordOfDay").select("*").first();

        if (wordOfDay.fetched_at !== date) {
            const newWordOfDay = await fetchNewWord();
            res.status(200).json(newWordOfDay);
        } else {
            res.status(200).json(wordOfDay);
        }
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve word of the day: ${error}`,
        });
    }
}

export { getWordOfDay };
