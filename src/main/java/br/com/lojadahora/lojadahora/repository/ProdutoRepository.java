package br.com.lojadahora.lojadahora.repository;

import br.com.lojadahora.lojadahora.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
