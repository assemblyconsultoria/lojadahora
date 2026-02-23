package br.com.lojadahora.lojadahora.repository;

import br.com.lojadahora.lojadahora.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
