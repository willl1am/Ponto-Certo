package com.pontocerto.Ponto_Certo.controller;

import com.pontocerto.Ponto_Certo.model.Linha;
import com.pontocerto.Ponto_Certo.model.Usuarios;
import com.pontocerto.Ponto_Certo.repository.LinhaRepository;
import com.pontocerto.Ponto_Certo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private LinhaRepository linhaRepository;


    @PostMapping
    public Usuarios cadastrarUsuario(@RequestBody Usuarios usuario) {
        return usuarioRepository.save(usuario);
    }

    @GetMapping
    public List<Usuarios> buscarTodos() {
        return usuarioRepository.findAll();
    }

    @PostMapping("/login")
    public Usuarios logar(@RequestBody Usuarios usuarioDados) {
        Usuarios user = usuarioRepository.findByEmailAndSenha(usuarioDados.getEmail(), usuarioDados.getSenha());
        if (user != null) {
            return user;

        } else {
            throw new RuntimeException("erro no login, E-mail ou senha inválido");
        }
    }

    @PutMapping("/{usuarioId}/favoritar/{linhaId}")
    public Usuarios favoritarLinha(@PathVariable Long usuarioId, @PathVariable Long linhaId) {
        Usuarios user = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Object linhaEncontrada = linhaRepository.findById(linhaId)
                .orElseThrow(() -> new RuntimeException("Linha não encontrada"));
        user.getLinhasFavoritas().add((Linha) linhaEncontrada);
        return usuarioRepository.save(user);
    }

}

