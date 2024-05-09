package kecilin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kecilin.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
}
