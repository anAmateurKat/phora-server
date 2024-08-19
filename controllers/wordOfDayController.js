import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

function getTodaysDate() {
    return new Date(Date.now()).toDateString();
}

async function fetchNewWord() {
    try {
        const wordIds = await knex("words").pluck("id"); //array

        while (wordIds) {
            console.log("entered inside while loop");

            //get random number from 1 to # of id in the words table
            const randomWordId = Math.floor(
                Math.random() * (wordIds.length - 1 + 1) + 1
            );

            //get a random word from words table
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
                //new word is valid
                //set it's fetched_at date to be todays date
                randomWord.fetched_at = getTodaysDate();

                //update the words's fetched at date in the word table
                const rowsChanged = await knex("words")
                    .where({ id: randomWord.id })
                    .update(randomWord);
                console.log("number of rows updated: ", rowsChanged);

                //get from words
                const newWord = await knex("words")
                    .where({ id: randomWord.id })
                    .first();

                //delete all entries in the wordOfDay table
                const rowsDeleted = await knex("wordOfDay").del(); //this should always return 1
                console.log("number of rows deleted: ", rowsDeleted);

                //insert to new word to wordOfDay
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
        console.error(error);
    }
}

export { getWordOfDay };
