package br.com.lojadahora.lojadahora.repository;

import br.com.lojadahora.lojadahora.model.Produto;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class ProdutoRepository {

    private final List<Produto> produtos = new ArrayList<>();
    private final AtomicLong contadorId = new AtomicLong(1);

    public Produto salvar(Produto produto) {
        produto.setId(contadorId.getAndIncrement());
        produtos.add(produto);
        return produto;
    }

    public List<Produto> listarTodos() {
        return new ArrayList<>(produtos);
    }

    public Optional<Produto> buscarPorId(Long id) {
        return produtos.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst();
    }

    public Optional<Produto> atualizar(Long id, Produto produtoAtualizado) {
        return buscarPorId(id).map(produto -> {
            produto.setNome(produtoAtualizado.getNome());
            produto.setDescricao(produtoAtualizado.getDescricao());
            produto.setPreco(produtoAtualizado.getPreco());
            produto.setQuantidadeEstoque(produtoAtualizado.getQuantidadeEstoque());
            produto.setCategoria(produtoAtualizado.getCategoria());
            return produto;
        });
    }

    public boolean remover(Long id) {
        return produtos.removeIf(p -> p.getId().equals(id));
    }

}
