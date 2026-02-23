package br.com.lojadahora.lojadahora.controller;

import br.com.lojadahora.lojadahora.model.Produto;
import br.com.lojadahora.lojadahora.repository.ProdutoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoRepository produtoRepository;

    public ProdutoController(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    // Listar todos os produtos
    @GetMapping
    public ResponseEntity<List<Produto>> listar() {
        List<Produto> produtos = produtoRepository.listarTodos();
        return ResponseEntity.ok(produtos);
    }

    // Adicionar um novo produto
    @PostMapping
    public ResponseEntity<Produto> adicionar(@RequestBody Produto produto) {
        Produto produtoSalvo = produtoRepository.salvar(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(produtoSalvo);
    }

    // Atualizar um produto existente
    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody Produto produto) {
        return produtoRepository.atualizar(id, produto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Remover um produto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        boolean removido = produtoRepository.remover(id);
        if (removido) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
