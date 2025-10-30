package com.depo.takipapi;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
@RestController // Bu sınıfın bir API kontrolcüsü olduğunu belirtir
@RequestMapping("/api/urunler") // Bu sınıftaki tüm adreslerin başına /api/urunler gelecek
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}) // Farklı adresten gelen Frontend isteklerine izin ver (ÇOK ÖNEMLİ)
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
    @PutMapping("/{id}")
    public ResponseEntity<Urun> updateUrun(@PathVariable Long id, @RequestBody Urun guncelUrunDetaylari) {
        // 1. Güncellenecek ürünün veritabanında olup olmadığını kontrol et
        Optional<Urun> mevcutUrunOps = urunRepository.findById(id);

        if (mevcutUrunOps.isPresent()) {
            // 2. Eğer ürün varsa, bilgilerini gelen yeni bilgilerle güncelle
            Urun mevcutUrun = mevcutUrunOps.get();
            mevcutUrun.setUrunAdi(guncelUrunDetaylari.getUrunAdi());
            mevcutUrun.setMiktar(guncelUrunDetaylari.getMiktar());
            mevcutUrun.setBirim(guncelUrunDetaylari.getBirim());
            // Diğer alanları da aynı şekilde güncelleyebilirsiniz (stokKodu, lokasyon vb.)

            // 3. Güncellenmiş ürünü kaydet. JPA, ID'si olduğu için yeni kayıt eklemek yerine UPDATE yapar.
            Urun kaydedilmisUrun = urunRepository.save(mevcutUrun);
            return ResponseEntity.ok(kaydedilmisUrun);
        } else {
            // 4. Eğer o ID'de bir ürün yoksa, "Bulunamadı" hatası döndür.
            return ResponseEntity.notFound().build();
        }
    }
}