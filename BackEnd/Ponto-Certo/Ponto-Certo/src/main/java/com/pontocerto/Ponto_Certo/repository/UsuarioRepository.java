package com.pontocerto.Ponto_Certo.repository;

import com.pontocerto.Ponto_Certo.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository <Usuarios, Long> {
    Usuarios findByEmailAndSenha(String email, String senha);
}
