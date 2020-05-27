import jwt from 'jsonwebtoken';

export default class Token{
    private static seed: string = "jT36XrEEn>Jsa2=</.M9`S@!M<M"
    private static expirationTime: string = '30d';

    constructor(){ }

    static getJwtToken(payload: any): string{
        return jwt.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.expirationTime });
    }

    static verifyToken(userToken: string){
        return new Promise( ( resolve, reject ) => {
            jwt.verify(userToken, this.seed, (err, decoded) => {
                if(err){
                    reject();
                } else {
                    resolve(decoded);
                }
            })
        });
    }
}