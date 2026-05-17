package com.pontocerto.Ponto_Certo;
import com.pontocerto.Ponto_Certo.service.ConsumoApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;


@SpringBootApplication
public class PontoCertoApplication implements CommandLineRunner {
	@Autowired
	private ConsumoApi consumoApi;

	public static void main(String[] args) {
		SpringApplication.run(PontoCertoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Iniciando teste com a SPTrans...");

		System.out.println("Digite o numero");
		Scanner leitura = new Scanner(System.in);
		String termoBusca = leitura.nextLine();
		String termoFormatado = URLEncoder.encode(termoBusca, StandardCharsets.UTF_8);

		String jsonResposta = consumoApi.obterDadosSPTrans("/Linha/Buscar?termosBusca=" + termoFormatado);

		System.out.println("Resposta da SPTrans:");
		System.out.println(jsonResposta);

		System.out.println("Digite o numero");

		String busca = leitura.nextLine();
		String buscaFormatado = URLEncoder.encode(busca, StandardCharsets.UTF_8);
		String jsonResponde = consumoApi.obterDadosSPTrans("/Previsao/Linha?codigoLinha=" + buscaFormatado);

		System.out.println("Resposta da SPTrans:");
		System.out.println(jsonResponde);

	}




}
