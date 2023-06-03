# Film Listesi Uygulaması
Film Listesi Uygulaması, kullanıcının film ekleyebileceği, düzenleyebileceği ve silebileceği basit bir web uygulamasıdır. Uygulama, React ve Redux kütüphanelerini kullanarak geliştirilmiştir.

# İçindekiler

<li>Kurulum</li>
<li>Proje Yapısı</li>
<li>Bileşenler</li>
<li>Redux</li>

# Kurulum
Projenin yerel ortamda çalıştırılması için aşağıdaki adımları izleyin:

1. Proje dizininde terminali açın.<br>
2. npm install komutunu kullanarak projenin bağımlılıklarını yükleyin.<br>
3. npm start komutunu kullanarak projeyi başlatın.<br>
4. Tarayıcınızda http://localhost:3000 adresine gidin.

# Bileşenler

<li>Redux</li>
Redux, uygulamanın durum yönetimi için kullanılmaktadır. Filmler, Redux store içinde tutulur ve ilgili eylemler tarafından güncellenir.

<li>movieReducer</li>
movieReducer, film verileriyle ilgili işlemleri gerçekleştiren bir Redux reducer'ıdır. Reducer, mevcut durumu ve bir eylemi alır ve yeni bir durumu döndürür.

Reducer'ın işlevleri:<br>

1. addMovie: Bir film eklemek için kullanılır. Mevcut film listesine yeni bir film ekler.
2. editMovie: Bir filmi düzenlemek için kullanılır. Belirli bir filmi günceller.
3. deleteMovie: Bir filmi silmek için kullanılır. Belirli bir filmi filtreler ve siler.

<li>store</li>
store, Redux store'unun yapılandırıldığı dosyadır. movieReducer reducer'ı movies adı altında store'a eklenir. Bu şekilde, film verileri uygulama düzeyinde erişilebilir hale gelir.

# HomePage
HomePage bileşeni, film listesini görüntülemek ve mevcut filmleri düzenlemek veya silmek için kullanılır.

Bileşenin işlevleri:

<li>Kullanıcının yeni bir film eklemek için Admin bileşenine yönlendirilmesini sağlar.</li>
<li>Kullanıcının mevcut filmleri düzenlemesine veya silmesine olanak tanır.</li>

# Admin
Admin bileşeni, yeni bir film eklemek için kullanılan bir form içerir.

Bileşenin işlevleri:

<li>Kullanıcının girdiği film adı, yazar, yıl ve resim bilgilerini tutar.</li>
<li>Kullanıcının film adı, yazar, yıl ve resim girdilerini değiştirmesine olanak tanır.</li>
<li>Kullanıcının resim dosyası seçmesini sağlar.</li>
<li>Kullanıcının formu göndermesini ve yeni bir film eklemesini sağlar.</li>
<li>Yeni film eklendiğinde, kullanıcıya bir onay mesajı gösterir.</li>


# EditMoviePopup
EditMoviePopup bileşeni, bir filmi düzenlemek için kullanılan bir popup penceresi olarak tasarlanmıştır.

Bileşenin işlevleri:

<li>Kullanıcının seçili filmi düzenlemesi için bir form içerir.</li>
<li>Kullanıcının film adı, yazar ve yıl bilgilerini düzenlemesine olanak tanır.</li>
<li>Kullanıcının formu göndermesini ve film düzenlemesini sağlar.</li>
