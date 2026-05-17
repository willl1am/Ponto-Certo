package com.pontocerto.Ponto_Certo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;


@Entity
    @Table (name = "tb_usuario")
    public class Usuarios
    {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String nome;
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        @Column (unique = true, nullable = false)
        private String email;
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        private String senha;

        @ManyToMany
        @JoinTable (name = "tb_usuarios_linhas",
                joinColumns = @JoinColumn(name = "usuario_id"),
                inverseJoinColumns = @JoinColumn(name = "linha_id")
        )
        private Set<Linha> linhasFavoritas = new HashSet<>();

        public Long getId() {return id;}
        public void setId(Long id) {this.id = id;}
        public String getNome() {return nome;}
        public void setNome(String nome) {this.nome = nome;}
        public String getEmail() {return email;}
        public void setEmail(String email) {this.email = email;}
        public String getSenha() {return senha;}
        public void setSenha(String senha) {this.senha = senha;}

        public Set<Linha> getLinhasFavoritas() { return linhasFavoritas; }
        public void setLinhasFavoritas (Set<Linha> linhasFavoritas) { this.linhasFavoritas = linhasFavoritas; }
    }

