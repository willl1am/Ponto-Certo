package com.pontocerto.Ponto_Certo.repository;

import com.pontocerto.Ponto_Certo.model.Linha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LinhaRepository extends JpaRepository<Linha,Integer> {
}
