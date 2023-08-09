import { randomUUID } from "node:crypto";
import { BuildRoutePath } from "./utils/build-route-path.js";

export const routes = [
    {
        method: "GET",
        path: BuildRoutePath("/tasks"),
        handler: (req, res) => {
            const { title, description } = req.query;
            console.log(
                `Method GET - Title: ${title}; Description: ${description};`
            );

            return res.end();
        },
    },
    {
        method: "POST",
        path: BuildRoutePath("/tasks"),
        handler: (req, res) => {
            const { title, description } = req.body;

            console.log(
                `Method POST\nTitle: ${title};\nDescription: ${description};`
            );

            return res.writeHead(201).end();
        },
    },
    {
        method: "PUT",
        path: BuildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, description } = req.body;

            console.log(
                `Method PUT\nId: ${id};\nTitle: ${title};\nDescription: ${description};`
            );

            return res.writeHead(204).end();
        },
    },
    {
        method: "DELETE",
        path: BuildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params;

            console.log(`Method DELETE\nId: ${id};`);

            return res.writeHead(204).end();
        },
    },
    {
        method: "PATCH",
        path: BuildRoutePath("/tasks/:id/complete"),
        handler: (req, res) => {
            const { id } = req.params;

            console.log(
                `Method PATCH\nId: ${id};`
            );

            return res.writeHead(204).end();
        },
    },
];
