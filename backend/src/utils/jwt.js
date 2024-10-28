import jwt from 'jsonwebtoken';

const KEY = '===!!Hayan==';

export function gerarToken(userInfo) {
    return jwt.sign(userInfo, KEY);
}

export function autenticar(req, resp, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return resp.status(401).json({ erro: 'Token não fornecido.' });
    }

    jwt.verify(token, KEY, (err, decoded) => {
        if (err) {
            return resp.status(403).json({ erro: 'Token inválido.' });
        }
        req.user = decoded;
        next();
    });
}
