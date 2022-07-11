"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt = require('jsonwebtoken');
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
}
function verifyToken(req, res, next) {
    if (!req.headers.authorization)
        return res.status(400).json('no autorizado');
    const token = req.headers.authorization.substr(7);
    if (token !== '') {
        const content = jwt.verify(token, 'stil');
        console.log(content);
    }
}
