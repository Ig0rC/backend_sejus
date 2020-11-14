const knex = require('../../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async authenticate(req, res, next){
      try {
        const [, hash ] = req.headers.authorization.split(' ');
        const [email, password] = 
        Buffer.from(hash, 'base64')
        .toString()
        .split(':');
  
        console.log(email, password)
  
        const user = await knex.select('login.*')
                       .where('login.email', email)
                       .from('login')
                       .join('pessoa', 'pessoa.login', '=', 'login.id_login')
                       .where('pessoa.situacao', true);
                   
        const result = user[0].senha
       

        const userResult = user[0].id_login;
        if(!user){
           
            return res.status(401).send('meuzovos');
        }
        const isValidationPassword = await bcrypt.compare(password, result) 
    
        if(!isValidationPassword){
            return res.status(500).send('senha errada')
        }
    
        const cpf = 
            await knex.select('pessoa.cpf')
                    .from('pessoa')
                    .where('login', userResult)
        const id = cpf[0].cpf;
        console.log(id)
        const token = jwt.sign({ id: id }, 'secrete', {expiresIn: '1d'} );
        console.log(id)
        delete user[0].senha;
        return res.json({
            user,
            token
        });
      } catch (error) {
          next(error)
      }
    }
}

