package com.pontocerto.Ponto_Certo;
import com.pontocerto.Ponto_Certo.service.ConsumoApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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
		Scanner sc = new Scanner(System.in);
		var busca = sc.nextLine();
		String jsonResposta = consumoApi.obterDadosSPTrans("/Linha/Buscar?termosBusca="+ busca);

		System.out.println("Resposta da SPTrans:");
		System.out.println(jsonResposta);



	}




}
