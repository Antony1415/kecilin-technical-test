package kecilin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kecilin.dto.CategoryRequestDto;
import kecilin.model.Category;
import kecilin.repository.CategoryRepository;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAllCategory() {
        return categoryRepository.findAll();
    }

    public Category findOneCategory(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new NullPointerException());
    }

    public Category createCategory(CategoryRequestDto request) {
        Category category = new Category();
        category.setName(request.getName());
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, CategoryRequestDto request) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new NullPointerException());
        category.setName(request.getName());
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new NullPointerException());
        categoryRepository.delete(category);
    }
}
