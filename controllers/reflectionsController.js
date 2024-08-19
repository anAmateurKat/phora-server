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

    /*
        const newWarehouse = await knex("warehouses")
      .where({ id: result[0] })
      .first();


        const newInventoryItem = await knex
            .select(
                "id",
                "warehouse_id",
                "item_name",
                "description",
                "category",
                "status",
                "quantity"
            )
            .from("inventories")
            .where({ id: result[0] })
            .first();

        res.status(201).json(newInventoryItem);
    */
}

export { createReflection };
