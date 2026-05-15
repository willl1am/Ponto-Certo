    package com.pontocerto.Ponto_Certo.model;

    import jakarta.persistence.*;

    @Entity

    @Table(name = "tb_linhas_favoritas" )

    public class Linha {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String letreiro;

        public Long getId() {return id;}

        public void setId(Long id) {this.id = id;}

        public String getLetreiro() {return letreiro;}

        public void setLetreiro(String letreiro) {this.letreiro = letreiro;}
    }
