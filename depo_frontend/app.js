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
                       <td><button class="sil-butonu" data-id="${urun.id}">Sil</button></td>
                     </tr>`;
        urunListesiBody.innerHTML += row;
    });
}// app.js

// --- EN BAŞA YENİ DEĞİŞKENLER EKLEYİN ---
const duzenleModal = document.getElementById('duzenle-modal');
const duzenleFormu = document.getElementById('duzenle-formu');
const kapatButonu = document.querySelector('.close-button');

// --- 'urunleriGetir' FONKSİYONUNU GÜNCELLEYİN ---
async function urunleriGetir() {
    const response = await fetch(apiUrl);
    window.urunler = await response.json(); // Ürünleri globalde saklayalım
    urunListesiBody.innerHTML = '';

    urunler.forEach(urun => {
        const row = `<tr>
                        <td>${urun.urunAdi}</td>
                        <td>${urun.miktar}</td>
                        <td>${urun.birim}</td>
                        <td>
                            <button class="duzenle-butonu" data-id="${urun.id}">Düzenle</button>
                            <button class="sil-butonu" data-id="${urun.id}">Sil</button>
                        </td>
                     </tr>`;
        urunListesiBody.innerHTML += row;
    });
}

// --- YENİ FONKSİYONLAR VE EVENT LISTENER'LAR EKLEYİN ---

// Modal kapatma işlemleri
kapatButonu.onclick = () => { duzenleModal.style.display = "none"; }
window.onclick = (event) => {
    if (event.target == duzenleModal) {
        duzenleModal.style.display = "none";
    }
}

// Tıklama olaylarını yöneten ana listener'ı güncelleyin
urunListesiBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('sil-butonu')) {
        // ... (silme kodunuz burada - değişiklik yok)
    }

    if (e.target.classList.contains('duzenle-butonu')) {
        const id = e.target.dataset.id;
        // Globalde sakladığımız ürün listesinden ilgili ürünü bul
        const urun = window.urunler.find(u => u.id == id);
        if (urun) {
            // Formu bulduğumuz ürünün bilgileriyle doldur
            document.getElementById('edit-urun-id').value = urun.id;
            document.getElementById('edit-urunAdi').value = urun.urunAdi;
            document.getElementById('edit-miktar').value = urun.miktar;
            document.getElementById('edit-birim').value = urun.birim;
            
            // Modalı görünür yap
            duzenleModal.style.display = "block";
        }
    }
});

// Düzenleme formunun gönderilme (submit) olayını dinle
duzenleFormu.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('edit-urun-id').value;
    const guncelUrun = {
        urunAdi: document.getElementById('edit-urunAdi').value,
        miktar: parseInt(document.getElementById('edit-miktar').value),
        birim: document.getElementById('edit-birim').value,
    };

    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(guncelUrun)
    });

    duzenleModal.style.display = "none"; // Modalı kapat
    urunleriGetir(); // Tabloyu yenile
});

// ... (urunSil ve diğer kodlarınız)
async function urunSil(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    urunleriGetir(); // Tabloyu yenile
}urunListesiBody.addEventListener('click', (e) => {
    // Tıklanan elementin bir "sil-butonu" olup olmadığını kontrol et
    if (e.target.classList.contains('sil-butonu')) {
        // Emin misiniz diye sor (isteğe bağlı ama önerilir)
        const onay = confirm('Bu ürünü silmek istediğinize emin misiniz?');
        if (onay) {
            const id = e.target.dataset.id; // Butonun 'data-id' etiketinden ID'yi al
            urunSil(id); // Silme fonksiyonunu çağır
        }
    }
});
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