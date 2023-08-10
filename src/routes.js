import { randomUUID } from "node:crypto";
import { BuildRoutePath } from "./utils/build-route-path.js";
import { Database } from "./database.js";
import { verifyRequiredParams } from "./utils/verify-required-params.js";

const database = new Database();

export const routes = [
    {
        method: "GET",
        path: BuildRoutePath("/tasks"),
        handler: (req, res) => {
            const { search } = req.query;
            
            console.log("search: ", search);

            const tasks = database.select(
                "tasks",
                search
                    ? {
                          title: search,
                          description: search,
                      }
                    : null
            );

            return res.end(JSON.stringify(tasks));
        },
    },
    {
        method: "POST",
        path: BuildRoutePath("/tasks"),
        handler: (req, res) => {
            const { title, description } = req.body;

            const requiredParamsMessage = verifyRequiredParams(res, {
                title: title,
                description: description,
            });

            if (requiredParamsMessage) {
                return res
                    .writeHead(400)
                    .end(JSON.stringify({ message: requiredParamsMessage }));
            }

            const task = {
                id: randomUUID(),
                title: title,
                description: description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date(),
            };

            database.insert("tasks", task);

            return res.writeHead(201).end();
        },
    },
    {
        method: "PUT",
        path: BuildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, description } = req.body;

            return res.writeHead(204).end();
        },
    },
    {
        method: "DELETE",
        path: BuildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params;

            database.delete("tasks", id);

            return res.writeHead(204).end();
        },
    },
    {
        method: "PATCH",
        path: BuildRoutePath("/tasks/:id/complete"),
        handler: (req, res) => {
            const { id } = req.params;

            return res.writeHead(204).end();
        },
    },
];
