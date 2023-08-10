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

            if (!title || !description) {
                return res.writeHead(400).end(
                    JSON.stringify({
                        message: "title or description are required",
                    })
                );
            }

            const task = database.selectById("tasks", id);

            if (!task) {
                return res.writeHead(404).end();
            }

            database.update("tasks", id, {
                title,
                description,
                updated_at: new Date(),
            });

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

            const task = database.selectById("tasks", id);

            if (!task) {
                return res.writeHead(404).end();
            }

            const isTaskCompleted = task.completed_at;
            const completed_at = isTaskCompleted ? null : new Date();

            database.update("tasks", id, {
                completed_at,
                updated_at: new Date(),
            });

            return res.writeHead(204).end();
        },
    },
];
