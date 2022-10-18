const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/user')
const User = mongoose.model('users')

router.get("/", (req, res)=>{
    res.render("index")
})

router.post("/", (req, res)=>{

    if (req.body.email_usuario == '' || req.body.senha_usuario == '' || req.body.confsenha_usuario == '' || req.body.senha_usuario != req.body.confsenha_usuario) {
        if (req.body.senha_usuario != req.body.confsenha_usuario) {
            req.flash('error', 'As senhas devem ser iguais!')
            res.redirect('/')
        } else {
            req.flash('error', 'Preencha os campos!')
            res.redirect('/')
        }
    } else {
        User.find().then((users) => {
            const usuarios = users
            const getUserName = usuarios.find(
                (a) => a.email == req.body.email_usuario
            )
    
            if (getUserName == undefined) {
               
                new User({
                    email: req.body.email_usuario,
                    senha: req.body.senha_usuario,
                    tipo: req.body.select
                }).save().then(() => {
                    req.flash('succes', 'Usuário cadastrado!')
                    res.redirect('/')
    
                    console.log('Usuário cadastrado!')
                }).catch((err) => {
                    console.log('Erro ao cadastrar usuário || ' + err)
                })
            } else {
                req.flash('error', 'Usuário já existe')
                res.redirect('/')
            }
    
        }).catch((err) => {
            req.flash('error', 'Houve um erro no login.')
            res.redirect('/')
        })
    }
})

router.post("/perfil", (req, res)=>{

    if (req.body.login_email == '' || req.body.login_senha == '') {
        req.flash('error', 'Preencha os campos!')
        res.redirect('/')
    } else {
        User.find().then((users) => {
            const usuarios = users
    
            const getUser = usuarios.find(
                (a) => a.email == req.body.login_email
            )
    
            if (getUser == undefined) {
                req.flash('error', 'Usuário inexistente')
                res.redirect('/')
            } else {
                if (req.body.login_email == getUser.email && req.body.login_senha == getUser.senha) {
                   // res.render('perfil')
                    res.redirect('/perfil')
                } else {
                    req.flash('error', 'Dados incorretos!')
                    res.redirect('/')
                }
            }
    
        }).catch((err) => {
            req.flash('error', 'Houve um erro no login.')
            res.redirect('/')
        })
    }
})



module.exports = router;


