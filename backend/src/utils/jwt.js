import jwt from 'jsonwebtoken';
const KEY = '===!!Hayan==';

export function gerarToken(userInfo) {
    return jwt.sign(userInfo, KEY);
}

export function autenticar(req, resp, next) {
    return autenticacao(req, resp, next);
}

export function autenticacao(req, resp, next) {
  try {
      let token = req.headers['x-access-token'] || req.query['x-access-token'];

      console.log('Token recebido:', token); // Adicione este log

      if (!token) {
          return resp.status(401).json({ erro: 'Token não fornecido' });
      }
      
      let signd = jwt.verify(token, KEY);
      req.user = signd;
      next();
  } catch (e) {
      console.error('Erro de autenticação:', e.message);
      resp.status(401).json({ erro: 'Token inválido' });
  }
}

