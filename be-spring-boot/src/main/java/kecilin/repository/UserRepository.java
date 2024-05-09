package kecilin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kecilin.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
