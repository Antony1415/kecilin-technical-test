package kecilin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import kecilin.dto.ProductRequestDto;
import kecilin.model.Category;
import kecilin.model.Product;
import kecilin.model.User;
import kecilin.repository.ProductRepository;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    public Page<Product> findAllProduct(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Page<Product> findAllProductByNameAndCategoryName(String name, String category, Pageable pageable) {
        return productRepository.findByNameContainsAndCategoryNameContains(name, category, pageable);
    }

    public Product findOneProduct(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new NullPointerException());
    }

    public Product createProduct(ProductRequestDto request) {
        Category category = categoryService.findOneCategory(request.getCategoryId());
        User user = userService.findOneUser(request.getUserId());

        Product product = new Product();
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setName(request.getName());
        product.setCategory(category);
        product.setUser(user);

        return productRepository.save(product);
    }

    public Product updateProduct(Long id, ProductRequestDto request) {
        Category category = categoryService.findOneCategory(request.getCategoryId());
        User user = userService.findOneUser(request.getUserId());

        Product product = productRepository.findById(id).orElseThrow(() -> new NullPointerException());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setName(request.getName());
        product.setCategory(category);
        product.setUser(user);

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new NullPointerException());
        productRepository.delete(product);
    }
}
