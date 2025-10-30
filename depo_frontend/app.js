const apiUrl = 'http://localhost:8080/api/urunler'; // Mutfak'ın adresi
const urunListesiBody = document.getElementById('urun-listesi');
const ekleFormu = document.getElementById('ekle-formu');

// Mutfaktan tüm yemekleri (ürünleri) isteyip menüye yazan fonksiyon
async function urunleriGetir() {
    const response = await fetch(apiUrl);
    const urunler = await response.json(); // Gelen cevabı JSON'a çevir

    urunListesiBody.innerHTML = ''; // Tabloyu temizle

    urunler.forEach(urun => {
        const row = `<tr>
                        <td>${urun.urunAdi}</td>
                        <td>${urun.miktar}</td>
                        <td>${urun.birim}</td>
                     </tr>`;
        urunListesiBody.innerHTML += row;
    });
}

// Yeni siparişi (yeni ürünü) alıp mutfağa gönderen fonksiyon
ekleFormu.addEventListener('submit', async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle

    const yeniUrun = {
        urunAdi: document.getElementById('urunAdi').value,
        miktar: document.getElementById('miktar').value,
        birim: document.getElementById('birim').value
    };

    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(yeniUrun)
    });

    ekleFormu.reset(); // Formu temizle
    urunleriGetir(); // Tabloyu yenile
});

// Sayfa ilk yüklendiğinde ürünleri getir
urunleriGetir();