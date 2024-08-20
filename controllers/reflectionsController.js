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
        res.status(500).json({
            message: `Unable to create reflection: ${error}`,
        });
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
        res.status(500).json({
            message: `Unable to retrieve reflections: ${error}`,
        });
    }
}

async function getSingleReflection(req, res) {
    const { id } = req.params;

    try {
        const response = await knex("reflections")
            .join("wordOfDay", "wordOfDay.id", "=", "reflections.word_id")
            .select(
                "wordOfDay.id",
                "wordOfDay.name",
                "wordOfDay.definition",
                "wordOfDay.phonetic",
                "wordOfDay.type",
                "wordOfDay.origin",
                "wordOfDay.use",
                "wordOfDay.funFact",
                "wordOfDay.fetched_at",
                "reflections.id AS reflection_id",
                "reflections.notes"
            )
            .where("reflections.id", id)
            .first();

        if (!response) {
            return res.status(404).json({ message: "Reflection not found" });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve reflection: ${error}`,
        });
    }
}

async function updateReflection(req, res) {
    const { id } = req.params;

    try {
        if (!req.body.notes || !req.body.word_id || isNaN(req.body.word_id)) {
            return res.status(400).json({
                message: "Please make sure to provide valid notes and word_id",
            });
        }

        const rowsUpdated = await knex("reflections")
            .where({ id: id })
            .update(req.body);

        if (rowsUpdated === 0) {
            return res.status(404).json({
                message: `reflection with ID: ${id} not found`,
            });
        }

        const updatedReflection = await knex("reflections").where({ id: id });

        res.json(updatedReflection);
    } catch (error) {
        res.status(500).json({
            message: `Unable to update reflection with ID ${id} : ${error}`,
        });
    }
}

export {
    createReflection,
    getReflections,
    getSingleReflection,
    updateReflection,
};
