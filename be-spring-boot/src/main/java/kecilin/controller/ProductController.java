package kecilin.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kecilin.dto.ProductRequestDto;
import kecilin.model.Product;
import kecilin.service.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<Page<Product>> findAllProduct(
            @RequestParam("category") Optional<String> category,
            @RequestParam("size") Optional<Integer> size,
            @RequestParam("page") Optional<Integer> page,
            @RequestParam("sort") Optional<String> sort,
            @RequestParam("name") Optional<String> name) {

        // localhost:8080/product?category=gaming&name=keyboard&page=0&size=2&sort=asc
        Sort sorts = sort.isPresent()
                ? (sort.get().equals("desc") ? Sort.by("name").descending() : Sort.by("name"))
                : Sort.by("id");
                
        if (category.isPresent() || name.isPresent()) {
            Pageable pageable = PageRequest.of(page.orElse(0), size.orElse(5), sorts);
            Page<Product> products = productService.findAllProductByNameAndCategoryName(name.orElse(""),
                    category.orElse(""), pageable);
            return ResponseEntity.status(HttpStatus.OK).body(products);
        }
        Pageable pageable = PageRequest.of(page.orElse(0), size.orElse(5), sorts);
        Page<Product> products = productService.findAllProduct(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findOneProduct(@PathVariable Long id) {
        try {
            Product product = productService.findOneProduct(id);
            return ResponseEntity.status(HttpStatus.OK).body(product);
        } catch (Exception err) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductRequestDto request) {
        Product product = productService.createProduct(request);
        return ResponseEntity.status(HttpStatus.OK).body(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody ProductRequestDto request) {
        Product product = productService.updateProduct(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.status(HttpStatus.OK).body("Success Delete");
        } catch (Exception err) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(String.format("Product with ID - %s is Not Found!", id));
        }
    }
}
