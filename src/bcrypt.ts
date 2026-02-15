import * as bcrypt from 'bcrypt';
import { error } from 'console';

export function encodePassword(rawPassword:string) {
    //const bcrypt = require('bcrypt');
    //const saltRounds = 10;
    /*if ( rawPassword.length < 8){
        throw new Error('Password must be at least 8 characters long')
    }*/
    
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword,SALT);
    
}

export function comparePasswords(rawPassword: string, hash: string){
    return bcrypt.compareSync(rawPassword, hash);
}