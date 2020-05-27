"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let Token = /** @class */ (() => {
    class Token {
        constructor() { }
        static getJwtToken(payload) {
            return jsonwebtoken_1.default.sign({
                usuario: payload
            }, this.seed, { expiresIn: this.expirationTime });
        }
        static verifyToken(userToken) {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(userToken, this.seed, (err, decoded) => {
                    if (err) {
                        reject();
                    }
                    else {
                        resolve(decoded);
                    }
                });
            });
        }
    }
    Token.seed = "jT36XrEEn>Jsa2=</.M9`S@!M<M";
    Token.expirationTime = '30d';
    return Token;
})();
exports.default = Token;
