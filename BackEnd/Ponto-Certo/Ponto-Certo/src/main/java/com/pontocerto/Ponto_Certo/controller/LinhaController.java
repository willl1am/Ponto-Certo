package com.pontocerto.Ponto_Certo.controller;

import com.pontocerto.Ponto_Certo.model.Linha;

import com.pontocerto.Ponto_Certo.repository.LinhaRepository;
import com.pontocerto.Ponto_Certo.service.ConsumoApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/linhas")
@CrossOrigin(origins = "*")
public class LinhaController {

    @Autowired
    private LinhaRepository linhaRepository;

    @Autowired
    private ConsumoApi consumoApi;

    @PostMapping
    public Linha guardarLinha(@RequestBody Linha linha){
        return linhaRepository.save(linha);
    }

    @GetMapping
    public List<Linha> buscarTodas(){
        return linhaRepository.findAll();
    }

    @GetMapping("/buscar-sptrans")
    public String buscarNaSpTrans(@RequestParam String termo) throws Exception {
        String termoFormatado = URLEncoder.encode(termo, StandardCharsets.UTF_8);
        return consumoApi.obterDadosSPTrans("/Linha/Buscar?termosBusca=" + termoFormatado);
    }
    @GetMapping("/paradas")
    public String buscarParadasDaLinha(@RequestParam String codigoLinha) throws Exception {
        String codigoLinhaFormatado = URLEncoder.encode(codigoLinha, StandardCharsets.UTF_8);
        return consumoApi.obterDadosSPTrans("/Previsao/Linha?codigoLinha=" + codigoLinhaFormatado);
    }


}
