package kecilin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    public List<Product> findAllProduct() {
        return productRepository.findAll();
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
