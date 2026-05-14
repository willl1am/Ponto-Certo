package com.pontocerto.Ponto_Certo.controller;

import com.pontocerto.Ponto_Certo.model.Linha;
import com.pontocerto.Ponto_Certo.model.Usuarios;
import com.pontocerto.Ponto_Certo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")

public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    public Usuarios cadastrarUsuario(@RequestBody Usuarios usuario){
        return usuarioRepository.save(usuario);
    }

    @GetMapping
    public List<Usuarios> buscarTodos(){
        return usuarioRepository.findAll();
    }

    @PostMapping ("/login")
    public Usuarios logar(@RequestBody Usuarios usuarioDados){
        Usuarios user = usuarioRepository.findByEmailAndSenha(usuarioDados.getEmail(), usuarioDados.getSenha());
        if(user != null){
            return user;

        } else {
            throw new RuntimeException("erro no login, E-mail ou senha inválido");
        }

    }

}
