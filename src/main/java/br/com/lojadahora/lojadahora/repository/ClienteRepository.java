package br.com.lojadahora.lojadahora.repository;

import br.com.lojadahora.lojadahora.model.Cliente;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class ClienteRepository {

    private final List<Cliente> clientes = new ArrayList<>();
    private final AtomicLong contadorId = new AtomicLong(1);

    public Cliente salvar(Cliente cliente) {
        cliente.setId(contadorId.getAndIncrement());
        clientes.add(cliente);
        return cliente;
    }

    public List<Cliente> listarTodos() {
        return new ArrayList<>(clientes);
    }

    public Optional<Cliente> buscarPorId(Long id) {
        return clientes.stream()
                .filter(c -> c.getId().equals(id))
                .findFirst();
    }

    public Optional<Cliente> atualizar(Long id, Cliente clienteAtualizado) {
        return buscarPorId(id).map(cliente -> {
            cliente.setNome(clienteAtualizado.getNome());
            cliente.setEmail(clienteAtualizado.getEmail());
            cliente.setTelefone(clienteAtualizado.getTelefone());
            cliente.setCpf(clienteAtualizado.getCpf());
            return cliente;
        });
    }

    public boolean remover(Long id) {
        return clientes.removeIf(c -> c.getId().equals(id));
    }

}
