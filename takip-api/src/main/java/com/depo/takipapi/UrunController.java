package com.depo.takipapi;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController // Bu sınıfın bir API kontrolcüsü olduğunu belirtir
@RequestMapping("/api/urunler") // Bu sınıftaki tüm adreslerin başına /api/urunler gelecek
@CrossOrigin // Farklı adresten gelen Frontend isteklerine izin ver (ÇOK ÖNEMLİ)
public class UrunController {

    @Autowired // Spring'in bizim için UrunRepository'yi otomatik olarak bağlamasını sağlar
    private UrunRepository urunRepository;

    // Bütün ürünleri listeleme
    @GetMapping
    public List<Urun> getAllUrunler() {
        return urunRepository.findAll();
    }

    // Yeni ürün ekleme
    @PostMapping
    public Urun createUrun(@RequestBody Urun urun) {
        return urunRepository.save(urun);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUrun(@PathVariable Long id) {
        urunRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}