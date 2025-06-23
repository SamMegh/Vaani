import jwt from 'jsonwebtoken'
import db from '../config/firebase.db.Config.js';

export const generatorToken = async(localId, res,email) => {
    const token = jwt.sign({ localId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
    await db.collection("admin only").add({
        email,
        token,
        localId,
        createdAt:new Date()
    });
    res.cookie('JWT', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,    //cookie is not accessible by the browser(prevent xss attack)
        sameSite: true,    //cookie is not accessible by the third party(prevent csrf attack)
        secure: process.env.NODE_ENV != 'production'

    });
    return token;
}