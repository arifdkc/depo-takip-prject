package com.depo.takipapi;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UrunRepository extends JpaRepository<Urun, Long> {
    // Bu kadar!
}