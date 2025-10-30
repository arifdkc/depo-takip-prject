package com.depo.takipapi;import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Urun {

    @Id
    @GeneratedValue
    private Long id;
    private String stokKodu;
    private String urunAdi;
    private int miktar;
    private String birim;
    private String lokasyon;

    // --- BU KISIM ÇOK ÖNEMLİ ---
    // Eğer bu getter ve setter metotları eksikse, JSON'a veri yazılamaz.
    // IDE'niz bunları sizin için otomatik olarak oluşturabilir. (Sağ tık -> Generate -> Getters and Setters)

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStokKodu() {
        return stokKodu;
    }

    public void setStokKodu(String stokKodu) {
        this.stokKodu = stokKodu;
    }

    public String getUrunAdi() {
        return urunAdi;
    }

    public void setUrunAdi(String urunAdi) {
        this.urunAdi = urunAdi;
    }

    public int getMiktar() {
        return miktar;
    }

    public void setMiktar(int miktar) {
        this.miktar = miktar;
    }

    public String getBirim() {
        return birim;
    }

    public void setBirim(String birim) {
        this.birim = birim;
    }

    public String getLokasyon() {
        return lokasyon;
    }

    public void setLokasyon(String lokasyon) {
        this.lokasyon = lokasyon;
    }
}