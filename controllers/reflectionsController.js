import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

async function createReflection(req, res) {
    try {
        const wordOfDay = await knex("wordOfDay").select("*").first();
        if (
            !req.body.notes ||
            !req.body.word_id ||
            req.body.word_id !== wordOfDay.id
        ) {
            return res.status(400).json({
                message: "Please make sure to provide valid notes and word_id",
            });
        }
        const result = await knex("reflections").insert(req.body);
        const newReflection = await knex("reflections")
            .where({ id: result[0] })
            .first();
        res.status(201).json(newReflection);
    } catch (error) {
        console.log(error);
    }
}

async function getReflections(req, res) {
    try {
        const response = await knex("reflections")
            .join("wordOfDay", "wordOfDay.id", "=", "reflections.word_id")
            .select(
                "reflections.id",
                "wordOfDay.name AS word",
                "wordOfDay.fetched_at",
                "reflections.notes"
            );

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
}

export { createReflection, getReflections };
