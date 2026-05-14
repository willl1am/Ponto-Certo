package com.pontocerto.Ponto_Certo.controller;

import com.pontocerto.Ponto_Certo.model.Linha;

import com.pontocerto.Ponto_Certo.repository.LinhaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/linhas")
public class LinhaController {

    @Autowired
    private LinhaRepository linhaRepository;

    @PostMapping
    public Linha guardarLinha(@RequestBody Linha linha){
        return linhaRepository.save(linha);
    }

    @GetMapping
    public List<Linha> buscarTodas(){
        return linhaRepository.findAll();
    }

}
