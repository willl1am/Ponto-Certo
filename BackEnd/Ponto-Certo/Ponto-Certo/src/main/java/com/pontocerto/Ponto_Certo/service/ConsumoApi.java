package com.pontocerto.Ponto_Certo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class ConsumoApi {

    @Value("${sptrans.api.token}")
    private String tokenSpTrans;
    private final String URL_BASE = "https://api.olhovivo.sptrans.com.br/v2.1";
    private String cookieSessao = "";

    public String obterDadosSPTrans(String endpoint) throws Exception {
        HttpClient client = HttpClient.newHttpClient();

        if (cookieSessao.isEmpty()) {
            HttpRequest authRequest = HttpRequest.newBuilder()
                    .uri(URI.create(URL_BASE + "/Login/Autenticar?token=" + tokenSpTrans))
                    .POST(HttpRequest.BodyPublishers.ofString("{}"))
                    .build();

            HttpResponse<String> authResponse = client.send(authRequest, HttpResponse.BodyHandlers.ofString());
            ;

            cookieSessao = authResponse.headers().firstValue("Set-Cookie").orElse("");

        }


        HttpRequest buscaRequest = HttpRequest.newBuilder()
                .uri(URI.create(URL_BASE + endpoint))
                .header("Cookie", cookieSessao)
                .GET()
                .build();

        HttpResponse<String> response = client.send(buscaRequest, HttpResponse.BodyHandlers.ofString());
        try {
            response = client.send(buscaRequest, HttpResponse.BodyHandlers.ofString());
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        return response.body();
    }
}